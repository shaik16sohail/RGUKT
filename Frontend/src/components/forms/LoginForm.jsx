import { useState } from 'react'
import '../../index.css'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function LoginForm () {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const {login,isLoggedIn,user}=useAuth();
  const navigate=useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [otp, setOtp] = useState('')
  // const [otpEnabled, setOtpEnabled] = useState(false)

  useEffect(()=>{
    if(isLoggedIn){
      console.log("you are already loggedIn");
      navigate(`/${user.userType}/home/`);
    }
  },[]);

  const sendOtp = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/auth/send-otp`, { email })
      alert(response.data.message)
      setOtpEnabled(true)
    } catch (err) {
      console.error(err)
      alert('Failed to send OTP')
    }
  }

  const handleSubmit = async () => {
    try {
      // First verify OTP
      // const verifyRes = await axios.post('http://localhost:8080/api/auth/verify-otp', {
      //   email:email,
      //   otp:otp
      // })
      // console.log(verifyRes.data);
      // if (verifyRes.data.message=="Otp Verified") {
        // Now login
        const loginRes = await axios.post(`${backendUrl}/api/auth/login`, {
          email:email,
          password:password
        }, { withCredentials: true });
        login(loginRes.data.user);
        toast.success("Successfully logged in");
        navigate(`/${loginRes.data.user.userType}/home/`);
        // alert(loginRes.data);
        setEmail("");
        setPassword("");
        // setOtp("");
        // setOtpEnabled(false);
        // Add navigation or localStorage logic here if needed
      // } else {
      //   alert('Invalid OTP')
      // }
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong");
    }
  }

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8"
      style={{
        background: 'linear-gradient(90deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 100%)'
      }}
    >
      <div 
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 backdrop-blur-sm"
        style={{ backgroundColor: '#1b1b1b93' }}
      >
        {/* Header with Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <img 
              src="/rguktLogo.png" 
              alt="RGUKT Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 object-contain"
            />
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-white font-semibold">Stay Master</h1>
          </div>
          {/* <h2 className="text-xl sm:text-2xl font-semibold text-gray-200 mb-2">Welcome Back</h2> */}
          <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-red-500 to-orange-600 mx-auto rounded-full"></div>
        </div>

        {/* Login Form */}
        <div className="space-y-4 sm:space-y-6">
          {/* Email Input */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-gray-200">Email Address</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-gray-200">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Submit Button - Reduced Size */}
          <div className="pt-2 sm:pt-4">
            <button
              onClick={handleSubmit}
              className="w-full py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold text-sm sm:text-base rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </button>
          </div>

          {/* Additional Options */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center">
              <div className="border-t border-gray-600 flex-1"></div>
              <span className="px-2 sm:px-3 text-gray-400 text-xs sm:text-sm">or</span>
              <div className="border-t border-gray-600 flex-1"></div>
            </div>

            <div className="text-center">
              <p className="text-gray-400 text-xs sm:text-sm">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-red-400 hover:text-red-300 font-medium transition-colors duration-300 text-xs sm:text-sm"
                >
                  Create one here
                </button>
              </p>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-300 text-xs sm:text-sm font-medium transition-colors duration-300"
              >
                Forgot your password?
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-600">
          <p className="text-center text-gray-500 text-xs">
            Secure login powered by Stay Master
          </p>
        </div>
      </div>
    </div>
  )
}