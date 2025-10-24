"use client"
import React, { useRef, useState } from 'react'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Link from 'next/link'
import axios from 'axios'
import { baseurl } from '@/app/admin/components/apis'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', rememberMe: false })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [otpField, setOtpField] = useState(false)
  const [otp, setOtp] = useState(Array(6).fill(""))
  const inputRef = useRef([])
  const route = useRouter()







const fetchuser=async()=>{
    try {

        const response = await axios.get(`${baseurl}/user/getuser`,{
            withCredentials:true
        })

        const data = await response.data;
        if(data.success){
route.push("/user/dashboard")
        }
        else{
        }
        
    } catch (error) {

    }
}

useEffect(()=>{
    fetchuser()
},[])





  // ====== FORM HANDLERS ======
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim() || formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters'
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required'
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password min 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    try {
      const { data } = await axios.post(`${baseurl}/user/sendotp`, { email: formData.email })
      if (data.success) {
        setOtpField(true)
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed')
    } finally { setLoading(false) }
  }

  const handleOtpChange = (val, i) => {
    if (!/^\d?$/.test(val)) return
    const newOtp = [...otp]
    newOtp[i] = val
    setOtp(newOtp)
    if (val && i < 5) inputRef.current[i + 1].focus()
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    const otpStr = otp.join("")
    if (!validateForm()) return
    setLoading(true)
    try {
      const { data } = await axios.post(`${baseurl}/user/signup`, { ...formData, otp: otpStr }, { withCredentials: true })
      if (data.success) {
        toast.success(data.message)
        setFormData({ name: '', email: '', password: '', confirmPassword: '', rememberMe: false })
        setOtpField(false)
        route.push("/")
      } else toast.error(data.message)
    } catch (error) { toast.error(error.response?.data?.message || 'Signup failed') }
    finally { setLoading(false) }
  }


 const handelKeyInput = (e,index)=>{
  if(e.key==="Backspace"&& !otp[index] && index >0){
  inputRef.current[index-1].focus()

  }
 }






 const handelpaste =  (e)=>{

    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pasteData.every((ch) => /^\d$/.test(ch))) {
      const newOtp = [...otp];
      pasteData.forEach((digit, i) => {
        newOtp[i] = digit;
      });
      setOtp(newOtp);
    }
 }



  // ====== JSX ======
  return (
    <div className="min-h-screen flex   justify-center items-center">
      {/* ====== FORM SECTION ====== */}
      <div className="w-full lg:w-1/3 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-3 text-center">Create Account</h1>
          <p className="text-gray-600 text-center mb-6">Join our pet loving community</p>

          {otpField ? (
            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
              <p className="text-center mb-2">{formData.email}</p>
              <div className="flex justify-between gap-2"
              onPaste={handelpaste}
              >
                {otp.map((d, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={d}
                    onKeyDown={(e)=>handelKeyInput(e,i)}
                    ref={el => inputRef.current[i] = el}
                    onChange={e => handleOtpChange(e.target.value, i)}
                    className="w-12 h-12 text-center border-2 rounded-md text-xl"
                  />
                ))}
              </div>
              <button type="submit" className="bg-green-600 text-white py-2 rounded-xl mt-4">Submit OTP</button>
              <button type="button" onClick={handleSubmit} className="text-gray-800 mt-2">Resend OTP</button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-1">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border px-4 py-2 rounded-xl" required />
                {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border px-4 py-2 rounded-xl" required />
                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-600 mb-1">Password</label>
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} className="w-full border px-4 py-2 rounded-xl" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9">{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-600 mb-1">Confirm Password</label>
                <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full border px-4 py-2 rounded-xl" required />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-9">{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</button>
                {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-gray-600 text-sm">
                  <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="accent-[#f58f80]" /> Remember Me
                </label>
                <a href="#" className="text-[#f58f80] text-sm hover:underline">Forgot Password?</a>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-[#f58f80] text-white py-3 rounded-xl mt-4">
                {loading ? 'Creating...' : 'Sign Up'}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-gray-600">
            Already have an account? <Link href="/user/login" className="text-purple-600 font-semibold">Sign in</Link>
          </p>
        </div>
      </div>

    
    </div>
  )
}

export default Signup
