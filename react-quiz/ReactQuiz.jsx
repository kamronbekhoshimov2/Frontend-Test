// ╔══════════════════════════════════════════════════╗
// ║   React Test Komponenti (standalone JSX/TSX)     ║
// ║   Bu fayl React loyihasiga ko'chirish uchun      ║
// ╚══════════════════════════════════════════════════╝

import { useState, useEffect, useCallback, useRef } from "react";

// ─── Savollar import ────────────────────────────────────────────────────────
// Bu faylni o'z loyihangizga moslashtirib, savollarni import qiling:
import { REACT_QUESTIONS } from "./react-questions-data";

// ─── Telegram konfiguratsiyasi ──────────────────────────────────────────────
const BOT_TOKEN = "YOUR_BOT_TOKEN_HERE";
const CHAT_ID   = "YOUR_CHAT_ID_HERE";

// ─── Yordamchi funksiyalar ──────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

async function sendToTelegram(user, result) {
  const pct = Math.round((result.score / result.total) * 100);
  const grade = pct >= 90 ? "A ⭐⭐⭐" : pct >= 75 ? "B ⭐⭐" : pct >= 55 ? "C ⭐" : "F ❌";
  const wrongList = result.wrongAnswers.length === 0
    ? "✅ Hammasi to'g'ri!"
    : result.wrongAnswers.map((w, i) => `${i+1}. ❓ ${w.question}\n    ✅ ${w.correct}`).join("\n");

  const msg = `
🎓 *REACT TEST NATIJASI*
━━━━━━━━━━━━━━━━━━━━━━
👤 *Talaba:* ${user.firstName} ${user.lastName}
🏫 *Guruh:* ${user.group}
📚 *Bo'lim:* React
━━━━━━━━━━━━━━━━━━━━━━
📊 *Ball:* ${result.score}/${result.total}
📈 *Foiz:* ${pct}%
🏆 *Baho:* ${grade}
⏱ *Vaqt:* ${result.timeTaken}
━━━━━━━━━━━━━━━━━━━━━━
❌ *Noto'g'ri:*
${wrongList}
🕐 ${new Date().toLocaleString("uz-UZ")}
`.trim();

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: msg, parse_mode: "Markdown" }),
    });
    const data = await res.json();
    return data.ok;
  } catch {
    return false;
  }
}

// ─── Prepare questions (shuffle both order & options) ────────────────────────
function prepareQuestions(raw) {
  return shuffle(raw).map((q) => {
    const correctText = q.options[q.correct];
    const shuffled    = shuffle(q.options);
    return { ...q, shuffledOptions: shuffled, correctIdx: shuffled.indexOf(correctText) };
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SCREENS
// ═══════════════════════════════════════════════════════════════════════════════

// ── Registration Screen ───────────────────────────────────────────────────────
function RegistrationScreen({ onStart }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", group: "" });
  const valid = Object.values(form).every((v) => v.trim().length >= 2);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valid) onStart(form);
  };

  return (
    <div style={styles.regWrap}>
      <div style={styles.regCard}>
        <a href="index.html" style={styles.backLink}>← Orqaga</a>
        <span style={styles.badge}>⚛️ React Bo'limi</span>
        <h2 style={styles.h2}>Testni boshlash</h2>
        <p style={styles.sub}>Ma'lumotlaringizni kiriting. Natija Telegram ga yuboriladi.</p>

        <form onSubmit={handleSubmit}>
          {[
            { name: "firstName", label: "Ismingiz",     ph: "Jasur" },
            { name: "lastName",  label: "Familiyangiz", ph: "Toshmatov" },
            { name: "group",     label: "Guruhingiz",   ph: "N11" },
          ].map(({ name, label, ph }) => (
            <div key={name} style={styles.formGroup}>
              <label style={styles.label}>{label}</label>
              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={`Masalan: ${ph}`}
                style={styles.input}
                autoComplete="off"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={!valid}
            style={{ ...styles.btnStart, opacity: valid ? 1 : 0.4 }}
          >
            Testni Boshlash →
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Quiz Screen ───────────────────────────────────────────────────────────────
function QuizScreen({ user, questions, onFinish }) {
  const [current, setCurrent]       = useState(0);
  const [score, setScore]           = useState(0);
  const [wrongAnswers, setWrong]    = useState([]);
  const [seconds, setSeconds]       = useState(0);
  const [selected, setSelected]     = useState(null);   // index clicked
  const [wrongIdx, setWrongIdx]     = useState(null);   // shake animation
  const [feedback, setFeedback]     = useState(null);   // "ok" | "err"
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const q = questions[current];

  const handleOption = useCallback(
    (idx) => {
      if (selected !== null && selected === idx) return; // prevent double click

      if (idx === q.correctIdx) {
        setSelected(idx);
        setFeedback("ok");
        setScore((s) => s + 1);

        setTimeout(() => {
          setSelected(null);
          setWrongIdx(null);
          setFeedback(null);

          if (current + 1 < questions.length) {
            setCurrent((c) => c + 1);
          } else {
            clearInterval(timerRef.current);
            const m = Math.floor(seconds / 60);
            const s = seconds % 60;
            onFinish({
              score: score + 1,
              total: questions.length,
              timeTaken: m > 0 ? `${m} daqiqa ${s} soniya` : `${s} soniya`,
              wrongAnswers,
            });
          }
        }, 900);
      } else {
        // Wrong: lock all, show correct, move on after delay
        setWrongIdx(idx);
        setFeedback("err");
        setSelected(q.correctIdx); // highlight correct answer

        const correctText = q.shuffledOptions[q.correctIdx];
        setWrong((prev) => [
          ...prev,
          { question: q.question, correct: correctText }
        ]);

        setTimeout(() => {
          setSelected(null);
          setWrongIdx(null);
          setFeedback(null);

          if (current + 1 < questions.length) {
            setCurrent((c) => c + 1);
          } else {
            clearInterval(timerRef.current);
            const m = Math.floor(seconds / 60);
            const s = seconds % 60;
            onFinish({
              score,
              total: questions.length,
              timeTaken: m > 0 ? `${m} daqiqa ${s} soniya` : `${s} soniya`,
              wrongAnswers: [...wrongAnswers, { question: q.question, correct: correctText }],
            });
          }
        }, 1800);
      }
    },
    [current, q, score, seconds, questions, wrongAnswers, selected, onFinish]
  );

  const pct  = Math.round((current / questions.length) * 100);
  const isUrgent = seconds > 300;

  return (
    <div style={styles.quizWrap}>
      {/* Topbar */}
      <div style={styles.topbar}>
        <div>
          <div style={{ ...styles.topicLabel, color: "#4bf5b2" }}>⚛️ React Test</div>
          <div style={styles.userLabel}>{user.firstName} {user.lastName} · {user.group}</div>
        </div>
        <div style={{ ...styles.timer, ...(isUrgent ? styles.timerUrgent : {}) }}>
          ⏱ {formatTime(seconds)}
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={styles.progMeta}>
          <span>Savol <b>{current + 1}</b> / <b>{questions.length}</b></span>
          <span>{pct}%</span>
        </div>
        <div style={styles.progBar}>
          <div style={{ ...styles.progFill, width: pct + "%", background: "linear-gradient(90deg,#4bf5b2,#4f8ef7)" }} />
        </div>
      </div>

      {/* Question */}
      <div style={styles.qCard}>
        <div style={styles.qNum}>Savol {current + 1} / {questions.length}</div>
        <div style={styles.qText}>{q.question}</div>
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        {q.shuffledOptions.map((opt, i) => {
          const isCorrectShown = selected === i;
          const isWrong = wrongIdx === i;
          return (
            <button
              key={i}
              onClick={() => handleOption(i)}
              disabled={selected !== null}
              style={{
                ...styles.optBtn,
                ...(isCorrectShown ? styles.optCorrect : {}),
                ...(isWrong ? styles.optWrong : {}),
              }}
            >
              <span style={{
                ...styles.optLetter,
                ...(isCorrectShown ? { background: "#4bf5b2", color: "#07080d" } : {}),
                ...(isWrong ? { background: "#f74f6a", color: "#fff" } : {}),
              }}>
                {["A","B","C","D"][i]}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {feedback && (
        <div style={{ ...styles.feedbackBar, ...(feedback === "ok" ? styles.fbOk : styles.fbErr) }}>
          {feedback === "ok" ? "✅ To'g'ri! Keyingi savolga o'tilmoqda..." : `❌ Noto'g'ri! To'g'ri javob: "${q.shuffledOptions[q.correctIdx]}"`}
        </div>
      )}
    </div>
  );
}

// ── Result Screen ─────────────────────────────────────────────────────────────
function ResultScreen({ user, result }) {
  const [tgStatus, setTgStatus] = useState("sending"); // sending | sent | fail

  useEffect(() => {
    sendToTelegram(user, result).then((ok) =>
      setTgStatus(ok ? "sent" : "fail")
    );
  }, []);

  const pct   = Math.round((result.score / result.total) * 100);
  const emoji = pct >= 90 ? "🏆" : pct >= 70 ? "🎉" : pct >= 50 ? "👍" : "😔";
  const dotColor = tgStatus === "sending" ? "#f7c948" : tgStatus === "sent" ? "#4bf5b2" : "#f74f6a";
  const tgMsg = tgStatus === "sending" ? "Telegram ga yuborilmoqda..."
               : tgStatus === "sent"    ? "Natija Telegram ga yuborildi ✓"
               :                          "Telegram xatosi — token/chat_id ni tekshiring";

  return (
    <div style={styles.resultWrap}>
      <div style={styles.resultCard}>
        <div style={{ fontSize: "3.5rem", marginBottom: "0.8rem" }}>{emoji}</div>
        <div style={styles.resultPct}>{pct}%</div>
        <div style={styles.resultLbl}>React bo'limi natijasi</div>

        <div style={styles.statsGrid}>
          {[
            { val: `${result.score}/${result.total}`, key: "To'g'ri javob", color: "#4bf5b2" },
            { val: result.timeTaken,                   key: "Sarflangan vaqt", color: "#f7c948" },
            { val: result.wrongAnswers.length,          key: "Noto'g'ri", color: "#f74f6a" },
          ].map(({ val, key, color }) => (
            <div key={key} style={styles.statBox}>
              <div style={{ ...styles.statVal, color }}>{val}</div>
              <div style={styles.statKey}>{key}</div>
            </div>
          ))}
        </div>

        <div style={styles.tgStatus}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: dotColor, display: "inline-block" }} />
          <span>{tgMsg}</span>
        </div>

        <a href="index.html" style={styles.btnHome}>← Bosh sahifaga qaytish</a>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function ReactQuiz() {
  const [screen, setScreen]     = useState("reg");   // reg | quiz | result
  const [user, setUser]         = useState(null);
  const [questions, setQuestions] = useState([]);
  const [result, setResult]     = useState(null);

  const handleStart = (userData) => {
    setUser(userData);
    setQuestions(prepareQuestions(REACT_QUESTIONS));
    setScreen("quiz");
  };

  const handleFinish = (res) => {
    setResult(res);
    setScreen("result");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#07080d", color: "#e8ecf5", fontFamily: "'Outfit', sans-serif" }}>
      {screen === "reg"    && <RegistrationScreen onStart={handleStart} />}
      {screen === "quiz"   && <QuizScreen user={user} questions={questions} onFinish={handleFinish} />}
      {screen === "result" && <ResultScreen user={user} result={result} />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  INLINE STYLES
// ═══════════════════════════════════════════════════════════════════════════════
const styles = {
  regWrap: { minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem" },
  regCard: { background:"#0f1018",border:"1px solid #22253a",borderRadius:14,padding:"2.5rem",width:"100%",maxWidth:460 },
  backLink: { display:"inline-block",color:"#5a607a",textDecoration:"none",marginBottom:"1.4rem",fontSize:"0.88rem" },
  badge: { display:"inline-block",fontFamily:"monospace",fontSize:"0.7rem",textTransform:"uppercase",letterSpacing:"0.12em",color:"#4bf5b2",background:"rgba(75,245,178,0.08)",border:"1px solid rgba(75,245,178,0.2)",padding:"0.32rem 0.75rem",borderRadius:100,marginBottom:"1.1rem" },
  h2: { fontSize:"1.65rem",fontWeight:700,letterSpacing:"-0.02em",marginBottom:"0.35rem" },
  sub: { color:"#5a607a",fontSize:"0.88rem",marginBottom:"1.8rem",lineHeight:1.6 },
  formGroup: { marginBottom:"1rem" },
  label: { display:"block",fontSize:"0.8rem",fontWeight:600,color:"#5a607a",marginBottom:"0.4rem" },
  input: { width:"100%",background:"#181922",border:"1px solid #22253a",borderRadius:8,padding:"0.75rem 1rem",color:"#e8ecf5",fontFamily:"Outfit,sans-serif",fontSize:"0.96rem",outline:"none" },
  btnStart: { width:"100%",marginTop:"0.65rem",padding:"0.88rem",background:"#4bf5b2",color:"#07080d",fontFamily:"Outfit,sans-serif",fontSize:"1rem",fontWeight:700,border:"none",borderRadius:8,cursor:"pointer",transition:"opacity .2s" },

  quizWrap: { position:"relative",minHeight:"100vh",padding:"2rem 1.5rem",maxWidth:740,margin:"0 auto" },
  topbar: { display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.75rem",marginBottom:"1.8rem" },
  topicLabel: { fontFamily:"monospace",fontSize:"0.68rem",textTransform:"uppercase",letterSpacing:"0.12em" },
  userLabel: { fontSize:"0.83rem",color:"#5a607a" },
  timer: { fontFamily:"monospace",fontSize:"1rem",color:"#f7c948",background:"rgba(247,201,72,0.08)",border:"1px solid rgba(247,201,72,0.2)",padding:"0.36rem 0.82rem",borderRadius:8 },
  timerUrgent: { color:"#f74f6a",background:"rgba(247,79,106,0.08)",borderColor:"rgba(247,79,106,0.25)" },
  progMeta: { display:"flex",justifyContent:"space-between",fontFamily:"monospace",fontSize:"0.7rem",color:"#5a607a",marginBottom:"0.5rem" },
  progBar: { height:3,background:"#181922",borderRadius:100,overflow:"hidden" },
  progFill: { height:"100%",borderRadius:100,transition:"width .5s cubic-bezier(.4,0,.2,1)" },
  qCard: { background:"#0f1018",border:"1px solid #22253a",borderRadius:14,padding:"2rem",marginBottom:"1.25rem" },
  qNum: { fontFamily:"monospace",fontSize:"0.68rem",color:"#5a607a",marginBottom:"0.8rem" },
  qText: { fontSize:"1.12rem",fontWeight:600,lineHeight:1.5 },
  optBtn: { background:"#181922",border:"1px solid #22253a",borderRadius:8,padding:"0.88rem 1.1rem",color:"#e8ecf5",fontFamily:"Outfit,sans-serif",fontSize:"0.94rem",textAlign:"left",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.85rem",transition:"border-color .18s,background .18s" },
  optCorrect: { borderColor:"#4bf5b2",background:"rgba(75,245,178,0.08)" },
  optWrong: { borderColor:"#f74f6a",background:"rgba(247,79,106,0.08)" },
  optLetter: { minWidth:26,height:26,borderRadius:6,background:"#0f1018",border:"1px solid #2e3250",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:"0.7rem",fontWeight:700,color:"#5a607a",flexShrink:0 },
  feedbackBar: { padding:"0.68rem 1.1rem",borderRadius:8,fontSize:"0.86rem",fontWeight:600,marginTop:"0.7rem" },
  fbOk: { background:"rgba(75,245,178,0.1)",border:"1px solid rgba(75,245,178,0.2)",color:"#4bf5b2" },
  fbErr: { background:"rgba(247,79,106,0.1)",border:"1px solid rgba(247,79,106,0.2)",color:"#f98d9e" },

  resultWrap: { minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem" },
  resultCard: { background:"#0f1018",border:"1px solid #22253a",borderRadius:14,padding:"2.5rem 2rem",width:"100%",maxWidth:520,textAlign:"center" },
  resultPct: { fontSize:"4.8rem",fontWeight:800,fontFamily:"monospace",background:"linear-gradient(120deg,#4f8ef7,#4bf5b2)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1,marginBottom:"0.2rem" },
  resultLbl: { color:"#5a607a",fontSize:"0.88rem",marginBottom:"1.8rem" },
  statsGrid: { display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0.7rem",marginBottom:"1.6rem" },
  statBox: { background:"#181922",border:"1px solid #22253a",borderRadius:8,padding:"0.85rem 0.5rem" },
  statVal: { fontFamily:"monospace",fontSize:"1.35rem",fontWeight:700 },
  statKey: { fontSize:"0.7rem",color:"#5a607a",marginTop:"0.18rem" },
  tgStatus: { fontFamily:"monospace",fontSize:"0.76rem",color:"#5a607a",marginBottom:"1.4rem",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem" },
  btnHome: { display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.72rem 1.4rem",background:"#181922",border:"1px solid #2e3250",borderRadius:8,color:"#e8ecf5",textDecoration:"none",fontFamily:"Outfit,sans-serif",fontWeight:600 },
};
