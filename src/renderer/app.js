// ═══════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════
let G = {
  user: null,
  logs: {},
  selMonth: null,
  selWeek: null,
  activeTrack: 'main'
}

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════
async function init() {
  G.user = await window.db.getUser()
  await loadLogs()
  if (G.user) { showApp() }
  else { document.getElementById('screen-start').classList.add('active') }
}

async function loadLogs() {
  const rows = await window.db.getAllLogs()
  G.logs = {}
  rows.forEach(r => { G.logs[r.day_num] = r })
}

async function startApp() {
  const name = document.getElementById('inp-name').value.trim()
  if (!name) { document.getElementById('inp-name').focus(); return }
  G.user = await window.db.setUser(name)
  showApp()
}

function showApp() {
  document.getElementById('screen-start').classList.remove('active')
  document.getElementById('screen-app').classList.add('active')
  renderAll()
}

// ═══════════════════════════════════════════
// COMPUTED
// ═══════════════════════════════════════════
function todayNum() {
  if (!G.user?.start_date) return 1
  const diff = Math.floor((Date.now() - new Date(G.user.start_date)) / 86400000)
  return Math.min(Math.max(diff + 1, 1), 90)
}
function doneCnt() { return Object.keys(G.logs).length }
function calcStreak() {
  let s = 0, d = todayNum()
  while (d >= 1 && G.logs[d]) { s++; d-- }
  return s
}
function calcPace() {
  const t = todayNum(), done = doneCnt(), exp = t - 1
  if (exp <= 0) return 100
  return Math.round(done / exp * 100)
}
function totalMinutes() {
  return Object.values(G.logs).reduce((s, l) => s + (l.minutes || 0), 0)
}

function getDayInfo(dayNum) {
  for (const m of CURRICULUM) {
    for (const w of m.weeks) {
      for (const d of w.days) {
        if (d.day === dayNum) return { m, w, d }
      }
    }
  }
  const bonus = BONUS_DAYS.find(b => b.day === dayNum)
  if (bonus) {
    return {
      m: { month: 3, title: 'Bonus & Deep Dive', color: '#5bf5a8' },
      w: { week: Math.ceil((dayNum - 63) / 7) + 9, title: 'Bonus Days' },
      d: bonus
    }
  }
  return null
}

// ═══════════════════════════════════════════
// RENDER ALL
// ═══════════════════════════════════════════
function renderAll() {
  renderTopbar()
  renderRoadmap()
  renderDashboard()
}

function renderTopbar() {
  const today = todayNum(), streak = calcStreak(), left = Math.max(0, 90 - today + 1)
  document.getElementById('tbar-name').textContent = G.user?.name || ''
  document.getElementById('tbar-day').textContent = `• Day ${today}`
  document.getElementById('tbar-streak').textContent = `🔥 ${streak}`
  document.getElementById('tbar-left').textContent = `${left} days left`
}

// ═══════════════════════════════════════════
// TRACK SWITCH
// ═══════════════════════════════════════════
function setTrack(track) {
  G.activeTrack = track
  document.querySelectorAll('.track-btn').forEach(b => b.classList.remove('active'))
  document.querySelector(`.track-btn[data-track="${track}"]`)?.classList.add('active')
  if (G.selWeek) renderDays()
}

// ═══════════════════════════════════════════
// ROADMAP
// ═══════════════════════════════════════════
function renderRoadmap() {
  renderMonths()
  if (G.selMonth) renderWeeks()
  if (G.selWeek) renderDays()
}

function renderMonths() {
  const el = document.getElementById('months-row')
  el.innerHTML = ''
  CURRICULUM.forEach(m => {
    const total = m.weeks.reduce((s, w) => s + w.days.length, 0)
    const done  = m.weeks.reduce((s, w) => s + w.days.filter(d => G.logs[d.day]).length, 0)
    const pct   = Math.round(done / total * 100)
    const isSel = G.selMonth === m.month
    const c = document.createElement('div')
    c.className = 'month-card' + (isSel ? ' sel' : '')
    c.style.setProperty('--mc', m.color)
    c.innerHTML = `
      <div class="m-head">
        <div class="m-num" style="background:${m.color}18;color:${m.color}">${m.month}</div>
        <div class="m-info">
          <div class="m-title">${m.title}</div>
          <div class="m-focus">${m.focus}</div>
        </div>
        <div class="m-pct" style="color:${m.color}">${pct}%</div>
      </div>
      <div class="m-bar"><div class="m-bar-fill" style="width:${pct}%;background:${m.color}"></div></div>
      <div class="m-topics">
        ${m.topics.map(t => `<div class="m-topic"><div class="m-dot" style="background:${m.color}"></div>${t}</div>`).join('')}
      </div>`
    c.onclick = () => {
      G.selMonth = isSel ? null : m.month
      G.selWeek = null
      renderRoadmap()
      updateVisibility()
    }
    el.appendChild(c)
  })
}

function updateVisibility() {
  document.getElementById('weeks-row').style.display = G.selMonth ? 'block' : 'none'
  document.getElementById('days-grid').style.display = G.selWeek ? 'grid' : 'none'
}

function renderWeeks() {
  const el = document.getElementById('weeks-row')
  el.style.display = 'block'
  const month = CURRICULUM.find(m => m.month === G.selMonth)
  if (!month) return
  el.innerHTML = '<div class="weeks-inner">' +
    month.weeks.map(w => {
      const done = w.days.filter(d => G.logs[d.day]).length
      const pct  = Math.round(done / w.days.length * 100)
      const isSel = G.selWeek === w.week
      return `<div class="week-card${isSel?' sel':''}" style="--wc:${month.color}" onclick="selectWeek(${w.week})">
        <div class="wk-num">WEEK ${w.week}</div>
        <div class="wk-title">${w.title}</div>
        <div class="wk-focus">${w.focus}</div>
        <div class="wk-stat" style="color:${pct===100?'var(--m3)':'var(--text3)'}">${done}/${w.days.length} · ${pct}%</div>
      </div>`
    }).join('') + '</div>'
}

function selectWeek(weekId) {
  G.selWeek = G.selWeek === weekId ? null : weekId
  renderWeeks()
  if (G.selWeek) renderDays()
  else document.getElementById('days-grid').style.display = 'none'
}

function renderDays() {
  const el = document.getElementById('days-grid')
  el.style.display = 'grid'
  const month = CURRICULUM.find(m => m.month === G.selMonth)
  const week  = month?.weeks.find(w => w.week === G.selWeek)
  if (!week) return
  const today = todayNum()
  const track = G.activeTrack

  el.innerHTML = week.days.map(d => {
    const isDone    = !!G.logs[d.day]
    const isToday   = d.day === today
    const isMissed  = d.day < today && !isDone
    const isFuture  = d.day > today

    const cls = ['day-card',
      isDone   ? 'is-done'   : '',
      isToday  ? 'is-today'  : '',
      isMissed ? 'is-missed' : '',
      isFuture ? 'is-future' : ''
    ].filter(Boolean).join(' ')

    // Status badge
    const statusHtml = isDone
      ? '<div class="dk-status st-done">✓ Done</div>'
      : isToday
        ? '<div class="dk-status st-today">● Today</div>'
        : isMissed
          ? '<div class="dk-status st-missed">✗ Missed</div>'
          : `<div class="dk-status st-upcoming">Day ${d.day}</div>`

    const trackTitle = d.tracks ? (d.tracks[track]?.title || d.tracks.main?.title || '') : (d.title || '')

    // ALL days are clickable — future days show preview (read-only)
    return `<div class="${cls}" style="--dc:${month.color}" onclick="openDay(${d.day})">
      <div class="dk-num">DAY ${d.day}</div>
      <div class="dk-title">${trackTitle}</div>
      ${statusHtml}
      ${isFuture ? '<div class="dk-preview-icon">👁</div>' : ''}
    </div>`
  }).join('')

  setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
}

// ═══════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════
function renderDashboard() {
  const today = todayNum(), done = doneCnt(), streak = calcStreak()
  const pace = calcPace(), mins = totalMinutes()
  const left = Math.max(0, 90 - today + 1)
  const pct = Math.round(done / 90 * 100)

  document.getElementById('s-done').textContent = done
  document.getElementById('s-done-sub').textContent = `${90 - done} days left`
  document.getElementById('s-streak').textContent = streak
  document.getElementById('s-today').textContent = today
  document.getElementById('s-today-sub').textContent = G.logs[today] ? '✓ Done' : 'Not done'
  document.getElementById('s-pace').textContent = pace + '%'
  document.getElementById('s-hours').textContent = Math.round(mins / 60)
  document.getElementById('s-left').textContent = left

  const chipEl = document.getElementById('s-pace-chip')
  if (pace >= 100) chipEl.innerHTML = '<span class="chip chip-ahead">▲ AHEAD</span>'
  else if (pace >= 80) chipEl.innerHTML = '<span class="chip chip-ontime">● ON TRACK</span>'
  else if (today > 1) chipEl.innerHTML = '<span class="chip chip-behind">▼ BEHIND</span>'
  else chipEl.innerHTML = ''

  document.getElementById('prog-num').textContent = `${done} / 90 days completed`
  document.getElementById('prog-fill').style.width = pct + '%'
  document.getElementById('prog-marker').style.left = ((today - 1) / 90 * 100) + '%'

  // Heatmap — ALL cells clickable
  const hm = document.getElementById('heatmap')
  hm.innerHTML = ''
  for (let d = 1; d <= 90; d++) {
    const cell = document.createElement('div')
    const cls = d===today ? 'today' : G.logs[d] ? 'done' : d<today ? 'missed' : 'future'
    cell.className = `hm ${cls}`
    cell.title = `Day ${d}`
    cell.onclick = () => openDay(d)   // ALL days clickable
    hm.appendChild(cell)
  }
}

// ═══════════════════════════════════════════
// DAY MODAL — 3 TRACKS — ALL DAYS OPENABLE
// ═══════════════════════════════════════════
const TRACK_LABELS = {
  main:  '⚡ JS / React / Node',
  sql:   '🗄️ SQL / Database',
  linux: '🐧 Linux / DevOps'
}
const TRACK_COLORS = { main: '#5b6ef5', sql: '#f5825b', linux: '#5bf5a8' }

function buildTrackContent(d, trackKey) {
  const t = d.tracks?.[trackKey] || {}
  const title     = t.title     || ''
  const what      = t.what      || ''
  const learn     = t.learn     || []
  const resources = t.resources || []
  const practice  = t.practice  || []

  const whatHtml = what
    ? `<div class="ms">
        <div class="ms-title">About this lesson</div>
        <div class="what-box">${what}</div>
      </div>` : ''

  const learnHtml = learn.length
    ? `<div class="ms">
        <div class="ms-title">What you'll learn</div>
        <div class="learn-list">
          ${learn.map(l => `<div class="learn-item"><span class="learn-icon">▸</span><span>${l}</span></div>`).join('')}
        </div>
      </div>` : ''

  const resHtml = resources.length
    ? `<div class="ms">
        <div class="ms-title">Resources</div>
        <div class="res-list">
          ${resources.map(r => `
            <div class="res-item" data-url="${r.url || ''}">
              <span>${r.type === 'watch' ? '🎬' : '📖'}</span>
              <span class="res-name">${r.name}</span>
              ${r.url ? '<span class="res-arrow">→ open</span>' : ''}
            </div>`).join('')}
        </div>
      </div>` : ''

  const pracHtml = practice.length
    ? `<div class="ms">
        <div class="ms-title">Practice tasks</div>
        <div class="prac-list">
          ${practice.map((p, i) => `
            <div class="prac-item">
              <span class="prac-num">${i + 1}.</span>
              <span>${p}</span>
            </div>`).join('')}
        </div>
      </div>` : ''

  return `
    <div class="track-header" style="color:${TRACK_COLORS[trackKey]}">${title}</div>
    ${whatHtml}${learnHtml}${resHtml}${pracHtml}`
}

function attachResLinks(container) {
  container.querySelectorAll('.res-item').forEach(el => {
    const url = el.dataset.url
    if (url) {
      el.style.cursor = 'pointer'
      el.onclick = () => {
        try { require('electron').shell.openExternal(url) }
        catch(e) { window.open(url, '_blank') }
      }
    }
  })
}

function openDay(dayNum) {
  const info = getDayInfo(dayNum)
  if (!info) return
  const { m, w, d } = info
  const today    = todayNum()
  const isDone   = !!G.logs[dayNum]
  const isFuture = dayNum > today
  const isToday  = dayNum === today
  const log      = G.logs[dayNum]
  const modal    = document.getElementById('modal')
  const activeTrack = G.activeTrack

  // Status banner
  let statusBanner = ''
  if (isFuture) {
    statusBanner = `<div class="status-banner banner-future">
      👁 Preview — Day ${dayNum} · ${dayNum - today} day${dayNum - today !== 1 ? 's' : ''} from now
    </div>`
  } else if (isDone) {
    statusBanner = `<div class="status-banner banner-done">
      ✓ Completed${log.completed_at ? ' — ' + log.completed_at.slice(0,10) : ''}
      ${log.minutes ? ` · ⏱ ${log.minutes} min` : ''}
      ${log.note ? `<br>📝 "${log.note}"` : ''}
    </div>`
  } else if (isToday) {
    statusBanner = `<div class="status-banner banner-today">● Today's lesson</div>`
  } else {
    statusBanner = `<div class="status-banner banner-missed">✗ Missed — Day ${dayNum}</div>`
  }

  // Complete / undo section (only for today and past days)
  let actionHtml = ''
  if (isDone) {
    actionHtml = `
      <div class="modal-footer">
        <div class="ms-title">Mark as done</div>
        <div class="done-box">
          ✓ Completed${log.completed_at ? ' — ' + log.completed_at.slice(0,10) : ''}
          ${log.minutes ? `<br>⏱ ${log.minutes} minutes studied` : ''}
          ${log.note ? `<br>📝 "${log.note}"` : ''}
          <br><br>
          <button class="undo-btn" onclick="undoDay(${dayNum})">↩ Undo</button>
        </div>
      </div>`
  } else if (!isFuture) {
    actionHtml = `
      <div class="modal-footer">
        <div class="ms-title">Mark as done</div>
        <div class="complete-box">
          <label>NOTE (optional)</label>
          <textarea class="comp-textarea" id="comp-note" placeholder="What did I learn today? Any challenges?"></textarea>
          <div class="comp-row">
            <input type="number" class="comp-min" id="comp-min" placeholder="60" min="1" max="600">
            <span class="comp-lbl">minutes</span>
            <button class="comp-btn" onclick="completeDay(${dayNum})">✓ Mark Complete</button>
          </div>
        </div>
      </div>`
  }

  modal.innerHTML = `
    <div class="modal-head">
      <div class="mh-badge" style="background:${m.color}18;color:${m.color}">${dayNum}</div>
      <div style="flex:1">
        <div class="mh-title">Day ${dayNum}</div>
        <div class="mh-sub">Month ${m.month} · Week ${w.week} · ${m.title}</div>
      </div>
      <button class="mh-close" onclick="closeModal()">✕</button>
    </div>

    ${statusBanner}

    <div class="modal-tracks">
      ${['main','sql','linux'].map(tk => `
        <button class="modal-track-btn${tk === activeTrack ? ' active' : ''}"
          style="--tc:${TRACK_COLORS[tk]}"
          onclick="switchModalTrack('${tk}', this)">
          ${TRACK_LABELS[tk]}
        </button>`).join('')}
    </div>

    <div class="modal-body" id="modal-body-content">
      ${buildTrackContent(d, activeTrack)}
    </div>

    ${actionHtml}`

  modal._d = d
  attachResLinks(modal)
  document.getElementById('overlay').classList.add('open')
}

function switchModalTrack(trackKey, btn) {
  const modal = document.getElementById('modal')
  G.activeTrack = trackKey
  modal.querySelectorAll('.modal-track-btn').forEach(b => b.classList.remove('active'))
  btn.classList.add('active')
  document.getElementById('modal-body-content').innerHTML = buildTrackContent(modal._d, trackKey)
  attachResLinks(modal)
}

function closeModal() {
  document.getElementById('overlay').classList.remove('open')
}

function overlayClick(e) {
  if (e.target === document.getElementById('overlay')) closeModal()
}

async function completeDay(dayNum) {
  const note = document.getElementById('comp-note')?.value?.trim() || ''
  const mins = parseInt(document.getElementById('comp-min')?.value) || 0
  await window.db.completeDay({ dayNum, minutes: mins, note })
  await loadLogs()
  closeModal()
  renderAll()
}

async function undoDay(dayNum) {
  await window.db.undoDay(dayNum)
  await loadLogs()
  closeModal()
  renderAll()
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal() })

init()
