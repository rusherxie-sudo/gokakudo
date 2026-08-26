import { load } from "cheerio";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const BASE = process.env.GOKAKUDO_SOURCE_BASE || "https://1eiseikanrisha.kakomonn.com";
const batchArg = process.argv[2] || "20054";
const output = process.argv[3] || "src/data/imported/official-questions.json";
const ALL_BATCH_IDS = Array.from({ length: 24 }, (_, index) => String(20054 - index));
const batchIds = batchArg === "all" ? ALL_BATCH_IDS : [batchArg];
const headers = { "user-agent": "Mozilla/5.0 (compatible; GokakudoQuestionImporter/1.0)" };
const maxBatches = Number(process.env.GOKAKUDO_MAX_BATCHES || 1);
const concurrency = Math.min(2, Math.max(1, Number(process.env.GOKAKUDO_CONCURRENCY || 1)));
const sleepMs = Math.max(800, Number(process.env.GOKAKUDO_SLEEP_MS || 1200));
const expectedCount = Number(process.env.GOKAKUDO_EXPECTED_COUNT || 44);
const expectedDistribution = (process.env.GOKAKUDO_EXPECTED_DIST || "7,7,10,10,10")
  .split(",")
  .map((value) => Number(value.trim()))
  .sort((a, b) => a - b);

const clean = (value) => value.replace(/\u00a0/g, " ").replace(/[ \t]+/g, " ").replace(/\s*\n\s*/g, "\n").trim();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, options = {}, attempt = 1) {
  const response = await fetch(url, options);
  if ((response.status === 429 || response.status >= 500) && attempt <= 5) {
    const retryAfter = Number(response.headers.get("retry-after"));
    const wait = Number.isFinite(retryAfter) && retryAfter > 0
      ? Math.min(retryAfter * 1000, 60000)
      : Math.min(45000, 4000 * attempt);
    process.stdout.write(`\n${response.status} from ${url}; retrying in ${Math.round(wait / 1000)}s\n`);
    await sleep(wait);
    return fetchWithRetry(url, options, attempt + 1);
  }
  return response;
}

async function fetchHtml(url) {
  const response = await fetchWithRetry(url, { headers });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return { html: await response.text(), response };
}

function cookiesFrom(response) {
  const values = response.headers.getSetCookie?.() || [response.headers.get("set-cookie") || ""];
  return values.filter(Boolean).map((value) => value.split(";")[0]).join("; ");
}

async function fetchCorrectIndex({ url, id, csrf, cookies }) {
  const body = new URLSearchParams({ strAnswerData: "1-", intStudyRandumId: id, intIdCategoryFlag: "1" });
  const response = await fetchWithRetry(`${BASE}/questions/answer`, {
    method: "POST",
    headers: {
      ...headers,
      cookie: cookies,
      referer: url,
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-csrf-token": csrf,
      "x-requested-with": "XMLHttpRequest",
    },
    body,
  });
  if (!response.ok) throw new Error(`answer ${id} returned ${response.status}`);
  const data = await response.json();
  const correct = String(data.response_data03 || "").match(/ctr_box_09[^>]*>\s*(\d+)/)?.[1];
  if (!correct) throw new Error(`answer ${id} did not contain a correct option`);
  return Number(correct) - 1;
}

async function parseQuestion(url, batchId) {
  const { html, response } = await fetchHtml(url);
  const $ = load(html);
  const id = url.match(/\/questions\/(\d+)/)?.[1];
  const title = clean($("#js-qttl").text());
  const match = title.match(/過去問\s+(.+?公表)\s+(?:問(\d+)\s*\((.+?)\s+問(\d+)\)|(.+?)\s+問(\d+))/s);
  if (!id || !match) throw new Error(`metadata could not be parsed: ${url}`);
  const promptNode = $(".problem_detail > .ttl").first();
  const choiceNodes = $(".problem_detail > ul.list").first().children("li");
  const prompt = clean(promptNode.text());
  const choices = choiceNodes.map((_, node) => clean($(node).text())).get();
  const csrf = $('meta[name="csrf-token"]').attr("content");
  if (!prompt || choices.length !== 5 || !csrf) throw new Error(`question structure invalid: ${url}`);
  const correctIndex = await fetchCorrectIndex({ url, id, csrf, cookies: cookiesFrom(response) });
  return {
    id: `official-${batchId}-q${String(match[2]).padStart(2, "0")}`,
    number: Number(match[2] || match[6]),
    subject: clean(match[3] || match[5]),
    subjectQuestionNumber: Number(match[4] || match[6]),
    difficulty: "公表問題",
    prompt,
    choices,
    correctIndex,
    contentType: "公表問題",
    officialSession: clean(match[1]),
    officialQuestionNumber: Number(match[2] || match[6]),
    sourceLabel: `過去問ドットコム掲載の${clean(match[1])} 問${match[2] || match[6]}`,
    sourceUrl: url,
    sourceCheckedAt: new Date().toISOString().slice(0, 10),
  };
}

let existing = { questions: [], batches: [] };
try {
  const parsed = JSON.parse(await readFile(output, "utf8"));
  existing.questions = Array.isArray(parsed.questions) ? parsed.questions : [];
  existing.batches = Array.isArray(parsed.batches) ? parsed.batches : [];
} catch {}
const questions = [...existing.questions];
const batches = [...existing.batches];
const completedBatchIds = new Set(questions.map((question) => question.id.match(/^official-(\d+)-/)?.[1]).filter(Boolean));
const persist = async () => {
  await mkdir(new URL("../src/data/imported/", import.meta.url), { recursive: true });
  await writeFile(output, `${JSON.stringify({ importedAt: new Date().toISOString(), batches, questions }, null, 2)}\n`);
};
let importedCount = 0;
for (const [batchIndex, batchId] of batchIds.entries()) {
  if (completedBatchIds.has(batchId)) {
    process.stdout.write(`\rBatch ${batchIndex + 1}/${batchIds.length} · already imported`);
    continue;
  }
  if (importedCount >= maxBatches) {
    process.stdout.write(`\nReached GOKAKUDO_MAX_BATCHES=${maxBatches} for this run; stopping.\n`);
    break;
  }
  const listUrl = `${BASE}/list1/${batchId}?page=1`;
  const { html: listHtml } = await fetchHtml(listUrl);
  const $ = load(listHtml);
  const urls = [...new Set($('a[href*="/questions/"]').map((_, node) => $(node).attr("href")).get().filter(Boolean))];
  if (urls.length !== expectedCount) throw new Error(`${batchId}: expected ${expectedCount} question URLs, found ${urls.length}`);
  const batchQuestions = [];
  for (let offset = 0; offset < urls.length; offset += concurrency) {
    const chunk = urls.slice(offset, offset + concurrency);
    batchQuestions.push(...await Promise.all(chunk.map((url) => parseQuestion(url, batchId))));
    process.stdout.write(`\rBatch ${batchIndex + 1}/${batchIds.length} · ${Math.min(offset + concurrency, expectedCount)}/${expectedCount}`);
    await sleep(sleepMs);
  }
  batchQuestions.sort((a, b) => a.number - b.number);
  const distribution = Object.fromEntries(Object.entries(Object.groupBy(batchQuestions, (question) => question.subject)).map(([subject, items]) => [subject, items.length]));
  const actual = Object.values(distribution).sort((a, b) => a - b);
  if (JSON.stringify(actual) !== JSON.stringify(expectedDistribution)) throw new Error(`${batchId}: unexpected subject distribution: ${JSON.stringify(distribution)}`);
  if (batchQuestions.some((question, index) => question.number !== index + 1 || question.correctIndex < 0 || question.correctIndex > 4)) throw new Error(`${batchId}: number or answer validation failed`);
  questions.push(...batchQuestions);
  batches.push({ batchId, session: batchQuestions[0].officialSession, sourceListUrl: listUrl, count: batchQuestions.length, distribution });
  completedBatchIds.add(batchId);
  await persist();
  importedCount += 1;
  if (importedCount < maxBatches) await sleep(3000);
}

await persist();
process.stdout.write(`\nImported ${questions.length} questions across ${batches.length} batches to ${output}\n`);
