import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import AnnouncementBar from './components/AnnouncementBar'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import BestSellers from './components/BestSellers'
import WhySunkey from './components/WhySunkey'
import Ingredients from './components/Ingredients'
import Testimonials from './components/Testimonials'
import InstagramGrid from './components/InstagramGrid'
import Footer from './components/Footer'
import './App.css'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <div className="app">
      <Navbar />
      <AnnouncementBar />
      <Hero />
      <MarqueeStrip />
      <BestSellers />
      <WhySunkey />
      <Ingredients />
      <Testimonials />
      <InstagramGrid />
      <Footer />
    </div>
  )
}

export default App
