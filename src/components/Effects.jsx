import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from 'motion/react'
import { ArrowUp, Cookie } from 'lucide-react'
import LogoMark from './Logo'
import { ease } from './motion-utils'

/* ---------- Smooth scrolling (Lenis) ---------- */
let lenisInstance = null

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenisInstance) lenisInstance.scrollTo(el, { offset: -80, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function useSmoothScroll(enabled) {
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    lenisInstance = lenis
    let raf
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [enabled])
}

/* ---------- Preloader ---------- */
export function Preloader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="preloader"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.9, ease }}
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <div className="preloader-inner">
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <LogoMark size={72} />
        </motion.div>
        <div className="preloader-bar">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}

/* ---------- Top scroll progress bar ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  return <motion.div className="scroll-progress" style={{ scaleX }} />
}

/* ---------- Soft glow that follows the cursor ---------- */
export function CursorGlow() {
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 80, damping: 20 })
  const sy = useSpring(y, { stiffness: 80, damping: 20 })
  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])
  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} />
}

/* ---------- Back to top ---------- */
export function BackToTop() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 900))
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="to-top"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToId('top')}
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/* ---------- Cookie banner (GDPR basics) ---------- */
const COOKIE_KEY = 'digimates-cookie-choice'

export function CookieBanner({ ready }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!ready) return
    let saved = null
    try {
      saved = localStorage.getItem(COOKIE_KEY)
    } catch {
      /* storage unavailable */
    }
    if (saved) return
    const t = setTimeout(() => setOpen(true), 1800)
    return () => clearTimeout(t)
  }, [ready])

  const choose = (value) => {
    try {
      localStorage.setItem(COOKIE_KEY, value)
    } catch {
      /* storage unavailable */
    }
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cookie"
          role="dialog"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.6, ease }}
        >
          <h4>
            <Cookie size={18} /> We value your privacy
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. We use cookies to improve your
            experience. See our <a href="#datenschutz">Datenschutz</a>.
          </p>
          <div className="cookie-actions">
            <button className="btn btn-primary" onClick={() => choose('all')}>
              Accept all
            </button>
            <button className="btn btn-ghost" onClick={() => choose('essential')}>
              Essential only
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
