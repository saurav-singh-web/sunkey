import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import './Testimonials.css'

const reviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    avatar: 'PS',
    text: "I have tried countless physical sunscreens and Sunkey is genuinely the only one that doesn't leave a white cast or clog my pores. The water-gel texture is so lightweight — my skin just drinks it up!",
    product: 'Hydro Mineral Sunscreen SPF 50+',
    color: '#F5D3C5',
  },
  {
    id: 2,
    name: 'Rohan Menon',
    location: 'Bangalore',
    rating: 5,
    avatar: 'RM',
    text: "Absolute game changer for my oily, sensitive skin. I've been using it daily for 3 months now. It controls grease, protects against intense sun, and has a very clean finish. 10/10.",
    product: 'Jeju Mineral Glow Sunscreen',
    color: '#E6EFEA',
  },
  {
    id: 3,
    name: 'Dr. Ananya Reddy',
    location: 'Hyderabad',
    rating: 5,
    avatar: 'AR',
    text: "As a clinical dermatologist, I am highly critical of skincare claims. Sunkey checks all the boxes: mineral filters, non-comedogenic, reef-safe, and zero sensitization. My patients love it.",
    product: 'Hydro Mineral Sunscreen SPF 50+',
    color: '#FBE6B8',
  },
  {
    id: 4,
    name: 'Kavya Nair',
    location: 'Kochi',
    rating: 5,
    avatar: 'KN',
    text: "The Tomato Lip SPF Oil is everything! My lips feel instantly plumped, glassy, and completely shielded from sun cracks. I take it everywhere. A summer handbag essential!",
    product: 'Tomato Extract Lip SPF Oil',
    color: '#FAF0E6',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  const prev = () => setActive((i) => (i - 1 + reviews.length) % reviews.length)
  const next = () => setActive((i) => (i + 1) % reviews.length)

  // Drag handler to cycle cards on swipe
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 60
    if (info.offset.x < -swipeThreshold) {
      next()
    } else if (info.offset.x > swipeThreshold) {
      prev()
    }
  }

  return (
    <section className="testimonials" id="reviews">
      {/* Header & Rating Viz */}
      <div className="testimonials__header-container">
        <div ref={titleRef} className="testimonials__header">
          <motion.p
            className="section-tag"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Customer Love
          </motion.p>
          <motion.h2
            className="testimonials__title heading-serif"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Real Skin, Real Results
          </motion.h2>
        </div>

        {/* E-Commerce Review Panel */}
        <motion.div
          className="testimonials__rating-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Big Score Card */}
          <div className="rating-panel__score-card">
            <h3 className="rating-panel__big-num">4.9</h3>
            <div className="rating-panel__stars">★★★★★</div>
            <p className="rating-panel__reviews-count">based on 3,120 reviews</p>
          </div>

          {/* Progress Bars */}
          <div className="rating-panel__bars">
            {[
              { stars: 5, pct: 95 },
              { stars: 4, pct: 4 },
              { stars: 3, pct: 1 },
              { stars: 2, pct: 0 },
              { stars: 1, pct: 0 },
            ].map((row) => (
              <div key={row.stars} className="rating-bar-row">
                <span className="rating-bar-label">{row.stars} ★</span>
                <div className="rating-bar-bg">
                  <div className="rating-bar-fill" style={{ width: `${row.pct}%` }} />
                </div>
                <span className="rating-bar-pct">{row.pct}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Draggable Deck Carousel */}
      <div className="testimonials__carousel-wrap">
        <div 
          className="testimonials__track"
          data-cursor="drag"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="testimonials__card"
              style={{ '--review-color': reviews[active].color }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, x: 120, rotate: 6, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, x: -120, rotate: -6, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              whileDrag={{ scale: 0.98, cursor: 'grabbing' }}
            >
              {/* Quote Mark Decoration */}
              <span className="testimonials__quote">“</span>

              {/* Stars */}
              <div className="testimonials__stars">
                {'★'.repeat(reviews[active].rating)}
              </div>

              {/* Text */}
              <p className="testimonials__text">"{reviews[active].text}"</p>

              {/* Product Badge */}
              <div className="testimonials__badge-row">
                <span className="testimonials__purchase-badge">Verified purchase</span>
                <span className="testimonials__product">{reviews[active].product}</span>
              </div>

              {/* Author Row */}
              <div className="testimonials__author">
                <div className="testimonials__avatar" style={{ background: reviews[active].color }}>
                  {reviews[active].avatar}
                </div>
                <div>
                  <p className="testimonials__name">{reviews[active].name}</p>
                  <p className="testimonials__location">{reviews[active].location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Buttons */}
        <button className="testimonials__nav-btn testimonials__nav-btn--prev" onClick={prev} aria-label="Previous review">
          ‹
        </button>
        <button className="testimonials__nav-btn testimonials__nav-btn--next" onClick={next} aria-label="Next review">
          ›
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="testimonials__dots">
        {reviews.map((_, i) => (
          <motion.button
            key={i}
            className={`testimonials__dot ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Review ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
