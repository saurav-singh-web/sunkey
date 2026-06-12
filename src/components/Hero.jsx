import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import './Hero.css'

/* ─────────────────────────────────────────────
   Inline SVG sun decoration
───────────────────────────────────────────── */
function SunDeco({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="22" fill="currentColor" opacity="0.9" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => (
        <line
          key={deg}
          x1="50" y1="50"
          x2={50 + 40 * Math.cos((deg * Math.PI) / 180)}
          y2={50 + 40 * Math.sin((deg * Math.PI) / 180)}
          stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.6"
        />
      ))}
    </svg>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const leftRef = useRef(null)
  const centerRef = useRef(null)
  const rightRef = useRef(null)
  const productImgRef = useRef(null)
  const sunRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Panel reveal timeline
      const tl = gsap.timeline({ delay: 0.6 })

      tl.fromTo(leftRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      )
      .fromTo(centerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(rightRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      )

      // Spinning sun
      gsap.to(sunRef.current, {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center',
      })

      // Floating product image
      gsap.to(productImgRef.current, {
        y: -12,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="hero">
      {/* ── LEFT PANEL ── */}
      <div ref={leftRef} className="hero__panel hero__panel--left">
        <SunDeco ref={sunRef} className="hero__sun" />

        <div className="hero__left-text">
          <p className="hero__promo-tag">Limited Time Offer</p>
          <h2 className="hero__promo-heading">
            PROTECT YOUR SKIN!<br />
            <strong>SAVE BIG THIS SEASON!</strong><br />
            DON'T MISS THIS HOT DEAL!
          </h2>
          <motion.a
            href="#"
            className="hero__promo-btn"
            whileHover={{ scale: 1.05, backgroundColor: '#1c1c1c', color: '#fff' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Shop Sale →
          </motion.a>
        </div>

        {/* Circular product hero image */}
        <div className="hero__circle-wrap">
          <div className="hero__circle">
            <img
              ref={productImgRef}
              src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80"
              alt="SPF 50 Mineral Sunscreen"
              className="hero__circle-img"
            />
          </div>
        </div>

        {/* SPF badge */}
        <motion.div
          className="hero__spf-badge"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="hero__spf-num">SPF</span>
          <span className="hero__spf-val">50+</span>
        </motion.div>
      </div>

      {/* ── CENTER PANEL ── */}
      <div ref={centerRef} className="hero__panel hero__panel--center">
        <div className="hero__center-content">
          <motion.p
            className="section-tag hero__center-tag"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Sun Care That Loves You Back
          </motion.p>

          <motion.h1
            className="hero__heading"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Discover The Magic Of Our SPF!
          </motion.h1>

          <motion.p
            className="hero__subtext"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            Your skin deserves love, protection, and a little extra care. That's where{' '}
            <strong>Sunkey</strong> comes in!
          </motion.p>

          <motion.a
            href="#"
            className="hero__cta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.65, duration: 0.6 }}
            whileHover={{ scale: 1.05, backgroundColor: '#45d2f1' }}
            whileTap={{ scale: 0.97 }}
          >
            Shop Now ↗
          </motion.a>

          {/* Stats row */}
          <motion.div
            className="hero__stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.85, duration: 0.6 }}
          >
            {[['10K+', 'Happy Customers'], ['SPF 50+', 'Max Protection'], ['100%', 'Mineral Based']].map(([val, label]) => (
              <div key={label} className="hero__stat">
                <span className="hero__stat-val">{val}</span>
                <span className="hero__stat-label">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div ref={rightRef} className="hero__panel hero__panel--right">
        <img
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
          alt="Woman applying sunscreen"
          className="hero__right-img"
        />

        {/* Floating review badge */}
        <motion.div
          className="hero__review-badge"
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 1.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__stars">★★★★★</div>
          <p className="hero__review-text">"Best SPF I've ever used!"</p>
          <p className="hero__reviewer">— Priya S.</p>
        </motion.div>
      </div>
    </section>
  )
}
