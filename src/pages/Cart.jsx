import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { PageTransition } from '../components/PageTransition'
import { CartItem } from '../components/CartItem'
import { useCartStore } from '../store/useCartStore'
import { useAuthStore } from '../store/useAuthStore'
import { createOrder } from '../api/orders'

const Cart = () => {
  const itemsMap = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const user = useAuthStore((state) => state.user)

  const items = Object.values(itemsMap)
  const subtotal = items.reduce(
    (sum, i) => sum + i.quantity * (i.price || 0),
    0,
  )

  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState('')
  const [successOrder, setSuccessOrder] = useState(null)

  const deliveryFee = subtotal > 500 ? 0 : 29
  const taxes = subtotal * 0.05
  const total = subtotal + deliveryFee + taxes

  const handlePlaceOrder = async () => {
    setError('')
    try {
      setPlacing(true)
      const payload = {
        userId: user?.id,
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        subtotal,
        deliveryFee,
        taxes,
        total,
        createdAt: new Date().toISOString(),
        restaurantId: items[0]?.restaurantId,
        restaurantName: items[0]?.restaurantName,
      }
      const order = await createOrder(payload)
      clearCart()
      setSuccessOrder(order)
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.')
    } finally {
      setPlacing(false)
    }
  }

  const isEmpty = items.length === 0 && !successOrder

  return (
    <PageTransition className="pb-12">
      <div className="mx-auto mt-8 max-w-5xl px-4">
        <h1 className="mb-2 font-display-alt text-2xl font-semibold text-dark">
          Your cart
        </h1>
        <p className="text-sm text-muted">
          Warm plates, short waits. Review and place your order.
        </p>

        {isEmpty && (
          <div className="mt-8 rounded-3xl bg-card px-6 py-10 text-center shadow-soft-card">
            <p className="mb-2 text-sm text-muted">
              Your cart is quietly empty.
            </p>
            <p className="text-sm text-muted">
              Head back home and add a few cravings first.
            </p>
          </div>
        )}

        {successOrder && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-3xl bg-card px-6 py-8 text-center shadow-soft-card"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="h-7 w-7 text-emerald-500" />
            </div>
            <h2 className="font-display-alt text-xl font-semibold text-dark">
              Order on its way.
            </h2>
            <p className="mt-1 text-sm text-muted">
              We&apos;ve sent this to the kitchen. Sit back, your lane is rolling.
            </p>
            <div className="mt-4 text-sm">
              <p className="font-mono-accent text-muted">
                Order total: <span className="text-primary">₹{total.toFixed(0)}</span>
              </p>
            </div>
          </motion.div>
        )}

        {!isEmpty && !successOrder && (
          <div className="mt-6 flex flex-col gap-6 md:flex-row">
            <div className="flex-1 space-y-3">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <aside className="w-full space-y-4 rounded-3xl bg-card p-4 shadow-soft-card md:w-80">
              <h2 className="font-display-alt text-lg font-semibold text-dark">
                Order summary
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-mono-accent text-dark">
                    ₹{subtotal.toFixed(0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Delivery fee</span>
                  <span className="font-mono-accent text-dark">
                    {deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Taxes & charges</span>
                  <span className="font-mono-accent text-dark">
                    ₹{taxes.toFixed(0)}
                  </span>
                </div>
                <hr className="border-dashed border-orange-200" />
                <div className="flex justify-between text-sm font-semibold">
                  <span>Total to pay</span>
                  <span className="font-mono-accent text-primary">
                    ₹{total.toFixed(0)}
                  </span>
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-500">{error}</p>
              )}

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                disabled={placing}
                onClick={handlePlaceOrder}
                className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-soft-card transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {placing ? 'Placing your order...' : 'Place order'}
              </motion.button>
            </aside>
          </div>
        )}
      </div>
    </PageTransition>
  )
}

export default Cart

