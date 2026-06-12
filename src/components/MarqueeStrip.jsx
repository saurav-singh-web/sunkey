import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './MarqueeStrip.css'

gsap.registerPlugin(ScrollTrigger)

const itemsLeft = [
  '☀️ SPF 50+ Mineral Sunscreen',
  '✦ No White Cast',
  '🌿 Clean Beauty Ingredients',
  '✦ Reef Safe & Ocean Friendly',
]

const itemsRight = [
  '☀️ Infused with Jeju Extracts',
  '✦ Dermatologist Tested & Approved',
  '🌿 Non-Comedogenic Formula',
  '✦ Made for All Indian Skin Tones',
]

export default function MarqueeStrip() {
  const track1Ref = useRef(null)
  const track2Ref = useRef(null)

  useEffect(() => {
    const track1 = track1Ref.current
    const track2 = track2Ref.current

    if (!track1 || !track2) return

    // Create continuous linear scrolls for both tracks
    const tween1 = gsap.to(track1, {
      xPercent: -50,
      duration: 18,
      ease: 'none',
      repeat: -1,
    })

    const tween2 = gsap.to(track2, {
      xPercent: 0,
      duration: 18,
      ease: 'none',
      repeat: -1,
    })
    // Start track 2 offset so it scrolls to the right
    gsap.set(track2, { xPercent: -50 })

    // Link scroll velocity to tween timescale
    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const vel = Math.abs(self.getVelocity())
        // Map scroll velocity to a speed multiplier (max speedup of 6x)
        const speedMultiplier = Math.min(6, 1 + vel * 0.0025)

        // Instantly speed up the marquee timescale
        gsap.killTweensOf([tween1, tween2])
        gsap.to([tween1, tween2], {
          timeScale: speedMultiplier,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        })

        // Smoothly decay back to cruising speed (timeScale = 1)
        gsap.to([tween1, tween2], {
          timeScale: 1,
          duration: 1.2,
          delay: 0.1,
          ease: 'power1.out',
          overwrite: 'auto',
        })
      },
    })

    return () => {
      trigger.kill()
      tween1.kill()
      tween2.kill()
    }
  }, [])

  return (
    <div className="marquee-strip-container">
      {/* Top Track (Scroll Left) */}
      <div className="marquee-strip marquee-strip--left">
        <div ref={track1Ref} className="marquee-strip__track">
          {[...itemsLeft, ...itemsLeft, ...itemsLeft].map((item, i) => (
            <span key={i} className="marquee-strip__item heading-serif">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Track (Scroll Right) */}
      <div className="marquee-strip marquee-strip--right">
        <div ref={track2Ref} className="marquee-strip__track">
          {[...itemsRight, ...itemsRight, ...itemsRight].map((item, i) => (
            <span key={i} className="marquee-strip__item heading-serif">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
