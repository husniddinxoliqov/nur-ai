# NurAI 🌟

> Ko'zi ojizlar uchun sun'iy intellektga asoslangan ta'lim va inklyuziv rivojlanish platformasi (Web App).

NurAI — ko'zi ojiz va ko'rish qobiliyati cheklangan insonlarga zamonaviy ta'lim olish, kasb o'rganish va jamiyatga integratsiyalashish imkoniyatini beruvchi innovatsion veb-platforma.

---

## 🎨 Dizayn

- **Navy (To'q ko'k)** — asosiy fon va tizimli qismlar
- **White (Oq)** — matnlar va yuqori kontrastli elementlar
- WCAG 2.1 AA standartiga muvofiq

---

## 🚀 Asosiy Modullar

| Modul | Tavsif |
|-------|--------|
| 🎓 **Smart Edu** | AI ovozli o'qituvchi, dars ro'yxati, TTS/STT yordamida Q&A chat |
| 💼 **Nur Freelance** | Kasbiy kurslar, jonli workshops, freelance ish bozori |
| 👥 **Nur Community** | Ijtimoiy lenta, a'zolar, ovozli xonalar |

---

## ♿ Maxsus imkoniyatlar

- 🔊 **TTS** — Web Speech API (`window.speechSynthesis`) yordamida barcha matn ovozga aylantiriladi
- 🎤 **STT** — `window.webkitSpeechRecognition` orqali ovozli savol berish va post yozish
- ⌨️ **Klaviatura navigatsiya** — `Alt+1/2/3` modullar o'rtasida, `Esc` TTS ni to'xtatadi
- 🔍 **Shrift kattaligi** — `A+` / `A−` tugmalari bilan sozlanadi va `localStorage` da saqlanadi
- 🌙 **Yuqori kontrast** — Navy + White kombinatsiyasi
- ♿ **ARIA** — screen reader uchun to'liq ARIA teglari va `role` atributlari

---

## 📁 Fayl tuzilmasi

```
nur-ai/
├── index.html               # Bosh sahifa
├── css/
│   └── style.css            # Global stil (Navy/White tema)
├── js/
│   ├── speech.js            # TTS/STT mexanizmi (Web Speech API)
│   └── app.js               # Shrift, navigatsiya, tab, keyboard shortcuts
└── pages/
    ├── smart-edu.html       # Smart Edu moduli
    ├── nur-freelance.html   # Nur Freelance moduli
    └── nur-community.html   # Nur Community moduli
```

---

## 🛠 Mahalliy muhitda ishga tushirish

```bash
# 1. Repozitoriyni yuklang
git clone https://github.com/husniddinxoliqov/nur-ai.git
cd nur-ai

# 2. index.html ni brauzerda oching
#    (VS Code Live Server, Python HTTP server yoki to'g'ridan-to'g'ri)
python3 -m http.server 8080
# → http://localhost:8080

# 3. Mikrofonga ruxsat bering va platformadan foydalaning
```

> **Eslatma:** TTS va STT `localhost` yoki `https://` da to'liq ishlaydi. Faylni to'g'ridan-to'g'ri `file://` orqali ochsangiz, STT ishlamasligi mumkin — lokal server ishlatish tavsiya etiladi.

---

## 🔑 Klaviatura yorliqlari

| Yorliq | Amal |
|--------|------|
| `Alt + 0` | Bosh sahifa |
| `Alt + 1` | Smart Edu |
| `Alt + 2` | Nur Freelance |
| `Alt + 3` | Nur Community |
| `Esc` | TTS ni to'xtatish |

---

## 🌐 Brauzer qo'llab-quvvatlash

| Brauzer | TTS | STT |
|---------|-----|-----|
| Chrome / Edge | ✅ | ✅ |
| Firefox | ✅ | ⚠️ Qisman |
| Safari | ✅ | ✅ |

---

*NurAI — "Nur" so'zi — yorug'lik demakdir. Har bir inson bilim nuri bilan hayotini yoritishi mumkin.*