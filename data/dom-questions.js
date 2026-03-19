// ═══════════════════════════════════════════════
//  JS DOM BO'LIMI — SAVOLLAR VA JAVOBLAR
// ═══════════════════════════════════════════════

window.TOPIC_NAME      = "JS DOM";
window.TOPIC_COLOR     = "#a78bfa";   // violet
window.TOPIC_QUESTIONS = [
  {
    question: "DOM nima?",
    options: [
      "Data Object Method",
      "Dynamic Output Module",
      "Document Object Model — HTML ni ob'ekt sifatida ifodalash",
      "Design Object Manager"
    ],
    correct: 2
  },
  {
    question: "ID bo'yicha element topish uchun qaysi metod ishlatiladi?",
    options: [
      "document.getElement('id')",
      "document.getElementById('id')",
      "document.find('#id')",
      "document.query('id')"
    ],
    correct: 1
  },
  {
    question: "Element matnini o'zgartirish uchun qaysi xususiyat ishlatiladi?",
    options: ["element.text", "element.value", "element.string", "element.textContent"],
    correct: 3
  },
  {
    question: "Tugma bosilganda ishlovchi funksiya qo'shish uchun qaysi metod?",
    options: [
      "element.onClick(fn)",
      "element.addEvent('click', fn)",
      "element.addEventListener('click', fn)",
      "element.on('click', fn)"
    ],
    correct: 2
  },
  {
    question: "Yangi HTML element yaratish uchun qaysi metod ishlatiladi?",
    options: [
      "document.newElement('div')",
      "document.addElement('div')",
      "new HTMLElement('div')",
      "document.createElement('div')"
    ],
    correct: 3
  },
  {
    question: "Elementga CSS klassi qo'shish uchun qaysi usul to'g'ri?",
    options: [
      "element.style.class = 'name'",
      "element.addClass('name')",
      "element.classList.add('name')",
      "element.className.push('name')"
    ],
    correct: 2
  },
  {
    question: "event.preventDefault() nima qiladi?",
    options: [
      "Eventni to'liq o'chiradi",
      "Elementni o'chiradi",
      "Boshqa eventlarni ham to'xtatadi",
      "Eventning standart xatti-harakatini bekor qiladi"
    ],
    correct: 3
  },
  {
    question: "querySelectorAll() qanday natija qaytaradi?",
    options: [
      "Bitta element",
      "NodeList (barcha mos elementlar)",
      "HTMLCollection",
      "Array"
    ],
    correct: 1
  },
  {
    question: "innerHTML va textContent ning asosiy farqi nima?",
    options: [
      "Hech qanday farq yo'q",
      "innerHTML HTML teglarini ham qabul qiladi, textContent faqat matn",
      "textContent HTML teglarini ham qabul qiladi",
      "innerHTML faqat bitta element uchun"
    ],
    correct: 1
  },
  {
    question: "Elementni DOM dan o'chirish uchun to'g'ri metod qaysi?",
    options: [
      "element.delete()",
      "document.remove(element)",
      "element.destroy()",
      "element.remove()"
    ],
    correct: 3
  },
  {
    question: "parentNode va parentElement farqi nima?",
    options: [
      "Hech qanday farq yo'q",
      "parentNode istalgan node qaytaradi, parentElement faqat Element turidagi ota",
      "parentElement istalgan node qaytaradi",
      "parentNode faqat div uchun ishlaydi"
    ],
    correct: 1
  },
  {
    question: "event.stopPropagation() nima qiladi?",
    options: [
      "Standart xatti-harakatni bekor qiladi",
      "Sahifani to'xtatadi",
      "Eventning yuqori elementlarga tarqalishini (bubbling) to'xtatadi",
      "Elementni o'chiradi"
    ],
    correct: 2
  }
];
