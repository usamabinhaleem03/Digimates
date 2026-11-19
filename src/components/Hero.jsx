import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'motion/react'
import { ArrowRight, Play, Rocket, TrendingUp, Sparkles } from 'lucide-react'
import { SplitText, Counter, ease } from './motion-utils'
import { scrollToId } from './Effects'

/* Node graph inspired by the Digimates "D" mark */
const NODES = [
  [250, 112],
  [318, 182],
  [304, 268],
  [238, 306],
  [236, 200],
  [188, 252],
]
const EDGES = [
  [0, 4],
  [4, 1],
  [1, 2],
  [4, 5],
  [5, 3],
  [0, 1],
  [2, 3],
  [4, 2],
]
const BARS = [
  { x: 74, h: 70 },
  { x: 112, h: 150 },
  { x: 150, h: 215 },
]

function NetworkVisual({ ready }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 80, damping: 15 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 80, damping: 15 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const d0 = 0.5 // base delay after preloader

  return (
    <motion.div
      className="hero-visual"
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={ready ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.2, delay: 0.3, ease }}
    >
      <motion.div
        className="orbit"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      <div className="orbit orbit-2" />

      <svg className="network" viewBox="0 0 400 400" fill="none">
        <defs>
          <linearGradient id="g-main" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="55%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="g-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Bars rising */}
        {BARS.map((b, i) => (
          <g key={i}>
            <motion.rect
              x={b.x}
              width="20"
              rx="10"
              fill="url(#g-bar)"
              initial={{ height: 0, y: 330 }}
              animate={ready ? { height: b.h, y: 330 - b.h } : {}}
              transition={{ duration: 1.1, delay: d0 + i * 0.15, ease }}
            />
            <motion.circle
              cx={b.x + 10}
              r="10"
              fill="#22d3ee"
              filter="url(#glow)"
              initial={{ cy: 330, opacity: 0 }}
              animate={ready ? { cy: 330 - b.h - 24, opacity: 1 } : {}}
              transition={{ duration: 1.1, delay: d0 + i * 0.15, ease }}
            />
          </g>
        ))}

        {/* D outline */}
        <motion.path
          d="M188 88 H222 A112 112 0 0 1 222 312 H188 V88"
          stroke="url(#g-main)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={ready ? { pathLength: 1 } : {}}
          transition={{ duration: 1.8, delay: d0 + 0.2, ease: 'easeInOut' }}
        />

        {/* Edges */}
        {EDGES.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
            stroke="url(#g-main)"
            strokeWidth="2.5"
            strokeOpacity="0.7"
            initial={{ pathLength: 0 }}
            animate={ready ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay: d0 + 1 + i * 0.08 }}
          />
        ))}

        {/* Data packets travelling along edges */}
        {EDGES.slice(0, 5).map(([a, b], i) => (
          <motion.circle
            key={`p${i}`}
            r="3.5"
            fill="#fff"
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={
              ready
                ? {
                    cx: [NODES[a][0], NODES[b][0]],
                    cy: [NODES[a][1], NODES[b][1]],
                    opacity: [0, 1, 0],
                  }
                : {}
            }
            transition={{
              duration: 1.8,
              delay: d0 + 2 + i * 0.5,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Nodes */}
        {NODES.map(([x, y], i) => (
          <g key={`n${i}`}>
            <motion.circle
              cx={x}
              cy={y}
              r="13"
              fill="#8b5cf6"
              opacity="0.35"
              animate={ready ? { r: [13, 22, 13], opacity: [0.35, 0, 0.35] } : {}}
              transition={{ duration: 2.6, delay: d0 + 1.5 + i * 0.3, repeat: Infinity }}
            />
            <motion.circle
              cx={x}
              cy={y}
              r="11"
              fill="url(#g-main)"
              stroke="#0a0e1c"
              strokeWidth="3"
              initial={{ scale: 0 }}
              animate={ready ? { scale: 1 } : {}}
              style={{ transformOrigin: `${x}px ${y}px` }}
              transition={{ type: 'spring', stiffness: 260, damping: 14, delay: d0 + 1.1 + i * 0.1 }}
            />
          </g>
        ))}
      </svg>

      {/* Floating info cards */}
      <motion.div
        className="float-card"
        style={{ top: '6%', left: '-6%' }}
        initial={{ opacity: 0, x: -30 }}
        animate={ready ? { opacity: 1, x: 0, y: [0, -12, 0] } : {}}
        transition={{
          opacity: { delay: 1.6, duration: 0.6 },
          x: { delay: 1.6, duration: 0.6 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <span className="ic">
          <TrendingUp size={18} />
        </span>
        <div>
          <b>+148%</b>
          <small>Lorem conversions</small>
        </div>
      </motion.div>

      <motion.div
        className="float-card"
        style={{ bottom: '8%', right: '-4%' }}
        initial={{ opacity: 0, x: 30 }}
        animate={ready ? { opacity: 1, x: 0, y: [0, 12, 0] } : {}}
        transition={{
          opacity: { delay: 1.9, duration: 0.6 },
          x: { delay: 1.9, duration: 0.6 },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <span className="ic">
          <Rocket size={18} />
        </span>
        <div>
          <b>Live in 10 days</b>
          <small>Ipsum dolor sit</small>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yText = useTransform(scrollYProgress, [0, 1], [0, 160])
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, -80])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 200])

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 30 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease },
  })

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-bg">
        <div className="hero-grid" />
        <motion.div
          className="blob blob-1"
          style={{ y: blobY }}
          animate={{ x: [0, -60, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="blob blob-2"
          animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="blob blob-3"
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.15, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container hero-inner">
        <motion.div style={{ y: yText, opacity: fade }}>
          <motion.span className="eyebrow" {...fadeUp(0.1)}>
            <Sparkles size={14} color="#22d3ee" /> Digital agency · Lorem ipsum
          </motion.span>

          <h1>
            {ready && (
              <SplitText
                text="We build digital experiences that grow your business"
                gradientWords={[2, 3]}
                delay={0.2}
                stagger={0.07}
                immediate
              />
            )}
          </h1>

          <motion.p className="hero-sub" {...fadeUp(0.7)}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua — turning visitors into enquiries.
          </motion.p>

          <motion.div className="hero-actions" {...fadeUp(0.85)}>
              <motion.a
                href="#contact"
                className="btn btn-primary"
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('contact')
                }}
              >
                Start your project <ArrowRight size={18} className="arrow" />
              </motion.a>
              <motion.a
                href="#services"
                className="btn btn-ghost"
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('services')
                }}
              >
                <Play size={16} /> Explore services
              </motion.a>
          </motion.div>

          <motion.div className="hero-stats" {...fadeUp(1)}>
            <div>
              <strong className="grad-text">
                {ready && <Counter to={120} suffix="+" />}
              </strong>
              <span>Projects delivered</span>
            </div>
            <div>
              <strong className="grad-text">{ready && <Counter to={98} suffix="%" />}</strong>
              <span>Happy clients</span>
            </div>
            <div>
              <strong className="grad-text">{ready && <Counter to={7} suffix=" yrs" />}</strong>
              <span>Experience</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: yVisual }}>
          <NetworkVisual ready={ready} />
        </motion.div>
      </div>

      <motion.div
        className="scroll-hint"
        style={{ opacity: fade }}
      >
        <motion.span
          animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}
