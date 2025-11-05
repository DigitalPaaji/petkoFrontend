'use client';
import { baseurl } from '@/app/admin/components/apis';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AuthLayout = () => {
  const [showPassword, setShowPassword] = useState(false);
  const route = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',

  });


  
  const [loading,setLoading]=useState(false)



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

 const handleSubmit = async (e) => {
  e.preventDefault();
setLoading(true)
  try {
    // Optional: enforce minimum password length
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const response = await axios.post(
      `${baseurl}/user/signin`,
      { ...formData },
      { withCredentials: true }
    );

    const data = response.data;

    if (data.success) {
      toast.success(data.message);
      route.push("/user/dashboard")
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Login failed. Please try again.");
  }
  setLoading(false)
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
           Log In to Your Account
              </h2>
              <p className="text-gray-500">
               Welcome back! Please enter your details below.
              </p>
            </div>

            {/* FORM */}
            <form variants={itemVariants} onSubmit={handleSubmit} className="space-y-5">
            

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
                  minLength={6}
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

            

              

              <button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-[#f58f80] text-white py-3  font-semibold shadow-md hover:bg-[#e87a6c] transition"
              >
{loading ? "Loading... " :"Login"}
              </button>
            </form>

            {/* FOOTER LINK - TOGGLE */}
            <div variants={itemVariants} className="text-center mt-6">
              <p className="text-gray-600">
             Don't have an account?
            {" "}    <Link
                  href={"/user/signup"}
                 
                  className="text-[#f58f80] font-semibold hover:underline"
                >
             Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
