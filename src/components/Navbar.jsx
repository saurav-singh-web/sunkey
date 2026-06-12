import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import './Navbar.css'

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'Shop', href: '#shop' },
  { name: 'About', href: '#about' },
  { name: 'Ingredients', href: '#ingredients' },
  { name: 'Reviews', href: '#reviews' },
]

export default function Navbar({ cartCount, onCartClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    // Elegant slide-in reveal
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
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
      {/* Brand Logo */}
      <motion.a
        href="#"
        className="navbar__logo"
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        Sunkey<sup>™</sup>
      </motion.a>

      {/* Desktop Navigation Links */}
      <ul className="navbar__links">
        {navLinks.map((link, i) => (
          <motion.li
            key={link.name}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
          >
            <a href={link.href} className="navbar__link">
              {link.name}
              <span className="navbar__link-underline" />
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Navigation Icons / Actions */}
      <div className="navbar__icons">
        {/* Cart Trigger Button */}
        <motion.button
          className="navbar__icon-btn navbar__cart"
          aria-label="Cart"
          onClick={onCartClick}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {cartCount > 0 && (
            <motion.span
              className="navbar__cart-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={cartCount} // Re-renders badge so the bounce fires on cart updates
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              {cartCount}
            </motion.span>
          )}
        </motion.button>

        {/* Mobile Menu Hamburger */}
        <motion.button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          whileTap={{ scale: 0.92 }}
        >
          <span className={`hamburger-bar ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-bar ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-bar ${menuOpen ? 'open' : ''}`} />
        </motion.button>
      </div>

      {/* Mobile Sidebar Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="navbar__mobile-link"
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05, ease: 'easeOut' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
