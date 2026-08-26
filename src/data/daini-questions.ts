import imported from "./imported/daini-official-questions.json";
import type { Question } from "./questions";

export const dainiOfficialQuestions: Question[] = imported.questions.map((question) => ({
  id: question.id,
  number: question.number,
  subject: question.subject,
  subjectSlug: `official-${question.officialQuestionNumber}`,
  difficulty: "公表問題",
  prompt: question.prompt,
  choices: question.choices,
  correctIndex: question.correctIndex,
  explanation: `正答は「${question.choices[question.correctIndex]}」です。この問題は${question.officialSession}の公表問題です。詳細解説は法令・公的資料による確認後に追加します。`,
  sourceLabel: question.sourceLabel,
  sourceUrl: question.sourceUrl,
  contentType: "公表問題",
  sourceCheckedAt: question.sourceCheckedAt,
  officialSession: question.officialSession,
  officialQuestionNumber: question.officialQuestionNumber,
}));

export const dainiQuestions: Question[] = dainiOfficialQuestions;

export const dainiOfficialQuestionBatches = dainiOfficialQuestions
  .reduce<Array<{ batchId: string; session: string; questions: Question[] }>>((batches, question) => {
    const batchId = question.id.match(/^official-(\d+)-/)?.[1] || "unknown";
    let batch = batches.find((item) => item.batchId === batchId);
    if (!batch) {
      batch = { batchId, session: question.officialSession || "公表問題", questions: [] };
      batches.push(batch);
    }
    batch.questions.push(question);
    return batches;
  }, [])
  .sort((a, b) => b.batchId.localeCompare(a.batchId));

export const dainiLatestOfficialQuestions = dainiOfficialQuestionBatches[0]?.questions || [];

export const dainiSubjects = [
  { name: "関係法令", count: dainiOfficialQuestions.filter((q) => q.subject === "関係法令").length, status: "公開中" },
  { name: "労働衛生", count: dainiOfficialQuestions.filter((q) => q.subject === "労働衛生").length, status: "公開中" },
  { name: "労働生理", count: dainiOfficialQuestions.filter((q) => q.subject === "労働生理").length, status: "公開中" },
];
