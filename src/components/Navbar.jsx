import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, ShoppingBag, LogOut, User } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useCartStore } from '../store/useCartStore'

export const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  // Use a primitive selector so Zustand can memoize correctly and avoid
  // infinite render loops from unstable object references.
  const totalItems = useCartStore((state) =>
    Object.values(state.items).reduce((sum, item) => sum + item.quantity, 0),
  )

  const [cartBump, setCartBump] = useState(false)

  useEffect(() => {
    if (totalItems > 0) {
      setCartBump(true)
      const timeout = setTimeout(() => setCartBump(false), 260)
      return () => clearTimeout(timeout)
    }
    return undefined
  }, [totalItems])

  const onLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-40 frosted-nav">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/252.jpg"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
            <div className="leading-tight">
              <div className="font-display-alt text-lg font-semibold tracking-wide">
                CraveLane
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted">
                Warm . Street . Fresh
              </div>
            </div>
          </Link>
          <button
            type="button"
            className="hidden items-center gap-1 rounded-full border border-orange-200 bg-white/70 px-3 py-1 text-xs text-muted shadow-sm md:inline-flex"
          >
            <MapPin className="h-3 w-3 text-primary" />
            <span>Mumbai • Now</span>
          </button>
        </div>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className={`hidden text-sm font-medium transition-colors sm:inline-block ${
              isActive('/') ? 'text-primary' : 'text-muted hover:text-dark'
            }`}
          >
            Home
          </Link>
          <motion.div
            animate={cartBump ? { scale: 1.1, y: -1 } : { scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 16 }}
          >
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 rounded-full bg-dark px-3 py-1.5 text-xs font-medium text-white shadow-soft-card transition hover:bg-black"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="font-mono-accent text-[11px]">
                  {totalItems.toString().padStart(2, '0')}
                </span>
              )}
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-semibold">
                  {totalItems}
                </span>
              )}
            </Link>
          </motion.div>

          {user ? (
            <>
              <div className="hidden items-center gap-2 rounded-full bg-card px-3 py-1 text-xs text-muted sm:flex">
                <User className="h-3.5 w-3.5 text-primary" />
                <span className="max-w-[120px] truncate">
                  {user.name || user.email}
                </span>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-xs font-medium text-muted transition hover:border-primary hover:text-primary"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-xs font-medium text-muted transition hover:border-primary hover:text-primary"
            >
              <User className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Login</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

