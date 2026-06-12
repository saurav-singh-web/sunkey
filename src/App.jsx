import { useState, useEffect } from 'react'
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

// Global Additions
import PageLoader from './components/PageLoader'
import CustomCursor from './components/CustomCursor'
import CartDrawer from './components/CartDrawer'

import './App.css'

function App() {
  const [loaderComplete, setLoaderComplete] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  
  // Initialize cart with two items (matching the legacy count of 2)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Hydro Mineral Sunscreen SPF 50+',
      price: '₹649',
      quantity: 1,
      img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80',
    },
    {
      id: 2,
      name: 'Jeju Mineral Glow Sunscreen',
      price: '₹799',
      quantity: 1,
      img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&q=80',
    }
  ])

  // Cart operations
  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id)
      return
    }
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setCartOpen(true) // Automatically open drawer upon adding an item
  }

  const handleAddRecommendation = (rec) => {
    handleAddToCart({
      id: rec.id,
      name: rec.name,
      price: rec.price,
      img: rec.img
    })
  }

  useEffect(() => {
    if (!loaderComplete) return

    // Smooth scroll setup (only after preloader fades out)
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [loaderComplete])

  return (
    <div className="app">
      {/* Preloader Screen */}
      <PageLoader onComplete={() => setLoaderComplete(true)} />

      {/* Luxury Additions */}
      <CustomCursor />
      
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
        onAddRecommendation={handleAddRecommendation}
      />

      {/* Site Content */}
      {loaderComplete && (
        <>
          <Navbar cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} onCartClick={() => setCartOpen(true)} />
          <AnnouncementBar />
          <Hero />
          <MarqueeStrip />
          <BestSellers onAddToCart={handleAddToCart} />
          <WhySunkey />
          <Ingredients />
          <Testimonials />
          <InstagramGrid />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
