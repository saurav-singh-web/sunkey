import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Ingredients.css'

gsap.registerPlugin(ScrollTrigger)

const ingredients = [
  { name: 'Zinc Oxide', benefit: 'Broad-spectrum UV blocker', emoji: '🛡️' },
  { name: 'Jeju Extract', benefit: 'Soothing & anti-inflammatory', emoji: '🌿' },
  { name: 'Tomato Lycopene', benefit: 'Powerful antioxidant defense', emoji: '🍅' },
  { name: 'Hyaluronic Acid', benefit: 'Deep hydration lock-in', emoji: '💧' },
  { name: 'Vitamin C', benefit: 'Brightening & free-radical protection', emoji: '🍋' },
  { name: 'Niacinamide', benefit: 'Pore-minimizing & oil-balancing', emoji: '✨' },
]

export default function Ingredients() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="ingredients" id="ingredients">
      {/* Image column */}
      <div className="ingredients__img-col">
        <div className="ingredients__img-wrap">
          <img
            ref={imgRef}
            src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=900&q=80"
            alt="Natural ingredients"
            className="ingredients__img"
            loading="lazy"
          />
          <div className="ingredients__img-overlay" />
          {/* Floating card on image */}
          <motion.div
            className="ingredients__float-card"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="ingredients__float-icon">🌱</span>
            <div>
              <p className="ingredients__float-label">Clean Beauty</p>
              <p className="ingredients__float-val">17 Active Ingredients</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content column */}
      <div className="ingredients__content">
        <div ref={titleRef}>
          <motion.p
            className="section-tag"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            What's Inside
          </motion.p>
          <motion.h2
            className="ingredients__title"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Nature Meets <br />Science
          </motion.h2>
          <motion.p
            className="ingredients__desc"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            Every ingredient in Sunkey is chosen with purpose. No fillers, no harmful chemicals — just proven actives that work for your skin.
          </motion.p>
        </div>

        {/* Ingredient list */}
        <div className="ingredients__list">
          {ingredients.map((item, i) => (
            <motion.div
              key={item.name}
              className="ingredient-item"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 6 }}
            >
              <span className="ingredient-item__emoji">{item.emoji}</span>
              <div>
                <p className="ingredient-item__name">{item.name}</p>
                <p className="ingredient-item__benefit">{item.benefit}</p>
              </div>
              <span className="ingredient-item__arrow">→</span>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="#"
          className="ingredients__btn"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05, backgroundColor: '#1c1c1c', color: '#fff' }}
          whileTap={{ scale: 0.97 }}
        >
          View Full Ingredient List
        </motion.a>
      </div>
    </section>
  )
}
