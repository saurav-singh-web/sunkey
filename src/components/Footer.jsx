import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Footer.css'

const links = {
  Shop: ['All Products', 'Sunscreens', 'Lip Care', 'Bundles', 'New Launches'],
  Help: ['FAQ', 'Shipping Policy', 'Return & Refund', 'Contact Us', 'Track Order'],
  Company: ['About Sunkey', 'Our Ingredients', 'Sustainability', 'Editorial', 'Careers'],
}

export default function Footer() {
  const footerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  })
  
  const xTransform = useTransform(scrollYProgress, [0, 1], [200, -500])

  return (
    <footer className="footer" ref={footerRef}>
      {/* Background Giant Text */}
      <div className="footer__giant-marquee-wrap">
        <motion.div style={{ x: xTransform }} className="footer__giant-marquee">
          SUNKEY SUNKEY SUNKEY SUNKEY SUNKEY SUNKEY
        </motion.div>
      </div>

      <div className="footer__content-wrapper">
        {/* Newsletter signup band */}
        <div className="footer__newsletter">
        <div className="footer__nl-inner">
          <div className="footer__nl-text">
            <h3 className="footer__nl-title heading-serif">Join the Sunkey Community</h3>
            <p className="footer__nl-sub">Get scientific skincare tips, exclusive promotions & first access to launches.</p>
          </div>
          <div className="footer__nl-form">
            <input
              type="email"
              placeholder="Enter your email address"
              className="footer__nl-input"
            />
            <motion.button
              className="footer__nl-btn"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="footer__main">
        {/* Brand column */}
        <div className="footer__brand">
          <a href="#" className="footer__logo">Sunkey<sup>™</sup></a>
          <p className="footer__tagline">
            Sun care that loves you back. 100% physical mineral-based SPF formulas crafted for Indian skin.
          </p>
          
          {/* Expanded premium social links */}
          <div className="footer__social">
            {['Instagram', 'Facebook', 'YouTube', 'TikTok'].map((s, idx) => (
              <span key={s} className="footer__social-item">
                <motion.a
                  href="#"
                  className="footer__social-link"
                  whileHover={{ y: -2, color: 'var(--accent-gold)' }}
                  transition={{ duration: 0.2 }}
                >
                  {s}
                </motion.a>
                {idx < 3 && <span className="footer__social-dot">·</span>}
              </span>
            ))}
          </div>

          <div className="footer__badges">
            <span className="footer__badge">🌿 Clean Beauty</span>
            <span className="footer__badge">🐰 Cruelty Free</span>
            <span className="footer__badge">🌊 Reef Safe</span>
          </div>
        </div>

        {/* Link navigation columns */}
        {Object.entries(links).map(([category, items]) => (
          <div key={category} className="footer__col">
            <h4 className="footer__col-title">{category}</h4>
            <ul className="footer__col-list">
              {items.map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    className="footer__col-link"
                    whileHover={{ x: 6, color: 'var(--accent-gold)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Legal bar */}
      <div className="footer__bottom">
        <p className="footer__copy">© 2026 Sunkey Skincare. All rights reserved.</p>
        <div className="footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
        <div className="footer__payments">
          {['VISA', 'MC', 'UPI', 'RUPAY'].map((p) => (
            <span key={p} className="footer__pay-badge">{p}</span>
          ))}
        </div>
      </div>
      </div>
    </footer>
  )
}
