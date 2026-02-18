import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'

export const CartItem = ({ item }) => {
  const increment = useCartStore((state) => state.increment)
  const decrement = useCartStore((state) => state.decrement)
  const removeItem = useCartStore((state) => state.removeItem)

  return (
    <div className="flex gap-4 rounded-2xl bg-white/90 p-3.5 shadow-sm">
      <div className="relative h-20 w-24 overflow-hidden rounded-2xl">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-display-alt text-base font-semibold text-dark">
              {item.name}
            </h4>
            <p className="text-xs text-muted">{item.restaurantName}</p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="text-muted hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-dark px-3 py-1 text-xs font-semibold text-white">
            <button
              type="button"
              onClick={() => decrement(item.id)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="font-mono-accent text-sm">{item.quantity}</span>
            <button
              type="button"
              onClick={() => increment(item.id)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-dark"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <div className="font-mono-accent text-sm text-primary">
            ₹{(item.price * item.quantity).toFixed(0)}
          </div>
        </div>
      </div>
    </div>
  )
}

