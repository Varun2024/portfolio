import Navbar from './section/Navbar'
import Hero from './section/Hero'
import { lazy, Suspense, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import SectionLoader from './components/SectionLoader'
import GameLauncher from './components/GameLauncher'
import Cursor from './components/Cursor'
import BootLoader from './components/BootLoader'
import Starfield from './components/Starfield'
import AstronautCompanion from './components/AstronautCompanion'
import SystemsHUD from './components/SystemsHUD'
import Konami from './components/Konami'
import NotFoundBanner from './components/NotFoundBanner'
import MetricsRibbon from './components/MetricsRibbon'

const About = lazy(() => import('./section/About'))
const Exp = lazy(() => import('./section/Exp'))
const Projects = lazy(() => import('./section/Projects'))
const LogsTeaser = lazy(() => import('./section/LogsTeaser'))
const Testimonials = lazy(() => import('./section/Testimonial'))
const Contact = lazy(() => import('./section/Contact'))
const Footer = lazy(() => import('./section/Footer'))


const App = () => {
  const lenisRef = useRef()
  const sectionFallback = <SectionLoader label="Loading experience" />

  return (
    <div className='container mx-auto max-w-7xl '>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10001] focus:rounded-md focus:border focus:border-[var(--color-aqua)]/60 focus:bg-[var(--color-midnight)] focus:px-3 focus:py-2 focus:font-mono focus:text-sm focus:text-[var(--color-aqua)]"
      >
        Skip to content
      </a>
      {/* navbar */}
      <ReactLenis root ref={lenisRef} />
      <Starfield />
      <Navbar />
      {/* Hero */}
      <Hero />
      <MetricsRibbon />
      <Suspense fallback={sectionFallback}>
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
        {/* footer */}
        <Footer />
      </Suspense>
      <GameLauncher />
      <AstronautCompanion />
      <SystemsHUD />
      <Cursor />
      <BootLoader />
      <Konami />
      <NotFoundBanner />
    </div>

  )
}

export default App