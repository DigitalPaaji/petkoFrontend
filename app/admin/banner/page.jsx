"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { baseurl, imgurl } from '../components/apis'
import { MdDelete, MdAdd, MdEdit, MdVisibility } from "react-icons/md"
import { FiImage } from "react-icons/fi"
import { toast } from 'react-toastify'

const Page = () => {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [countBanner,setCountBanner]=useState([])
  const fetchBanner = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${baseurl}/banner`)
      const data = await response.data
      if (data.success) {
        setBanners(data.banners)
      } else {
        setBanners([])
      }
    } catch (error) {
      setBanners([])
    } finally {
      setLoading(false)
    }
  }
const fetchCount= async()=>{
    try {
        const response = await axios.get(`${baseurl}/banner/count`)
        const data = await response.data;
        if(data.success){
            setCountBanner(data.banners)
        }

    } catch (error) {
        
    }
}



  const handleDelete = async (bannerId) => {
    setDeleteLoading(bannerId)
    try {fetchCount
      // Add your delete API call here
      // await axios.delete(`${baseurl}/banner/${bannerId}`)
   
      const response = await axios.delete(`${baseurl}/banner/delete/${bannerId}`);
      const data = await response.data;
      if(data.success){
        toast.success(data.message)

      await fetchBanner() // Refresh the list
    await fetchCount() 

      }else{
                toast.error(data.message)

      }
    

    } catch (error) {
      console.error('Error deleting banner:', error)
    } finally {
      setDeleteLoading(null)
    }
  }

  useEffect(() => {
    fetchBanner()
    fetchCount()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Banner Management</h1>
            <p className="text-gray-600 mt-2">Manage your website banners and promotions</p>
          </div>
          
          <Link 
            href="/admin/banner/create"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 mt-4 sm:mt-0"
          >
            <MdAdd className="text-xl" />
            Create Banner
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Banners</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{banners?.length || 0}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiImage className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Banners</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {banners?.filter(banner => banner.status === 'active').length || 0}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <MdVisibility className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">With Count</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {banners?.filter(banner => banner.count).length || 0}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-lg font-bold">#</span>
              </div>
            </div>
          </div>
        </div>

        {/* Banners Grid */}
        {loading ? (
          // Loading Skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : banners?.length > 0 ? (<>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {banners.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 group"
              >
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={`${imgurl}/uploads/${item.image}`} 
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Count Badge */}
                  {item.count && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        Count: {item.count}
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay with Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button 
                      onClick={() => handleDelete(item._id)}
                      disabled={deleteLoading === item._id}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
                    >
                      <MdDelete className="text-lg" />
                      {deleteLoading === item._id ? 'Deleting...' : 'Delete'}
                    </button>
                  
                  </div>
                </div>

             
              </div>
            ))}
          </div>


{countBanner?.length > 0  &&  
<div className=''>

<p className='my-2 text-xl font-bold'>Count Banner</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {countBanner.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 group"
              >
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={`${imgurl}/uploads/${item.image}`} 
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Count Badge */}
                  {item.count && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        Count: {item.count}
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay with Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button 
                      onClick={() => handleDelete(item._id)}
                      disabled={deleteLoading === item._id}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
                    >
                      <MdDelete className="text-lg" />
                      {deleteLoading === item._id ? 'Deleting...' : 'Delete'}
                    </button>
                  
                  </div>
                </div>

             
              </div>
            ))}
          </div>

          </ div>



        }</>


        ) : (
          // Empty State
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FiImage className="text-gray-400 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Banners Found</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first banner</p>
            <Link 
              href="/admin/banner/create"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <MdAdd className="text-xl" />
              Create Your First Banner
            </Link>
          </div>
        )}
      </div>


<div>


</div>


    </div>
  )
}

export default Page