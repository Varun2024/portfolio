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

const About = lazy(() => import('./section/About'))
const Exp = lazy(() => import('./section/Exp'))
const Projects = lazy(() => import('./section/Projects'))
const Testimonials = lazy(() => import('./section/Testimonial'))
const Contact = lazy(() => import('./section/Contact'))
const Footer = lazy(() => import('./section/Footer'))


const App = () => {
  const lenisRef = useRef()
  const sectionFallback = <SectionLoader label="Loading experience" />

  return (
    <div className='container mx-auto max-w-7xl '>
      {/* navbar */}
      <ReactLenis root ref={lenisRef} />
      <Starfield />
      <Navbar />
      {/* Hero */}
      <Hero />
      <Suspense fallback={sectionFallback}>
        {/* about */}
        <About />
        {/* experience */}
        <Exp />
        {/* projects */}
        <Projects />
        {/* testimonials */}
        <Testimonials />
        {/* contact */}
        <Contact />
        {/* footer */}
        <Footer />
      </Suspense>
      <GameLauncher />
      <AstronautCompanion />
      <Cursor />
      <BootLoader />
    </div>

  )
}

export default App