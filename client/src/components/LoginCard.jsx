import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { XIcon } from 'lucide-react'
import toast from 'react-hot-toast'

const LoginCard = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      // API call to login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        toast.success('Login successful!')
        onClose()
        setEmail('')
        setPassword('')
      } else {
        toast.error(data.message || 'Login failed')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4'>
      <div className='w-full max-w-md bg-slate-800 rounded-lg shadow-2xl p-8 relative animate-in fade-in zoom-in duration-300'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-white transition'
        >
          <XIcon size={24} />
        </button>

        <h2 className='text-3xl font-bold text-white mb-2 text-center'>Welcome Back</h2>
        <p className='text-center text-gray-400 mb-8'>Login to your account</p>

        <form onSubmit={handleLogin} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-300 mb-2'>
              Email Address
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition'
              placeholder='Enter your email'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-300 mb-2'>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition'
              placeholder='Enter your password'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 hover:shadow-lg hover:shadow-red-500/50'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className='mt-6 pt-6 border-t border-slate-700'>
          <p className='text-center text-gray-400 mb-4'>
            New user?{' '}
            <Link
              to='/signup'
              onClick={onClose}
              className='text-red-500 hover:text-red-400 font-semibold transition'
            >
              Create an account
            </Link>
          </p>
          <p className='text-center text-gray-500 text-sm'>
            Don't have an account? Sign up now to book your favorite movies!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginCard
