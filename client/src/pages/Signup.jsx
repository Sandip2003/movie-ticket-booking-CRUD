import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      // API call to signup
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        toast.success('Account created successfully!')
        navigate('/')
      } else {
        toast.error(data.message || 'Signup failed')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4'>
      <div className='w-full max-w-md bg-slate-800 rounded-lg shadow-2xl p-8'>
        <h2 className='text-3xl font-bold text-white mb-8 text-center'>Sign Up</h2>

        <form onSubmit={handleSignup} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-300 mb-2'>
              Full Name
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500'
              placeholder='Enter your full name'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-300 mb-2'>
              Email
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500'
              placeholder='Enter your email'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-300 mb-2'>
              Password
            </label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500'
              placeholder='Enter your password'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-300 mb-2'>
              Confirm Password
            </label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500'
              placeholder='Confirm your password'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-200'
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className='text-center text-gray-400 mt-6'>
          Already have an account?{' '}
          <Link to='/login' className='text-red-500 hover:text-red-400 font-semibold'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
