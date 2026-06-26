import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import CurrencyConverter from './components/CurrencyConverter'

function Particles() {
  const containerRef = useRef(null)

  useEffect(() => {
    try {
      const el = containerRef.current
      if (!el) return
      const particles = Array.from(el.children)
      particles.forEach((p, i) => {
        const size = gsap.utils.random(2, 6)
        const x = gsap.utils.random(0, 100)
        const duration = gsap.utils.random(20, 40)
        const delay = gsap.utils.random(0, 15)
        const colors = [
          'rgba(124,58,237,0.15)', 'rgba(6,182,212,0.1)',
          'rgba(167,139,250,0.1)', 'rgba(34,197,94,0.08)'
        ]
        gsap.set(p, {
          width: size, height: size,
          x: x + 'vw', y: '110vh',
          background: colors[i % colors.length],
          borderRadius: gsap.utils.random(0, 1) > 0.5 ? '50%' : '30%',
        })
        gsap.to(p, {
          y: '-10vh',
          opacity: gsap.utils.random(0.3, 0.6),
          duration, delay, ease: 'none', repeat: -1,
        })
      })
    } catch (_) {}
  }, [])

  return (
    <div className="particles-container" ref={containerRef} aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className="particle" />
      ))}
    </div>
  )
}

function App() {
  const headerRef = useRef(null)
  const mainRef = useRef(null)
  const footerRef = useRef(null)

  useEffect(() => {
    try {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.5 } })
      tl.from(headerRef.current, { y: -15 })
        .from(mainRef.current, { y: 15 }, '-=0.25')
        .from(footerRef.current, { y: 10 }, '-=0.15')
    } catch (_) {}
  }, [])

  return (
    <>
      <Particles />
      <header ref={headerRef} role="banner">
        <div className="header-badge">
          <span className="dot" />
          Live Rates
        </div>
        <h1>Currency Converter</h1>
        <p>Real-time exchange rates across 20 currencies</p>
      </header>

      <main ref={mainRef} role="main">
        <CurrencyConverter />
      </main>

      <footer ref={footerRef} role="contentinfo">
        <p>Powered by <a href="https://haniipp.space" target="_blank" rel="noopener noreferrer">hanif abdurrohim</a></p>
      </footer>
    </>
  )
}

export default App
