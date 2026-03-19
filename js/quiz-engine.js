// ─── Quiz Engine ─────────────────────────────────────────────────────────────
// Barcha test sahifalari shu faylni ishlatadi.
// Har bir sahifa: TOPIC_NAME, TOPIC_QUESTIONS, TOPIC_COLOR o'zgaruvchilarini
// define qilishi kerak, keyin initQuiz() chaqiradi.

(function () {
  // ── Utility ──────────────────────────────────────────────────────────────
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const LETTERS = ["A", "B", "C", "D"];

  // ── State ─────────────────────────────────────────────────────────────────
  let state = {
    user: null,
    questions: [],
    current: 0,
    score: 0,
    wrongAnswers: [],
    startTime: null,
    timerInterval: null,
    seconds: 0,
    selectedIndex: null,
    answered: false,
  };

  // ── DOM helpers ───────────────────────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ── Pages ─────────────────────────────────────────────────────────────────
  function showPage(id) {
    $$(".page").forEach((p) => (p.style.display = "none"));
    const el = $(id);
    if (el) el.style.display = "";
  }

  // ── Registration ──────────────────────────────────────────────────────────
  function initRegistration() {
    const form = $("#reg-form");
    const btnStart = $("#btn-start");
    const inputs = $$(".reg-input");

    function checkInputs() {
      const filled = [...inputs].every((i) => i.value.trim().length >= 2);
      btnStart.disabled = !filled;
    }

    inputs.forEach((inp) => inp.addEventListener("input", checkInputs));
    checkInputs();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      state.user = {
        firstName: $("#inp-first").value.trim(),
        lastName: $("#inp-last").value.trim(),
        group: $("#inp-group").value.trim(),
      };
      startQuiz();
    });
  }

  // ── Start Quiz ────────────────────────────────────────────────────────────
  function startQuiz() {
    // Shuffle questions and options
    const raw = window.TOPIC_QUESTIONS || [];
    state.questions = shuffle(raw).map((q) => {
      // Shuffle options: keep track of correct answer text
      const correctText = q.options[q.correct];
      const shuffled = shuffle(q.options);
      return {
        ...q,
        shuffledOptions: shuffled,
        correctShuffledIndex: shuffled.indexOf(correctText),
      };
    });

    state.current = 0;
    state.score = 0;
    state.wrongAnswers = [];
    state.seconds = 0;
    state.startTime = Date.now();

    showPage("#page-quiz");
    renderQuestion();
    startTimer();
  }

  // ── Timer ─────────────────────────────────────────────────────────────────
  function startTimer() {
    clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
      state.seconds++;
      updateTimer();
    }, 1000);
  }

  function updateTimer() {
    const el = $("#quiz-timer");
    if (!el) return;
    const m = Math.floor(state.seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (state.seconds % 60).toString().padStart(2, "0");
    el.textContent = `⏱ ${m}:${s}`;
    if (state.seconds > 300) el.classList.add("urgent");
  }

  function getTimeTaken() {
    const m = Math.floor(state.seconds / 60);
    const s = state.seconds % 60;
    return m > 0 ? `${m} daqiqa ${s} soniya` : `${s} soniya`;
  }

  // ── Render Question ────────────────────────────────────────────────────────
  function renderQuestion() {
    const q = state.questions[state.current];
    const total = state.questions.length;

    // Header
    $("#q-user").textContent =
      `${state.user.firstName} ${state.user.lastName} · ${state.user.group}`;

    // Progress
    const pct = (state.current / total) * 100;
    $("#prog-fill").style.width = pct + "%";
    $("#prog-cur").textContent = state.current + 1;
    $("#prog-total").textContent = total;

    // Question
    $("#q-num").textContent = `Savol ${state.current + 1} / ${total}`;
    $("#q-text").textContent = q.question;

    // Options
    const list = $("#options-list");
    list.innerHTML = "";
    state.selectedIndex = null;
    state.answered = false;

    q.shuffledOptions.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "opt-btn";
      btn.dataset.idx = i;
      btn.innerHTML = `<span class="opt-letter">${LETTERS[i]}</span> ${opt}`;
      btn.addEventListener("click", () => selectOption(btn, i, q));
      list.appendChild(btn);
    });

    // Hide feedback
    const fb = $("#feedback-bar");
    fb.className = "feedback-bar";
    fb.textContent = "";
  }

  // ── Select Option ─────────────────────────────────────────────────────────
  function selectOption(btn, idx, q) {
    if (state.answered) return;

    // Clear previous selection
    $$(".opt-btn").forEach((b) => b.classList.remove("selected", "wrong"));
    btn.classList.add("selected");
    state.selectedIndex = idx;

    // Check answer
    if (idx === q.correctShuffledIndex) {
      // Correct!
      btn.classList.remove("selected");
      btn.classList.add("correct");
      state.score++;
      state.answered = true;

      // const fb = $("#feedback-bar");
      // fb.className = "feedback-bar ok show";
      // fb.textContent = "✅ To'g'ri! Keyingi savolga o'tilmoqda...";

      $$(".opt-btn").forEach((b) => (b.disabled = true));

      setTimeout(() => {
        state.current++;
        if (state.current < state.questions.length) {
          renderQuestion();
        } else {
          endQuiz();
        }
      }, 900);
    } else {
      // Wrong - lock all buttons, show correct answer, move on
      btn.classList.remove("selected");
      btn.classList.add("wrong");
      state.answered = true;

      // Disable all options immediately
      $$(".opt-btn").forEach((b) => (b.disabled = true));

      // Highlight the correct answer
      // $$(".opt-btn").forEach((b) => {
      //   if (parseInt(b.dataset.idx) === q.correctShuffledIndex) {
      //     b.classList.add("correct");
      //   }
      // });

      // const fb = $("#feedback-bar");
      // fb.className = "feedback-bar err show";
      // const correctText = q.shuffledOptions[q.correctShuffledIndex];
      // fb.textContent = `❌ Noto'g'ri! To'g'ri javob: "${correctText}"`;

      // Record wrong answer
      // state.wrongAnswers.push({
      //   question: q.question,
      //   correct: correctText,
      // });

      setTimeout(() => {
        state.current++;
        if (state.current < state.questions.length) {
          renderQuestion();
        } else {
          endQuiz();
        }
      }, 1800);
    }
  }

  // ── End Quiz ──────────────────────────────────────────────────────────────
  async function endQuiz() {
    clearInterval(state.timerInterval);

    const total = state.questions.length;
    const pct = Math.round((state.score / total) * 100);
    const time = getTimeTaken();
    const emoji = pct >= 90 ? "🏆" : pct >= 70 ? "🎉" : pct >= 50 ? "👍" : "😔";

    showPage("#page-result");

    $("#result-emoji").textContent = emoji;
    $("#result-pct").textContent = pct + "%";
    $("#result-score").textContent = `${state.score}/${total}`;
    $("#result-time").textContent = time;
    $("#result-wrong").textContent = state.wrongAnswers.length;

    const topicName = window.TOPIC_NAME || "Test";

    // Send to Telegram
    const tgStatus = $("#tg-status-text");
    const tgDot = $("#tg-dot");

    tgStatus.textContent = "Telegram ga yuborilmoqda...";

    const ok = await sendResultToTelegram(state.user, {
      topic: topicName,
      score: state.score,
      total: total,
      timeTaken: time,
      wrongAnswers: state.wrongAnswers,
    });

    if (ok) {
      tgDot.className = "tg-dot sent";
      tgStatus.textContent = "Natija Telegram ga yuborildi ✓";
    } else {
      tgDot.className = "tg-dot fail";
      tgStatus.textContent = "Telegram xatosi — token/chat_id ni tekshiring";
    }
  }

  // ── Public init ───────────────────────────────────────────────────────────
  window.initQuiz = function () {
    // Apply topic color
    if (window.TOPIC_COLOR) {
      document.documentElement.style.setProperty("--c", window.TOPIC_COLOR);
    }
    showPage("#page-reg");
    initRegistration();
  };
})();
