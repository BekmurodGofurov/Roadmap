# DevPath — 90-Day Full Stack Developer Roadmap

> A personal offline desktop app that guides you through a structured 90-day journey to become a Full Stack Developer.

![Electron](https://img.shields.io/badge/Electron-33-47848F?style=flat&logo=electron&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-better--sqlite3-003B57?style=flat&logo=sqlite&logoColor=white)
![macOS](https://img.shields.io/badge/macOS-arm64-000000?style=flat&logo=apple&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## Download (macOS)

> **Apple Silicon only** — M1, M2, M3, M4 (MacBook / iMac from 2020 onwards)

| File | Description |
|------|-------------|
| [**DevPath-2.0.0-arm64.dmg**](https://github.com/BekmurodGofurov/Roadmap/releases/download/v2.0.0/DevPath-2.0.0-arm64.dmg) | Installer (recommended) |
| [DevPath-2.0.0-arm64-mac.zip](https://github.com/BekmurodGofurov/Roadmap/releases/download/v2.0.0/DevPath-2.0.0-arm64-mac.zip) | ZIP archive |

All releases: [**Releases page**](https://github.com/BekmurodGofurov/Roadmap/releases)

---

## Installation

### 1. Open the DMG

Double-click the downloaded `.dmg` file.

### 2. Drag to Applications

In the window that appears, drag **DevPath.app** into the **Applications** folder.

```
[ DevPath.app ]  →→→  [ Applications ]
```

### 3. First launch

macOS blocks apps from unidentified developers by default. To open it the first time:

> **Right-click DevPath.app → "Open" → "Open"**

Or go to:

> `System Settings → Privacy & Security → Open Anyway`

After that, you can open it normally with a double-click.

### 4. Launch from Spotlight or Launchpad

- Press `Cmd + Space`, type `DevPath`, hit `Enter`
- Or find it in **Launchpad**

---

## What is DevPath?

DevPath tracks your 90-day learning plan across **3 parallel tracks** — every day has a clear goal, no guessing what to study next.

| Track | Topics |
|-------|--------|
| ⚡ **JS / React / Node** | JavaScript → React → Node.js → Express → TypeScript → Next.js |
| 🗄️ **SQL / Database** | Fundamentals → SQL → PostgreSQL → Optimization |
| 🐧 **Linux / DevOps** | Terminal → SSH → Docker → CI/CD → Cloud |

---

## Features

- **Roadmap view** — 3 months → 12 weeks → 90 days, fully navigable
- **3 track tabs** — switch between JS/React, SQL, and Linux content per day
- **Preview any day** — click any future day to see what's coming
- **Mark complete** — log time spent and notes for each day
- **🔥 Streak tracking** — streak count shown on the dock icon
- **📊 Dashboard** — progress bar, pace indicator, hours studied, activity heatmap
- **Local SQLite** — all progress saved on your machine, no internet required
- **Fully offline** — your data never leaves your device

---

## Running from Source

### Prerequisites

- Node.js v18+ (v20 LTS recommended)
- npm

### Setup

```bash
git clone https://github.com/BekmurodGofurov/Roadmap.git
cd Roadmap

npm install
npm run rebuild
npm start
```

> `npm run rebuild` is required because `better-sqlite3` is a native module that must be compiled for Electron's Node.js version.

### Build macOS app

```bash
npm run build
# Creates dist/DevPath-2.0.0-arm64.dmg
```

---

## Project Structure

```
road/
├── src/
│   ├── main/
│   │   ├── main.js          # Electron main process, SQLite, menu bar
│   │   └── preload.js       # Secure IPC bridge (contextBridge)
│   ├── renderer/
│   │   ├── index.html       # App UI
│   │   ├── app.js           # Frontend logic
│   │   └── style.css        # Dark theme styles
│   └── data/
│       └── curriculum.js    # 90-day curriculum content
├── assets/
│   └── icon.png             # App icon (512×512)
└── package.json
```

---

## Data Storage

| Platform | Path |
|----------|------|
| macOS | `~/Library/Application Support/devpath-v2/devpath.db` |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Desktop shell | Electron 33 |
| Database | better-sqlite3 (SQLite) |
| Frontend | Vanilla JS + HTML/CSS |
| IPC | Electron contextBridge |

---

## License

MIT — use it however you want.

---

> *"Every expert was once a beginner who showed up every day."*
