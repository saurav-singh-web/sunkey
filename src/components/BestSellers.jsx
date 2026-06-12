import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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
    color: '#b2ecf7',
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
    color: '#d4f7b2',
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
    color: '#ffeab2',
  },
   {
    id: 4,
    name: 'Hydro Mineral Sunscreen SPF 50+',
    tag: 'Best Seller',
    price: '₹649',
    originalPrice: '₹849',
    rating: 4.9,
    reviews: 1240,
    badge: 'SPF 50+',
    img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80',
    color: '#b2ecf7',
  },

]

function ProductCard({ product, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="product-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      {/* Image container */}
      <div className="product-card__img-wrap" style={{ '--card-color': product.color }}>
        <span className="product-card__tag">{product.tag}</span>
        <img src={product.img} alt={product.name} className="product-card__img" loading="lazy" />
        <span className="product-card__badge">{product.badge}</span>

        {/* Hover overlay */}
        <div className="product-card__overlay">
          <motion.button
            className="product-card__quick-add"
            whileTap={{ scale: 0.95 }}
          >
            Quick Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Info */}
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
  )
}

export default function BestSellers() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="bestsellers" id="shop">
      {/* Header */}
      <div ref={titleRef} className="bestsellers__header">
        <motion.p
          className="section-tag"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Our Collection
        </motion.p>
        <motion.h2
          className="bestsellers__title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Bestselling SPF Range
        </motion.h2>
        <motion.p
          className="bestsellers__subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          Science-backed formulas crafted for Indian skin tones & climate.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="bestsellers__grid">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="bestsellers__cta-wrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <motion.a
          href="#"
          className="bestsellers__cta"
          whileHover={{ scale: 1.05, backgroundColor: '#1c1c1c', color: '#fff' }}
          whileTap={{ scale: 0.97 }}
        >
          View All Products
        </motion.a>
      </motion.div>
    </section>
  )
}
