import { useCallback, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import {
  LogoMarquee,
  About,
  Services,
  Process,
  Testimonials,
  CtaBand,
  Contact,
  Footer,
} from './components/Sections'
import {
  Preloader,
  ScrollProgress,
  CursorGlow,
  BackToTop,
  CookieBanner,
  useSmoothScroll,
} from './components/Effects'

export default function App() {
  const [ready, setReady] = useState(false)
  const done = useCallback(() => setReady(true), [])
  useSmoothScroll(ready)

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!ready && <Preloader key="pre" onDone={done} />}</AnimatePresence>
      <ScrollProgress />
      <CursorGlow />
      <Navbar ready={ready} />
      <main>
        <Hero ready={ready} />
        <LogoMarquee />
        <About />
        <Services />
        <Process />
        <Testimonials />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <CookieBanner ready={ready} />
    </MotionConfig>
  )
}
