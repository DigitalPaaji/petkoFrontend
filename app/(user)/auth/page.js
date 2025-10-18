'use client';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';

const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? 'Logging in:' : 'Signing up:', formData);
  };

  return (
    <div className="py-12 xl:py-24 flex items-center justify-center ">
      <div
       
        className="max-w-2xl mx-4 w-full shadow-2xl overflow-hidden"
      >
        <div className="p-8 md:p-12 lg:p-16 bg-white">
          <div
         
            className="h-full flex flex-col justify-center"
          >
            {/* HEADER */}
            <div variants={itemVariants} className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-normal  mb-2">
                {isLogin ? 'Log In to Your Account' : 'Create Your Account'}
              </h2>
              <p className="text-gray-500">
                {isLogin
                  ? 'Welcome back! Please enter your details below.'
                  : 'Fill in the details to get started.'}
              </p>
            </div>

            {/* FORM */}
            <form variants={itemVariants} onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-gray-600 text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300  px-4 py-2 outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-600 text-sm mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300  px-4 py-2 outline-none"
                />
              </div>

              <div className="relative">
                <label className="block text-gray-600 text-sm mb-2">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300  px-4 py-2 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-gray-600 text-sm mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300  px-4 py-2 outline-none"
                  />
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-gray-600 text-sm">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="accent-[#f58f80]"
                    />
                    Remember Me
                  </label>
                  <a href="#" className="text-[#f58f80] text-sm hover:underline">
                    Forgot Password?
                  </a>
                </div>
              )}

              <button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#f58f80] text-white py-3  font-semibold shadow-md hover:bg-[#e87a6c] transition"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>

            {/* FOOTER LINK - TOGGLE */}
            <div variants={itemVariants} className="text-center mt-6">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#f58f80] font-semibold hover:underline"
                >
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
