# NurAI 🌟
> Ko'zi ojizlar uchun sun'iy intellektga asoslangan ta'lim va inklyuziv rivojlanish platformasi (Web App).

NurAI — ko'zi ojiz va ko'rish qobiliyati cheklangan insonlarga zamonaviy ta'lim olish, kasb o'rganish va jamiyatga integratsiyalashish imkoniyatini beruvchi innovatsion veb-platformadir.

---

## 🎨 Vizual Dizayn va Interfeys
Platforma dizayni ko'rishida qisman nuqsoni bor insonlar (low vision) uchun yuqori kontrast va qulaylikni ta'minlash maqsadida maxsus ranglar kombinatsiyasida ishlab chiqilgan:
* Navy (To'q ko'k): Asosiy fon va tizimli qismlar uchun.
* White (Oq): Matnlar va yuqori kontrastli elementlar uchun.

---

## 🚀 Asosiy Modullar (Funksiyalar)

### 1. 🎓 Smart Edu (Self-Study)
O'quvchilar darslarni to'liq mustaqil ravishda va masofadan o'rganishlari mumkin.
* AI Ovozli O'qituvchi: Dars materiallarini sun'iy intellekt yordamida o'qib eshittiradi.
* Interaktiv muloqot: Mikrofon orqali TTS (Text-to-Speech) va STT (Speech-to-Text) texnologiyalaridan foydalangan holda ovozli boshqaruv va savol-javob tizimi.

### 2. 💼 Nur Freelance
Ko'zi ojizlar uchun mo'ljallangan raqamli va intellektual kasblarni o'rgatish markazi.
* Kasbiy Ta'lim: Til o'rganish yoki boshqa mos keluvchi yo'nalishlar darslari.
* Workshops: Jonli yoki yozib olingan amaliy master-klasslar.
* Bandlik: O'quvchilar bilim olib, platformaning o'zida mustaqil ish (freelance) topishlari mumkin.

### 3. 👥 Nur Community
Yolg'izlikni yengish va fikr almashish maydoni.
* Foydalanuvchilar o'zlariga o'xshash insonlar bilan aloqa o'rnatishi, tajriba ulashishi va ovozli muloqot qilishi uchun ijtimoiy muhit.

---

## 🛠 Texnik qism va Demo API (Local Setup)

Loyiha hozirda Demo (MVP) versiyada bo'lib, mahalliy muhitda (local) sinovdan o'tkazish uchun mo'ljallangan. Bepul va barqaror ishlashi uchun quyidagi gibrid API yechimlaridan foydalaniladi:

* TTS uchun: Brauzer ichidagi bepul window.speechSynthesis (Web Speech API) yoki Microsoft Azure Free Tier.
* STT uchun: Brauzer ichidagi bepul window.webkitSpeechRecognition yoki OpenAI Whisper (Local).

### Mahalliy muhitda ishga tushirish (Installation):
1. Loyihani yuklab oling (Clone).
2. Mahalliy serverni yoqing (Lokal brauzer muhitida oching).
3. Mikrofonga ruxsat bering va Navy+White dizayndagi interfeys orqali platformadan foydalaning.
