// Ikonka yaratuvchi skript (Node.js Canvas kerak emas — SVG to PNG via built-in)
// Run: node assets/create-icon.js
const { createCanvas } = (() => {
  try { return require('canvas') } catch { return null }
})() || {}

const fs = require('fs')
const path = require('path')

// SVG ikonka — DevPath uchun gradient gradient kitob + yo'l belgisi
const svgContent = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d0d1f"/>
      <stop offset="100%" stop-color="#1a1a3e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#5b6ef5"/>
      <stop offset="100%" stop-color="#5bf5a8"/>
    </linearGradient>
    <linearGradient id="track" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#5b6ef5"/>
      <stop offset="50%" stop-color="#f5825b"/>
      <stop offset="100%" stop-color="#5bf5a8"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="512" height="512" rx="110" fill="url(#bg)"/>

  <!-- Subtle glow circles -->
  <circle cx="150" cy="180" r="120" fill="#5b6ef5" opacity="0.06"/>
  <circle cx="370" cy="340" r="100" fill="#5bf5a8" opacity="0.05"/>

  <!-- Road / path lines -->
  <rect x="96" y="210" width="320" height="3" rx="2" fill="url(#accent)" opacity="0.15"/>
  <rect x="96" y="250" width="320" height="3" rx="2" fill="url(#accent)" opacity="0.1"/>
  <rect x="96" y="290" width="320" height="3" rx="2" fill="url(#accent)" opacity="0.07"/>

  <!-- Main progress bar -->
  <rect x="80" y="320" width="352" height="10" rx="5" fill="#1e1e35"/>
  <rect x="80" y="320" width="220" height="10" rx="5" fill="url(#track)"/>

  <!-- D letter mark -->
  <text x="256" y="230" font-family="SF Pro Display, Helvetica Neue, sans-serif"
        font-size="140" font-weight="800" fill="url(#accent)"
        text-anchor="middle" letter-spacing="-4">D</text>

  <!-- 90 label -->
  <rect x="170" y="348" width="172" height="36" rx="10" fill="#1e1e35"/>
  <text x="256" y="373" font-family="SF Mono, Menlo, monospace"
        font-size="18" font-weight="700" fill="#5b6ef5"
        text-anchor="middle" letter-spacing="2">90 DAYS</text>

  <!-- Three dots (tracks indicator) -->
  <circle cx="195" cy="415" r="8" fill="#5b6ef5" opacity="0.9"/>
  <circle cx="256" cy="415" r="8" fill="#f5825b" opacity="0.9"/>
  <circle cx="317" cy="415" r="8" fill="#5bf5a8" opacity="0.9"/>
</svg>`

const svgPath = path.join(__dirname, 'icon.svg')
fs.writeFileSync(svgPath, svgContent)
console.log('SVG ikonka yaratildi:', svgPath)
console.log('')
console.log('PNG ikonka yaratish uchun:')
console.log('  rvg (rsvg-convert) yoki Inkscape yoki online converter ishlatish mumkin.')
console.log('  electron-builder icon.svg ni ham qabul qiladi (ba\'zi versiyalarda).')
console.log('')
console.log('Eng oson yo\'l — terminalda:')
console.log('  brew install librsvg')
console.log('  rsvg-convert -w 512 -h 512 assets/icon.svg -o assets/icon.png')
