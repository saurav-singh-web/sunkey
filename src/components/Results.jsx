import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import SplitTextReveal from './SplitTextReveal'
import './Results.css'

export default function Results() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="results-section" id="results" ref={ref}>
      <div className="results__container">
        <div className="results__content">
          <motion.p
            className="section-tag"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Real Results
          </motion.p>
          <h2 className="results__title heading-serif">
            <SplitTextReveal text="No White Cast. Just Glow." delay={0.1} />
          </h2>
          <motion.p
            className="results__desc"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            See the difference instantly. Our mineral formula blends seamlessly into all Indian skin tones, leaving zero white cast and a natural, dewy finish. Slide to see the transformation.
          </motion.p>
        </div>

        <motion.div
          className="results__slider-wrapper"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
        >
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage 
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80" 
                alt="Before" 
                style={{ filter: 'brightness(0.9) contrast(0.95) saturate(0.8)' }} 
              />
            }
            itemTwo={
              <ReactCompareSliderImage 
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80" 
                alt="After" 
                style={{ filter: 'brightness(1.1) contrast(1.05) saturate(1.2)' }} 
              />
            }
            className="results__compare-slider"
          />
          <div className="results__labels">
            <span className="results__label results__label--before">Before (Bare Skin)</span>
            <span className="results__label results__label--after">After (Sunkey Glow)</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
