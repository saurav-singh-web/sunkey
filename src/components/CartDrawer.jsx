import { motion, AnimatePresence } from 'framer-motion'
import './CartDrawer.css'

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onAddRecommendation,
}) {
  const subtotal = items.reduce(
    (sum, item) => sum + parseInt(item.price.replace('₹', '')) * item.quantity,
    0
  )
  const shippingThreshold = 900
  const isFreeShipping = subtotal >= shippingThreshold
  const shippingDifference = shippingThreshold - subtotal

  const recommendations = [
    {
      id: 2,
      name: 'Jeju Mineral Glow Sunscreen',
      price: '₹799',
      img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=120&q=80',
    },
    {
      id: 3,
      name: 'Sunkey Tinted Sunscreen SPF 30',
      price: '₹549',
      img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=120&q=80',
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="cart-drawer-overlay">
          {/* Backdrop blur */}
          <motion.div
            className="cart-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer Sidebar */}
          <motion.div
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          >
            {/* Header */}
            <div className="cart-drawer__header">
              <h3 className="cart-drawer__title">Your Bag ({items.length})</h3>
              <button className="cart-drawer__close" onClick={onClose} aria-label="Close cart">
                ✕
              </button>
            </div>

            {/* Free Shipping Bar */}
            <div className="cart-drawer__shipping">
              {isFreeShipping ? (
                <p className="cart-drawer__shipping-txt">🎉 You've unlocked **FREE Shipping**!</p>
              ) : (
                <p className="cart-drawer__shipping-txt">
                  Add <strong>₹{shippingDifference}</strong> more for <strong>FREE Shipping</strong>.
                </p>
              )}
              <div className="cart-drawer__progress-bg">
                <motion.div
                  className="cart-drawer__progress-fill"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%`,
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Scrollable Items Container */}
            <div className="cart-drawer__content">
              {items.length === 0 ? (
                <div className="cart-drawer__empty">
                  <span className="cart-drawer__empty-icon">☀️</span>
                  <p className="cart-drawer__empty-title">Your bag is empty</p>
                  <p className="cart-drawer__empty-sub">Fill it with sun care that loves you back.</p>
                  <button className="cart-drawer__shop-btn" onClick={onClose}>
                    Shop Bestsellers
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-drawer__items">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="cart-item"
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img src={item.img} alt={item.name} className="cart-item__img" />
                        <div className="cart-item__details">
                          <h4 className="cart-item__name">{item.name}</h4>
                          <p className="cart-item__price">{item.price}</p>
                          <div className="cart-item__actions">
                            <div className="cart-item__qty">
                              <button
                                className="cart-item__qty-btn"
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              >
                                −
                              </button>
                              <span className="cart-item__qty-val">{item.quantity}</span>
                              <button
                                className="cart-item__qty-btn"
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                            <button
                              className="cart-item__remove"
                              onClick={() => onRemove(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Complete the Look Section */}
                  <div className="cart-drawer__addons">
                    <h4 className="cart-drawer__addons-title">Complete your SPF routine</h4>
                    <div className="cart-drawer__addons-list">
                      {recommendations
                        .filter((rec) => !items.some((item) => item.id === rec.id))
                        .map((rec) => (
                          <div key={rec.id} className="addon-card">
                            <img src={rec.img} alt={rec.name} className="addon-card__img" />
                            <div className="addon-card__details">
                              <h5 className="addon-card__name">{rec.name}</h5>
                              <p className="addon-card__price">{rec.price}</p>
                            </div>
                            <button
                              className="addon-card__add"
                              onClick={() => onAddRecommendation(rec)}
                            >
                              + Add
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer Summary Container */}
            {items.length > 0 && (
              <div className="cart-drawer__footer">
                <div className="cart-drawer__summary-row">
                  <span>Subtotal</span>
                  <span className="cart-drawer__subtotal-val">₹{subtotal}</span>
                </div>
                <p className="cart-drawer__footer-note">
                  Shipping and taxes calculated at checkout.
                </p>
                <button className="cart-drawer__checkout">Proceed to Secure Checkout</button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
