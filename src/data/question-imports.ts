export const kakomonnReviewBatches = [
  ["令和8年4月公表", 20054], ["令和7年10月公表", 20053], ["令和7年4月公表", 20052],
  ["令和6年10月公表", 20051], ["令和6年4月公表", 20050], ["令和5年10月公表", 20049],
  ["令和5年4月公表", 20048], ["令和4年10月公表", 20047], ["令和4年4月公表", 20046],
  ["令和3年10月公表", 20045], ["令和3年4月公表", 20044], ["令和2年10月公表", 20043],
  ["令和2年4月公表", 20042], ["令和元年10月公表", 20041], ["平成31年4月公表", 20040],
  ["平成30年10月公表", 20039], ["平成30年4月公表", 20038], ["平成29年10月公表", 20037],
  ["平成29年4月公表", 20036], ["平成28年10月公表", 20035], ["平成28年4月公表", 20034],
  ["平成27年10月公表", 20033], ["平成27年4月公表", 20032], ["平成26年10月公表", 20031],
].map(([session, id]) => ({
  session: String(session),
  expectedQuestions: 44,
  discoveryUrl: `https://1eiseikanrisha.kakomonn.com/list1/${id}?page=1`,
  status: "目視確認待ち" as const,
}));

export const totalReviewQuestions = kakomonnReviewBatches.reduce((sum, batch) => sum + batch.expectedQuestions, 0);
