// ═══════════════════════════════════════════════
//  REACT BO'LIMI — SAVOLLAR VA JAVOBLAR
// ═══════════════════════════════════════════════

window.TOPIC_NAME = "React";
window.TOPIC_COLOR = "#4bf5b2"; // green/teal
window.TOPIC_QUESTIONS = [
  {
    question: "React nima?",
    options: [
      "Dasturlash tili",
      "Framework",
      "Ma'lumotlar bazasi",
      "JavaScript UI kutubxonasi (Library)",
    ],
    correct: 3,
  },
  {
    question: "React da Component nima?",
    options: [
      "CSS fayli",
      "Ma'lumotlar bazasi",
      "API",
      "UI ning qayta ishlatiladigan qismi",
    ],
    correct: 3,
  },
  {
    question: "React da 'state' nima?",
    options: [
      "CSS klassi",
      "HTML tegi",
      "Global o'zgaruvchi",
      "Komponentning o'zgaruvchan ichki holati",
    ],
    correct: 3,
  },
  {
    question: "Hook nima?",
    options: [
      "CSS xususiyati",
      "HTML atributi",
      "Ma'lumotlar bazasi so'rovi",
      "React funksional komponentlarida state va lifecycle ishlatish imkonini beruvchi funksiya",
    ],
    correct: 3,
  },
  {
    question: "useState hook nima qaytaradi?",
    options: [
      "Faqat string qiymatlar",
      "Faqat boolean qiymat",
      "Bitta qiymat",
      "[qiymat, setQiymat] — holat va uni o'zgartiruvchi funksiya",
    ],
    correct: 3,
  },
  {
    question: "useEffect hook nima uchun ishlatiladi?",
    options: [
      "Faqat API so'rovlari uchun",
      "State o'zgartirish uchun",
      "Komponentni stillashtirish uchun",
      "Yon ta'sirlarni (side effects) boshqarish: API, subscription, DOM",
    ],
    correct: 3,
  },
  {
    question: "Props nima?",
    options: [
      "Komponentning ichki holati",
      "Global state",
      "CSS xususiyatlari",
      "Ota komponentdan farzand komponentga uzatiladigan ma'lumotlar",
    ],
    correct: 3,
  },
  {
    question: "JSX nima?",
    options: [
      "CSS preprocessor",
      "Ma'lumotlar bazasi tili",
      "Alohida dasturlash tili",
      "JavaScript ichida HTML yozish imkonini beruvchi sintaksis",
    ],
    correct: 3,
  },
  {
    question: "React da click eventi qanday yoziladi?",
    options: [
      "click()",
      "addEvent('click')",
      "listen('click')",
      "onClick={handler}",
    ],
    correct: 3,
  },
  {
    question: "React da ro'yxatni render qilishning to'g'ri usuli qaysi?",
    options: [
      "for loop to'g'ridan-to'g'ri JSX da",
      "array.forEach() orqali",
      "array.filter() orqali",
      "array.map() orqali JSX elementlar massivini qaytarish",
    ],
    correct: 3,
  },
  {
    question: "React da key xususiyati nima uchun muhim?",
    options: [
      "Stillashtirish uchun",
      "Eventlarni boshqarish uchun",
      "Props uzatish uchun",
      "React ga ro'yxat elementlarini samarali yangilash uchun noyob identifikator beradi",
    ],
    correct: 3,
  },
  {
    question: "React da conditional rendering qanday amalga oshiriladi?",
    options: [
      "Faqat if-else JSX tashqarisida",
      "Faqat switch-case bilan",
      "Faqat ternary operator bilan",
      "&& , ternary operator yoki if-else — JSX ichida va tashqarisida",
    ],
    correct: 3,
  },
  {
    question: "Context API nima uchun ishlatiladi?",
    options: [
      "Faqat authentication uchun",
      "API so'rovlari uchun",
      "Komponent stilini global o'zgartirish uchun",
      "Prop drilling muammosini hal qilib, chuqur komponentlarga ma'lumot uzatish",
    ],
    correct: 3,
  },
  {
    question: "React Router nima uchun ishlatiladi?",
    options: [
      "API so'rovlari uchun",
      "State boshqarish uchun",
      "CSS stillashtirish uchun",
      "Sahifalar orasida navigatsiya qilish uchun",
    ],
    correct: 3,
  },
  {
    question: "useNavigate() hook nima qiladi?",
    options: [
      "Sahifani yangilaydi",
      "State o'zgartiradi",
      "API so'rov yuboradi",
      "Dasturiy ravishda boshqa sahifaga o'tkazadi",
    ],
    correct: 3,
  },
  {
    question: "React Fragment (<> </>) nima uchun ishlatiladi?",
    options: [
      "Stil berish uchun",
      "Event qo'shish uchun",
      "Props uzatish uchun",
      "Ortiqcha DOM elementi qo'shmasdan bir nechta elementni o'rash uchun",
    ],
    correct: 3,
  },
  {
    question: "useMemo va useCallback ning farqi nima?",
    options: [
      "Hech qanday farq yo'q",
      "useCallback qiymat qaytaradi, useMemo funksiya",
      "Ikkalasi faqat class komponentlarda ishlaydi",
      "useMemo hisoblangan qiymat, useCallback memoizatsiya qilingan funksiya qaytaradi",
    ],
    correct: 3,
  },
  {
    question: "React komponentida re-render qachon sodir bo'ladi?",
    options: [
      "Faqat props o'zgarganda",
      "Faqat state o'zgarganda",
      "Faqat sahifa yangilanganda",
      "State yoki props o'zgarganda, yoki ota komponent re-render bo'lganda",
    ],
    correct: 3,
  },
  {
    question: "useEffect dagi cleanup funksiyasi nima uchun?",
    options: [
      "Komponentni o'chirish uchun",
      "State ni tozalash uchun",
      "CSS klasslarni o'chirish uchun",
      "Subscription, timer, event listener kabi resurslarni to'xtatish uchun",
    ],
    correct: 3,
  },
  {
    question: "React loyiha yaratish uchun qaysi vositalar ishlatiladi?",
    options: [
      "CSS preprocessor",
      "HTML generator",
      "API client",
      "Vite yoki Create React App (CRA)",
    ],
    correct: 3,
  },
];
