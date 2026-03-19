# 🎓 Frontend Test Platformasi

Talabalar uchun HTML, CSS, JavaScript, JS DOM va React bo'yicha interaktiv test platformasi.

---

## 📁 Fayl Tuzilmasi

```
frontend-test-platform/
│
├── index.html              ← Bosh sahifa (5 ta bo'lim kartochkalari)
├── html-quiz.html          ← HTML testi
├── css-quiz.html           ← CSS testi
├── js-quiz.html            ← JavaScript testi
├── dom-quiz.html           ← JS DOM testi
├── react-quiz.html         ← React testi (HTML versiyasi)
│
├── css/
│   └── style.css           ← Barcha sahifalar uchun umumiy stil
│
├── js/
│   ├── telegram.js         ← Telegram bot integratsiyasi
│   └── quiz-engine.js      ← Test mexanizmi (shuffle, scoring, navigation)
│
├── data/
│   ├── html-questions.js   ← HTML savollari
│   ├── css-questions.js    ← CSS savollari
│   ├── js-questions.js     ← JavaScript savollari
│   ├── dom-questions.js    ← JS DOM savollari
│   └── react-questions.js  ← React savollari
│
└── react-quiz/             ← React loyihasi uchun komponentlar
    ├── ReactQuiz.jsx        ← Asosiy React komponenti
    └── react-questions-data.js ← React savollari (ES module)
```

---

## ⚙️ Sozlash (Telegram Bot)

### 1. Bot yarating
1. Telegramda **@BotFather** ni oching
2. `/newbot` buyrug'ini yuboring
3. Bot nomini kiriting (masalan: `Frontend Test Bot`)
4. Bot token oling: `7123456789:AAF...`

### 2. Chat ID oling
**Shaxsiy ID uchun:**
- @userinfobot ga xabar yuboring → ID ko'rinadi

**Guruh ID uchun:**
- Botni guruhga qo'shing
- `https://api.telegram.org/bot<TOKEN>/getUpdates` ni oching
- `"chat":{"id":...}` qiymatini oling (manfiy bo'lishi mumkin, masalan: `-1001234567890`)

### 3. `js/telegram.js` faylini tahrirlang

```javascript
const TELEGRAM_BOT_TOKEN = "7123456789:AAF_sizning_tokeningiz";
const TELEGRAM_CHAT_ID   = "-1001234567890";
```

---

## 🚀 Ishga tushirish

### Oddiy usul (Local)
Fayllarni brauzerda to'g'ridan-to'g'ri oching:
```
index.html → ikki marta bosing
```

> ⚠️ **Muhim:** Telegram API CORS tufayli `file://` protokolida ishlamasligi mumkin.
> Buning uchun lokal server ishlatish tavsiya etiladi.

### Live Server (VS Code)
1. **Live Server** kengaytmasini o'rnating
2. `index.html` ustida o'ng tugma → **Open with Live Server**

### Python HTTP Server
```bash
cd frontend-test-platform
python -m http.server 8080
# http://localhost:8080 ni oching
```

### Node.js (npx serve)
```bash
npx serve frontend-test-platform
```

---

## ✏️ Savol Qo'shish / O'zgartirish

`data/` papkasidagi tegishli faylni oching.
Har bir savol quyidagi formatda:

```javascript
{
  question: "Savol matni?",
  options: [
    "Variant A",   // index 0
    "Variant B",   // index 1
    "Variant C",   // index 2
    "Variant D"    // index 3
  ],
  correct: 1       // To'g'ri javob indeksi (0-3)
}
```

> ✅ Variantlar runtime da avtomatik aralashtiriladi (A,B,C,D random bo'ladi).

---

## 🔧 Test Mexanizmi Qoidalari

| Holat | Nima bo'ladi |
|-------|-------------|
| To'g'ri javob | Yashil rang, 0.9s kutib keyingi savolga o'tadi |
| Noto'g'ri javob | Qizil + silkinish animatsiyasi, qayta urinish mumkin |
| Test tugagach | Natija sahifasi + Telegram ga xabar |
| Savollar tartibi | Har safar random aralashtiriladi |
| Variant tartibi | Har safar random aralashtiriladi |

---

## 📊 Telegram Xabar Namunasi

```
🎓 FRONTEND TEST NATIJASI
━━━━━━━━━━━━━━━━━━━━━━━
👤 Ism: Jasur Toshmatov
🏫 Guruh: N11
📚 Bo'lim: JavaScript

━━━━━━━━━━━━━━━━━━━━━━━
📊 Ball: 10/12
📈 Foiz: 83%
🏆 Baho: B ⭐⭐
⏱ Vaqt: 4 daqiqa 23 soniya
━━━━━━━━━━━━━━━━━━━━━━━
❌ Noto'g'ri javoblar:
1. ❓ typeof null qanday natija beradi?
    ✅ To'g'ri: "object"
━━━━━━━━━━━━━━━━━━━━━━━
🕐 18/03/2026, 14:32:10
```

---

## ⚛️ React Komponenti (Alohida Loyiha)

`react-quiz/` papkasidagi fayllar React loyihasiga integratsiya uchun:

```jsx
// App.jsx
import ReactQuiz from "./react-quiz/ReactQuiz";

export default function App() {
  return <ReactQuiz />;
}
```

`react-questions-data.js` faylidagi savollarni tahrirlash mumkin.

---

## 🎨 Ranglar va Mavzu

Har bir bo'lim o'z rangiga ega:

| Bo'lim | Rang | HEX |
|--------|------|-----|
| HTML | 🟠 To'q sariq | `#f97316` |
| CSS | 🔵 Ko'k | `#06b6d4` |
| JavaScript | 🟡 Sariq | `#f7c948` |
| JS DOM | 🟣 Binafsha | `#a78bfa` |
| React | 🟢 Yashil | `#4bf5b2` |
