import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './CustomCursor.css'

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default')
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Configure spring physics for soft lag
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Check if device is touch-enabled
    const checkMobile = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsMobile(isTouch)
    }
    checkMobile()

    if (isMobile) return

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Set cursor type based on hovering elements
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        const type = target.getAttribute('data-cursor')
        setCursorType(type)
      } else {
        // Check if hovering interactive element
        const isInteractive = e.target.closest('a, button, input, select, textarea, [role="button"]')
        if (isInteractive) {
          setCursorType('pointer')
        } else {
          setCursorType('default')
        }
      }
    }

    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY, isVisible, isMobile])

  // Don't render cursor on mobile/touch screens
  if (isMobile || !isVisible) return null

  // Define size and variants based on cursorType
  const variants = {
    default: {
      width: 10,
      height: 10,
      backgroundColor: 'var(--accent-terracotta)',
    },
    pointer: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(198, 114, 83, 0.15)',
      border: '1px solid var(--accent-terracotta)',
    },
    view: {
      width: 72,
      height: 72,
      backgroundColor: 'var(--bg-cream)',
      border: '1px solid var(--accent-gold)',
      color: 'var(--text-primary)',
    },
    drag: {
      width: 72,
      height: 72,
      backgroundColor: 'var(--text-primary)',
      color: 'var(--white)',
    },
  }

  const currentVariant = variants[cursorType] || variants.default

  return (
    <motion.div
      className={`custom-cursor custom-cursor--${cursorType}`}
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
        x: '-50%',
        y: '-50%',
      }}
      animate={{
        width: currentVariant.width,
        height: currentVariant.height,
        backgroundColor: currentVariant.backgroundColor,
        border: currentVariant.border || 'none',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      {cursorType === 'view' && (
        <motion.span
          className="custom-cursor__text"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          VIEW
        </motion.span>
      )}
      {cursorType === 'drag' && (
        <motion.span
          className="custom-cursor__text"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          DRAG
        </motion.span>
      )}
    </motion.div>
  )
}
