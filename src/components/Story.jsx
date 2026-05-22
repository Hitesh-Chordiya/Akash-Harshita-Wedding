import { useEffect } from 'react'

const storyData = [
  { chapter: 'First Meet', text: 'Two souls crossed paths and a beautiful journey began.' },
  { chapter: 'Fell in Love', text: 'Years of laughter, memories, and endless support.' },
  { chapter: 'Forever Begins', text: 'Now we celebrate the start of our forever together.' },
  { chapter: 'Our Forever', text: 'With hope, love, and endless possibilities ahead.' }
]

export default function Story() {
  useEffect(() => {
    window.initCountdown = () => {
      const target = new Date('June 20, 2026 12:21:00 GMT+0530')
      const els = {
        d: document.getElementById('cd-days'),
        h: document.getElementById('cd-hours'),
        m: document.getElementById('cd-mins'),
        s: document.getElementById('cd-secs')
      }

      function tick() {
        const diff = target - Date.now()
        if (diff <= 0) {
          const grid = document.querySelector('.cd-grid')
          if (grid) grid.innerHTML = "<p style='grid-column:1/-1;font-family:\"Pinyon Script\",cursive;font-size:3rem;color:var(--sage-dark)'>The Celebration Begins! 🌸</p>"
          return
        }
        const fmt = n => String(n).padStart(2, '0')
        if (els.d) els.d.textContent = fmt(Math.floor(diff / 86400000))
        if (els.h) els.h.textContent = fmt(Math.floor((diff % 86400000) / 3600000))
        if (els.m) els.m.textContent = fmt(Math.floor((diff % 3600000) / 60000))
        if (els.s) els.s.textContent = fmt(Math.floor((diff % 60000) / 1000))
      }

      tick()
      setInterval(tick, 1000)
    }

    window.initPolaroids = () => {
      const section = document.getElementById('story-section')
      if (!section) return
      const cards = Array.from(document.querySelectorAll('.ls-card'))
      let last = -1, ticking = false

      function apply(idx) {
        if (idx === last) return
        last = idx
        cards.forEach((c, i) => {
          c.classList.remove('visible', 'stacked')
          c.style.removeProperty('--d')
          if (i < idx) {
            c.style.setProperty('--d', String(idx - i))
            c.classList.add('stacked')
          } else if (i === idx) c.classList.add('visible')
        })
        const chEl = document.getElementById('story-chapter')
        const pEl = document.getElementById('story-p')
        if (chEl && storyData[idx]) {
          chEl.textContent = storyData[idx].chapter
          pEl.textContent = storyData[idx].text
        }
      }

      apply(0)

      function getStableInnerHeight() {
        const v = getComputedStyle(document.documentElement).getPropertyValue('--stable-vh').trim()
        const n = parseFloat(v)
        return n > 0 ? n : window.innerHeight
      }

      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const top = section.getBoundingClientRect().top + window.scrollY
            const range = Math.max(1, section.offsetHeight - getStableInnerHeight())
            const raw = (window.scrollY - top) / range
            apply(Math.round(Math.max(0, Math.min(1, raw)) * (cards.length - 1)))
            ticking = false
          })
          ticking = true
        }
      }, { passive: true })
    }
  }, [])

  return (
    <>
      <section id="countdown-section">
        <div className="cd-card">
          <p className="cd-quote">A lifetime of togetherness begins with one sacred step</p>
          <span className="cd-script">The Wedding</span>
          <span className="cd-date">20 · 06 · 2026 · Wagholi</span>
          <div className="cd-grid">
            <div className="cd-unit"><span className="cd-num" id="cd-days">00</span><span className="cd-lbl">Days</span></div>
            <div className="cd-unit"><span className="cd-num" id="cd-hours">00</span><span className="cd-lbl">Hours</span></div>
            <div className="cd-unit"><span className="cd-num" id="cd-mins">00</span><span className="cd-lbl">Mins</span></div>
            <div className="cd-unit"><span className="cd-num" id="cd-secs">00</span><span className="cd-lbl">Secs</span></div>
          </div>
        </div>
      </section>

      <section id="story-section">
        <div className="story-sticky">
          <div className="story-text">
            <span className="sec-label">Our Story</span>
            <h2 className="sec-heading">Forever Us</h2>
            <span className="story-chapter" id="story-chapter">First Meet</span>
            <p className="story-p" id="story-p">Two souls crossed paths and a beautiful journey began.</p>
          </div>
          <div className="ls-stack" id="ls-stack">
            <div className="ls-card" data-idx="0">
              <img src="https://pub-1953a6673e864f3488c645252f75de98.r2.dev/may/Meenal%20%26%20Avinash%201st%20july/WhatsApp%20Image%202026-05-14%20at%209.15.14%20PM.jpeg" alt="Memory 1" loading="eager" />
              <div className="ls-caption"><span>First Meet</span></div>
            </div>
            <div className="ls-card" data-idx="1">
              <img src="https://pub-1953a6673e864f3488c645252f75de98.r2.dev/may/Meenal%20%26%20Avinash%201st%20july/WhatsApp%20Image%202026-05-10%20at%2012.06.13%20AM%20(2).jpeg" alt="Memory 2" loading="eager" />
              <div className="ls-caption"><span>Fell in Love</span></div>
            </div>
            <div className="ls-card" data-idx="2">
              <img src="https://pub-1953a6673e864f3488c645252f75de98.r2.dev/may/Meenal%20%26%20Avinash%201st%20july/WhatsApp%20Image%202026-05-10%20at%2012.06.13%20AM.jpeg" alt="Memory 3" loading="eager" />
              <div className="ls-caption"><span>Forever Begins</span></div>
            </div>
            <div className="ls-card" data-idx="3">
              <img src="https://pub-1953a6673e864f3488c645252f75de98.r2.dev/may/Meenal%20%26%20Avinash%201st%20july/WhatsApp%20Image%202026-05-10%20at%2012.06.55%20AM.jpeg" alt="Memory 4" loading="eager" />
              <div className="ls-caption"><span>Our Forever</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}