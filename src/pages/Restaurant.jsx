import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Clock, MapPin } from 'lucide-react'
import { fetchMenuItemsForRestaurant, fetchRestaurantById } from '../api/restaurants'
import { PageTransition } from '../components/PageTransition'
import { MenuItemCard } from '../components/MenuItemCard'
import { CartBar } from '../components/CartBar'

const RestaurantHeaderSkeleton = () => (
  <div className="bg-card px-4 pb-4 pt-6 shadow-soft-card">
    <div className="mx-auto flex max-w-4xl gap-4">
      <div className="skeleton h-20 w-20 rounded-3xl" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-5 w-48 rounded-full" />
        <div className="skeleton h-4 w-32 rounded-full" />
        <div className="flex gap-2">
          <div className="skeleton h-4 w-20 rounded-full" />
          <div className="skeleton h-4 w-20 rounded-full" />
        </div>
      </div>
    </div>
  </div>
)

const RestaurantPage = () => {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        setLoading(true)
        const [r, m] = await Promise.all([
          fetchRestaurantById(id),
          fetchMenuItemsForRestaurant(id),
        ])
        if (mounted) {
          setRestaurant(r)
          setItems(m)
        }
      } catch (err) {
        console.error('[Restaurant] Failed to load data', err)
        if (mounted) {
          setError(
            err?.message ||
              'We could not reach this kitchen right now. Try again in a bit.',
          )
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [id])

  const groupedByCategory = useMemo(() => {
    const groups = {}
    items.forEach((item) => {
      const key = item.category || 'Featured'
      if (!groups[key]) groups[key] = []
      groups[key].push(item)
    })
    return groups
  }, [items])

  const categories = Object.keys(groupedByCategory)

  return (
    <PageTransition className="pb-20">
      {loading ? (
        <RestaurantHeaderSkeleton />
      ) : restaurant ? (
        <div className="bg-card px-4 pb-4 pt-6 shadow-soft-card">
          <div className="mx-auto flex max-w-4xl gap-4">
            <div className="hidden h-20 w-20 overflow-hidden rounded-3xl md:block">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-2">
              <h1 className="font-display-alt text-2xl font-semibold text-dark">
                {restaurant.name}
              </h1>
              <p className="text-sm text-muted">
                {restaurant.cuisines?.join(' • ')}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-sm">
                  <Star className="h-3.5 w-3.5 text-secondary" />
                  <span className="font-medium">{restaurant.rating}</span>
                  <span className="text-muted">
                    ({restaurant.ratingCount}+ ratings)
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-muted shadow-sm">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span>{restaurant.deliveryTime} min</span>
                </span>
                <span className="inline-flex items-center gap-1 text-muted">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{restaurant.location}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card px-4 pb-4 pt-6 text-sm text-muted shadow-soft-card">
          This kitchen could not be found.
        </div>
      )}

      <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-6 px-4 md:flex-row">
        <aside className="order-2 hidden w-56 shrink-0 md:order-1 md:block">
          <div className="sticky top-24 space-y-2 rounded-3xl bg-white/90 p-3 shadow-soft-card">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
              Jump to
            </p>
            {categories.map((cat) => (
              <a
                key={cat}
                href={`#section-${cat}`}
                className="block rounded-full px-3 py-1 text-xs text-muted transition hover:bg-card hover:text-dark"
              >
                {cat}
              </a>
            ))}
          </div>
        </aside>

        <section className="order-1 flex-1 space-y-6 md:order-2">
          {error && (
            <p className="rounded-2xl bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {categories.map((cat) => (
            <div key={cat} id={`section-${cat}`} className="space-y-3">
              <h2 className="font-display-alt text-lg font-semibold text-dark">
                {cat}
              </h2>
              <div className="space-y-3">
                {groupedByCategory[cat].map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    restaurant={restaurant}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      <CartBar />
    </PageTransition>
  )
}

export default RestaurantPage

