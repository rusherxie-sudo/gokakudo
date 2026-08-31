import imported from "./imported/official-questions.json";
import { eisei20054Explanations } from "./eisei-20054-explanations";

export type Question = {
  id: string;
  number: number;
  subject: string;
  subjectSlug: string;
  difficulty: "基礎" | "標準" | "公表問題";
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  explanationSourceLabel?: string;
  explanationSourceUrl?: string;
  sourceLabel: string;
  sourceUrl: string;
  contentType: "予想問題" | "公表問題";
  sourceCheckedAt: string;
  officialSession?: string;
  officialQuestionNumber?: number;
};

export const predictionQuestions: Question[] = [
  {
    id: "selection-threshold",
    number: 1,
    subject: "関係法令",
    subjectSlug: "law",
    difficulty: "基礎",
    prompt: "衛生管理者を選任しなければならない事業場として、正しいものはどれか。",
    choices: [
      "常時10人以上の労働者を使用するすべての事業場",
      "常時30人以上の労働者を使用する製造業の事業場",
      "常時50人以上の労働者を使用するすべての事業場",
      "常時100人以上の労働者を使用する有害業務の事業場",
    ],
    correctIndex: 2,
    explanation: "衛生管理者は、業種にかかわらず常時50人以上の労働者を使用する事業場で選任が必要です。10人以上50人未満の事業場では、業種に応じて安全衛生推進者または衛生推進者を選任します。",
    sourceLabel: "厚生労働省「衛生管理者について教えて下さい。」",
    sourceUrl: "https://www.mhlw.go.jp/seisakunitsuite/bunya/koyou_roudou/roudoukijun/faq/5.html",
    contentType: "予想問題",
    sourceCheckedAt: "2026-08-23",
  },
  {
    id: "selection-deadline",
    number: 2,
    subject: "関係法令",
    subjectSlug: "law",
    difficulty: "基礎",
    prompt: "衛生管理者を選任すべき事由が発生した場合、原則として何日以内に選任しなければならないか。",
    choices: ["7日以内", "14日以内", "30日以内", "60日以内"],
    correctIndex: 1,
    explanation: "衛生管理者は、選任すべき事由が発生した日から14日以内に選任します。選任後は、遅滞なく所轄労働基準監督署長へ報告する必要があります。",
    sourceLabel: "厚生労働省 職場のあんぜんサイト「衛生管理者」",
    sourceUrl: "https://anzeninfo.mhlw.go.jp/yougo/yougo33_1.html",
    contentType: "予想問題",
    sourceCheckedAt: "2026-08-23",
  },
  {
    id: "workplace-rounds",
    number: 3,
    subject: "関係法令",
    subjectSlug: "law",
    difficulty: "基礎",
    prompt: "衛生管理者による作業場等の巡視頻度として、法令上正しいものはどれか。",
    choices: ["毎日1回以上", "毎週1回以上", "毎月1回以上", "3か月に1回以上"],
    correctIndex: 1,
    explanation: "衛生管理者は、少なくとも毎週1回作業場等を巡視します。有害のおそれを認めたときは、直ちに健康障害を防止するための措置を講じなければなりません。",
    sourceLabel: "労働安全衛生規則 第11条（厚生労働省法令等データベース）",
    sourceUrl: "https://www.mhlw.go.jp/web/t_doc?dataId=74003000&dataType=0&pageNo=1",
    contentType: "予想問題",
    sourceCheckedAt: "2026-08-23",
  },
  {
    id: "manager-count-350",
    number: 4,
    subject: "関係法令",
    subjectSlug: "law",
    difficulty: "標準",
    prompt: "常時350人の労働者を使用する事業場で、選任しなければならない衛生管理者の最低人数は何人か。",
    choices: ["1人", "2人", "3人", "4人"],
    correctIndex: 1,
    explanation: "常時200人を超え500人以下の労働者を使用する事業場では、2人以上の衛生管理者を選任します。人数区分の境界を正確に覚えることが重要です。",
    sourceLabel: "厚生労働省「衛生管理者について教えて下さい。」",
    sourceUrl: "https://www.mhlw.go.jp/seisakunitsuite/bunya/koyou_roudou/roudoukijun/faq/5.html",
    contentType: "予想問題",
    sourceCheckedAt: "2026-08-23",
  },
  {
    id: "manager-count-1200",
    number: 5,
    subject: "関係法令",
    subjectSlug: "law",
    difficulty: "標準",
    prompt: "常時1,200人の労働者を使用する事業場で、選任しなければならない衛生管理者の最低人数は何人か。",
    choices: ["2人", "3人", "4人", "5人"],
    correctIndex: 2,
    explanation: "常時1,000人を超え2,000人以下の事業場では4人以上が必要です。また、常時1,000人を超える事業場では、少なくとも1人を専任の衛生管理者とします。",
    sourceLabel: "厚生労働省 職場のあんぜんサイト「衛生管理者」",
    sourceUrl: "https://anzeninfo.mhlw.go.jp/yougo/yougo33_1.html",
    contentType: "予想問題",
    sourceCheckedAt: "2026-08-23",
  },
  {
    id: "first-class-industries",
    number: 6,
    subject: "関係法令",
    subjectSlug: "law",
    difficulty: "標準",
    prompt: "第一種衛生管理者免許等を有する者から衛生管理者を選任する必要がある業種はどれか。",
    choices: ["情報通信業", "金融業", "製造業", "保険業"],
    correctIndex: 2,
    explanation: "農林畜水産業、鉱業、建設業、製造業、電気業、ガス業、水道業、運送業、医療業、清掃業などでは、第一種衛生管理者免許等を有する者から選任します。",
    sourceLabel: "厚生労働省 職場のあんぜんサイト「衛生管理者」",
    sourceUrl: "https://anzeninfo.mhlw.go.jp/yougo/yougo33_1.html",
    contentType: "予想問題",
    sourceCheckedAt: "2026-08-23",
  },
  {
    id: "health-committee",
    number: 7,
    subject: "関係法令",
    subjectSlug: "law",
    difficulty: "基礎",
    prompt: "衛生委員会を設置しなければならない事業場の規模として、正しいものはどれか。",
    choices: [
      "常時10人以上の労働者を使用する事業場",
      "常時30人以上の労働者を使用する事業場",
      "常時50人以上の労働者を使用する事業場",
      "常時100人以上の労働者を使用する事業場",
    ],
    correctIndex: 2,
    explanation: "業種にかかわらず、常時50人以上の労働者を使用する事業場では衛生委員会を設置し、健康障害防止などの事項を調査審議します。",
    sourceLabel: "東京労働局「衛生管理の充実」",
    sourceUrl: "https://jsite.mhlw.go.jp/tokyo-roudoukyoku/riyousha_mokuteki_menu/jigyounushi/jigyounushi_jouhou/ae-eiseikanri.html",
    contentType: "予想問題",
    sourceCheckedAt: "2026-08-23",
  },
  {
    id: "promoter-threshold",
    number: 8,
    subject: "関係法令",
    subjectSlug: "law",
    difficulty: "標準",
    prompt: "常時20人の労働者を使用する事務所で、衛生管理者の代わりに選任対象となる者は誰か。",
    choices: ["産業医", "衛生推進者", "作業主任者", "衛生工学衛生管理者"],
    correctIndex: 1,
    explanation: "常時10人以上50人未満で、安全管理者の選任対象外の業種では衛生推進者を選任します。50人以上になると衛生管理者の選任対象です。",
    sourceLabel: "厚生労働省「安全衛生推進者（衛生推進者）について教えて下さい。」",
    sourceUrl: "https://www.mhlw.go.jp/stf/newpage_09980.html",
    contentType: "予想問題",
    sourceCheckedAt: "2026-08-23",
  },
];

export const officialQuestions: Question[] = imported.questions.map((question) => ({
  id: question.id,
  number: question.number,
  subject: question.subject,
  subjectSlug: `official-${question.officialQuestionNumber}`,
  difficulty: "公表問題",
  prompt: question.prompt,
  choices: question.choices,
  correctIndex: question.correctIndex,
  explanation: eisei20054Explanations[question.id]?.explanation ?? `正答は「${question.choices[question.correctIndex]}」です。この問題は${question.officialSession}の公表問題です。詳細解説は法令・公的資料による確認後に追加します。`,
  explanationSourceLabel: eisei20054Explanations[question.id]?.explanationSourceLabel,
  explanationSourceUrl: eisei20054Explanations[question.id]?.explanationSourceUrl,
  sourceLabel: question.sourceLabel,
  sourceUrl: question.sourceUrl,
  contentType: "公表問題",
  sourceCheckedAt: eisei20054Explanations[question.id]?.verifiedAt ?? question.sourceCheckedAt,
  officialSession: question.officialSession,
  officialQuestionNumber: question.officialQuestionNumber,
}));

export const questions: Question[] = [...officialQuestions, ...predictionQuestions];

export const officialQuestionBatches = officialQuestions
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

export const latestOfficialQuestions = officialQuestionBatches[0]?.questions || [];

export const subjects = [
  { name: "関係法令（有害業務）", count: officialQuestions.filter((q) => q.subject === "関係法令（有害業務に係るもの）").length, status: "公開中" },
  { name: "労働衛生（有害業務）", count: officialQuestions.filter((q) => q.subject === "労働衛生（有害業務に係るもの）").length, status: "公開中" },
  { name: "関係法令", count: officialQuestions.filter((q) => q.subject === "関係法令（有害業務に係るもの以外のもの）").length + predictionQuestions.length, status: "公開中" },
  { name: "労働衛生", count: officialQuestions.filter((q) => q.subject === "労働衛生（有害業務に係るもの以外のもの）").length, status: "公開中" },
  { name: "労働生理", count: officialQuestions.filter((q) => q.subject === "労働生理").length, status: "公開中" },
];
