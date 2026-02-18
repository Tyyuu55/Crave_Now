import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Lock, User } from 'lucide-react'
import { signup as signupRequest } from '../api/auth'

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
      First time here?
    </p>
  </div>
)

const Signup = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')

  const validate = () => {
    const nextErrors = {}
    if (!form.name) nextErrors.name = 'Name is required'
    if (!form.email) nextErrors.email = 'Email is required'
    if (!form.password) nextErrors.password = 'Password is required'
    if (form.password && form.password.length < 6) {
      nextErrors.password = 'Use at least 6 characters'
    }
    if (!form.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password'
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match'
    }
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
      await signupRequest({
        name: form.name,
        email: form.email,
        password: form.password,
      })
      navigate('/login', { replace: true })
    } catch (error) {
      setApiError(error.message || 'Failed to sign up. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageShell>
      <div className="mx-auto flex w-full max-w-md flex-col rounded-3xl bg-card px-6 py-7 shadow-soft-card">
        <LogoBlock />
        <h1 className="mb-1 font-display text-2xl font-semibold text-dark">
          Create your CraveLane.
        </h1>
        <p className="mb-6 text-sm text-muted">
          Save your favourites, repeat past orders, and get curated picks.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder=" "
              className={fieldBaseClasses}
            />
            <label className={labelBaseClasses}>Full name</label>
            <User className={iconBaseClasses} />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

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

          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder=" "
              className={fieldBaseClasses}
            />
            <label className={labelBaseClasses}>Confirm password</label>
            <Lock className={iconBaseClasses} />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword}
              </p>
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
            <span>{submitting ? 'Creating your lane...' : 'Sign up'}</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </form>

        <p className="mt-4 text-center text-xs text-muted">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </PageShell>
  )
}

export default Signup

