"use client"
import React, { useRef, useState } from 'react'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'
import Link from 'next/link'
import axios from 'axios'
import { baseurl } from '@/app/admin/components/apis'
import { toast } from 'react-toastify'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [otpfield,setOtpfield] =useState(false)
  const inputref= useRef([]);
 const [otp,setOtp] = useState(Array(6).fill(""));


  const handelotpChange= (value,index)=>{
        if (!/^\d?$/.test(value)) return; 
          const newotp = [...otp];
          newotp[index]=value;
          setOtp(newotp)

          if(value && index <5){
            inputref.current[index+1].focus();
          }
}


const handleKeyDown= (e,index)=>{

 if(e.key=="Backspace" && !otp[index] && index > 0)
 {
          inputref.current[index - 1].focus();

 }


}

const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pasteData.every((ch) => /^\d$/.test(ch))) {
      const newOtp = [...otp];
      pasteData.forEach((digit, i) => {
        newOtp[i] = digit;
      });
      setOtp(newOtp);
    }
  };




  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await axios.post(`${baseurl}/user/sendotp`, {
      
        email: formData.email,
      
      })

 const data = await response.data;



      if (response.data.success) {
        setOtpfield(true)
        toast.success(data.message)
       
      }
    } catch (error) {
             toast.error(data.error)

      setErrors({
        submit: error.response?.data?.message || 'Signup failed. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }


const handelotpsubmit= async(e)=>{

 e.preventDefault()
 const otpstr= otp.join("")
  console.log(otpstr)

    
//     if (!validateForm()) return

//     setLoading(true)
//     try {
//       const response = await axios.post(`${baseurl}/user/sendotp`, {
//       ...formData,
      
//       })

//  const data = await response.data;
//  console.log(data)


//       if (response.data.success) {
//         setOtpfield(true)
//         setSuccess(true)
//         setFormData({
//           name: '',
//           email: '',
//           password: '',
//           confirmPassword: ''
//         })
//       }
//     } catch (error) {
//       console.error('Signup error:', error)
//       setErrors({
//         submit: error.response?.data?.message || 'Signup failed. Please try again.'
//       })
//     } finally {
//       setLoading(false)
//     }


}




  return (
    <div className="min-h-screen flex relative">



{otpfield &&
<div className="absolute top-0 left-0 w-full h-full bg-blue-500 z-50 flex flex-col gap-7 justify-center items-center">

    <div className='text-white font-bold uppercase text-2xl'>
 verify
 Otp
    </div>
      <div
        className="flex justify-between gap-3"
        onPaste={handlePaste}
      >
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={otp[index]}
            onChange={(e) => handelotpChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputref.current[index] = el)}
            className="w-12 h-12 text-center text-xl font-bold border-2 border-white bg-transparent text-white rounded-md focus:outline-none focus:border-yellow-300"
          />
        ))}
      </div>


 <div>
    <button onClick={(e)=>handelotpsubmit(e)} className='text-white  text-lg uppercase font-bold bg-green-600 px-6 cursor-pointer py-2 rounded-2xl '> Submit Otp </button>
 </div>

<div className='text-center'>
   <p>{formData.email}</p>

  <button className='text-gray-800 cursor-pointer' onClick={handleSubmit}>Resend otp</button>

</div>
  


    </div>

}


      {/* Left Side - Pet Image (2/3 on desktop, hidden on mobile) */}
      <div className="hidden lg:block lg:w-2/3 relative bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Welcome to PetKo</h1>
            <p className="text-xl mb-8 text-white/80">
              Join thousands of pet lovers who trust us with their furry friends' care and well-being.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl mb-2">🐕</div>
                <h3 className="font-semibold mb-2">Dog Care</h3>
                <p className="text-white/70 text-sm">Professional care for your canine companions</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl mb-2">🐱</div>
                <h3 className="font-semibold mb-2">Cat Care</h3>
                <p className="text-white/70 text-sm">Specialized services for your feline friends</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full lg:w-1/3 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="lg:hidden w-16 h-16 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiUser className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">Create Account</h1>
            <p className="text-gray-600 text-lg">Join our pet loving community</p>
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.submit}
              </div>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`block w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 placeholder-gray-400 text-gray-800 ${
                    errors.name ? 'border-red-300 focus:border-red-300' : 'border-gray-200 focus:border-purple-500'
                  }`}
                  placeholder="Full Name"
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-red-600 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 placeholder-gray-400 text-gray-800 ${
                    errors.email ? 'border-red-300 focus:border-red-300' : 'border-gray-200 focus:border-purple-500'
                  }`}
                  placeholder="Email Address"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-red-600 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-12 pr-12 py-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 placeholder-gray-400 text-gray-800 ${
                    errors.password ? 'border-red-300 focus:border-red-300' : 'border-gray-200 focus:border-purple-500'
                  }`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-red-600 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pl-12 pr-12 py-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 placeholder-gray-400 text-gray-800 ${
                    errors.confirmPassword ? 'border-red-300 focus:border-red-300' : 'border-gray-200 focus:border-purple-500'
                  }`}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-red-600 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-4 px-6 rounded-xl hover:from-purple-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-t-2 border-b-2 border-white rounded-full animate-spin mr-3"></div>
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Get Started
                  <FiArrowRight className="ml-2" />
                </div>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-300 underline underline-offset-4"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Terms */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                Terms
              </a>{' '}
              and{' '}
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup