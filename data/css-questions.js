// ═══════════════════════════════════════════════
//  CSS BO'LIMI — SAVOLLAR VA JAVOBLAR
// ═══════════════════════════════════════════════

window.TOPIC_NAME = "CSS";
window.TOPIC_COLOR = "#06b6d4"; // cyan
window.TOPIC_QUESTIONS = [
  {
    question:
      "CSS da elementni gorizontal markazga joylashtirish uchun flexbox da qaysi xususiyat ishlatiladi?",
    options: [
      "align-items: center",
      "justify-content: center",
      "text-align: flex",
      "center: horizontal",
    ],
    correct: 1,
  },
  {
    question: "CSS 'box model' to'g'ri tartibda qaysi?",
    options: [
      "Content → Margin → Border → Padding",
      "Content → Padding → Border → Margin",
      "Border → Content → Padding → Margin",
      "Margin → Border → Content → Padding",
    ],
    correct: 1,
  },
  {
    question: "CSS da eng yuqori specificity (ustuvorlik) qaysi?",
    options: [
      "element selector",
      "class selector",
      "id selector",
      "inline style",
    ],
    correct: 3,
  },
  {
    question: "position: absolute element qayerga nisbatan joylashadi?",
    options: [
      "Har doim sahifa boshiga nisbatan",
      "Eng yaqin positioned (relative/absolute/fixed) ota elementga nisbatan",
      "Faqat body ga nisbatan",
      "Qo'shni elementga nisbatan",
    ],
    correct: 1,
  },
  {
    question:
      "CSS Grid da 3 ta teng ustun yaratish uchun to'g'ri sintaksis qaysi?",
    options: [
      "grid-columns: 3",
      "columns: 3 equal",
      "grid-template-columns: repeat(3, 1fr)",
      "grid: 3fr",
    ],
    correct: 2,
  },
  {
    question: "z-index xususiyati qaysi elementlarda ishlaydi?",
    options: [
      "Har qanday elementda",
      "Faqat flex elementlarda",
      "Faqat position: static bo'lmagan elementlarda",
      "Faqat block elementlarda",
    ],
    correct: 2,
  },
  {
    question: "CSS da :nth-child(2n+1) pseudoklassi nimani tanlaydi?",
    options: [
      "Juft elementlarni",
      "Har 3-chi elementni",
      "2-chi elementni",
      "Toq elementlarni",
    ],
    correct: 3,
  },
  {
    question:
      "transition: all 0.3s ease-in-out da 'ease-in-out' nimani anglatadi?",
    options: [
      "Animatsiya davomiyligi",
      "Animatsiya kechikishi (delay)",
      "Vaqt funksiyasi (timing function)",
      "Animatsiya takrori",
    ],
    correct: 2,
  },
  {
    question:
      "CSS custom property (variable) to'g'ri e'lon qilish usuli qaysi?",
    options: [
      "var: --rang: red",
      "set --rang = red",
      "--rang: red (istalgan joyda)",
      ":root { --rang: red }",
    ],
    correct: 3,
  },
  {
    question: "display: none va visibility: hidden ning farqi nima?",
    options: [
      "Hech qanday farq yo'q",
      "display:none joyni egallaydi, visibility:hidden egallamaydi",
      "display:none joyni egallamaydi, visibility:hidden joy egallaydi",
      "Ikkalasi ham joyni egallaydi",
    ],
    correct: 2,
  },
  {
    question: "CSS da media query yozish to'g'ri sintaksisi qaysi?",
    options: [
      "@media-query (max-width: 768px) { }",
      "media(max-width: 768px) { }",
      "@screen (max-width: 768px) { }",
      "@media (max-width: 768px) { }",
    ],
    correct: 3,
  },
  {
    question:
      "Flexbox da elementlarni vertikal markazga joylashtirish uchun qaysi xususiyat ishlatiladi?",
    options: [
      "justify-content: center",
      "vertical-align: center",
      "align-items: center",
      "align-content: center",
    ],
    correct: 2,
  },
];
