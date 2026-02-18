import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import HomePage from './pages/Home'
import RestaurantPage from './pages/Restaurant'
import CartPage from './pages/Cart'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { useAuthStore } from './store/useAuthStore'

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

const AppShell = () => {
  const location = useLocation()
  const hideNav = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <div className="min-h-screen app-bg text-dark font-body flex flex-col">
      {!hideNav && <Navbar />}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/restaurant/:id"
              element={
                <ProtectedRoute>
                  <RestaurantPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
      {!hideNav && <Footer />}
    </div>
  )
}

export default AppShell
