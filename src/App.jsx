import Navbar from './section/navbar'
import Hero from './section/Hero'
import About from './section/About'
import Projects from './section/Projects'
import Exp from './section/Exp'
import Contact from './section/Contact'

const App = () => {
  return (
    <div className='container mx-auto max-w-7xl '>
      {/* navbar */}
      <Navbar />
      {/* Hero */}
      <Hero />
      {/* about */}
      <About/>
      {/* projects */}
      <Projects />
      {/* experience */}
      <Exp/>
      {/* contact */}
      <Contact/>
      {/* footer */}
    </div>
    
  )
}

export default App