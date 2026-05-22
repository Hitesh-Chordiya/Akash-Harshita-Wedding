import { useEffect, useState } from 'react'

export default function Hero() {
  const [scratchDone, setScratchDone] = useState(0)

  useEffect(() => {
    let doneCount = 0

    window.onAllScratched = () => {
      const el = document.getElementById('locked')
      el.classList.add('unlocked')
      setTimeout(() => {
        el.classList.add('visible')
        if (window.initCountdown) window.initCountdown()
        if (window.initPolaroids) window.initPolaroids()
        const COLS = ['#E2B4B1', '#FDFBF7', '#D4AF37', '#BA7A76']
        const opts = { colors: COLS, zIndex: 99999 }
        if (typeof confetti !== 'undefined') {
          setTimeout(() => confetti({ ...opts, particleCount: 200, spread: 100, origin: { x: 0.5, y: 0.65 } }), 100)
          setTimeout(() => confetti({ ...opts, particleCount: 120, angle: 60, spread: 65, origin: { x: 0, y: 0.7 } }), 400)
          setTimeout(() => confetti({ ...opts, particleCount: 120, angle: 120, spread: 65, origin: { x: 1, y: 0.7 } }), 600)
        }
      }, 50)
    }

    const setupScratch = (canvasId, num, onDone) => {
      const cvs = document.getElementById(canvasId)
      if (!cvs) return
      const wrap = cvs.parentElement
      const ctx = cvs.getContext('2d', { willReadFrequently: true })
      const dpr = devicePixelRatio || 1
      let ready = false, done = false, drawing = false

      const build = () => {
        const r = wrap.getBoundingClientRect(), W = r.width, H = r.height
        cvs.width = W * dpr
        cvs.height = H * dpr
        ctx.scale(dpr, dpr)
        const g = ctx.createLinearGradient(0, 0, W, H)
        g.addColorStop(0, '#EAC9C7')
        g.addColorStop(0.5, '#BA7A76')
        g.addColorStop(1, '#EAC9C7')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, W, H)
        ctx.font = "italic 600 13px 'Cormorant Garamond'"
        ctx.fillStyle = 'rgba(255,255,255,.9)'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('scratch me', W / 2, H / 2)
        ctx.globalCompositeOperation = 'destination-out'
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'
        ctx.lineWidth = Math.max(42, W * 0.36)
        ready = true
      }

      const pos = (e) => {
        const r = cvs.getBoundingClientRect(), s = e.touches ? e.touches[0] : e
        return { x: s.clientX - r.left, y: s.clientY - r.top }
      }

      const start = (e) => {
        if (!ready || done) return
        drawing = true
        e.preventDefault()
        wrap.style.animation = 'none'
        const p = pos(e)
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
      }

      const move = (e) => {
        if (!drawing || done) return
        e.preventDefault()
        const p = pos(e)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        check()
      }

      const end = () => {
        drawing = false
        if (ready && !done) ctx.beginPath()
      }

      const check = () => {
        if (done) return
        const d = ctx.getImageData(0, 0, cvs.width, cvs.height).data
        let clear = 0
        for (let i = 3; i < d.length; i += 4) if (d[i] === 0) clear++
        if (clear / (cvs.width * cvs.height) > 0.48) {
          done = true
          cvs.style.transition = 'opacity .8s'
          cvs.style.opacity = '0'
          setTimeout(() => {
            cvs.style.display = 'none'
            onDone()
          }, 800)
        }
      }

      cvs.addEventListener('mousedown', start)
      cvs.addEventListener('mousemove', move)
      window.addEventListener('mouseup', end)
      cvs.addEventListener('touchstart', start, { passive: false })
      cvs.addEventListener('touchmove', move, { passive: false })
      window.addEventListener('touchend', end)
      setTimeout(build, 100)
    }

    const initScratch = () => {
      ['sc-1', 'sc-2', 'sc-3'].forEach((id, i) => {
        setupScratch(id, i + 1, () => {
          doneCount++
          const hint = document.getElementById('hint-' + (i + 1))
          const card = document.getElementById('card-' + (i + 1))
          if (hint) hint.style.opacity = '0'
          if (card) card.classList.add('glow')
          if (doneCount === 3 && window.onAllScratched) window.onAllScratched()
        })
      })
    }

    document.addEventListener('gateEnded', initScratch)

    return () => {
      document.removeEventListener('gateEnded', initScratch)
    }
  }, [])

  return (
    <>
      <section id="hero" className="hero-section">
        <div className="hero-corner"><span></span></div>
        <div className="hero-card">
          <img src="https://pub-1953a6673e864f3488c645252f75de98.r2.dev/may/Hemadri%20%26%20Ravindra/GAnesha%20Icon.png" alt="Ganesha Icon" className="hero-icon" />

          <p className="intro-text">
            We cordially invite you to celebrate<br />
            the wedding of
          </p>

          <span className="couple-name shimmer">Harshita</span>

          <div className="amp-row">
            <div className="amp-line"></div>
            <span className="amp">&</span>
            <div className="amp-line"></div>
          </div>

          <span className="couple-name shimmer">Akash</span>
          <p className="intro-text">20th June 2026 • 12:21 PM</p>
        </div>

        <div className="scroll-indicator" onClick={() => document.getElementById('scratch-section').scrollIntoView({ behavior: 'smooth' })}>
          <span>Scroll to Reveal</span>
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </section>

      <section id="scratch-section" className="reveal">
        <h2 className="sec-heading">Save the Date</h2>
        <p style={{ fontStyle: 'italic', color: 'var(--text-light)', fontSize: '1.05rem', marginTop: '.25rem' }}>Scratch below to reveal our wedding date</p>

        <div className="scratch-row">
          <div className="scratch-unit">
            <span className="scratch-lbl">Month</span>
            <div className="scratch-card" id="card-1">
              <div className="scratch-inner"><div className="sc-val">June</div><div className="sc-rule"></div></div>
              <canvas className="scratch-canvas" id="sc-1"></canvas>
            </div>
            <span className="scratch-hint" id="hint-1">↑ scratch</span>
          </div>
          <div className="scratch-unit">
            <span className="scratch-lbl">Day</span>
            <div className="scratch-card" id="card-2">
              <div className="scratch-inner"><div className="sc-val">20</div><div className="sc-rule"></div></div>
              <canvas className="scratch-canvas" id="sc-2"></canvas>
            </div>
            <span className="scratch-hint" id="hint-2" style={{ animationDelay: '.18s' }}>↑ scratch</span>
          </div>
          <div className="scratch-unit">
            <span className="scratch-lbl">Year</span>
            <div className="scratch-card" id="card-3">
              <div className="scratch-inner"><div className="sc-val">2026</div><div className="sc-rule"></div></div>
              <canvas className="scratch-canvas" id="sc-3"></canvas>
            </div>
            <span className="scratch-hint" id="hint-3" style={{ animationDelay: '.36s' }}>↑ scratch</span>
          </div>
        </div>
      </section>

      <div id="locked">
        {/* Content will be added by other components */}
      </div>
    </>
  )
}