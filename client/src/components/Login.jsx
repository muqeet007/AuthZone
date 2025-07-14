import React, { useState } from 'react'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'
function Login() {
  const [activeTab, setActiveTab] = useState('login')
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const [indicatorMessage,setIndicatorMessage]=useState("")
  const [email,setEmail]=useState("")
  const [error,setError]=useState("")
  const navigate=useNavigate()


  const axiosRegisterPost=async()=>
  {
    try{
        const response=await axios.post('/api/user/register',{name,email,password})
        setIndicatorMessage(response.data.message)
        navigate('/')
    }
    catch(error)
    {
        setError(error.response?.data?.message||"Registration Failed.")
    }
  }
  const axiosLoginPost=async()=>
  {
    try{
        const response=await axios.post('/api/user/login',{email,password})
        setIndicatorMessage(response.data.message)
        navigate('/dashboard')

    }
    catch(error)
    {
        setError(error.response?.data?.message||"Login Failed.")
    }
  }

 const handleRegistration = (e) => {
  e.preventDefault();
  axiosRegisterPost(); 
}
  const handleLogin=(e)=>
  {
        e.preventDefault();
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
              onClick={() => {setIndicatorMessage("");setError("") ; setActiveTab('login')}}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex-1 text-center ${
                activeTab === 'login'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign in
            </button>
            <button
              onClick={() => {setIndicatorMessage("");setError("") ; setActiveTab('register')}}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex-1 text-center ${
                activeTab === 'register'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Create account
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <div className="space-y-6 pt-6">
              <form className="space-y-6" onSubmit={handleLogin}>
                {error && <p className="text-red-500">{error}</p>}

                {indicatorMessage&&<p className="text-green-500">{indicatorMessage}</p>}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-black hover:text-gray-700">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Sign in
                </button>
              </form>
            </div>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <div className="space-y-6 pt-6">
              <form className="space-y-6" onSubmit={handleRegistration}>
                {error && <p className="text-red-500">{error}</p>}
                {indicatorMessage&&<p className="text-green-500">{indicatorMessage}</p>}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    onChange={(e)=>setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="font-medium text-black hover:text-gray-700">
                      Terms and Conditions
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Create account
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Login
