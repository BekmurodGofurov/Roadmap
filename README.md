# DevPath — 90 Kunlik Full Stack Developer Yo'lxaritasi

> Shaxsiy offline desktop ilova — har kuni nima o'rganishni aniq ko'rsatib beradi.

![Electron](https://img.shields.io/badge/Electron-33-47848F?style=flat&logo=electron&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-better--sqlite3-003B57?style=flat&logo=sqlite&logoColor=white)
![macOS](https://img.shields.io/badge/macOS-arm64-000000?style=flat&logo=apple&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## ⬇️ Yuklab Olish (macOS)

> **Faqat Apple Silicon Mac uchun** (M1, M2, M3, M4 — 2020 yildan keyingi MacBook/iMac)

| Fayl | Tavsif |
|------|--------|
| [**DevPath-2.0.0-arm64.dmg**](https://github.com/BekmurodGofurov/Roadmap/releases/download/v2.0.0/DevPath-2.0.0-arm64.dmg) | O'rnatuvchi (tavsiya etiladi) |
| [DevPath-2.0.0-arm64-mac.zip](https://github.com/BekmurodGofurov/Roadmap/releases/download/v2.0.0/DevPath-2.0.0-arm64-mac.zip) | ZIP (to'g'ridan ishlatish) |

👉 Barcha versiyalar: [**Releases sahifasi**](https://github.com/BekmurodGofurov/Roadmap/releases)

---

## 🖥️ O'rnatish — Bosqichma-bosqich

### 1. DMG faylini oching

`.dmg` faylini yuklab olingach, uni ikki marta bosib oching.

### 2. Applications papkasiga suring

Ochilgan oynada **DevPath** ikonkasini **Applications** papkasiga sudrab olib boring:

```
[ DevPath.app ]  →→→  [ Applications ]
```

### 3. Birinchi marta ochish

macOS imzolanmagan dasturlarni bloklaydi. Birinchi safar quyidagicha oching:

> **DevPath.app ustiga o'ng tugma bosing → "Open" → "Open"**

Yoki:

> `System Settings → Privacy & Security → "Open Anyway"`

Keyingi safar oddiy ikki marta bosib ocha olasiz.

### 4. Launchpad yoki Spotlight orqali ishlatish

O'rnatilgandan keyin:
- **Launchpad**da DevPath ikonkasini toping
- Yoki `Cmd + Space` → `DevPath` deb yozing → `Enter`

---

## 🚀 Nima Qiladi?

DevPath — 90 kunlik strukturaviy o'rganish rejasini kuzatib boruvchi ilova. Har kuni **3 parallel yo'nalishda** aniq mavzu beriladi:

| Yo'nalish | Mavzular |
|-----------|----------|
| ⚡ **JS / React / Node** | JavaScript → React → Node.js → Express → TypeScript → Next.js |
| 🗄️ **SQL / Ma'lumotlar Bazasi** | Asoslar → SQL → PostgreSQL → Optimallashtirish |
| 🐧 **Linux / DevOps** | Terminal → SSH → Docker → CI/CD → Cloud |

---

## ✨ Imkoniyatlar

- **Yo'lxarita ko'rinishi** — 3 oy → 12 hafta → 90 kun, hammasiga kirish mumkin
- **Har kunlik kontent** — 3 yo'nalishda batafsil mavzular
- **Bajarish belgisi** — vaqt va eslatmalar bilan kun yakunlash
- **🔥 Streak** — ketma-ket kunlar soni dock ikonkasida ko'rinadi
- **📊 Dashboard** — progress bar, sur'at ko'rsatkichi, o'rganilgan soatlar, faollik xaritasi
- **💾 Lokal SQLite** — barcha ma'lumotlar qurilmangizda, internet shart emas
- **🔒 To'liq offline** — hech qanday server yo'q

---

## 🛠️ Developer uchun — Manba Koddan Ishlatish

### Talablar

- Node.js v18+ (v20 LTS tavsiya etiladi)
- npm

### O'rnatish

```bash
# Reponi klonlash
git clone https://github.com/BekmurodGofurov/Roadmap.git
cd Roadmap

# Paketlarni o'rnatish
npm install

# better-sqlite3 ni Electron uchun qayta kompilatsiya qilish
npm run rebuild

# Ilovani ishga tushirish
npm start
```

### Build qilish (macOS .dmg yaratish)

```bash
npm run build
# dist/ papkasida DevPath-2.0.0-arm64.dmg paydo bo'ladi
```

---

## 📁 Loyiha Tuzilmasi

```
road/
├── src/
│   ├── main/
│   │   ├── main.js          # Electron asosiy jarayon + SQLite DB + Menu bar
│   │   └── preload.js       # Xavfsiz IPC ko'prigi (contextBridge)
│   ├── renderer/
│   │   ├── index.html       # Ilova interfeysi
│   │   ├── app.js           # Barcha frontend logika
│   │   └── style.css        # Qorong'u mavzu stillari
│   └── data/
│       └── curriculum.js    # 90 kunlik kontent ma'lumotlari
├── assets/
│   └── icon.png             # Ilova ikonkasi (512×512)
├── build/
│   └── entitlements.mac.plist
└── package.json
```

---

## 💾 Ma'lumotlar Qayerda Saqlanadi?

| Platforma | Yo'l |
|-----------|------|
| macOS | `~/Library/Application Support/devpath-v2/devpath.db` |

---

## 📋 Texnologiyalar

| Qatlam | Texnologiya |
|--------|-------------|
| Desktop | Electron 33 |
| Ma'lumotlar Bazasi | better-sqlite3 (SQLite) |
| Frontend | Vanilla JS + HTML/CSS |
| IPC | Electron contextBridge |

---

## 📄 Litsenziya

MIT — xohlaganingizcha ishlating.

---

> *"Har bir expert har kuni keladigan yangi boshlovchi edi."*
