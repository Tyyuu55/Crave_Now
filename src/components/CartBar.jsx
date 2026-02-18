import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'

export const CartBar = () => {
  const navigate = useNavigate()
  const itemsMap = useCartStore((state) => state.items)
  const items = Object.values(itemsMap)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * (item.price || 0),
    0,
  )

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="fixed inset-x-0 bottom-4 z-30"
        >
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-full bg-dark px-4 py-2.5 text-sm text-white shadow-soft-card">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">
                  {totalItems} item{totalItems > 1 ? 's' : ''} in cart
                </div>
                <div className="font-mono-accent text-xs text-orange-200">
                  ₹{subtotal.toFixed(0)} plus taxes
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white shadow-soft-card transition hover:bg-orange-600"
            >
              <span>View Cart</span>
              <span className="text-[10px] uppercase tracking-[0.16em]">
                Place Order
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

