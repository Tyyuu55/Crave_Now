import { motion } from 'framer-motion'

const categories = [
  { id: 'bowls', label: 'Rice Bowls', emoji: '🍛' },
  { id: 'burgers', label: 'Burgers', emoji: '🍔' },
  { id: 'rolls', label: 'Rolls & Wraps', emoji: '🌯' },
  { id: 'dessert', label: 'Desserts', emoji: '🍮' },
  { id: 'chai', label: 'Chai & Snacks', emoji: '🥪' },
  { id: 'pizza', label: 'Pizza', emoji: '🍕' },
]

export const CategoryStrip = ({ activeId, onChange }) => {
  return (
    <div className="scrollbar-soft mt-4 flex gap-2 overflow-x-auto pb-1">
      {categories.map((cat) => {
        const isActive = cat.id === activeId
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(isActive ? null : cat.id)}
            className={`group relative inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              isActive
                ? 'border-primary bg-primary text-white'
                : 'border-orange-100 bg-white/80 text-muted hover:border-primary/70 hover:text-dark'
            }`}
          >
            <span className="text-lg">{cat.emoji}</span>
            <span>{cat.label}</span>
            {isActive && (
              <motion.span
                layoutId="category-underline"
                className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-white/70"
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

