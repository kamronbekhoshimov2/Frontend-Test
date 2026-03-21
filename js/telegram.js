// ╔══════════════════════════════════════════════╗
// ║        TELEGRAM BOT KONFIGURATSIYASI         ║
// ║  Bu ma'lumotlarni o'zingiznikiga almashtiring ║
// ╚══════════════════════════════════════════════╝
const TELEGRAM_BOT_TOKEN = "8139948146:AAE4dlFU019RS2PJskOXgE4o3RNNw8vkAoU";
// Bir nechta chatlarga (start bosgan barcha foydalanuvchilar, guruh, kanal) yuborish uchun IDlarni ro'yxatga yozing.
// Masalan: ["12345", "67890", "-1001234567890"]
const TELEGRAM_CHAT_IDS = ["6562416815", "5826696977"];

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

  // Har bir chat ID uchun yuboramiz; hammasi muvaffaqiyatli bo'lsa true qaytadi.
  try {
    const results = await Promise.all(
      TELEGRAM_CHAT_IDS.map(async (chatId) => {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: msg,
            parse_mode: "Markdown",
          }),
        });
        const data = await res.json();
        if (!data.ok) {
          console.error(`Telegram xatosi (${chatId}):`, data.description);
        }
        return data.ok;
      }),
    );
    return results.every(Boolean);
  } catch (err) {
    console.error("Telegram xatosi:", err);
    return false;
  }
}
