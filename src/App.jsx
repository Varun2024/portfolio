import Navbar from './section/Navbar'
import Hero from './section/Hero'
import About from './section/About'
import Projects from './section/Projects'
import Exp from './section/Exp'
import Contact from './section/Contact'
import Footer from './section/Footer'
import { useRef } from 'react'
import { ReactLenis } from 'lenis/react'


const App = () => {
    const lenisRef = useRef()

  return (
    <div className='container mx-auto max-w-7xl '>
      {/* navbar */}
      <ReactLenis root ref={lenisRef}/>
      <Navbar />
      {/* Hero */}
      <Hero />
      {/* about */}
      <About />
      {/* projects */}
      <Projects />
      {/* experience */}
      <Exp />
      {/* contact */}
      <Contact />
      {/* footer */}
      <Footer />
    </div>

  )
}

export default App