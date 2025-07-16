import Navbar from './section/navbar'
import Hero from './section/Hero'

const App = () => {
  return (
    <div className='container mx-auto max-w-7xl '>
      {/* navbar */}
      <Navbar />
      {/* Hero */}
      <Hero />
      <section className='min-h-screen'></section>
      <section className='min-h-screen'></section>
      <section className='min-h-screen'></section>
      <section className='min-h-screen'></section>
    </div>
    
  )
}

export default App