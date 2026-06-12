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
    text: 'I have tried countless sunscreens and Sunkey is genuinely the only one that doesn\'t give me white cast or make me look like a ghost. The texture is SO light — my skin just drinks it up!',
    product: 'Hydro Mineral Sunscreen SPF 50+',
    color: '#b2ecf7',
  },
  {
    id: 2,
    name: 'Riya Menon',
    location: 'Bangalore',
    rating: 5,
    avatar: 'RM',
    text: 'Game changer for my oily skin. I\'ve been using it for 3 months and my skin has never looked better. It controls oil, protects from sun AND smells amazing. 10/10 would recommend.',
    product: 'Jeju Mineral Glow Sunscreen',
    color: '#d4f7b2',
  },
  {
    id: 3,
    name: 'Ananya Reddy',
    location: 'Hyderabad',
    rating: 5,
    avatar: 'AR',
    text: 'As a dermatologist I\'m very picky about recommending products. Sunkey checks every box — mineral-based, non-comedogenic, reef-safe, and it actually works. My patients love it.',
    product: 'Hydro Mineral Sunscreen SPF 50+',
    color: '#ffeab2',
  },
  {
    id: 4,
    name: 'Kavya Nair',
    location: 'Kochi',
    rating: 5,
    avatar: 'KN',
    text: 'The Lip SPF Oil is everything! My lips are so hydrated and protected. I use it before going to the beach and it\'s the only thing that\'s kept my lips from getting burnt. A must-have!',
    product: 'Tomato Extract Lip SPF Oil',
    color: '#f7c5b2',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  const prev = () => setActive((i) => (i - 1 + reviews.length) % reviews.length)
  const next = () => setActive((i) => (i + 1) % reviews.length)

  return (
    <section className="testimonials" id="reviews">
      {/* Header */}
      <div ref={titleRef} className="testimonials__header">
        <motion.p
          className="section-tag"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Customer Love
        </motion.p>
        <motion.h2
          className="testimonials__title"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Real Skin, Real Results
        </motion.h2>

        {/* Aggregate rating */}
        <motion.div
          className="testimonials__aggregate"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <span className="testimonials__big-star">★★★★★</span>
          <span className="testimonials__agg-score">4.9 / 5</span>
          <span className="testimonials__agg-count">from 3,100+ reviews</span>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="testimonials__carousel">
        {/* Nav dots left */}
        <button className="testimonials__nav-btn" onClick={prev} aria-label="Previous review">‹</button>

        <div className="testimonials__track">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="testimonials__card"
              style={{ '--review-color': reviews[active].color }}
              initial={{ opacity: 0, x: 60, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Quote mark */}
              <span className="testimonials__quote">"</span>

              {/* Stars */}
              <div className="testimonials__stars">
                {'★'.repeat(reviews[active].rating)}
              </div>

              {/* Text */}
              <p className="testimonials__text">{reviews[active].text}</p>

              {/* Product */}
              <p className="testimonials__product">Verified purchase · {reviews[active].product}</p>

              {/* Author */}
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

        <button className="testimonials__nav-btn" onClick={next} aria-label="Next review">›</button>
      </div>

      {/* Dots */}
      <div className="testimonials__dots">
        {reviews.map((_, i) => (
          <motion.button
            key={i}
            className={`testimonials__dot ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Review ${i + 1}`}
          />
        ))}
      </div>

      {/* Background cards */}
      <div className="testimonials__bg-cards">
        {reviews.map((r, i) => (
          i !== active && (
            <div
              key={r.id}
              className="testimonials__bg-card"
              style={{ '--review-color': r.color, '--i': i }}
            />
          )
        ))}
      </div>
    </section>
  )
}
