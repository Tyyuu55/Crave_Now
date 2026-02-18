import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'

export const MenuItemCard = ({ item, restaurant }) => {
  const quantity = useCartStore(
    (state) => state.items[item.id]?.quantity || 0,
  )
  const addItem = useCartStore((state) => state.addItem)
  const increment = useCartStore((state) => state.increment)
  const decrement = useCartStore((state) => state.decrement)

  const handleAdd = () => addItem(item, restaurant)

  return (
    <motion.div
      layout
      className="card-hover flex gap-4 rounded-2xl bg-white/80 p-3.5 shadow-sm"
    >
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span
              className={`veg-indicator ${
                item.isVeg ? '' : 'nonveg-indicator'
              }`}
            />
            <span className="uppercase tracking-[0.18em]">
              {item.isVeg ? 'Veg' : 'Non-Veg'}
            </span>
            {item.spicy && (
              <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-500">
                Spicy
              </span>
            )}
          </div>
          <h4 className="font-display-alt text-base font-semibold text-dark">
            {item.name}
          </h4>
          <p className="font-mono-accent text-sm text-primary">
            ₹{item.price}
          </p>
          {item.description && (
            <p className="line-clamp-2 text-xs text-muted">{item.description}</p>
          )}
        </div>

        {quantity === 0 ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={handleAdd}
            className="mt-1 inline-flex w-max items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white shadow-soft-card"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add</span>
          </motion.button>
        ) : (
          <motion.div
            layout
            className="mt-1 inline-flex items-center gap-3 rounded-full bg-dark px-3 py-1.5 text-xs font-semibold text-white"
          >
            <button
              type="button"
              onClick={() => decrement(item.id)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="font-mono-accent text-sm">{quantity}</span>
            <button
              type="button"
              onClick={() => increment(item.id)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-dark"
            >
              <Plus className="h-3 w-3" />
            </button>
          </motion.div>
        )}
      </div>

      <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-2xl">
        <img
          src={item.image}
          alt={item.name}
          className="image-zoom h-full w-full object-cover"
        />
        {item.badge && (
          <div className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-primary shadow-sm">
            {item.badge}
          </div>
        )}
      </div>
    </motion.div>
  )
}

