import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './AnnouncementBar.css'

const announcements = [
  'Buy Lip Oil & Get Hydro Moisturiser SPF 30 FREE — Add both to cart.',
  'Free Shipping on orders above ₹900 — Shop Now!',
  'New Launch: Jeju Mineral SPF 50+ — No White Cast, No Residue.',
]

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + announcements.length) % announcements.length)
  const next = () => setIndex((i) => (i + 1) % announcements.length)

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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
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
