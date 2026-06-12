import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitTextReveal from './SplitTextReveal'
import MagneticButton from './MagneticButton'
import './Ingredients.css'

gsap.registerPlugin(ScrollTrigger)

const ingredients = [
  {
    name: 'Zinc Oxide',
    benefit: 'Broad-spectrum UV blocker',
    desc: 'A natural physical mineral shield that reflects UVA & UVB rays. It sits on top of the skin rather than absorbing, making it highly compatible with sensitive and acne-prone skin.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    name: 'Jeju Botanical Extract',
    benefit: 'Soothing & anti-inflammatory',
    desc: 'Sourced from the pristine volcanic soil of Jeju Island, this complex cools down sun-flushed skin, reduces UV-induced redness, and maintains hydration.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a10 10 0 00-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0012 2z" />
        <path d="M12 6v12M6 12h12" />
      </svg>
    ),
  },
  {
    name: 'Tomato Lycopene',
    benefit: 'Antioxidant defense',
    desc: 'A powerful biological blocker that neutralizes free radicals caused by direct sunlight and environmental pollution, preventing photo-aging.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    ),
  },
  {
    name: 'Hyaluronic Acid',
    benefit: 'Deep dewy hydration lock-in',
    desc: 'Draws moisture deep into the skin layers, keeping the skin plump, radiant, and dewy under hot climates without heavy, sticky residues.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22a7 7 0 007-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 007 7z" />
      </svg>
    ),
  },
  {
    name: 'Vitamin C',
    benefit: 'Brightening & spot prevention',
    desc: 'Synergizes with mineral UV filters to prevent hyperpigmentation, lighten existing dark spots, and illuminate the overall complexion.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
  },
  {
    name: 'Niacinamide',
    benefit: 'Pore-minimizing & oil balancing',
    desc: 'Regulates sebum production, minimizes pore visibility under sweat, and strengthens the physical lipid barrier of the skin.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v18M3 12h18M12 12m-4 0a4 4 0 108 0 4 4 0 10-8 0" />
      </svg>
    ),
  },
]

export default function Ingredients() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const [activeIngredient, setActiveIngredient] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Parallax Scroll Effect
      gsap.to(imgRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      // 2. Editorial Mask Reveal (clip-path slide down)
      gsap.fromTo(
        imgRef.current,
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
        {
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="ingredients" id="ingredients">
      {/* Left Column (Image) */}
      <div className="ingredients__img-col">
        <div className="ingredients__img-wrap">
          <img
            ref={imgRef}
            src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=900&q=80"
            alt="Natural raw ingredients"
            className="ingredients__img"
            loading="lazy"
          />
          <div className="ingredients__img-overlay" />
          
          {/* Floating details badge */}
          <motion.div
            className="ingredients__float-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ y: -5 }}
          >
            <span className="ingredients__float-icon">🌱</span>
            <div>
              <p className="ingredients__float-label">CLEAN SKINCARE</p>
              <p className="ingredients__float-val">17 Active Actives</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Column (Interactive Content Accordion) */}
      <div className="ingredients__content">
        <div ref={titleRef}>
          <motion.p
            className="section-tag"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            What's Inside
          </motion.p>
          <h2 className="ingredients__title heading-serif">
            <SplitTextReveal text="Nature Meets" delay={0.1} />
            <br />
            <SplitTextReveal text="Science" delay={0.3} />
          </h2>
          <motion.p
            className="ingredients__desc"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Every ingredient in Sunkey is selected with clean intent. No fillers, no irritating fragrances — just raw physical actives that protect and nourish.
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="ingredients__list">
          {ingredients.map((item, i) => {
            const isActive = activeIngredient === i
            return (
              <div
                key={item.name}
                className={`ingredient-accordion ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIngredient(isActive ? -1 : i)}
              >
                <div className="ingredient-accordion__header">
                  <span className="ingredient-accordion__icon">{item.icon}</span>
                  <div className="ingredient-accordion__title-group">
                    <p className="ingredient-accordion__name">{item.name}</p>
                    <p className="ingredient-accordion__benefit">{item.benefit}</p>
                  </div>
                  <motion.span
                    className="ingredient-accordion__arrow"
                    animate={{ rotate: isActive ? 90 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    →
                  </motion.span>
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      className="ingredient-accordion__body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      <div className="ingredient-accordion__inner">
                        <p className="ingredient-accordion__desc-txt">{item.desc}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: '32px' }}>
          <MagneticButton href="#" className="btn-primary ingredients__btn">
            View Full Science Report
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
