import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from 'motion/react'
import {
  Check,
  ArrowRight,
  ArrowUpRight,
  CodeXml,
  Palette,
  Search,
  Megaphone,
  Smartphone,
  ChartLine,
  Zap,
  ShieldCheck,
  HeartHandshake,
  Gauge,
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  Mail,
  MessageCircle,
  CalendarDays,
  Send,
  LoaderCircle,
  Hexagon,
  Triangle,
  Circle,
  Square,
  Diamond,
  Pentagon,
} from 'lucide-react'
import LogoMark from './Logo'
import {
  Reveal,
  SplitText,
  Counter,
  TiltCard,
  SectionHead,
  Magnetic,
  ease,
} from './motion-utils'
import { scrollToId } from './Effects'
import { NAV_LINKS } from './Navbar'

/* =========================================================
   Trusted-by logo marquee
   ========================================================= */
const LOGOS = [
  { name: 'Loremix', Icon: Hexagon },
  { name: 'Ipsumly', Icon: Triangle },
  { name: 'Dolorio', Icon: Circle },
  { name: 'Ametra', Icon: Square },
  { name: 'Consecta', Icon: Diamond },
  { name: 'Elitbase', Icon: Pentagon },
]

export function LogoMarquee() {
  const row = [...LOGOS, ...LOGOS]
  return (
    <div className="marquee-wrap">
      <p className="marquee-label">Trusted by forward-thinking teams</p>
      <div className="marquee">
        <motion.div
          className="marquee-track"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {row.map(({ name, Icon }, i) => (
            <span className="logo-item" key={i}>
              <Icon size={24} /> {name}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* =========================================================
   About
   ========================================================= */
export function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-25, 25])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9])

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container about-grid">
        <Reveal className="about-visual" y={60}>
          {[90, 70, 50].map((s, i) => (
            <motion.div
              key={s}
              className="ring"
              style={{ width: `${s}%`, aspectRatio: 1 }}
              animate={{ rotate: i % 2 ? -360 : 360, scale: [1, 1.04, 1] }}
              transition={{
                rotate: { duration: 30 + i * 10, repeat: Infinity, ease: 'linear' },
                scale: { duration: 4, repeat: Infinity, delay: i * 0.5 },
              }}
            />
          ))}
          <motion.div className="mark" style={{ rotate, scale }}>
            <LogoMark size={150} />
          </motion.div>
          <div className="about-badge">
            <div>
              <strong className="grad-text">
                <Counter to={250} suffix="+" />
              </strong>
              <br />
              <span>Lorem ipsum launches</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <strong>
                <Counter to={15} />
              </strong>
              <br />
              <span>Countries served</span>
            </div>
          </div>
        </Reveal>

        <div className="about-text">
          <Reveal y={20}>
            <span className="eyebrow">
              <span className="dot" /> About Digimates
            </span>
          </Reveal>
          <h2>
            <SplitText text="Your digital mates, from idea to launch" gradientWords={[1, 2]} />
          </h2>
          <Reveal delay={0.15}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae
              vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac erat ante.
            </p>
            <p>
              Curabitur pretium tincidunt lacus, nulla gravida orci a odio. Nullam varius, turpis et
              commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
            </p>
          </Reveal>

          <ul className="check-list">
            {['Strategy-first approach', 'Pixel-perfect design', 'Fast, secure code', 'Ongoing support'].map(
              (t, i) => (
                <Reveal as="li" key={t} delay={0.1 * i} x={-20} y={0}>
                  <span className="tick">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {t}
                </Reveal>
              ),
            )}
          </ul>

          <div className="about-stats">
            {[
              { to: 12, s: '+', l: 'Team members' },
              { to: 40, s: '+', l: 'Industries' },
              { to: 4.9, s: '', l: 'Avg. rating', raw: '4.9' },
            ].map((s, i) => (
              <Reveal className="stat-box" key={s.l} delay={0.1 * i} y={30}>
                <strong className="grad-text">
                  {s.raw ? s.raw : <Counter to={s.to} suffix={s.s} />}
                </strong>
                <span>{s.l}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   Services
   ========================================================= */
const SERVICES = [
  { Icon: CodeXml, title: 'Web Development', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.' },
  { Icon: Palette, title: 'UI / UX Design', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.' },
  { Icon: Search, title: 'SEO Optimisation', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.' },
  { Icon: Megaphone, title: 'Digital Marketing', text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.' },
  { Icon: Smartphone, title: 'Mobile Apps', text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.' },
  { Icon: ChartLine, title: 'Analytics & Growth', text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.' },
]

export function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHead
          eyebrow="What we do"
          title="Services built to move your business forward"
          gradientWords={[4, 5]}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio praesent libero sed cursus ante dapibus diam."
          center
        />
        <div className="services-grid">
          {SERVICES.map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.12, ease }}
            >
              <TiltCard className="service-card" max={8}>
                <span className="num">0{i + 1}</span>
                <motion.div
                  className="icon"
                  whileHover={{ rotate: [0, -12, 12, 0], scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon size={26} />
                </motion.div>
                <h3>{title}</h3>
                <p>{text}</p>
                <a
                  href="#contact"
                  className="more"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId('contact')
                  }}
                >
                  Learn more <ArrowUpRight size={16} />
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   Why us + How it works
   ========================================================= */
const BENEFITS = [
  { Icon: Zap, title: 'Lightning fast', text: 'Lorem ipsum dolor sit amet consectetur adipiscing.' },
  { Icon: ShieldCheck, title: 'Secure & GDPR', text: 'Sed do eiusmod tempor incididunt ut labore.' },
  { Icon: Gauge, title: 'SEO-ready', text: 'Ut enim ad minim veniam, quis nostrud.' },
  { Icon: HeartHandshake, title: 'Real support', text: 'Duis aute irure dolor in reprehenderit.' },
]

const STEPS = [
  { title: 'Discover', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { title: 'Design', text: 'Sed do eiusmod tempor incididunt ut labore et dolore.' },
  { title: 'Develop', text: 'Ut enim ad minim veniam, quis nostrud exercitation.' },
  { title: 'Launch', text: 'Duis aute irure dolor in reprehenderit in voluptate.' },
]

export function Process() {
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
    <section className="section" id="process" style={{ background: 'linear-gradient(180deg, transparent, rgba(59,130,246,0.04), transparent)' }}>
      <div className="container">
        <SectionHead
          eyebrow="Why us"
          title="A simple process with zero headaches"
          gradientWords={[3, 4]}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor."
        />

        <div className="benefits">
          {BENEFITS.map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              className="benefit"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              whileHover={{ y: -8, borderColor: 'rgba(34,211,238,0.4)' }}
            >
              <div className="b-ic">
                <Icon size={22} />
              </div>
              <h4>{title}</h4>
              <p>{text}</p>
            </motion.div>
          ))}
        </div>

        <div className="process" ref={ref}>
          <div className="process-line">
            <motion.div style={vertical ? { scaleY: progress } : { scaleX: progress }} />
          </div>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
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
   Testimonials
   ========================================================= */
const TESTIMONIALS = [
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Digimates delivered our website ahead of schedule and our enquiries have doubled since launch.',
    name: 'Anna Müller',
    role: 'CEO, Loremix GmbH',
  },
  {
    quote:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem. The team understood our brand instantly and the animations feel premium.',
    name: 'Jonas Weber',
    role: 'Founder, Ipsumly',
  },
  {
    quote:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur. Clear communication, fast turnaround and a website our customers love.',
    name: 'Sara Klein',
    role: 'Marketing Lead, Dolorio',
  },
]

export function Testimonials() {
  const [[index, dir], setState] = useState([0, 1])
  const [paused, setPaused] = useState(false)

  const go = (d) =>
    setState(([i]) => [(i + d + TESTIMONIALS.length) % TESTIMONIALS.length, d])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => go(1), 6000)
    return () => clearInterval(t)
  }, [paused, index])

  const t = TESTIMONIALS[index]

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <SectionHead
          eyebrow="Testimonials"
          title="Loved by the people we work with"
          gradientWords={[0]}
          center
        />
        <Reveal
          className="testi-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="testi-card">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 80, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: dir * -80, filter: 'blur(8px)' }}
                transition={{ duration: 0.55, ease }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1)
                  else if (info.offset.x > 60) go(-1)
                }}
                style={{ cursor: 'grab' }}
              >
                <Quote size={40} className="quote-ic" />
                <p className="testi-text">“{t.quote}”</p>
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
                    {t.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <b>{t.name}</b>
                    <small>{t.role}</small>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="testi-controls">
            <motion.button className="icon-btn" aria-label="Previous" whileTap={{ scale: 0.9 }} onClick={() => go(-1)}>
              <ChevronLeft size={20} />
            </motion.button>
            <div className="dots">
              {TESTIMONIALS.map((_, i) => (
                <motion.button
                  key={i}
                  aria-label={`Testimonial ${i + 1}`}
                  className={i === index ? 'active' : ''}
                  animate={{ width: i === index ? 32 : 8 }}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                />
              ))}
            </div>
            <motion.button className="icon-btn" aria-label="Next" whileTap={{ scale: 0.9 }} onClick={() => go(1)}>
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
            <SplitText text="Ready to start your project?" />
          </h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Send us your idea and we'll start the same day.</p>
          <Magnetic>
            <motion.a
              href="#contact"
              className="btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault()
                scrollToId('contact')
              }}
            >
              Let's talk <ArrowRight size={18} className="arrow" />
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
const CONTACT_CARDS = [
  { Icon: Mail, label: 'Email us', value: 'hello@digimates.com', href: 'mailto:hello@digimates.com' },
  { Icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us instantly', href: 'https://wa.me/490000000000', cls: 'whatsapp' },
  { Icon: CalendarDays, label: 'Book a call', value: 'Pick a free 30-min slot', href: '#' },
]

export function Contact() {
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
              <span className="dot" /> Contact
            </span>
          </Reveal>
          <h2>
            <SplitText text="Let's build something great together" gradientWords={[3, 4]} />
          </h2>
          <Reveal delay={0.15}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tell us about your project and
              we'll reply within 24 hours.
            </p>
          </Reveal>
          <div className="contact-cards">
            {CONTACT_CARDS.map(({ Icon, label, value, href, cls }, i) => (
              <Reveal key={label} delay={0.1 * i} x={-30} y={0}>
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
                    <small>{label}</small>
                    <b>{value}</b>
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
                  <h3>Message sent!</h3>
                  <p>Thanks for reaching out — lorem ipsum, we'll get back to you shortly.</p>
                  <button className="btn btn-ghost" style={{ marginTop: 24, width: 'auto' }} onClick={() => setStatus('idle')}>
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0, y: -20 }}>
                  <div className="form-row">
                    <div className="field">
                      <input id="name" name="name" placeholder=" " required />
                      <label htmlFor="name">Your name</label>
                    </div>
                    <div className="field">
                      <input id="email" name="email" type="email" placeholder=" " required />
                      <label htmlFor="email">Email address</label>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field">
                      <input id="company" name="company" placeholder=" " />
                      <label htmlFor="company">Company</label>
                    </div>
                    <div className="field">
                      <select id="service" name="service" defaultValue="Web Development">
                        {SERVICES.map((s) => (
                          <option key={s.title}>{s.title}</option>
                        ))}
                        <option>Something else</option>
                      </select>
                      <label htmlFor="service">Service</label>
                    </div>
                  </div>
                  <div className="field">
                    <textarea id="message" name="message" placeholder=" " required />
                    <label htmlFor="message">Tell us about your project</label>
                  </div>
                  <label className="consent">
                    <input type="checkbox" required />
                    <span>
                      I agree that my data will be processed to answer my enquiry. See{' '}
                      <a href="#datenschutz">Datenschutz</a>.
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
                      <>
                        <LoaderCircle size={18} className="spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send message <Send size={16} className="arrow" />
                      </>
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
const SOCIALS = [
  {
    label: 'LinkedIn',
    path: 'M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.5 0h4.37v1.92h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7v7.45h-4.56v-6.6c0-1.58-.03-3.6-2.2-3.6-2.2 0-2.53 1.71-2.53 3.48V22H7.72V8z',
  },
  {
    label: 'Instagram',
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z',
  },
  {
    label: 'Facebook',
    path: 'M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z',
  },
  {
    label: 'X',
    path: 'M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41z',
  },
]

export function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], [120, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  const go = (e, id) => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <footer className="footer" ref={ref}>
      <div className="container">
        <div className="footer-top">
          <div className="footer-about">
            <a href="#top" className="brand" onClick={(e) => go(e, 'top')}>
              <LogoMark size={30} title="" /> Digimates
            </a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Digital solutions that turn visitors into customers.</p>
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
            <h5>Navigation</h5>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} onClick={(e) => go(e, l.id)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Services</h5>
            <ul>
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.title}>
                  <a href="#services" onClick={(e) => go(e, 'services')}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Legal</h5>
            <ul>
              <li><a href="#impressum" id="impressum">Impressum</a></li>
              <li><a href="#datenschutz" id="datenschutz">Datenschutz</a></li>
              <li><a href="#cookies">Cookie settings</a></li>
            </ul>
          </div>
        </div>

        <motion.div className="footer-giant" style={{ y, opacity }}>
          Digimates
        </motion.div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Digimates. All rights reserved.</span>
          <nav>
            <a href="#impressum">Impressum</a>
            <a href="#datenschutz">Datenschutz</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
