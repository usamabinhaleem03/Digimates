import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react'
import {
  Check,
  ArrowRight,
  ArrowUpRight,
  Cable,
  LayoutGrid,
  Workflow,
  Database,
  FileText,
  Boxes,
  Globe,
  BrainCircuit,
  Lightbulb,
  Cloud,
  PenTool,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  Wallet,
  Users,
  LayoutDashboard,
  ClipboardList,
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  Mail,
  MessageCircle,
  CalendarDays,
  Send,
  LoaderCircle,
  Code,
  Bot,
  Server,
  Briefcase,
  Wrench,
  Headset,
  Sparkles,
} from 'lucide-react'
import LogoMark from './Logo'
import { Reveal, SplitText, TiltCard, SectionHead, Magnetic, ease } from './motion-utils'
import { scrollToId } from './Effects'
import { NAV_IDS } from './Navbar'
import { SOCIALS } from './socials'
import { useLang } from '../i18n'
import imgIntegration from '../assets/showcase/integration.jpg'
import imgPower from '../assets/showcase/power-platform.jpg'
import imgAutomation from '../assets/showcase/automation.jpg'
import imgData from '../assets/showcase/data-pipeline.jpg'

/* Each service / area gets its own accent colour */
const ACCENTS = [
  '#22d3ee', // cyan
  '#8b5cf6', // violet
  '#f472b6', // pink
  '#3b82f6', // blue
  '#34d399', // emerald
  '#f59e0b', // amber
  '#06b6d4', // teal
  '#a78bfa', // lavender
  '#fb7185', // rose
  '#60a5fa', // sky
  '#e879f9', // fuchsia
  '#4ade80', // green
]

const go = (e, id) => {
  e.preventDefault()
  scrollToId(id)
}

/* =========================================================
   Technology marquee
   ========================================================= */
const TECH = [
  { name: 'Microsoft 365', Icon: LayoutGrid },
  { name: 'Power Apps', Icon: Boxes },
  { name: 'Power Automate', Icon: Workflow },
  { name: 'SharePoint', Icon: FileText },
  { name: 'n8n', Icon: Cable },
  { name: 'Power BI', Icon: LayoutDashboard },
  { name: 'Odoo', Icon: ShoppingCart },
  { name: 'Python', Icon: Code },
  { name: 'SQL', Icon: Database },
  { name: 'AI Agents', Icon: Bot },
  { name: 'Docker', Icon: Server },
  { name: 'Microsoft Teams', Icon: Users },
  { name: 'Copilot', Icon: Sparkles },
  { name: 'OpenAI', Icon: Bot },
  { name: 'Claude', Icon: Bot },
  { name: 'Azure', Icon: Server },
  { name: 'Make', Icon: Workflow },
  { name: 'Zapier', Icon: Cable },
  { name: 'React', Icon: Code },
  { name: 'Node.js', Icon: Code },
  { name: 'PostgreSQL', Icon: Database },
  { name: 'GitHub', Icon: Boxes },
]

export function TechMarquee() {
  const { t } = useLang()
  const row = [...TECH, ...TECH]
  return (
    <div className="marquee-wrap">
      <p className="marquee-label">{t.marquee}</p>
      <div className="marquee">
        <motion.div
          className="marquee-track"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
        >
          {row.map(({ name, Icon }, i) => (
            <span className="logo-item" key={i}>
              <Icon size={20} /> {name}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* =========================================================
   About / Positioning
   ========================================================= */
export function About() {
  const { t, lang } = useLang()
  const a = t.about
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.08, 1.18])

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container about-grid">
        <Reveal className="about-visual" y={60}>
          <motion.img
            src={imgIntegration}
            alt={a.imageAlt}
            className="about-img"
            style={{ y: imgY, scale: imgScale }}
            loading="lazy"
          />
          <div className="about-overlay" />
          <div className="about-badge">
            <div>
              <strong className="grad-text">{a.badgeTitle}</strong>
              <span>{a.badgeSub}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <strong>{a.badgeRight}</strong>
              <span>{a.badgeRightSub}</span>
            </div>
          </div>
        </Reveal>

        <div className="about-text">
          <Reveal y={20}>
            <span className="eyebrow">
              <span className="dot" /> {a.eyebrow}
            </span>
          </Reveal>
          <h2>
            <SplitText key={lang} text={a.title} gradientWords={a.gradientWords} />
          </h2>
          <Reveal delay={0.15}>
            <p>{a.p1}</p>
            <p>{a.p2}</p>
          </Reveal>

          <ul className="check-list">
            {a.pillars.map((p, i) => (
              <Reveal as="li" key={p} delay={0.1 * i} x={-20} y={0}>
                <span className="tick" style={{ '--accent': ACCENTS[i * 3] }}>
                  <Check size={14} strokeWidth={3} />
                </span>
                {p}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   Services
   ========================================================= */
const SERVICE_ICONS = [
  Cable,
  LayoutGrid,
  Workflow,
  Database,
  FileText,
  Boxes,
  Globe,
  BrainCircuit,
  Lightbulb,
  Cloud,
  PenTool,
  ShieldCheck,
]

export function Services() {
  const { t, lang } = useLang()
  const s = t.services
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHead
          key={lang}
          eyebrow={s.eyebrow}
          title={s.title}
          gradientWords={s.gradientWords}
          text={s.text}
          center
        />
        <div className="services-grid">
          {s.items.map(({ title, text, tags }, i) => {
            const Icon = SERVICE_ICONS[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.12, ease }}
              >
                <TiltCard className="service-card" max={7} style={{ '--accent': ACCENTS[i] }}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <motion.div
                    className="icon"
                    whileHover={{ rotate: [0, -12, 12, 0], scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon size={24} />
                  </motion.div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="tags">
                    {tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a href="#contact" className="more" onClick={(e) => go(e, 'contact')}>
                    {s.more} <ArrowUpRight size={15} />
                  </a>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   Showcase – tabs with the client's illustrations
   ========================================================= */
const SHOWCASE_IMAGES = [imgIntegration, imgPower, imgAutomation, imgData]
const SHOWCASE_MS = 7000

export function Showcase() {
  const { t, lang } = useLang()
  const sc = t.showcase
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setTimeout(() => setActive((a) => (a + 1) % sc.tabs.length), SHOWCASE_MS)
    return () => clearTimeout(id)
  }, [active, paused, sc.tabs.length])

  const tab = sc.tabs[active]

  return (
    <section className="section showcase" id="showcase">
      <div className="container">
        <SectionHead key={lang} eyebrow={sc.eyebrow} title={sc.title} gradientWords={sc.gradientWords} center />

        <Reveal
          className="showcase-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="showcase-tabs" role="tablist">
            {sc.tabs.map((tb, i) => (
              <button
                key={tb.label}
                role="tab"
                aria-selected={active === i}
                className={active === i ? 'active' : ''}
                onClick={() => setActive(i)}
                style={{ '--accent': ACCENTS[[0, 1, 2, 3][i]] }}
              >
                {active === i && (
                  <motion.span
                    layoutId="showcase-pill"
                    className="showcase-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="label">{tb.label}</span>
                {active === i && !paused && (
                  <motion.span
                    key={`bar-${active}`}
                    className="tab-progress"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: SHOWCASE_MS / 1000, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="showcase-stage">
            <div className="showcase-media">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={active}
                  src={SHOWCASE_IMAGES[active]}
                  alt={tab.alt}
                  initial={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.97, filter: 'blur(10px)' }}
                  transition={{ duration: 0.7, ease }}
                  loading="lazy"
                />
              </AnimatePresence>
            </div>
            <div className="showcase-copy">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${lang}-${active}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <span className="showcase-num" style={{ color: ACCENTS[active] }}>
                    0{active + 1} / 0{sc.tabs.length}
                  </span>
                  <h3>{tab.title}</h3>
                  <p>{tab.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================
   Business areas (strategic focus)
   ========================================================= */
const AREA_ICONS = [ShoppingCart, TrendingUp, Wallet, Users, LayoutDashboard, ClipboardList]
const AREA_ACCENTS = ['#f59e0b', '#f472b6', '#34d399', '#60a5fa', '#8b5cf6', '#22d3ee']

export function Areas() {
  const { t, lang } = useLang()
  const ar = t.areas
  return (
    <section className="section areas" id="areas">
      <div className="container">
        <SectionHead key={lang} eyebrow={ar.eyebrow} title={ar.title} gradientWords={ar.gradientWords} text={ar.text} />
        <div className="areas-grid">
          {ar.items.map((it, i) => {
            const Icon = AREA_ICONS[i]
            return (
              <motion.div
                key={i}
                className="area-card"
                style={{ '--accent': AREA_ACCENTS[i] }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease }}
                whileHover={{ y: -8 }}
              >
                <div className="area-ic">
                  <Icon size={22} />
                </div>
                <h4>{it.title}</h4>
                <p>{it.text}</p>
                <span className="area-glow" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   Process
   ========================================================= */
export function Process() {
  const { t, lang } = useLang()
  const pr = t.process
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })
  const [vertical, setVertical] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)')
    const update = () => setVertical(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <section className="section" id="process">
      <div className="container">
        <SectionHead key={lang} eyebrow={pr.eyebrow} title={pr.title} gradientWords={pr.gradientWords} center />
        <div className="process" ref={ref}>
          <div className="process-line">
            <motion.div style={vertical ? { scaleY: progress } : { scaleX: progress }} />
          </div>
          {pr.steps.map((s, i) => (
            <motion.div
              key={i}
              className="step"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease }}
            >
              <motion.div
                className="step-num"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 + i * 0.15 }}
              >
                <span className="grad-text">0{i + 1}</span>
              </motion.div>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   Tech stack table
   ========================================================= */
export function TechStack() {
  const { t, lang } = useLang()
  const te = t.tech
  return (
    <section className="section" id="tech">
      <div className="container">
        <SectionHead key={lang} eyebrow={te.eyebrow} title={te.title} gradientWords={te.gradientWords} />
        <div className="tech-table" role="table">
          <div className="tech-row tech-head" role="row">
            <span role="columnheader">{te.colArea}</span>
            <span role="columnheader">{te.colFocus}</span>
          </div>
          {te.rows.map((r, i) => (
            <motion.div
              key={r.area}
              className="tech-row"
              role="row"
              style={{ '--accent': ACCENTS[i] }}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease }}
            >
              <span className="tech-area" role="cell">
                <i />
                {r.area}
              </span>
              <span className="tech-focus" role="cell">
                {r.focus.map((f, j) => (
                  <motion.span
                    key={f}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.06 + j * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {f}
                  </motion.span>
                ))}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   Engagement models
   ========================================================= */
const OFFER_ICONS = [Briefcase, Wrench, Headset]

export function Offer() {
  const { t, lang } = useLang()
  const of = t.offer
  return (
    <section className="section" id="offer">
      <div className="container">
        <SectionHead key={lang} eyebrow={of.eyebrow} title={of.title} gradientWords={of.gradientWords} center />
        <div className="offer-grid">
          {of.items.map((it, i) => {
            const Icon = OFFER_ICONS[i]
            const featured = i === 1
            return (
              <motion.div
                key={i}
                className={`offer-card${featured ? ' featured' : ''}`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease }}
                whileHover={{ y: -10 }}
              >
                {featured && <span className="offer-badge">{of.popular}</span>}
                <div className="offer-ic">
                  <Icon size={24} />
                </div>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
                <ul>
                  {it.points.map((p) => (
                    <li key={p}>
                      <Check size={15} strokeWidth={3} /> {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`btn ${featured ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={(e) => go(e, 'contact')}
                >
                  {of.cta} <ArrowRight size={16} className="arrow" />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   Testimonials
   ========================================================= */
export function Testimonials() {
  const { t, lang } = useLang()
  const ts = t.testimonials
  const total = ts.items.length
  const [[index, dir], setState] = useState([0, 1])
  const [paused, setPaused] = useState(false)

  const step = (d) => setState(([i]) => [(i + d + total) % total, d])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => step(1), 6000)
    return () => clearInterval(id)
  }, [paused, index])

  const item = ts.items[index]

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <SectionHead key={lang} eyebrow={ts.eyebrow} title={ts.title} gradientWords={ts.gradientWords} center />
        <Reveal className="testi-wrap" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="testi-card">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={`${lang}-${index}`}
                custom={dir}
                initial={{ opacity: 0, x: dir * 80, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: dir * -80, filter: 'blur(8px)' }}
                transition={{ duration: 0.55, ease }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) step(1)
                  else if (info.offset.x > 60) step(-1)
                }}
                style={{ cursor: 'grab' }}
              >
                <Quote size={40} className="quote-ic" />
                <p className="testi-text">“{item.quote}”</p>
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2 + i * 0.06, type: 'spring', stiffness: 300 }}
                    >
                      <Star size={18} fill="currentColor" />
                    </motion.span>
                  ))}
                </div>
                <div className="testi-person">
                  <div className="avatar">
                    {item.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <b>{item.name}</b>
                    <small>{item.role}</small>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="testi-controls">
            <motion.button className="icon-btn" aria-label={ts.prev} whileTap={{ scale: 0.9 }} onClick={() => step(-1)}>
              <ChevronLeft size={20} />
            </motion.button>
            <div className="dots">
              {ts.items.map((_, i) => (
                <motion.button
                  key={i}
                  aria-label={`${i + 1}`}
                  className={i === index ? 'active' : ''}
                  animate={{ width: i === index ? 32 : 8 }}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                />
              ))}
            </div>
            <motion.button className="icon-btn" aria-label={ts.next} whileTap={{ scale: 0.9 }} onClick={() => step(1)}>
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================
   CTA band
   ========================================================= */
export function CtaBand() {
  const { t, lang } = useLang()
  return (
    <section style={{ padding: '0 0 40px' }}>
      <div className="container">
        <motion.div
          className="cta-band"
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
        >
          <h2>
            <SplitText key={lang} text={t.cta.title} />
          </h2>
          <p>{t.cta.text}</p>
          <Magnetic>
            <motion.a
              href="#contact"
              className="btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => go(e, 'contact')}
            >
              {t.cta.button} <ArrowRight size={18} className="arrow" />
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}

/* =========================================================
   Contact
   ========================================================= */
const CONTACT_LINKS = [
  { Icon: Mail, href: 'mailto:hello@digimates.com' },
  { Icon: MessageCircle, href: 'https://wa.me/490000000000', cls: 'whatsapp' },
  { Icon: CalendarDays, href: '#' },
]

export function Contact() {
  const { t, lang } = useLang()
  const c = t.contact
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // TODO: connect to a real form endpoint (email notifications)
    setTimeout(() => setStatus('sent'), 1600)
  }

  return (
    <section className="section" id="contact">
      <div className="container contact-grid">
        <div className="contact-info">
          <Reveal y={20}>
            <span className="eyebrow">
              <span className="dot" /> {c.eyebrow}
            </span>
          </Reveal>
          <h2>
            <SplitText key={lang} text={c.title} gradientWords={c.gradientWords} />
          </h2>
          <Reveal delay={0.15}>
            <p>{c.text}</p>
          </Reveal>
          <div className="contact-cards">
            {CONTACT_LINKS.map(({ Icon, href, cls }, i) => (
              <Reveal key={i} delay={0.1 * i} x={-30} y={0}>
                <motion.a
                  href={href}
                  className={`contact-card ${cls ?? ''}`}
                  whileHover={{ x: 6 }}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  <span className="c-ic">
                    <Icon size={20} />
                  </span>
                  <div>
                    <small>{c.cards[i].label}</small>
                    <b>{c.cards[i].value}</b>
                  </div>
                  <ArrowUpRight size={18} className="go" />
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2} y={60}>
          <div className="contact-form">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="ok"
                  className="form-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <motion.div
                    className="ok"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                  >
                    <Check size={36} strokeWidth={3} />
                  </motion.div>
                  <h3>{c.successTitle}</h3>
                  <p>{c.successText}</p>
                  <button
                    className="btn btn-ghost"
                    style={{ marginTop: 24, width: 'auto' }}
                    onClick={() => setStatus('idle')}
                  >
                    {c.again}
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0, y: -20 }}>
                  <div className="form-row">
                    <div className="field">
                      <input id="name" name="name" placeholder=" " required />
                      <label htmlFor="name">{c.fields.name}</label>
                    </div>
                    <div className="field">
                      <input id="email" name="email" type="email" placeholder=" " required />
                      <label htmlFor="email">{c.fields.email}</label>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field">
                      <input id="company" name="company" placeholder=" " />
                      <label htmlFor="company">{c.fields.company}</label>
                    </div>
                    <div className="field">
                      <select id="service" name="service" defaultValue="0">
                        {t.services.items.map((s, i) => (
                          <option key={i} value={i}>
                            {s.title}
                          </option>
                        ))}
                        <option value="other">{c.fields.other}</option>
                      </select>
                      <label htmlFor="service">{c.fields.service}</label>
                    </div>
                  </div>
                  <div className="field">
                    <textarea id="message" name="message" placeholder=" " required />
                    <label htmlFor="message">{c.fields.message}</label>
                  </div>
                  <label className="consent">
                    <input type="checkbox" required />
                    <span>
                      {c.consentPre}
                      <a href="#datenschutz">{t.footer.privacy}</a>.
                    </span>
                  </label>
                  <motion.button
                    className="btn btn-primary"
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {status === 'sending' ? (
                      <span key="sending" className="btn-content">
                        <LoaderCircle size={18} className="spin" /> <span>{c.sending}</span>
                      </span>
                    ) : (
                      <span key="send" className="btn-content">
                        <span>{c.send}</span> <Send size={16} className="arrow" />
                      </span>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================
   Footer
   ========================================================= */
export function Footer() {
  const { t } = useLang()
  const f = t.footer
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], [120, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <footer className="footer" ref={ref}>
      <div className="container">
        <div className="footer-top">
          <div className="footer-about">
            <a href="#top" className="brand" onClick={(e) => go(e, 'top')}>
              <LogoMark size={30} title="" /> Digimates
            </a>
            <p>{f.about}</p>
            <div className="socials">
              {SOCIALS.map((s) => (
                <motion.a key={s.label} href="#" aria-label={s.label} whileHover={{ y: -4 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h5>{f.nav}</h5>
            <ul>
              {NAV_IDS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={(e) => go(e, id)}>
                    {t.nav.links[id]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>{f.services}</h5>
            <ul>
              {t.services.items.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <a href="#services" onClick={(e) => go(e, 'services')}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>{f.legal}</h5>
            <ul>
              <li>
                <a href="#impressum" id="impressum">
                  {f.impressum}
                </a>
              </li>
              <li>
                <a href="#datenschutz" id="datenschutz">
                  {f.privacy}
                </a>
              </li>
              <li>
                <a href="#cookies">{f.cookies}</a>
              </li>
            </ul>
          </div>
        </div>

        <motion.div className="footer-giant" style={{ y, opacity }}>
          Digimates
        </motion.div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Digimates. {f.rights}
          </span>
          <nav>
            <a href="#impressum">{f.impressum}</a>
            <a href="#datenschutz">{f.privacy}</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
