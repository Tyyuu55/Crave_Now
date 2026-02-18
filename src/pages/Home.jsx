import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Flame } from 'lucide-react'
import { fetchRestaurants } from '../api/restaurants'
import {
  RestaurantCard,
  RestaurantCardSkeleton,
} from '../components/RestaurantCard'
import { CategoryStrip } from '../components/CategoryStrip'
import { PageTransition } from '../components/PageTransition'

// Debug marker so we know Home is actually rendering
console.log('[Home] module loaded')

// Fallback data used when API is unavailable so the page never renders blank
const fallbackRestaurants = [
  {
    id: 'f1',
    name: 'Gully Grill Co. (offline demo)',
    cuisines: ['North Indian', 'Tandoor', 'Street Rolls'],
    tags: ['rolls', 'bowls'],
    rating: 4.6,
    ratingCount: 2300,
    deliveryTime: 28,
    averagePrice: 450,
    location: 'Bandra West',
    offer: '20% OFF on smoky grills',
    image:
      'https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'f2',
    name: 'Bombay Bao & Bowls (offline demo)',
    cuisines: ['Asian', 'Bao', 'Rice Bowls'],
    tags: ['bowls', 'burgers'],
    rating: 4.5,
    ratingCount: 1800,
    deliveryTime: 24,
    averagePrice: 520,
    location: 'Khar',
    offer: 'Flat ₹120 OFF on combos',
    image:
      'https://images.pexels.com/photos/327158/pexels-photo-327158.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'f3',
    name: 'Midnight Momo Cart (offline demo)',
    cuisines: ['Tibetan', 'Fast Food'],
    tags: ['bowls', 'quick'],
    rating: 4.3,
    ratingCount: 950,
    deliveryTime: 22,
    averagePrice: 350,
    location: 'Andheri',
    offer: 'Buy 1 Get 1 Momos',
    image:
      'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
]

const heroWords = ['Cravings', 'Delivered', 'Warm.']

const Hero = ({ search, onSearchChange }) => {
  return (
    <section className="hero-noise hero-gradient hero-clip rounded-b-[3rem] pb-10 pt-10 text-white shadow-soft-card w-full relative overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:px-16 md:flex-row md:items-center">
        <div className="relative flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            Late-night friendly • Under 30 min
          </div>
          <div className="space-y-3">
            <div className="font-display text-4xl font-semibold md:text-5xl">
              {heroWords.map((word, idx) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + idx * 0.12,
                    duration: 0.4,
                    ease: 'easeOut',
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <p className="max-w-md text-sm text-orange-50 md:text-base">
              From smoky grills to street-side chaat — explore a lane of handpicked
              neighbourhood kitchens, brought to your door hot.
            </p>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-orange-100">
              <span className="inline-flex items-center gap-1 rounded-full bg-black/20 px-2 py-1">
                <Flame className="h-3 w-3 text-secondary" />
                <span>Trending tonight</span>
              </span>
              <span>Momos • Loaded fries • Tandoori rolls</span>
            </div>

            <div className="mt-1 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-orange-50">
                <MapPin className="h-3.5 w-3.5" />
                <span>Bandra West • Delivering in 25–35 mins</span>
              </div>
              <div className="relative mt-2 max-w-lg">
                <Search className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-orange-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search for momos, rolls, chaats..."
                  className="w-full rounded-full border border-white/20 bg-white/90 py-3 pl-11 pr-4 text-sm text-dark outline-none placeholder:text-muted/60 focus:border-secondary"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden h-64 flex-1 md:block">
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
            className="absolute right-4 top-2 h-40 w-40 overflow-hidden rounded-3xl border border-white/30 bg-white/10 backdrop-blur"
          >
            <img
              src="https://images.pexels.com/photos/960984/pexels-photo-960984.jpeg"
              alt="Street food platter"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 6 }}
            animate={{ opacity: 1, y: 0, rotate: 4 }}
            transition={{ delay: 0.35, duration: 0.5, ease: 'easeOut' }}
            className="absolute bottom-0 left-2 h-44 w-44 overflow-hidden rounded-3xl border border-white/30 bg-white/10 backdrop-blur"
          >
            <img
              src="https://images.pexels.com/photos/4109130/pexels-photo-4109130.jpeg"
              alt="Buns and sliders"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const SectionHeader = ({ title, eyebrow, action }) => (
  <div className="mb-3 flex items-center justify-between gap-3">
    <div>
      {eyebrow && (
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
          {eyebrow}
        </p>
      )}
      <h2 className="section-title font-display-alt text-xl font-semibold text-dark md:text-2xl">
        {title}
      </h2>
    </div>
    {action}
  </div>
)

const Home = () => {
  console.log('[Home] render start')

  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [quickFilter, setQuickFilter] = useState('top')
  const [categoryFilter, setCategoryFilter] = useState(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        setLoading(true)
        const data = await fetchRestaurants()
        if (mounted) {
          // If API returns nothing, fall back to inline demo data
          if (!data || data.length === 0) {
            console.warn(
              '[Home] /restaurants returned empty, using fallback data',
            )
            setRestaurants(fallbackRestaurants)
          } else {
            setRestaurants(data)
          }
        }
      } catch (err) {
        console.error('[Home] Failed to load restaurants', err)
        if (mounted) {
          setError(
            err?.message ||
              'Unable to reach the kitchen right now. Showing a demo lane instead.',
          )
          setRestaurants(fallbackRestaurants)
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  const filtered = useMemo(() => {
    let list = [...restaurants]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisines?.some((c) => c.toLowerCase().includes(q)),
      )
    }
    if (categoryFilter) {
      list = list.filter((r) => r.tags?.includes(categoryFilter))
    }
    if (quickFilter === 'top') {
      list.sort((a, b) => b.rating - a.rating)
    } else if (quickFilter === 'fast') {
      list = list.filter((r) => r.deliveryTime <= 30)
    } else if (quickFilter === 'offers') {
      list = list.filter((r) => !!r.offer)
    }
    return list
  }, [restaurants, search, quickFilter, categoryFilter])

  const topRated = filtered.slice(0, 6)
  const offers = filtered.filter((r) => r.offer)
  const quickBites = filtered.filter((r) => r.deliveryTime <= 30)

  return (
    <PageTransition className="pb-12">
      <Hero search={search} onSearchChange={setSearch} />

      <div className="mx-auto mt-6 max-w-6xl px-4">
        <CategoryStrip
          activeId={categoryFilter}
          onChange={setCategoryFilter}
        />

        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          {[
            { id: 'top', label: 'Top rated' },
            { id: 'fast', label: '< 30 min' },
            { id: 'offers', label: 'Offers' },
          ].map((f) => {
            const active = quickFilter === f.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setQuickFilter(f.id)}
                className={`rounded-full border px-3 py-1 font-medium transition ${
                  active
                    ? 'border-primary bg-primary text-white'
                    : 'border-orange-100 bg-white text-muted hover:border-primary/60 hover:text-dark'
                }`}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        {error && (
          <p className="mt-6 rounded-2xl bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <section className="mt-8">
          <SectionHeader
            eyebrow="For tonight"
            title="Top rated near you"
          />
          {loading ? (
            <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, idx) => (
                <RestaurantCardSkeleton key={idx} />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2">
              {topRated.map((r, idx) => (
                <RestaurantCard key={r.id} restaurant={r} index={idx} />
              ))}
            </div>
          )}
        </section>

        <section className="mt-10">
          <SectionHeader
            eyebrow="Swipe-worthy"
            title="Offers & warm deals"
          />
          <div className="scrollbar-soft flex gap-4 overflow-x-auto pb-2">
            {(loading ? Array.from({ length: 4 }) : offers).map(
              (r, idx) =>
                (loading ? (
                  <div
                    key={idx}
                    className="h-36 w-64 flex-shrink-0 overflow-hidden rounded-3xl bg-card shadow-soft-card"
                  >
                    <div className="skeleton h-full w-full" />
                  </div>
                ) : (
                  <div
                    key={r.id}
                    className="relative h-36 w-64 flex-shrink-0 overflow-hidden rounded-3xl bg-dark text-white shadow-soft-card"
                  >
                    <img
                      src={r.image}
                      alt={r.name}
                      className="absolute inset-0 h-full w-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                    <div className="relative flex h-full flex-col justify-between p-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-orange-200">
                          Tonight only
                        </p>
                        <h3 className="font-display-alt text-lg font-semibold">
                          {r.offer}
                        </h3>
                      </div>
                      <p className="text-xs text-orange-100">
                        {r.name} • {r.location}
                      </p>
                    </div>
                  </div>
                )),
            )}
          </div>
        </section>

        <section className="mt-10">
          <SectionHeader
            eyebrow="Quick bites"
            title="Under 30 minutes"
            action={
              <span className="text-xs text-muted">
                Showing {quickBites.length} kitchens
              </span>
            }
          />
          <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2">
            {(loading ? Array.from({ length: 3 }) : quickBites).map(
              (r, idx) =>
                (loading ? (
                  <RestaurantCardSkeleton key={idx} />
                ) : (
                  <RestaurantCard
                    key={r.id}
                    restaurant={r}
                    index={idx}
                  />
                )),
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

export default Home

