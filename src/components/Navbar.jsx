import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import './Navbar.css'

const navLinks = ['Home', 'Shop', 'About', 'FAQ', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount] = useState(2)
  const navRef = useRef(null)

  useEffect(() => {
    // Animate nav in on load
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 }
    )

    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      ref={navRef}
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
    >
      {/* Logo */}
      <motion.a
        href="#"
        className="navbar__logo"
        whileHover={{ scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Sunkey<sup>™</sup>
      </motion.a>

      {/* Desktop Links */}
      <ul className="navbar__links">
        {navLinks.map((link, i) => (
          <motion.li
            key={link}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
          >
            <a href="#" className="navbar__link">
              {link}
              <span className="navbar__link-underline" />
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Icons */}
      <div className="navbar__icons">
        <motion.button
          className="navbar__icon-btn"
          aria-label="Search"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </motion.button>

        <motion.button
          className="navbar__icon-btn navbar__cart"
          aria-label="Cart"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {cartCount > 0 && (
            <motion.span
              className="navbar__cart-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {cartCount}
            </motion.span>
          )}
        </motion.button>

        {/* Hamburger for mobile */}
        <motion.button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          whileTap={{ scale: 0.9 }}
        >
          <span className={`hamburger-bar ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-bar ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-bar ${menuOpen ? 'open' : ''}`} />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link}
                href="#"
                className="navbar__mobile-link"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
