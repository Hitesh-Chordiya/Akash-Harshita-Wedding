import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Story from './components/Story'
import Events from './components/Events'
import Gallery from './components/Gallery'
import RSVP from './components/RSVP'

export default function App() {
  const [mainContentClass, setMainContentClass] = useState('')

  useEffect(() => {
    // Lock stable viewport height
    function setStableVh() {
      document.documentElement.style.setProperty('--stable-vh', window.innerHeight + 'px')
    }
    setStableVh()
    window.addEventListener('orientationchange', () => setTimeout(setStableVh, 150))
    window.addEventListener('resize', setStableVh, { passive: true })

    // Setup entry gate
    const video = document.querySelector('[data-autoplay-fix="true"]')
    const gate = document.querySelector('[data-entry-gate]')
    const mainContent = document.getElementById('main-content')

    if (video && gate) {
      video.load()

      gate.addEventListener('click', function onGateTap() {
        gate.removeEventListener('click', onGateTap)
        video.currentTime = 0
        const playAttempt = video.play()
        if (playAttempt !== undefined) {
          playAttempt.catch(() => {
            gate.addEventListener('click', () => video.play(), { once: true })
          })
        }
        if (window.setAudio) window.setAudio(true)
      }, { once: true })

      video.addEventListener('ended', () => {
        gate.style.transition = 'opacity 0.8s ease'
        gate.style.opacity = '0'
        setTimeout(() => {
          gate.style.display = 'none'
          gate.style.visibility = 'hidden'
          if (mainContent) {
            setMainContentClass('visible')
            const pCanvas = document.getElementById('petals-canvas')
            if (pCanvas) pCanvas.classList.add('active')
            document.dispatchEvent(new Event('gateEnded'))
            document.body.style.overflow = 'auto'
          }
        }, 800)
      })
    }

    return () => {
      window.removeEventListener('orientationchange', setStableVh)
      window.removeEventListener('resize', setStableVh)
    }
  }, [])

  return (
    <>
      <audio id="bg-audio" loop preload="auto">
        <source src="https://pub-1953a6673e864f3488c645252f75de98.r2.dev/April/Kriti%20%26%20Manmeet/ReelAudio-14254.mp3" type="audio/mpeg" />
      </audio>

      <button id="audio-btn" title="Toggle music">
        <svg id="a-on" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ display: 'none' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
        </svg>
        <svg id="a-off" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>
        </svg>
      </button>

      <canvas id="petals-canvas"></canvas>

      <div id="entry-gate" className="entry-gate-container" data-entry-gate="">
        <video id="entry-video" src="https://pub-1953a6673e864f3488c645252f75de98.r2.dev/may/Meenal%20%26%20Avinash%201st%20july/Best%20Entry%20Video%20(49).mp4#t=0.001" playsInline muted preload="auto" data-autoplay-fix="true"></video>
      </div>

      <div id="main-content" className={mainContentClass}>
        <Hero />
        <Story />
        <Events />
        <Gallery />
        <RSVP />
      </div>

      <AudioManager />
      <PetalsCanvas />
      <AutoScroll />
      <RevealOnScroll />
    </>
  )
}

function AudioManager() {
  useEffect(() => {
    const bgAudio = document.getElementById('bg-audio')
    const aOn = document.getElementById('a-on')
    const aOff = document.getElementById('a-off')
    let playing = false

    window.setAudio = function (on) {
      if (on) {
        if (bgAudio.readyState === 0) bgAudio.load()
        bgAudio.play().then(() => {
          playing = true
          aOn.style.display = 'block'
          aOff.style.display = 'none'
        }).catch(() => { })
      } else {
        bgAudio.pause()
        playing = false
        aOn.style.display = 'none'
        aOff.style.display = 'block'
      }
    }

    document.getElementById('audio-btn').addEventListener('click', () => window.setAudio(!playing))

    let pausedByVisibility = false
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (playing && !bgAudio.paused) {
          pausedByVisibility = true
          bgAudio.pause()
        }
      } else {
        if (pausedByVisibility) {
          pausedByVisibility = false
          bgAudio.play().catch(() => { })
        }
      }
    })
  }, [])

  return null
}

function PetalsCanvas() {
  useEffect(() => {
    const canvas = document.getElementById('petals-canvas')
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const COLORS = ['#F7DCDA', '#EAC9C7', '#E2B4B1', '#FFFFFF', '#F7EFC8']
    const COUNT = window.innerWidth < 600 ? 12 : 25

    class Petal {
      constructor() {
        this.reset(true)
      }
      reset(initial) {
        this.x = Math.random() * canvas.width
        this.y = initial ? Math.random() * canvas.height * 2 - canvas.height : -20
        this.r = 4 + Math.random() * 5
        this.vx = (Math.random() - 0.5) * 0.8
        this.vy = 0.6 + Math.random() * 1.2
        this.rot = Math.random() * Math.PI * 2
        this.drot = (Math.random() - 0.5) * 0.04
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
        this.alpha = 0.3 + Math.random() * 0.4
      }
      update() {
        this.x += this.vx + Math.sin(this.y * 0.01) * 0.4
        this.y += this.vy
        this.rot += this.drot
        if (this.y > canvas.height + 20) this.reset(false)
      }
      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rot)
        ctx.globalAlpha = this.alpha
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.ellipse(0, 0, this.r * 0.55, this.r, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const petals = []
    for (let i = 0; i < COUNT; i++) petals.push(new Petal())

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      petals.forEach(p => {
        p.update()
        p.draw()
      })
      requestAnimationFrame(loop)
    }
    loop()
  }, [])

  return null
}

function AutoScroll() {
  useEffect(() => {
    document.addEventListener('gateEnded', () => {
      let timer = null
      let rafId = null
      let scrollBehaviorPrev = ''
      let animating = false
      const html = document.documentElement
      const cancelEvents = ['wheel', 'touchstart', 'keydown', 'mousedown', 'click']

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      function detach() {
        cancelEvents.forEach(e => window.removeEventListener(e, onUserInput, true))
      }

      function stopAnim() {
        if (rafId) { cancelAnimationFrame(rafId); rafId = null }
        if (animating) {
          html.style.scrollBehavior = scrollBehaviorPrev
          animating = false
        }
      }

      function cancelAll() {
        if (timer) { clearTimeout(timer); timer = null }
        stopAnim()
        detach()
      }

      function onUserInput() {
        cancelAll()
      }

      function trigger() {
        timer = null
        const scratch = document.getElementById('scratch-section')
        if (!scratch) { cancelAll(); return }

        const rect = scratch.getBoundingClientRect()
        const targetY = Math.max(
          0,
          window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2
        )
        const startY = window.scrollY
        const diff = targetY - startY

        if (Math.abs(diff) < 4) { cancelAll(); return }

        scrollBehaviorPrev = html.style.scrollBehavior
        html.style.scrollBehavior = 'auto'
        animating = true

        const startTime = performance.now()
        const duration = 2800

        function step(now) {
          const t = Math.min(1, (now - startTime) / duration)
          window.scrollTo(0, startY + diff * easeInOutCubic(t))
          if (t < 1) {
            rafId = requestAnimationFrame(step)
          } else {
            stopAnim()
            detach()
          }
        }
        rafId = requestAnimationFrame(step)
      }

      function arm() {
        cancelAll()
        cancelEvents.forEach(e =>
          window.addEventListener(e, onUserInput, { passive: true, capture: true })
        )
        timer = setTimeout(trigger, 5000)
      }

      arm()
    }, { once: true })
  }, [])

  return null
}

function RevealOnScroll() {
  useEffect(() => {
    document.addEventListener('gateEnded', () => {
      setTimeout(() => {
        const items = document.querySelectorAll('.reveal:not(.revealed)')
        const io = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('revealed')
              io.unobserve(e.target)
            }
          })
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
        items.forEach(el => io.observe(el))
      }, 100)
    })
  }, [])

  return null
}