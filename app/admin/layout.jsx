"use client"
import "../globals.css"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiBarChart2,
  FiShoppingBag,
  FiMail,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiLogOut,
  FiHeart,
  FiPackage,
  FiDollarSign,
  FiCalendar,
} from 'react-icons/fi';
import { 
  FaPaw, 
  FaDog, 
  FaCat, 
  FaFish,
  FaShoppingCart,
  FaRegSmile,
  FaBlog,
  FaRegImages
} from 'react-icons/fa';
import { BiCategoryAlt } from "react-icons/bi";
import { RiCoupon3Line } from "react-icons/ri";



import { Flip, toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import { baseurl } from "./components/apis";

const Layout = ({ children }) => {
  const [lastLogin,setLastlogin]=useState()
  const [loader,setLoader]= useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter()

  const menuItems = [
        { id: 2.1, name: 'Banners', icon: FaRegImages, path: '/admin/banner', color: 'text-violet-500' },
    { id: 2, name: 'Customers', icon: FiUsers, path: '/admin/customers', color: 'text-green-500' },

    { id: 3, name: 'Pets', icon: FaPaw, path: '/admin/pets', color: 'text-yellow-500' },
    
        { id: 3.1, name: 'Product Category', icon: BiCategoryAlt, path: '/admin/product-cat', color: 'text-yellow-500' },

    { id: 4, name: 'Products', icon: FiShoppingBag, path: '/admin/products', color: 'text-purple-500' },
    { id: 5, name: 'Orders', icon: FaShoppingCart, path: '/admin/orders', color: 'text-pink-500' },
    { id: 6, name: 'Services', icon: FiHeart, path: '/admin/services', color: 'text-red-500' },
        { id: 6.1, name: 'Blogs', icon: FaBlog, path: '/admin/blog', color: 'text-yellow-500' },

    { id: 7, name: 'Analytics', icon: FiBarChart2, path: '/admin/analytics', color: 'text-indigo-500' },
    { id: 8, name: 'Messages', icon: FiMail, path: '/admin/messages', color: 'text-teal-500' },
        { id: 9, name: 'Coupons', icon: RiCoupon3Line, path: '/admin/coupons', color: 'text-pink-500' },

    { id: 10, name: 'Settings', icon: FiSettings, path: '/admin/settings', color: 'text-gray-500' },
  ];

  const petStats = [
    { type: 'Dogs', count: 156, icon: FaDog, color: 'bg-orange-100 text-orange-600' },
    { type: 'Cats', count: 89, icon: FaCat, color: 'bg-gray-100 text-gray-600' },
    { type: 'Fish', count: 42, icon: FaFish, color: 'bg-blue-100 text-blue-600' },
    { type: 'Others', count: 23, icon: FaRegSmile, color: 'bg-green-100 text-green-600' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };


const adminAllreadylogin= async()=>{
  setLoader(true)
  try {
    const response = await axios.get(`${baseurl}/admin/getadmin`,{
      withCredentials:true
    })
    const data = await response.data;

    if(!data.success){
      router.push("/login/admin")
}
else{
  setLastlogin(formatReadableDate(data.admin))
}
  } catch (error) {
          router.push("/login/admin")

  }
    setLoader(false)

}


useEffect(()=>{
adminAllreadylogin()
},[])


function formatReadableDate(isoString) {
  const date = new Date(isoString);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return date.toLocaleString("en-US", options);
}



const handelLogout=async()=>{
  const response = await axios.get(`${baseurl}/admin/logout`,{withCredentials:true})
  const data = await response.data;
  if(data.success){
    toast.success("logout successful")
              router.push("/login/admin")


  }
}




  return (
  <html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>

    {!loader && 
      <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Sidebar Backdrop */}

<ToastContainer
position="top-right"
autoClose={4000}
limit={3}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Flip}
/>


      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}


      <div
        className={`fixed inset-y-0 left-0 z-30 w-80 bg-gradient-to-b from-white to-blue-50 shadow-xl transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-blue-100 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isSidebarOpen ? 'lg:w-80' : 'lg:w-20'}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-blue-100 bg-white/80 backdrop-blur-sm">
            {isSidebarOpen && (
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                  <FaPaw className="text-white text-lg" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">PetKo</h1>
                  {/* <p className="text-xs text-gray-500">Admin Panel</p> */}
                   <p className="text-xs text-gray-500">{lastLogin}</p>

                </div>
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-blue-100 transition-colors hidden lg:block"
            >
              {isSidebarOpen ? (
                <FiChevronLeft size={20} className="text-gray-600" />
              ) : (
                <FiChevronRight size={20} className="text-gray-600" />
              )}
            </button>
          </div>

        
          <nav className="flex-1 px-4 py-6 space-y-1">

{  

  <Link 
  href={"/admin"}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                    pathname=="/admin"
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-white hover:shadow-md hover:scale-105'
                  }`}
                  onClick={() => setIsMobileSidebarOpen(false)} >
                  <FiHome 
                    size={20} 
                    className={`${ pathname=="/admin" ? 'text-white' : "text-blue-500"} transition-colors`}
                  />
                  {(isSidebarOpen || isMobileSidebarOpen) && (
                    <span className={`ml-4 font-medium transition-colors ${
                       pathname=="/admin" ? 'text-white' : 'group-hover:text-gray-900'
                    }`}>
                     Dashboard
                    </span>
                  )}
                  { pathname=="/admin" && (isSidebarOpen || isMobileSidebarOpen) && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </Link>
}


            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.includes(item.path);
              
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-white hover:shadow-md hover:scale-105'
                  }`}
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <Icon 
                    size={20} 
                    className={`${isActive ? 'text-white' : item.color} transition-colors`}
                  />
                  {(isSidebarOpen || isMobileSidebarOpen) && (
                    <span className={`ml-4 font-medium transition-colors ${
                      isActive ? 'text-white' : 'group-hover:text-gray-900'
                    }`}>
                      {item.name}
                    </span>
                  )}
                  {isActive && (isSidebarOpen || isMobileSidebarOpen) && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-blue-100 bg-white/80">
            <div className="flex items-center space-x-3 mb-4 p-3 bg-gradient-to-r from-orange-400 to-pink-400 rounded-xl text-white">
              <div className="p-2 bg-white/20 rounded-lg">
                <FaPaw className="text-lg" />
              </div>
              {isSidebarOpen && (
                <div className="flex-1">
                  <p className="text-sm font-semibold">Need Help?</p>
                  <p className="text-xs opacity-90">Contact support</p>
                </div>
              )}
            </div>
            
            <button  onClick={()=>handelLogout()}  className="flex items-center w-full px-4 py-3 text-gray-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 group">
              <FiLogOut size={20} className="group-hover:scale-110 transition-transform" />
              {(isSidebarOpen || isMobileSidebarOpen) && (
                <span className="ml-4 font-medium">Logout</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className=" flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm z-10 border-b border-blue-100">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={toggleMobileSidebar}
                className="p-2 rounded-xl hover:bg-blue-100 transition-colors lg:hidden"
              >
                <FiMenu size={20} className="text-gray-600" />
              </button>
              <div className="ml-4">
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome back, Admin! 🐾
                </h2>
                <p className="text-sm text-gray-500">Manage your pet shop with ease</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-3 h-3 bg-green-400 rounded-full absolute -top-1 -right-1 border-2 border-white"></div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold">A</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
}
  </body>
  </html>



  
  );

  
};

export default Layout;