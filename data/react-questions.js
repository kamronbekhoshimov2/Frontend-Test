// ═══════════════════════════════════════════════
//  REACT BO'LIMI — SAVOLLAR VA JAVOBLAR
// ═══════════════════════════════════════════════

window.TOPIC_NAME      = "React";
window.TOPIC_COLOR     = "#4bf5b2";   // green/teal
window.TOPIC_QUESTIONS = [
  {
    question: "React da 'state' nima?",
    options: [
      "Komponentning doimiy ma'lumoti",
      "Komponentning o'zgaruvchan ichki holati",
      "Global o'zgaruvchi",
      "CSS klassi"
    ],
    correct: 1
  },
  {
    question: "useState hook qanday ishlaydi?",
    options: [
      "Faqat string qiymatlar uchun",
      "Holat o'zgarishini kuzatadi, lekin re-render qilmaydi",
      "[qiymat, setQiymat] ko'rinishida holat va uni o'zgartiruvchi funksiya qaytaradi",
      "Faqat class komponentlarda ishlaydi"
    ],
    correct: 2
  },
  {
    question: "useEffect hook nima uchun ishlatiladi?",
    options: [
      "Faqat API so'rovlari uchun",
      "Yon ta'sirlarni (side effects) boshqarish: API, subscription, DOM",
      "State o'zgartirish uchun",
      "Komponentni stillashtirish uchun"
    ],
    correct: 1
  },
  {
    question: "Props nima?",
    options: [
      "Komponentning ichki holati",
      "Global state",
      "CSS xususiyatlari",
      "Ota komponentdan farzand komponentga uzatiladigan ma'lumotlar"
    ],
    correct: 3
  },
  {
    question: "React da key xususiyati nima uchun muhim?",
    options: [
      "Stillashtirish uchun",
      "React ga ro'yxat elementlarini samarali yangilash uchun noyob identifikator beradi",
      "Eventlarni boshqarish uchun",
      "Props uzatish uchun"
    ],
    correct: 1
  },
  {
    question: "useCallback hook nima uchun ishlatiladi?",
    options: [
      "Qiymatni memoizatsiya qilish uchun",
      "Funksiyani memoizatsiya qilib, har re-render da qayta yaratilmasligini ta'minlash",
      "API chaqiruvi uchun",
      "State o'zgartirish uchun"
    ],
    correct: 1
  },
  {
    question: "React da conditional rendering qanday amalga oshiriladi?",
    options: [
      "Faqat if-else JSX tashqarisida",
      "&&, ternary operator yoki if-else — JSX ichida va tashqarisida",
      "Faqat switch-case bilan",
      "Faqat ternary operator bilan"
    ],
    correct: 1
  },
  {
    question: "Context API nima uchun ishlatiladi?",
    options: [
      "Faqat authentication uchun",
      "API so'rovlari uchun",
      "Prop drilling muammosini hal qilib, chuqur komponentlarga ma'lumot uzatish",
      "Komponent stilini global o'zgartirish"
    ],
    correct: 2
  },
  {
    question: "useMemo va useCallback ning farqi nima?",
    options: [
      "Hech qanday farq yo'q",
      "useMemo hisoblangan qiymat qaytaradi, useCallback memoizatsiya qilingan funksiya",
      "useCallback qiymat qaytaradi, useMemo funksiya",
      "Ikkalasi faqat class komponentlarda"
    ],
    correct: 1
  },
  {
    question: "React da ro'yxatni render qilishning to'g'ri usuli qaysi?",
    options: [
      "for loop to'g'ridan-to'g'ri JSX da",
      "array.forEach() orqali",
      "array.map() orqali JSX elementlar massivini qaytarish",
      "array.filter() orqali"
    ],
    correct: 2
  },
  {
    question: "React komponentida re-render qachon sodir bo'ladi?",
    options: [
      "Faqat props o'zgarganda",
      "Faqat state o'zgarganda",
      "State yoki props o'zgarganda, yoki ota komponent re-render bo'lganda",
      "Faqat sahifa yangilanganda"
    ],
    correct: 2
  },
  {
    question: "useEffect dagi cleanup funksiyasi nima uchun?",
    options: [
      "Komponentni o'chirish uchun",
      "State ni tozalash uchun",
      "Subscription, timer, event listener kabi resurslarni to'xtatish uchun",
      "CSS klasslarni o'chirish uchun"
    ],
    correct: 2
  }
];
