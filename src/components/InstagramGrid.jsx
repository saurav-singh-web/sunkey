import { motion } from 'framer-motion'
import './InstagramGrid.css'

const posts = [
  { id: 1, img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80', likes: '2.4K', size: 'large' },
  { id: 2, img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&q=80', likes: '1.8K', size: 'small' },
  { id: 3, img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80', likes: '3.1K', size: 'medium' },
  { id: 4, img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&q=80', likes: '1.2K', size: 'small' },
  { id: 5, img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80', likes: '2.7K', size: 'tall' },
  { id: 6, img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80', likes: '2.5K', size: 'small' },
]

export default function InstagramGrid() {
  return (
    <section className="insta" id="instagram">
      {/* Section Header */}
      <div className="insta__header">
        <motion.p
          className="section-tag"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Community
        </motion.p>
        <motion.h2
          className="insta__title heading-serif"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          #SunkeyGlow
        </motion.h2>
        <motion.p
          className="insta__sub"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Tag us @sunkeycare to be featured on our digital gallery.
        </motion.p>
      </div>

      {/* Asymmetric Editorial Grid */}
      <div className="insta__grid">
        {posts.map((post, i) => (
          <motion.a
            key={post.id}
            href="#"
            className={`insta__cell insta__cell--${post.size}`}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
            whileHover="hover"
          >
            {/* Image zoom effect */}
            <motion.div
              className="insta__img-wrap"
              variants={{
                hover: { scale: 1.04 }
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <img src={post.img} alt={`Instagram community glow post ${post.id}`} className="insta__img" loading="lazy" />
            </motion.div>

            {/* Frosted Glass Overlay */}
            <motion.div
              className="insta__overlay"
              variants={{
                hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
                hover: { opacity: 1, backdropFilter: 'blur(10px)' }
              }}
              transition={{ duration: 0.4 }}
            >
              <span className="insta__likes">❤ {post.likes}</span>
              <span className="insta__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </span>
              <span className="insta__shop-btn">Shop The Look</span>
            </motion.div>
          </motion.a>
        ))}
      </div>

      {/* Follow CTA */}
      <div className="insta__follow-wrap">
        <motion.a
          href="#"
          className="btn-primary"
        >
          Follow @sunkeycare
        </motion.a>
      </div>
    </section>
  )
}
