import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './AnnouncementBar.css'

const announcements = [
  '✦ Buy Lip Oil & Get Hydro Moisturiser SPF 30 FREE — Shop Now',
  '✦ Free Shipping on orders above ₹900 — Automatic at checkout',
  '✦ New Launch: Jeju Mineral SPF 50+ — No White Cast, Safe for all skin tones',
]

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + announcements.length) % announcements.length)
  const next = () => setIndex((i) => (i + 1) % announcements.length)

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="announcement">
      <button className="announcement__arrow announcement__arrow--left" onClick={prev} aria-label="Previous">
        ‹
      </button>

      <div className="announcement__track">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            className="announcement__text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
            {announcements[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      <button className="announcement__arrow announcement__arrow--right" onClick={next} aria-label="Next">
        ›
      </button>
    </div>
  )
}
