# DevPath — 90-Day Full Stack Developer Roadmap

> A personal desktop app to track your journey from zero to Full Stack Developer in 90 days.

![Electron](https://img.shields.io/badge/Electron-33-47848F?style=flat&logo=electron&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-better--sqlite3-003B57?style=flat&logo=sqlite&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey?style=flat)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## What is DevPath?

DevPath is a **personal offline desktop application** built with Electron that guides you through a structured 90-day learning plan to become a Full Stack Developer.

Every day you get a clear lesson across **3 parallel tracks** — no guessing what to study next.

---

## The 3 Tracks

Every single day has content for all three tracks simultaneously:

| Track | Topics |
|-------|--------|
| ⚡ **JS / React / Node** | JavaScript → React → Node.js → Express → TypeScript → Next.js |
| 🗄️ **SQL / Database** | DB Theory → SQL → PostgreSQL → Optimization → Advanced Queries |
| 🐧 **Linux / DevOps** | OS Basics → Terminal → SSH → Nginx → Docker → CI/CD → Cloud |

---

## Structure

```
90 Days
├── Month 1 (Days 1–28)   — JavaScript + React + DB Foundations
│   ├── Week 1  — Closures, Promises, async/await · DB Theory · Linux OS
│   ├── Week 2  — DOM, Events, Modules · SQL Queries · grep/find/pipes
│   ├── Week 3  — React Intro, Hooks · Subqueries, Window Fns · SSH
│   └── Week 4  — React Advanced, TypeScript · Indexes, Optimization · Nginx, Docker
│
├── Month 2 (Days 29–56)  — Node.js + Express + PostgreSQL + DevOps
│   ├── Week 5  — Node.js, Express, JWT Auth · Advanced SQL · PM2, Deploy
│   ├── Week 6  — WebSocket, Redis, Testing · Triggers, Partitioning · CI/CD, K8s
│   ├── Week 7  — Full Stack Integration · SQL Expert Level · Server Hardening
│   └── Week 8  — Capstone Project Build · Performance · Production Deploy
│
├── Month 3 (Days 57–84)  — Full Stack Mastery + Job Ready
│   ├── Week 9  — TypeScript Generics · Advanced PostgreSQL · Terraform
│   ├── Week 10 — tRPC, RSC, Monorepo · TimescaleDB, Kafka · AWS, Kubernetes
│   ├── Week 11 — Algorithms · Mock Interviews · First Job Applications
│   └── Week 12 — Final Polish · Portfolio Complete · Career Launch
│
└── Bonus (Days 85–90)    — Final Sprint + Day 90 Celebration 🏆
```

---

## Features

- **📍 Roadmap View** — 3 months → 12 weeks → 90 days, all navigable
- **3 Track Tabs** — switch between JS/React, SQL, Linux content per day
- **👁 Preview any day** — click any future day to see what's coming
- **✓ Mark Complete** — log time spent + notes for each day
- **🔥 Streak tracking** — keep your daily streak alive
- **📊 Dashboard** — progress bar, pace indicator, hours studied, activity heatmap
- **💾 Local SQLite** — all progress saved locally, no internet needed
- **🔒 Fully offline** — your data never leaves your machine

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop shell | Electron 33 |
| Database | better-sqlite3 (SQLite) |
| Frontend | Vanilla JS + HTML/CSS (no frameworks) |
| IPC | Electron contextBridge |

---

## Getting Started

### Prerequisites

- Node.js v18+ (recommended: v20 LTS)
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/devpath.git
cd devpath

# Install dependencies
npm install

# Rebuild native modules for Electron
npx electron-rebuild -f -w better-sqlite3

# Run the app
npm start
```

> **Note:** The `electron-rebuild` step is required because `better-sqlite3` is a native module that must be compiled specifically for Electron's Node.js version.

---

## Project Structure

```
devpath/
├── src/
│   ├── main/
│   │   ├── main.js          # Electron main process + SQLite DB
│   │   └── preload.js       # Secure IPC bridge (contextBridge)
│   ├── renderer/
│   │   ├── index.html       # App UI structure
│   │   ├── app.js           # All frontend logic
│   │   └── style.css        # Dark theme styles
│   └── data/
│       └── curriculum.js    # All 90 days of content
├── package.json
└── README.md
```

---

## Data Storage

Progress is saved to a local SQLite database at:

| Platform | Path |
|----------|------|
| macOS | `~/Library/Application Support/devpath-v2/devpath.db` |
| Windows | `%APPDATA%\devpath-v2\devpath.db` |
| Linux | `~/.config/devpath-v2/devpath.db` |

Two tables are used:

```sql
-- Stores the user's name and start date
CREATE TABLE user (
  id         INTEGER PRIMARY KEY,
  name       TEXT NOT NULL,
  start_date TEXT NOT NULL
);

-- Stores completion log for each day
CREATE TABLE day_log (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  day_num      INTEGER NOT NULL UNIQUE,
  status       TEXT NOT NULL DEFAULT 'done',
  minutes      INTEGER DEFAULT 0,
  note         TEXT DEFAULT '',
  completed_at TEXT DEFAULT (datetime('now'))
);
```

---

## Screenshots

> Add screenshots here after first run

| Start Screen | Dashboard | Day Detail |
|---|---|---|
| *(screenshot)* | *(screenshot)* | *(screenshot)* |

---

## Roadmap / Planned Features

- [ ] Export progress report as PDF
- [ ] Resource bookmark system
- [ ] Daily reminder notifications
- [ ] Progress sync via GitHub Gist (optional)
- [ ] Packaged `.dmg` / `.exe` releases

---

## License

MIT — use it however you want.

---

## About

Built by a developer for developers. This app exists because structured, daily, multi-track learning beats random YouTube tutorials every time.

> *"Every expert was once a beginner who showed up every day."*
