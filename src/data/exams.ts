import { questions } from "./questions";
import { otsu4Questions } from "./otsu4-questions";
import { dainiQuestions } from "./daini-questions";

export type ExamDefinition = {
  slug: "eisei-kanrisha" | "daini-eisei-kanrisha" | "kikenbutsu-otsu4";
  name: string;
  shortName: string;
  badge: string;
  category: string;
  questionCount: number;
  examQuestionCount: number;
  passMark: number;
  accent: "green" | "orange";
  description: string;
};

export const exams: ExamDefinition[] = [
  {
    slug: "eisei-kanrisha",
    name: "第一種衛生管理者",
    shortName: "衛生管理者",
    badge: "1衛",
    category: "国家資格 · 医療・衛生",
    questionCount: questions.length,
    examQuestionCount: 44,
    passMark: 27,
    accent: "green",
    description: "働く人の健康と安全を守るための国家資格。5科目を公表問題と予想問題で学びます。",
  },
  {
    slug: "daini-eisei-kanrisha",
    name: "第二種衛生管理者",
    shortName: "衛生管理者2種",
    badge: "2衛",
    category: "国家資格 · 医療・衛生",
    questionCount: dainiQuestions.length,
    examQuestionCount: 30,
    passMark: 18,
    accent: "green",
    description: "有害業務のない事業場で選任できる衛生管理者。関係法令・労働衛生・労働生理を公表問題で学びます。",
  },
  {
    slug: "kikenbutsu-otsu4",
    name: "危険物取扱者 乙種4類",
    shortName: "危険物乙4",
    badge: "乙4",
    category: "国家資格 · 設備・安全",
    questionCount: otsu4Questions.length,
    examQuestionCount: 35,
    passMark: 21,
    accent: "orange",
    description: "ガソリン、灯油など第4類危険物の取扱いに必要な知識を、3科目から学びます。",
  },
];

export const examBySlug = Object.fromEntries(exams.map((exam) => [exam.slug, exam])) as Record<ExamDefinition["slug"], ExamDefinition>;
