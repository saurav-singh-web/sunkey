import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

/* ── Minimalist Premium SVG Sun illustration ── */
function PremiumSun({ className, svgRef }) {
  return (
    <svg ref={svgRef} className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const x1 = 50 + 26 * Math.cos(rad)
        const y1 = 50 + 26 * Math.sin(rad)
        const x2 = 50 + 38 * Math.cos(rad)
        const y2 = 50 + 38 * Math.sin(rad)
        return (
          <line
            key={deg}
            x1={x1} y1={y1}
            x2={x2} y2={y2}
            stroke="currentColor" strokeWidth="1" strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const leftRef = useRef(null)
  const centerRef = useRef(null)
  const rightRef = useRef(null)
  const productImgWrapRef = useRef(null)
  const productImgRef = useRef(null)
  const sunRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Panel entrance animation
      const tl = gsap.timeline({ delay: 0.4 })
      
      tl.fromTo(leftRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
      )
      .fromTo(centerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
        '-=0.9'
      )
      .fromTo(rightRef.current,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
        '-=0.9'
      )

      // 2. Slow continuous rotation for luxury sun
      gsap.to(sunRef.current, {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: 'none',
      })

      // 3. Float loop for product image
      gsap.to(productImgRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // 4. Scroll Triggered Parallax for Left & Right panels
      gsap.to(leftRef.current, {
        y: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })

      gsap.to(rightRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })
    }, heroRef)

    // 5. Magnetic hover physics on product image wrap
    const handleMouseMove = (e) => {
      const wrap = productImgWrapRef.current
      if (!wrap) return
      
      const rect = wrap.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(productImgRef.current, {
        x: x * 0.18,
        y: y * 0.18,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(productImgRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto'
      })
    }

    const wrapEl = productImgWrapRef.current
    if (wrapEl) {
      wrapEl.addEventListener('mousemove', handleMouseMove)
      wrapEl.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      ctx.revert()
      if (wrapEl) {
        wrapEl.removeEventListener('mousemove', handleMouseMove)
        wrapEl.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  // Words list for staggered reveal
  const titleText = "Discover The Magic Of Our Mineral SPF!"
  const titleWords = titleText.split(' ')

  return (
    <section ref={heroRef} className="hero">
      {/* ── LEFT PANEL ── */}
      <div ref={leftRef} className="hero__panel hero__panel--left">
        <PremiumSun svgRef={sunRef} className="hero__sun" />

        <div className="hero__left-text">
          <p className="hero__promo-tag">LIMITED LAUNCH OFFER</p>
          <h2 className="hero__promo-heading">
            Skin Protection<br />
            <strong>That Glows</strong><br />
            with nature's best
          </h2>
          <motion.a
            href="#shop"
            className="hero__promo-btn"
            whileHover={{ scale: 1.04, letterSpacing: '0.2em' }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Sale →
          </motion.a>
        </div>

        {/* Circular product hero image container with magnetic hover */}
        <div ref={productImgWrapRef} className="hero__circle-wrap" data-cursor="view">
          <div className="hero__circle-glow" />
          <div className="hero__circle">
            <img
              ref={productImgRef}
              src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80"
              alt="SPF 50 Mineral Sunscreen"
              className="hero__circle-img"
            />
          </div>
        </div>

        {/* SPF badge */}
        <motion.div
          className="hero__spf-badge"
          animate={{ rotate: [0, 6, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
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
            transition={{ delay: 1, duration: 0.6 }}
          >
            Sun Care That Loves You Back
          </motion.p>

          <h1 className="hero__heading heading-serif">
            {titleWords.map((word, i) => (
              <span key={i} className="hero__word-wrap">
                <motion.span
                  className="hero__word"
                  initial={{ y: '100%', rotate: 2 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{
                    delay: 1.1 + i * 0.08,
                    duration: 0.85,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                >
                  {word}&nbsp;
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="hero__subtext"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.7 }}
          >
            Your skin deserves broad-spectrum protection, deep hydration, and a clean weightless finish.
            Experience the <strong>Sunkey</strong> difference today.
          </motion.p>

          <div style={{ display: 'inline-block' }}>
            <motion.a
              href="#shop"
              className="btn-primary"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.7 }}
            >
              Shop Now ↗
            </motion.a>
          </div>

          {/* Stats row */}
          <motion.div
            className="hero__stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            {[
              ['10K+', 'Happy Customers'],
              ['SPF 50+', 'Max Protection'],
              ['100%', 'Mineral Based'],
            ].map(([val, label]) => (
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
          initial={{ opacity: 0, scale: 0.85, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 2.1, duration: 0.8, ease: 'easeOut' }}
          whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
        >
          <div className="hero__stars">★★★★★</div>
          <p className="hero__review-text">"The absolute best mineral SPF I've ever used. Zero white cast!"</p>
          <p className="hero__reviewer">— Priya S.</p>
        </motion.div>
      </div>
    </section>
  )
}
