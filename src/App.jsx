import Navbar from './section/Navbar'
import Hero from './section/Hero'
import About from './section/About'
import Projects from './section/Projects'
import Exp from './section/Exp'
import Contact from './section/Contact'
import Footer from './section/Footer'
import { useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import Testimonials from './section/Testimonial'
import LinkedInProfilePostsWidget from './components/LinkedInPost'


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
      {/* experience */}
      <Exp />
      {/* projects */}
      <Projects />

      {/* contact */}
      <Contact />
      {/* footer */}
      <LinkedInProfilePostsWidget/>
      <Footer />
    </div>

  )
}

export default App