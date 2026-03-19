// ╔══════════════════════════════════════════════╗
// ║        TELEGRAM BOT KONFIGURATSIYASI         ║
// ║  Bu ma'lumotlarni o'zingiznikiga almashtiring ║
// ╚══════════════════════════════════════════════╝

const TELEGRAM_BOT_TOKEN = "8139948146:AAE4dlFU019RS2PJskOXgE4o3RNNw8vkAoU"; // @BotFather dan
const TELEGRAM_CHAT_ID = "6562416815"; // guruh yoki shaxsiy ID

// ─── Telegram ga yuborish funksiyasi ───────────────────────────────────────
async function sendResultToTelegram(userData, testResult) {
  const { firstName, lastName, group } = userData;
  const { topic, score, total, timeTaken, wrongAnswers } = testResult;

  const pct = Math.round((score / total) * 100);
  const grade =
    pct >= 90
      ? "A (Ajoyib) ⭐⭐⭐"
      : pct >= 75
        ? "B (Yaxshi) ⭐⭐"
        : pct >= 55
          ? "C (Qoniqarli) ⭐"
          : "F (Qoniqarsiz) ❌";

  const wrongList =
    wrongAnswers.length === 0
      ? "✅ Hammasi to'g'ri!"
      : wrongAnswers
          .map(
            (w, i) =>
              `${i + 1}. ❓ ${w.question}\n    ✅ To'g'ri javob: ${w.correct}`,
          )
          .join("\n");

  const msg = `
🎓 *FRONTEND TEST NATIJASI*
━━━━━━━━━━━━━━━━━━━━━━━

👤 *Ism:* ${firstName} ${lastName}
🏫 *Guruh:* ${group}
📚 *Bo'lim:* ${topic}

━━━━━━━━━━━━━━━━━━━━━━━
📊 *Ball:* ${score}/${total}
📈 *Foiz:* ${pct}%
🏆 *Baho:* ${grade}
⏱ *Vaqt:* ${timeTaken}
━━━━━━━━━━━━━━━━━━━━━━━
❌ *Noto'g'ri javoblar:*
${wrongList}
━━━━━━━━━━━━━━━━━━━━━━━
🕐 ${new Date().toLocaleString("uz-UZ")}
`.trim();

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: msg,
        parse_mode: "Markdown",
      }),
    });
    const data = await res.json();
    return data.ok;
  } catch (err) {
    console.error("Telegram xatosi:", err);
    return false;
  }
}
