const exams = [
  {
    id: "eisei-1",
    name: "第一種衛生管理者",
    category: ["work", "health"],
    categoryLabel: "医療・衛生",
    status: "学習できます",
    questions: "422問",
    passLine: "総合60%",
    description: "働く人の健康と安全を守る国家資格。関係法令・労働衛生・労働生理を、問題から効率よく身につけます。",
    topics: [["関係法令（有害業務）", 43], ["労働衛生（有害業務）", 58], ["関係法令・労働衛生", 64], ["労働生理", 71]]
  },
  {
    id: "touroku-hanbaisha",
    name: "登録販売者",
    category: ["work", "health"],
    categoryLabel: "医療・衛生",
    status: "学習できます",
    questions: "1,280問",
    passLine: "約70%",
    description: "一般用医薬品の販売に必要な知識を、成分・人体・法規のつながりから身につけます。",
    topics: [["医薬品の基本知識", 58], ["人体の働き", 46], ["主な医薬品と作用", 34], ["薬事関係法規", 62], ["適正使用・安全対策", 55]]
  },
  {
    id: "otsu4",
    name: "危険物取扱者 乙4",
    category: ["work", "industry"],
    categoryLabel: "工業・安全",
    status: "学習できます",
    questions: "385問",
    passLine: "各科60%",
    description: "危険物の法令、物理・化学、性質と消火を、計算を含む変式問題で身につけます。",
    topics: [["危険物に関する法令", 61], ["基礎的な物理・化学", 39], ["危険物の性質・消火", 67]]
  },
  {
    id: "unkan-kamotsu",
    name: "運行管理者（貨物）",
    category: ["work", "transport"],
    categoryLabel: "運輸・物流",
    status: "学習できます",
    questions: "249問",
    passLine: "18 / 30点",
    description: "法令から拘束時間・運行計画まで、場面を読み解く力を実践問題で鍛えます。",
    topics: [["貨物自動車運送事業法", 52], ["道路運送車両法", 66], ["道路交通法", 57], ["労働基準法", 41], ["実務上の知識と能力", 36]]
  },
  { id: "it-passport", name: "ITパスポート", category: ["office"], categoryLabel: "IT・事務", status: "準備中", questions: "—", coming: true },
  { id: "takken", name: "宅地建物取引士", category: ["work", "office"], categoryLabel: "法律・不動産", status: "準備中", questions: "—", coming: true },
  { id: "fp3", name: "FP技能検定 3級", category: ["office"], categoryLabel: "金融・事務", status: "準備中", questions: "—", coming: true },
  { id: "boki3", name: "日商簿記 3級", category: ["office"], categoryLabel: "会計・事務", status: "準備中", questions: "—", coming: true }
];

let selectedExam = exams[0];
let selectedAnswer = null;
let selectedConfidence = null;
let activeCategory = "all";

const views = [...document.querySelectorAll("[data-view]")];
const examGrid = document.querySelector("#exam-grid");
const searchInput = document.querySelector("#exam-search");
const emptyState = document.querySelector("#empty-state");
const toast = document.querySelector("#toast");

function showView(name) {
  document.body.dataset.activeView = name;
  views.forEach((view) => view.classList.toggle("is-active", view.dataset.view === name));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function renderExams() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = exams.filter((exam) => {
    const matchesCategory = activeCategory === "all" || exam.category.includes(activeCategory);
    const matchesQuery = !query || `${exam.name} ${exam.categoryLabel}`.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  examGrid.innerHTML = visible.map((exam) => `
    <button class="exam-card ${exam.coming ? "is-coming" : ""}" type="button" data-exam-id="${exam.id}">
      <span class="status">${exam.status}</span>
      <h3>${exam.name}</h3>
      <p>${exam.categoryLabel}</p>
      <span class="card-bottom"><span>${exam.coming ? "公開予定を確認" : "収録問題"}</span><strong>${exam.coming ? "＋" : exam.questions}</strong></span>
    </button>
  `).join("");
  emptyState.hidden = visible.length > 0;
}

function renderExamDetail(exam) {
  selectedExam = exam;
  document.querySelector("#exam-category").textContent = exam.categoryLabel;
  document.querySelector("#exam-title").textContent = exam.name;
  document.querySelector("#exam-description").textContent = exam.description;
  document.querySelector("#exam-question-count").textContent = exam.questions;
  document.querySelector("#exam-pass-line").textContent = exam.passLine;
  document.querySelector("#topic-list").innerHTML = exam.topics.map(([name, score]) => `
    <button class="topic-item" type="button">
      <strong>${name}</strong>
      <div aria-label="現在の理解度 ${score}%"><i style="width:${score}%"></i></div>
      <span>${score}%</span>
    </button>
  `).join("");
  showView("exam");
}

function resetQuestion() {
  selectedAnswer = null;
  selectedConfidence = null;
  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.classList.remove("is-selected", "is-correct", "is-wrong");
    button.disabled = false;
  });
  document.querySelectorAll("[data-confidence]").forEach((button) => button.classList.remove("is-selected"));
  document.querySelector("#answer-button").hidden = false;
  document.querySelector("#answer-button").disabled = true;
  document.querySelector("#next-button").hidden = true;
  document.querySelector("#explanation").hidden = true;
  document.querySelector("#confidence-row").hidden = false;
}

document.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (actionButton) {
    const action = actionButton.dataset.action;
    if (action === "home") showView("home");
    if (action === "catalog") {
      showView("home");
      window.setTimeout(() => document.querySelector("#exam-finder").scrollIntoView({ behavior: "smooth" }), 80);
    }
    if (action === "method") {
      showView("home");
      window.setTimeout(() => document.querySelector("#method").scrollIntoView({ behavior: "smooth" }), 80);
    }
    if (action === "dashboard") showView("dashboard");
    if (action === "exam") showView("exam");
    if (action === "start-diagnostic") {
      resetQuestion();
      showView("diagnostic");
    }
  }

  const examButton = event.target.closest("[data-exam-id]");
  if (examButton) {
    const exam = exams.find((item) => item.id === examButton.dataset.examId);
    if (exam.coming) {
      showToast(`${exam.name}は準備中です。公開時にお知らせします。`);
    } else {
      renderExamDetail(exam);
    }
  }

  const answerButton = event.target.closest("[data-answer]");
  if (answerButton && !answerButton.disabled) {
    selectedAnswer = Number(answerButton.dataset.answer);
    document.querySelectorAll("[data-answer]").forEach((button) => button.classList.remove("is-selected"));
    answerButton.classList.add("is-selected");
    document.querySelector("#answer-button").disabled = selectedConfidence === null;
  }

  const confidenceButton = event.target.closest("[data-confidence]");
  if (confidenceButton) {
    selectedConfidence = confidenceButton.dataset.confidence;
    document.querySelectorAll("[data-confidence]").forEach((button) => button.classList.remove("is-selected"));
    confidenceButton.classList.add("is-selected");
    document.querySelector("#answer-button").disabled = selectedAnswer === null;
  }
});

document.querySelector("#answer-button").addEventListener("click", () => {
  document.querySelectorAll("[data-answer]").forEach((button, index) => {
    button.disabled = true;
    if (index === 1) button.classList.add("is-correct");
    if (index === selectedAnswer && selectedAnswer !== 1) button.classList.add("is-wrong");
  });
  document.querySelector("#confidence-row").hidden = true;
  document.querySelector("#explanation").hidden = false;
  document.querySelector("#answer-button").hidden = true;
  document.querySelector("#next-button").hidden = false;
});

document.querySelector("#next-button").addEventListener("click", () => showView("dashboard"));

document.querySelectorAll("[data-category]").forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    document.querySelectorAll("[data-category]").forEach((item) => item.classList.toggle("is-active", item === button));
    renderExams();
  });
});

searchInput.addEventListener("input", renderExams);
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    showView("home");
    searchInput.focus();
    document.querySelector("#exam-finder").scrollIntoView({ behavior: "smooth" });
  }
});

renderExams();
