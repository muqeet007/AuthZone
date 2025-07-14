import React, { useState } from 'react'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [activeTab, setActiveTab] = useState('login')

  // ✅ changed: Separate states for login and register
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [indicatorMessage, setIndicatorMessage] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const axiosRegisterPost = async () => {
    // ✅ changed: local password match check
    if (registerPassword !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      const response = await axios.post('/api/user/register', {
        name: registerName,
        email: registerEmail,
        password: registerPassword
      })
      setIndicatorMessage(response.data.message)
      setError("")
      navigate('/')
    } catch (error) {
      const errorObject = error.response?.data?.errors
      if (errorObject) {
        const errorMessages = Object.values(errorObject).map(err => err.msg)
        setError(errorMessages.join('\n'))
      } else {
        setError(error.response?.data?.message || "Registration failed.")
      }
    }
  }

  const axiosLoginPost = async () => {
    try {
      const response = await axios.post('/api/user/login', {
        email: loginEmail,
        password: loginPassword
      })
      setIndicatorMessage(response.data.message)
      setError("")
      navigate('/dashboard')
    } catch (error) {
      const errorObject = error.response?.data?.errors
      if (errorObject) {
        const errorMessages = Object.values(errorObject).map(err => err.msg)
        setError(errorMessages.join('\n'))
      } else {
        setError(error.response?.data?.message || "Login failed.")
      }
    }
  }

  const handleRegistration = (e) => {
    e.preventDefault()
    axiosRegisterPost()
  }

  const handleLogin = (e) => {
    e.preventDefault()
    axiosLoginPost()
  }

  return (
    <div className="h-full min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">Welcome</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 sm:shadow sm:rounded-lg sm:px-10 sm:border sm:border-gray-200">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => { setIndicatorMessage(""); setError(""); setActiveTab('login') }}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex-1 text-center ${activeTab === 'login' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Sign in
            </button>
            <button
              onClick={() => { setIndicatorMessage(""); setError(""); setActiveTab('register') }}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex-1 text-center ${activeTab === 'register' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Create account
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <div className="space-y-6 pt-6">
              <form className="space-y-6" onSubmit={handleLogin}>
                {error && <p className="text-red-500 whitespace-pre-line">{error}</p>}
                {indicatorMessage && <p className="text-green-500">{indicatorMessage}</p>}

                {/* ✅ changed: using loginEmail/loginPassword */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>

                <button type="submit" className="w-full py-2 px-4 border rounded-md text-white bg-black hover:bg-gray-800 text-sm">Sign in</button>
              </form>
            </div>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <div className="space-y-6 pt-6">
              <form className="space-y-6" onSubmit={handleRegistration}>
                {error && <p className="text-red-500 whitespace-pre-line">{error}</p>}
                {indicatorMessage && <p className="text-green-500">{indicatorMessage}</p>}

                {/* ✅ changed: using registerName/registerEmail/registerPassword */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <input
                    id="register-email"
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="register-password"
                    type="password"
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <button type="submit" className="w-full py-2 px-4 border rounded-md text-white bg-black hover:bg-gray-800 text-sm">Create account</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
