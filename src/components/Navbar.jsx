import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'
import { Menu, X, ArrowRight } from 'lucide-react'
import LogoMark from './Logo'
import { scrollToId } from './Effects'
import { ease } from './motion-utils'
import { useLang } from '../i18n'
import { LANGS } from '../content'

export const NAV_IDS = ['about', 'services', 'areas', 'tech', 'offer', 'contact']

function LangSwitch({ className = '' }) {
  const { lang, setLang, t } = useLang()
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={t.nav.langLabel} translate="no">
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          className={lang === l ? 'active' : ''}
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
        >
          {lang === l && (
            <motion.span
              layoutId="lang-pill"
              className="lang-pill"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span>{l.toUpperCase()}</span>
        </button>
      ))}
    </div>
  )
}

export default function Navbar({ ready }) {
  const { t } = useLang()
  const NAV_LINKS = NAV_IDS.map((id) => ({ id, label: t.nav.links[id] }))
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [hover, setHover] = useState(null)

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(v > 40)
    setHidden(v > prev && v > 400 && !open)
  })

  // Highlight the link of the section currently on screen
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id === 'top' ? '' : e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['top', ...NAV_IDS].forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <motion.header
        className={`nav${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={ready ? { y: hidden ? -110 : 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease }}
      >
        <div className="container">
          <nav className="nav-inner">
            <a href="#top" className="brand" onClick={(e) => go(e, 'top')}>
              <LogoMark size={30} title="" />
              Digimates
            </a>

            <ul className="nav-links" onMouseLeave={() => setHover(null)}>
              {NAV_LINKS.map((l) => (
                <li key={l.id} onMouseEnter={() => setHover(l.id)}>
                  <a
                    href={`#${l.id}`}
                    className={active === l.id ? 'active' : ''}
                    onClick={(e) => go(e, l.id)}
                  >
                    {(hover ?? active) === l.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="nav-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span>{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="nav-right">
              <LangSwitch />
              <a href="#contact" className="btn btn-primary nav-cta" onClick={(e) => go(e, 'contact')}>
                {t.nav.cta} <ArrowRight size={16} className="arrow" />
              </a>
            </div>

            <button
              className="nav-toggle"
              aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
              onClick={() => setOpen((o) => !o)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'm'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'grid' }}
                >
                  {open ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="btn btn-primary"
              onClick={(e) => go(e, 'contact')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {t.nav.cta} <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
