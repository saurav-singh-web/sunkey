import { motion } from 'framer-motion'
import './Footer.css'

const links = {
  Shop: ['All Products', 'Sunscreens', 'Lip Care', 'Bundles', 'New Launches'],
  Help: ['FAQ', 'Shipping Policy', 'Return Policy', 'Contact Us', 'Track Order'],
  Company: ['About Sunkey', 'Ingredients', 'Sustainability', 'Press', 'Careers'],
}

export default function Footer() {
  return (
    <footer className="footer">
      {/* Newsletter band */}
      <div className="footer__newsletter">
        <div className="footer__nl-inner">
          <div className="footer__nl-text">
            <h3 className="footer__nl-title">Join the Sunkey Community</h3>
            <p className="footer__nl-sub">Get skincare tips, exclusive offers & first access to new launches.</p>
          </div>
          <div className="footer__nl-form">
            <input
              type="email"
              placeholder="Enter your email address"
              className="footer__nl-input"
            />
            <motion.button
              className="footer__nl-btn"
              whileHover={{ scale: 1.05, backgroundColor: '#45d2f1' }}
              whileTap={{ scale: 0.97 }}
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer__main">
        {/* Brand column */}
        <div className="footer__brand">
          <a href="#" className="footer__logo">Sunkey<sup>™</sup></a>
          <p className="footer__tagline">
            Sun care that loves you back. Mineral-based SPF formulas made for Indian skin.
          </p>
          <div className="footer__social">
            {['Instagram', 'Facebook', 'YouTube', 'Twitter'].map((s) => (
              <motion.a
                key={s}
                href="#"
                className="footer__social-link"
                whileHover={{ y: -3, color: '#45d2f1' }}
                transition={{ duration: 0.2 }}
              >
                {s[0]}
              </motion.a>
            ))}
          </div>
          <div className="footer__badges">
            <span className="footer__badge">🌿 Clean Beauty</span>
            <span className="footer__badge">🐰 Cruelty Free</span>
            <span className="footer__badge">🌊 Reef Safe</span>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([category, items]) => (
          <div key={category} className="footer__col">
            <h4 className="footer__col-title">{category}</h4>
            <ul className="footer__col-list">
              {items.map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    className="footer__col-link"
                    whileHover={{ x: 4, color: '#45d2f1' }}
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

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p className="footer__copy">© 2025 Sunkey Skincare. All rights reserved.</p>
        <div className="footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
        <div className="footer__payments">
          {['VISA', 'MC', 'UPI', 'RuPay'].map((p) => (
            <span key={p} className="footer__pay-badge">{p}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}
