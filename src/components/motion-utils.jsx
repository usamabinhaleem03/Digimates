import { useEffect, useRef } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from 'motion/react'

export const ease = [0.22, 1, 0.36, 1]

/** Fade + slide up when scrolled into view */
export function Reveal({ children, delay = 0, y = 40, x = 0, className, as = 'div', ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/** Splits text into words that slide up from a mask, one after another */
export function SplitText({ text, className, delay = 0, stagger = 0.06, gradientWords = [], immediate = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const show = immediate || inView
  const words = text.split(' ')
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span className="split-word" key={i} aria-hidden="true">
          <motion.span
            className={gradientWords.includes(i) ? 'grad-text' : undefined}
            initial={{ y: '110%', rotate: 4 }}
            animate={show ? { y: '0%', rotate: 0 } : {}}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}

/** Counts up to a number when visible */
export function Counter({ to, suffix = '', prefix = '', duration = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  // Write the number straight into the DOM: smoother than re-rendering every
  // frame, and unaffected by browser auto-translate swapping React's text nodes.
  useEffect(() => {
    if (!inView || !ref.current) return
    const el = ref.current
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, to, duration, prefix, suffix])
  return (
    <span ref={ref} translate="no">
      {`${prefix}0${suffix}`}
    </span>
  )
}

/** Element gently follows the cursor while hovered */
export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  )
}

/** 3D tilt card with a cursor-following spotlight */
export function TiltCard({ children, className, max = 10, style, ...rest }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 150, damping: 18 })
  const bg = useTransform(
    [px, py],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, rgba(99,102,241,0.18), transparent 45%)`,
  )

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      {...rest}
    >
      <motion.div className="spot" style={{ background: bg }} />
      {children}
    </motion.div>
  )
}

export function SectionHead({ eyebrow, title, gradientWords, text, center }) {
  return (
    <div className={`section-head${center ? ' center' : ''}`}>
      <Reveal y={20}>
        <span className="eyebrow">
          <span className="dot" />
          {eyebrow}
        </span>
      </Reveal>
      <h2>
        <SplitText text={title} gradientWords={gradientWords} />
      </h2>
      {text && (
        <Reveal delay={0.2} y={20}>
          <p>{text}</p>
        </Reveal>
      )}
    </div>
  )
}
