import Navbar from './section/navbar'
import Hero from './section/Hero'
import About from './section/About'
import Projects from './section/Projects'
import Exp from './section/Exp'

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
      <section className='min-h-screen'></section>
      <section className='min-h-screen'></section>
    </div>
    
  )
}

export default App