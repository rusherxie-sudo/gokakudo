export const dainiKakomonnReviewBatches = Array.from({ length: 19 }, (_, index) => String(57024 - index)).map((id) => ({
  session: "",
  expectedQuestions: 30,
  discoveryUrl: `https://2eiseikanrisha.kakomonn.com/list1/${id}?page=1`,
  status: "発見済み" as const,
}));

export const dainiTotalReviewQuestions = dainiKakomonnReviewBatches.reduce((sum, batch) => sum + batch.expectedQuestions, 0);
