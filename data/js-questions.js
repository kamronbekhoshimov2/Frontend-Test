// ═══════════════════════════════════════════════
//  JAVASCRIPT BO'LIMI — SAVOLLAR VA JAVOBLAR
// ═══════════════════════════════════════════════

window.TOPIC_NAME      = "JavaScript";
window.TOPIC_COLOR     = "#f7c948";   // yellow
window.TOPIC_QUESTIONS = [
  {
    question: "JavaScript da typeof null qanday natija qaytaradi?",
    options: ['"null"', '"undefined"', '"object"', '"boolean"'],
    correct: 2
  },
  {
    question: "== va === operatorlari orasidagi asosiy farq nima?",
    options: [
      "Hech qanday farq yo'q",
      "== qat'iy, === yumshoq taqqoslaydi",
      "== yumshoq (type coercion bilan), === qat'iy taqqoslaydi",
      "=== faqat stringlar uchun ishlaydi"
    ],
    correct: 2
  },
  {
    question: "Arrow function va oddiy function ning asosiy farqi nima?",
    options: [
      "Arrow function tezroq ishlaydi",
      "Arrow function o'zining this kontekstiga ega emas",
      "Arrow function faqat bitta parametr qabul qiladi",
      "Hech qanday farq yo'q"
    ],
    correct: 1
  },
  {
    question: "Promise nima?",
    options: [
      "Sinxron operatsiya uchun ob'ekt",
      "Asinxron operatsiyaning kelajakdagi natijasini ifodalovchi ob'ekt",
      "Try-catch o'rniga ishlatiladi",
      "Faqat API so'rovlari uchun"
    ],
    correct: 1
  },
  {
    question: "let, const va var ning asosiy farqi nima?",
    options: [
      "Hech qanday farq yo'q",
      "var block scoped, let va const function scoped",
      "let va const block scoped, var function/global scoped; const qayta tayinlanmaydi",
      "const faqat raqamlar uchun"
    ],
    correct: 2
  },
  {
    question: "[1, 2, 3].map(x => x * 2) natijasi nima?",
    options: ["[1, 2, 3]", "[2, 4, 6]", "6", "undefined"],
    correct: 1
  },
  {
    question: "Closure (yopilma) nima?",
    options: [
      "Funksiyani yopish usuli",
      "Ichki funksiyaning tashqi funksiya o'zgaruvchilariga kirish imkoniyati",
      "try-catch bloki",
      "Object metodini o'chirish"
    ],
    correct: 1
  },
  {
    question: "async/await nima uchun ishlatiladi?",
    options: [
      "Faqat AJAX uchun",
      "Promise zanjirini sinxron ko'rinishida yozish uchun",
      "Loop larni tezlatish uchun",
      "setTimeout o'rnida"
    ],
    correct: 1
  },
  {
    question: "JSON.parse() va JSON.stringify() farqi nima?",
    options: [
      "Ikkalasi bir xil ishlaydi",
      "parse() JSON stringni JS ob'ektga, stringify() JS ob'ektni JSON stringga aylantiradi",
      "stringify() JSON stringni o'qiydi",
      "parse() faqat arraylar uchun"
    ],
    correct: 1
  },
  {
    question: "Spread operator (...) nima qiladi?",
    options: [
      "Ob'ektni o'chiradi",
      "Faqat funksiya parametrlari uchun",
      "Stringni arrayga aylantiradi",
      "Array yoki ob'ekt elementlarini yoyib chiqaradi"
    ],
    correct: 3
  },
  {
    question: "hoisting nima?",
    options: [
      "O'zgaruvchilarni saqlash usuli",
      "O'zgaruvchi va funksiya deklaratsiyalarining kod yuqorisiga ko'tarilishi",
      "Massivlarni tartibga solish",
      "Xatoliklarni boshqarish"
    ],
    correct: 1
  },
  {
    question: "Array.filter() metodi nima qaytaradi?",
    options: [
      "Bitta element",
      "Boolean qiymat",
      "Shartga mos elementlardan iborat yangi array",
      "Elementlar sonini"
    ],
    correct: 2
  }
];
