// ...existing code...
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Please enter your email.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    try {
      setLoading(true)
      // TODO: replace with real auth call (fetch / axios)
      await new Promise((res) => setTimeout(res, 700))
      // on success navigate to protected page
      navigate('/dashboard')
    } catch (err) {
      setError('Login failed. Please check credentials and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl p-6">
        <header className="text-center mb-6">
          <div className="mx-auto h-12 w-12 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-gray-900 font-bold">
            CF
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-gray-100">Welcome back</h1>
          <p className="text-sm text-gray-400 mt-1">Sign in to continue to ChatFlow</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-sm text-red-300 bg-red-900/20 border border-red-800 p-2 rounded">
              {error}
            </div>
          )}

          <label className="block">
            <span className="text-sm text-gray-300">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full px-3 py-2 bg-gray-900 text-gray-100 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
              autoComplete="email"
            />
          </label>

          <label className="block">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Password</span>
              <Link to="/forgot-password" className="text-xs text-cyan-400 hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative mt-1">
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-gray-900 text-gray-100 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
                autoComplete="current-password"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-300 hover:text-white"
              >
                {showPwd ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center text-sm text-gray-300">
              <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" />
              <span className="ml-2">Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-medium hover:opacity-95 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <footer className="mt-6 text-center text-sm text-gray-400">
          <span>Already have an account? </span>
          <Link to="/login" className="text-cyan-400 hover:underline font-medium">
            Sign in
          </Link>
        </footer>
      </div>
    </div>
  )
}

export default Register
// ...existing code...