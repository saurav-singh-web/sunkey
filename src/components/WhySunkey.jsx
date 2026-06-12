import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './WhySunkey.css'

const features = [
  {
    icon: '🌿',
    title: '100% Mineral Formula',
    desc: 'Physical UV blockers — Zinc Oxide & Titanium Dioxide — that sit on top of skin for instant, broad-spectrum protection.',
  },
  {
    icon: '✨',
    title: 'Zero White Cast',
    desc: 'Specially micronized minerals blend invisibly into all skin tones. No ghosting, no greasiness.',
  },
  {
    icon: '💧',
    title: 'Ultra-Lightweight',
    desc: 'Water-gel texture that feels weightless on skin. Perfect under makeup or as a standalone step.',
  },
  {
    icon: '🌊',
    title: 'Reef Safe & Eco-Friendly',
    desc: 'Free from oxybenzone and octinoxate. Good for your skin, great for the ocean.',
  },
  {
    icon: '🍅',
    title: 'Antioxidant Supercharge',
    desc: 'Tomato extract, Jeju botanical complex, and Vitamin C protect against free radical damage.',
  },
  {
    icon: '🧪',
    title: 'Dermatologist Tested',
    desc: 'Clinically tested for safety and efficacy. Suitable for sensitive, acne-prone and oily skin types.',
  },
]

export default function WhySunkey() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="why-sunkey" id="about">
      {/* Background decoration */}
      <div className="why-sunkey__bg-deco" />

      <div className="why-sunkey__inner">
        {/* Header */}
        <div ref={titleRef} className="why-sunkey__header">
          <motion.p
            className="section-tag"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Why Choose Us
          </motion.p>
          <motion.h2
            className="why-sunkey__title"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Sunscreen You Can <br />
            <span className="why-sunkey__highlight">Actually Trust</span>
          </motion.h2>
        </div>

        {/* Features grid */}
        <div className="why-sunkey__grid">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="feature-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(69,210,241,0.15)' }}
            >
              <span className="feature-card__icon">{feat.icon}</span>
              <h3 className="feature-card__title">{feat.title}</h3>
              <p className="feature-card__desc">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
