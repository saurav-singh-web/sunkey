import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import './PageLoader.css'

export default function PageLoader({ onComplete }) {
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete,
    })

    // Animation timeline for loader exit
    tl.to('.page-loader__logo', {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 2.2, // Let the SVG path finish drawing
      ease: 'power3.inOut',
    })
    .to('.page-loader', {
      yPercent: -100,
      duration: 1.2,
      ease: 'power4.inOut',
    })
  }, [onComplete])

  return (
    <div className="page-loader">
      <div className="page-loader__content">
        {/* Animated Luxury Sun SVG */}
        <div className="page-loader__logo">
          <svg
            className="page-loader__sun"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Core Sun Circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="18"
              stroke="url(#sun-gradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
            {/* Sun Rays */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, index) => {
              const rad = (deg * Math.PI) / 180
              const x1 = 50 + 23 * Math.cos(rad)
              const y1 = 50 + 23 * Math.sin(rad)
              const x2 = 50 + 34 * Math.cos(rad)
              const y2 = 50 + 34 * Math.sin(rad)
              return (
                <motion.line
                  key={deg}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#sun-gradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{
                    duration: 1.4,
                    delay: 0.3 + index * 0.08,
                    ease: 'easeOut',
                  }}
                />
              )
            })}
            <defs>
              <linearGradient id="sun-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D49E6A" />
                <stop offset="100%" stopColor="#C67253" />
              </linearGradient>
            </defs>
          </svg>

          {/* Luxury Text */}
          <motion.h1
            className="page-loader__title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
          >
            Sunkey
          </motion.h1>
          <motion.p
            className="page-loader__subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            Sun Care That Loves You Back
          </motion.p>
        </div>
      </div>
    </div>
  )
}
