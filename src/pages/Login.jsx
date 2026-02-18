import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Lock } from 'lucide-react'
import { login as loginRequest } from '../api/auth'
import { useAuthStore } from '../store/useAuthStore'

const fieldBaseClasses =
  'peer w-full rounded-2xl border bg-white/80 px-4 pb-2 pt-5 text-sm outline-none transition focus:border-primary focus:bg-white'

const labelBaseClasses =
  'pointer-events-none absolute left-4 top-3 text-xs text-muted transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-primary'

const iconBaseClasses =
  'pointer-events-none absolute right-4 top-3.5 h-4 w-4 text-muted peer-focus:text-primary'

const PageShell = ({ children }) => (
  <motion.main
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 12 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
    className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-[#FFF5EB] via-[#FFF9F2] to-[#FFFAF5] px-4 overflow-x-hidden"
  >
    {children}
  </motion.main>
)

const LogoBlock = () => (
  <div className="mb-6 text-center">
    <img
      src="/252.jpg"
      alt="Logo"
      className="mb-3 h-16 w-auto object-contain mx-auto"
    />
    <div className="font-display-alt text-2xl font-semibold">CraveLane</div>
    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted">
      Cravings Delivered
    </p>
  </div>
)

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const loginUser = useAuthStore((state) => state.login)

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')

  const validate = () => {
    const nextErrors = {}
    if (!form.email) nextErrors.email = 'Email is required'
    if (!form.password) nextErrors.password = 'Password is required'
    return nextErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setApiError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    try {
      setSubmitting(true)
      const user = await loginRequest(form)
      loginUser(user)
      const redirectTo = location.state?.from?.pathname || '/'
      navigate(redirectTo, { replace: true })
    } catch (error) {
      setApiError(error.message || 'Failed to login. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageShell>
      <div className="mx-auto flex w-full max-w-md flex-col rounded-3xl bg-card px-6 py-7 shadow-soft-card">
        <LogoBlock />
        <h1 className="mb-1 font-display text-2xl font-semibold text-dark">
          Welcome back, foodie.
        </h1>
        <p className="mb-6 text-sm text-muted">
          Sign in to track your cravings and reorder in a tap.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder=" "
              className={fieldBaseClasses}
            />
            <label className={labelBaseClasses}>Email</label>
            <Mail className={iconBaseClasses} />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder=" "
              className={fieldBaseClasses}
            />
            <label className={labelBaseClasses}>Password</label>
            <Lock className={iconBaseClasses} />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {apiError && (
            <p className="text-xs font-medium text-red-500">{apiError}</p>
          )}

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-soft-card transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span>{submitting ? 'Signing you in...' : 'Login'}</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </form>

        <p className="mt-4 text-center text-xs text-muted">
          New here?{' '}
          <Link
            to="/signup"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </PageShell>
  )
}

export default Login

