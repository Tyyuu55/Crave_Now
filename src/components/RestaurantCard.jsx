import { motion } from 'framer-motion'
import { Star, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      delay: 0.05 * index,
      ease: [0.23, 0.82, 0.25, 1],
    },
  }),
}

export const RestaurantCard = ({ restaurant, index = 0 }) => {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      className="card-hover overflow-hidden rounded-2xl bg-card shadow-soft-card"
    >
      <Link to={`/restaurant/${restaurant.id}`} className="block">
        <div className="relative h-44 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="image-zoom h-full w-full object-cover"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

          {restaurant.offer && (
            <div className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-soft-card">
              {restaurant.offer}
            </div>
          )}

          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            <Star className="h-3.5 w-3.5 text-secondary" />
            <span>{restaurant.rating?.toFixed(1)}</span>
            <span className="h-4 w-px bg-white/20" />
            <Clock className="h-3.5 w-3.5 text-secondary" />
            <span>{restaurant.deliveryTime} min</span>
          </div>
        </div>

        <div className="space-y-1.5 px-3.5 pb-3.5 pt-3">
          <h3 className="font-display-alt text-lg font-semibold text-dark">
            {restaurant.name}
          </h3>
          <p className="line-clamp-1 text-xs uppercase tracking-[0.16em] text-muted">
            {restaurant.cuisines?.join(' • ')}
          </p>
          <div className="flex items-center justify-between text-xs text-muted">
            <span className="font-mono-accent">
              ₹{restaurant.averagePrice} for two
            </span>
            <span>{restaurant.location}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export const RestaurantCardSkeleton = () => (
  <div className="card-hover overflow-hidden rounded-2xl bg-card shadow-soft-card">
    <div className="skeleton h-44 w-full rounded-b-none" />
    <div className="space-y-2 px-3.5 pb-3.5 pt-3">
      <div className="skeleton h-4 w-32 rounded-full" />
      <div className="skeleton h-3 w-24 rounded-full" />
      <div className="flex gap-2">
        <div className="skeleton h-3 w-20 rounded-full" />
        <div className="skeleton h-3 w-16 rounded-full" />
      </div>
    </div>
  </div>
)

