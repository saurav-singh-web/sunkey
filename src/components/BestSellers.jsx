import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import './BestSellers.css'

const products = [
  {
    id: 1,
    name: 'Hydro Mineral Sunscreen SPF 50+',
    tag: 'Best Seller',
    price: '₹649',
    originalPrice: '₹849',
    rating: 4.9,
    reviews: 1240,
    badge: 'SPF 50+',
    img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80',
    color: '#F5D3C5', // apricote/pink tone
  },
  {
    id: 2,
    name: 'Jeju Mineral Glow Sunscreen',
    tag: 'New Launch',
    price: '₹799',
    originalPrice: null,
    rating: 4.8,
    reviews: 380,
    badge: 'SPF 45',
    img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&q=80',
    color: '#E6EFEA', // ocean sage/teal tone
  },
  {
    id: 3,
    name: 'Sunkey Tinted Sunscreen SPF 30',
    tag: 'Editor\'s Pick',
    price: '₹549',
    originalPrice: '₹699',
    rating: 4.7,
    reviews: 890,
    badge: 'SPF 30',
    img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80',
    color: '#FBE6B8', // butter yellow tone
  },
  {
    id: 4,
    name: 'Tomato Extract Lip SPF Oil',
    tag: 'Trending',
    price: '₹499',
    originalPrice: '₹599',
    rating: 4.8,
    reviews: 450,
    badge: 'SPF 15',
    img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&q=80',
    color: '#FAF0E6', // warm linen tone
  },
]

function ProductCard({ product, index, onAddToCart }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  // Staggered card transition variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: index * 0.1 }
    }
  }

  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.12}
      glareColor="#ffffff"
      glarePosition="all"
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      scale={1.01}
      transitionSpeed={1500}
      className="product-card-tilt"
    >
      <motion.div
        ref={ref}
        className="product-card"
        variants={cardVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        whileHover="hover"
      >
        {/* Image Container with colored background */}
        <div className="product-card__img-wrap" style={{ '--card-bg': product.color }}>
          <span className="product-card__tag">{product.tag}</span>
          
          {/* Zoom on hover */}
          <motion.div 
            className="product-card__img-container"
            variants={{
              hover: { scale: 1.05 }
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <img src={product.img} alt={product.name} className="product-card__img" loading="lazy" />
          </motion.div>
          
          <span className="product-card__badge">{product.badge}</span>

          {/* Hover slide-up glassmorphic quick add button */}
          <motion.div 
            className="product-card__overlay"
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 0, y: 15 },
              hover: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <motion.button
              className="product-card__quick-add"
              whileHover={{ scale: 1.03, backgroundColor: 'var(--text-primary)', color: 'var(--white)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddToCart(product)}
            >
              Quick Add to Bag
            </motion.button>
          </motion.div>
        </div>

        {/* Info Card */}
        <div className="product-card__info">
          <div className="product-card__rating">
            <span className="product-card__stars">
              {'★'.repeat(Math.round(product.rating))}
            </span>
            <span className="product-card__rating-val">{product.rating}</span>
            <span className="product-card__reviews">({product.reviews})</span>
          </div>
          <h3 className="product-card__name">{product.name}</h3>
          <div className="product-card__price-row">
            <span className="product-card__price">{product.price}</span>
            {product.originalPrice && (
              <span className="product-card__original">{product.originalPrice}</span>
            )}
          </div>
        </div>
      </motion.div>
    </Tilt>
  )
}

export default function BestSellers({ onAddToCart }) {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="bestsellers" id="shop">
      {/* Section Header */}
      <div ref={titleRef} className="bestsellers__header">
        <motion.p
          className="section-tag"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Our Collection
        </motion.p>
        <motion.h2
          className="bestsellers__title heading-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Bestselling SPF Range
        </motion.h2>
        <motion.p
          className="bestsellers__subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Clean, lightweight, mineral formulas crafted for all Indian skin tones.
        </motion.p>
      </div>

      {/* Product Grid */}
      <div className="bestsellers__grid">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} onAddToCart={onAddToCart} />
        ))}
      </div>

      {/* All Products CTA */}
      <motion.div
        className="bestsellers__cta-wrap"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.a
          href="#"
          className="btn-primary"
        >
          View All Products
        </motion.a>
      </motion.div>
    </section>
  )
}
