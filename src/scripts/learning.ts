export type Confidence = "high" | "medium" | "low";

export type Attempt = {
  questionId: string;
  correct: boolean;
  confidence: Confidence;
  answeredAt: string;
};

export type StudySession = {
  mode: string;
  score: number;
  total: number;
  completedAt: string;
};

export type LearningState = {
  version: 1;
  attempts: Attempt[];
  sessions: StudySession[];
};

export const LEARNING_KEY = "gokakudo:eisei-kanrisha:learning-v1";

const learningKey = (examSlug = "eisei-kanrisha") => `gokakudo:${examSlug}:learning-v1`;

export function readLearning(examSlug = "eisei-kanrisha"): LearningState {
  const empty: LearningState = { version: 1, attempts: [], sessions: [] };
  try {
    const raw = localStorage.getItem(learningKey(examSlug)) || (examSlug === "eisei-kanrisha" ? localStorage.getItem("gokakudo:eisei:learning-v1") : null);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<LearningState>;
    return {
      version: 1,
      attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
    };
  } catch {
    return empty;
  }
}

export function saveLearning(state: LearningState, examSlug = "eisei-kanrisha") {
  localStorage.setItem(learningKey(examSlug), JSON.stringify(state));
}

export function latestAttempts(state: LearningState) {
  const latest = new Map<string, Attempt>();
  for (const attempt of state.attempts) latest.set(attempt.questionId, attempt);
  return latest;
}

export function addAttempts(attempts: Attempt[], examSlug = "eisei-kanrisha") {
  const state = readLearning(examSlug);
  state.attempts.push(...attempts);
  saveLearning(state, examSlug);
}

export function addSession(session: StudySession, examSlug = "eisei-kanrisha") {
  const state = readLearning(examSlug);
  state.sessions.push(session);
  saveLearning(state, examSlug);
}

export function questionIdsForMode(mode: string, state = readLearning()) {
  const latest = latestAttempts(state);
  if (mode === "wrong") return [...latest.entries()].filter(([, value]) => !value.correct).map(([id]) => id);
  if (mode === "uncertain") return [...latest.entries()].filter(([, value]) => value.correct && value.confidence !== "high").map(([id]) => id);
  if (mode === "review") return [...latest.entries()].filter(([, value]) => !value.correct || value.confidence !== "high").map(([id]) => id);
  return [];
}
