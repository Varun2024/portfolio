import Navbar from './section/Navbar'
import Hero from './section/Hero'
import Footer from './section/Footer'
import { lazy, Suspense, useEffect, useState } from 'react'
import { ReactLenis } from 'lenis/react'
import GameLauncher from './components/GameLauncher'
import Starfield from './components/Starfield'
import AstronautCompanion from './components/AstronautCompanion'
import SystemsHUD from './components/SystemsHUD'
import Konami from './components/Konami'
import NotFoundBanner from './components/NotFoundBanner'

const About = lazy(() => import('./section/About'))
const Exp = lazy(() => import('./section/Exp'))
const Projects = lazy(() => import('./section/Projects'))
const LogsTeaser = lazy(() => import('./section/LogsTeaser'))
const Testimonials = lazy(() => import('./section/Testimonial'))
const Contact = lazy(() => import('./section/Contact'))

// Skip Lenis on touch devices (native scroll already smooth, Lenis fights
// momentum) and when the user asked for reduced motion.
const useSmoothScrollEnabled = () => {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce), (hover: none) and (pointer: coarse)')
    const update = () => setEnabled(!mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return enabled
}

const App = () => {
  const smoothScroll = useSmoothScrollEnabled()

  return (
    <div className='container mx-auto max-w-7xl '>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10001] focus:rounded-md focus:border focus:border-[var(--color-aqua)]/60 focus:bg-[var(--color-midnight)] focus:px-3 focus:py-2 focus:font-mono focus:text-sm focus:text-[var(--color-aqua)]"
      >
        Skip to content
      </a>
      {smoothScroll && <ReactLenis root />}
      <Starfield />
      <Navbar />
      {/* Hero */}
      <Hero />
      <Suspense fallback={null}>
        {/* about */}
        <About />
        {/* experience */}
        <Exp />
        {/* projects */}
        <Projects />
        {/* build logs teaser */}
        <LogsTeaser />
        {/* testimonials */}
        <Testimonials />
        {/* contact */}
        <Contact />
      </Suspense>
      {/* footer */}
      <Footer />
      <GameLauncher />
      <AstronautCompanion />
      <SystemsHUD />
      <Konami />
      <NotFoundBanner />
    </div>

  )
}

export default App