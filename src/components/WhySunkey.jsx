import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './WhySunkey.css'

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: '100% Mineral Formula',
    desc: 'Physical UV blockers — Zinc Oxide & Titanium Dioxide — that sit on top of skin for instant, broad-spectrum protection.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
    title: 'Zero White Cast',
    desc: 'Specially micronized physical minerals blend invisibly into all skin tones. No ghosting, no greasiness.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22a7 7 0 007-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 007 7z" />
        <path d="M12 18a3 3 0 003-3" />
      </svg>
    ),
    title: 'Ultra-Lightweight',
    desc: 'Water-gel texture that feels weightless on skin. Perfect under makeup or as a standalone step.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 10h20M2 14h20M2 18h20" />
        <path d="M12 2a4 4 0 00-4 4v4h8V6a4 4 0 00-4-4z" />
      </svg>
    ),
    title: 'Reef Safe & Eco-Friendly',
    desc: 'Free from oxybenzone and octinoxate. Good for your skin, great for the ocean.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4.5 16.5c-1.5-1.25-2.5-3.25-2.5-5.5a10 10 0 0120 0c0 2.25-1 4.25-2.5 5.5" />
        <path d="M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0" />
        <path d="M12 5v4M12 15v4" />
      </svg>
    ),
    title: 'Antioxidant Supercharge',
    desc: 'Tomato extract, Jeju botanical complex, and Vitamin C protect against free radical damage.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 2h4M19 22H5M12 5v13M19 14.5l-6-8.5-6 8.5" />
        <path d="M12 18.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
      </svg>
    ),
    title: 'Dermatologist Tested',
    desc: 'Clinically tested for safety and efficacy. Suitable for sensitive, acne-prone and oily skin types.',
  },
]

export default function WhySunkey() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="why-sunkey" id="about">
      <div className="why-sunkey__bg-deco" />

      <div className="why-sunkey__inner">
        {/* Header */}
        <div ref={titleRef} className="why-sunkey__header">
          <motion.p
            className="section-tag"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Why Choose Us
          </motion.p>
          <motion.h2
            className="why-sunkey__title heading-serif"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Sunscreen You Can <br />
            <span className="why-sunkey__highlight">Actually Trust</span>
          </motion.h2>
        </div>

        {/* Features Grid */}
        <div className="why-sunkey__grid">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{
                y: -6,
                borderColor: 'var(--accent-gold)',
                boxShadow: '0 20px 40px rgba(212, 158, 106, 0.08)',
              }}
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
