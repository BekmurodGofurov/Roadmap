const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron')
const path = require('path')
const Database = require('better-sqlite3')

const dbPath = path.join(app.getPath('userData'), 'devpath.db')
let db
let mainWindow

function initDB() {
  db = new Database(dbPath)
  db.exec(`
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      start_date TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS day_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day_num INTEGER NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'done',
      minutes INTEGER DEFAULT 0,
      note TEXT DEFAULT '',
      completed_at TEXT DEFAULT (datetime('now'))
    );
  `)
}

function buildMenu() {
  const template = [
    {
      label: 'DevPath',
      submenu: [
        { label: 'DevPath haqida', role: 'about' },
        { type: 'separator' },
        { label: 'Yashirish', role: 'hide' },
        { label: 'Boshqalarni yashirish', role: 'hideOthers' },
        { label: 'Hammasini ko\'rsatish', role: 'unhide' },
        { type: 'separator' },
        { label: 'Chiqish', role: 'quit', accelerator: 'Cmd+Q' }
      ]
    },
    {
      label: 'Tahrirlash',
      submenu: [
        { label: 'Bekor qilish', role: 'undo' },
        { label: 'Qaytarish', role: 'redo' },
        { type: 'separator' },
        { label: 'Kesish', role: 'cut' },
        { label: 'Nusxa olish', role: 'copy' },
        { label: 'Joylashtirish', role: 'paste' },
        { label: 'Hammasini tanlash', role: 'selectAll' }
      ]
    },
    {
      label: 'Ko\'rinish',
      submenu: [
        { label: 'Yangilash', role: 'reload', accelerator: 'Cmd+R' },
        { label: 'Majburiy yangilash', role: 'forceReload', accelerator: 'Cmd+Shift+R' },
        { type: 'separator' },
        { label: 'Haqiqiy o\'lcham', role: 'resetZoom' },
        { label: 'Kattalashtirish', role: 'zoomIn' },
        { label: 'Kichraytirish', role: 'zoomOut' },
        { type: 'separator' },
        { label: 'To\'liq ekran', role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Oyna',
      submenu: [
        { label: 'Kichraytirish', role: 'minimize', accelerator: 'Cmd+M' },
        { label: 'Yopish', role: 'close', accelerator: 'Cmd+W' },
        { type: 'separator' },
        { label: 'Hammasini oldinga chiqarish', role: 'front' }
      ]
    }
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 860,
    minWidth: 1000,
    minHeight: 650,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#08080f',
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })
  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
}

app.setName('DevPath')

app.whenReady().then(() => {
  initDB()
  buildMenu()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// ── IPC HANDLERS ──

ipcMain.handle('get-user', () => {
  return db.prepare('SELECT * FROM user WHERE id = 1').get() || null
})

ipcMain.handle('set-user', (_, name) => {
  const exists = db.prepare('SELECT id FROM user WHERE id = 1').get()
  if (exists) {
    db.prepare('UPDATE user SET name = ? WHERE id = 1').run(name)
  } else {
    db.prepare('INSERT INTO user (id, name, start_date) VALUES (1, ?, ?)').run(name, new Date().toISOString())
  }
  return db.prepare('SELECT * FROM user WHERE id = 1').get()
})

ipcMain.handle('get-all-logs', () => {
  return db.prepare('SELECT * FROM day_log').all()
})

ipcMain.handle('complete-day', (_, { dayNum, minutes, note }) => {
  const exists = db.prepare('SELECT id FROM day_log WHERE day_num = ?').get(dayNum)
  if (exists) {
    db.prepare('UPDATE day_log SET minutes = ?, note = ?, completed_at = datetime("now") WHERE day_num = ?')
      .run(minutes || 0, note || '', dayNum)
  } else {
    db.prepare('INSERT INTO day_log (day_num, minutes, note) VALUES (?, ?, ?)')
      .run(dayNum, minutes || 0, note || '')
  }
  return { ok: true }
})

ipcMain.handle('undo-day', (_, dayNum) => {
  db.prepare('DELETE FROM day_log WHERE day_num = ?').run(dayNum)
  return { ok: true }
})

ipcMain.handle('get-stats', () => {
  const total = db.prepare('SELECT COUNT(*) as cnt FROM day_log').get().cnt
  const user = db.prepare('SELECT * FROM user WHERE id = 1').get()
  const logs = db.prepare('SELECT day_num, completed_at FROM day_log ORDER BY day_num').all()
  return { total, user, logs }
})

ipcMain.handle('update-dock-badge', (_, streak) => {
  if (process.platform === 'darwin') {
    app.dock.setBadge(streak > 0 ? String(streak) : '')
  }
  return { ok: true }
})

ipcMain.handle('open-external', (_, url) => {
  shell.openExternal(url)
  return { ok: true }
})
