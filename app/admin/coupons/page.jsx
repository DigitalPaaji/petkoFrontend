"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../components/apis'
import { FaEdit, FaToggleOn, FaToggleOff, FaTag, FaCalendarAlt, FaDollarSign, FaPercentage, FaUsers, FaEye } from 'react-icons/fa'
import { FaDeleteLeft } from "react-icons/fa6";

const Page = () => {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`${baseurl}/coupon/allcode`)
      const data = await response.data
      setCoupons(data.data || [])
    } catch (error) {
      console.error('Error fetching coupons:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (couponId, currentStatus) => {
    try {
     
     const response=    await axios.put(`${baseurl}/coupon/status/${couponId}`, {
        isActive: !currentStatus
      })

const data = await response.data;
if(data.success){
  fetchCoupons()
}


    } catch (error) {
      console.error('Error updating coupon status:', error)
     
      alert('Failed to update coupon status')
    }
  }


   const deleteCoupon = async(id)=>{
    try {
      const response = await axios.delete(`${baseurl}/coupon/${id}`)
      const data = await response.data;
      if(data.success){
fetchCoupons()
      }

    } catch (error) {
      
    }
   }








  useEffect(() => {
    fetchCoupons()
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getStatusBadge = (isActive) => {
    return isActive 
      ? <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
      : <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Inactive</span>
  }

  const getDiscountDisplay = (coupon) => {
    if (coupon.discountType === 'percentage') {
      return (
        <div className="flex items-center">
          <FaPercentage className="text-green-600 mr-1" />
          <span>{coupon.discountValue}% OFF</span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center">
          <FaDollarSign className="text-blue-600 mr-1" />
          <span>{formatCurrency(coupon.discountValue)} OFF</span>
        </div>
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading coupons...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <FaTag className="mr-3 text-blue-600" />
                Coupon Codes
              </h1>
              <p className="text-gray-600 mt-2">Manage your discount coupons and promotions</p>
            </div>
            <Link 
              href="/admin/coupons/create"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center"
            >
              Create New Coupon
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaTag className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Coupons</p>
                <p className="text-2xl font-bold text-gray-900">{coupons.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaToggleOn className="text-green-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Coupons</p>
                <p className="text-2xl font-bold text-gray-900">
                  {coupons.filter(c => c.isActive).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaUsers className="text-purple-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Used</p>
                <p className="text-2xl font-bold text-gray-900">
                  {coupons.reduce((sum, coupon) => sum + coupon.usedCount, 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <FaEye className="text-orange-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Remaining Uses</p>
                <p className="text-2xl font-bold text-gray-900">
                  {coupons.reduce((sum, coupon) => sum + (coupon.usageLimit - coupon.usedCount), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coupons Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coupon Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requirements
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usage
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Validity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {coupons.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <FaTag className="mx-auto text-gray-400 text-4xl mb-4" />
                      <p className="text-gray-500 text-lg">No coupons found</p>
                      <Link 
                        href="/admin/coupons/create"
                        className="inline-block mt-4 text-blue-600 hover:text-blue-800"
                      >
                        Create your first coupon
                      </Link>
                    </td>
                  </tr>
                ) : (
                  coupons.map((coupon) => (
                    <tr key={coupon._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="flex items-center">
                            <code className="text-lg font-mono font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded">
                              {coupon.code}
                            </code>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 max-w-xs">
                            {coupon.description}
                          </p>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {getDiscountDisplay(coupon)}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {coupon.minPurchaseAmount > 0 ? (
                            <div className="flex items-center">
                              <FaDollarSign className="text-gray-400 mr-1" />
                              Min: {formatCurrency(coupon.minPurchaseAmount)}
                            </div>
                          ) : (
                            <span className="text-gray-400">No minimum</span>
                          )}
                          {coupon.maxDiscountAmount > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              Max discount: {formatCurrency(coupon.maxDiscountAmount)}
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center justify-between">
                            <span>Used: {coupon.usedCount}</span>
                            <span className="text-gray-400">/</span>
                            <span>{coupon.usageLimit || '∞'}</span>
                          </div>
                          {coupon.perUserLimit > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              {coupon.perUserLimit} per user
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center">
                            <FaCalendarAlt className="text-gray-400 mr-2" />
                            Until {formatDate(coupon.validTill)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Created: {formatDate(coupon.createdAt)}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(coupon.isActive)}
                          <button
                            onClick={() => toggleActive(coupon._id, coupon.isActive)}
                            className={`p-2 rounded-full transition-colors ${
                              coupon.isActive 
                                ? 'text-green-600 hover:bg-green-100' 
                                : 'text-gray-400 hover:bg-gray-100'
                            }`}
                            title={coupon.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {coupon.isActive ? (
                              <FaToggleOn className="text-2xl" />
                            ) : (
                              <FaToggleOff className="text-2xl" />
                            )}
                          </button>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          {/* <Link
                            href={`/admin/coupons/edit/${coupon._id}`}
                            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded transition-colors"
                            title="Edit Coupon"
                          >
                            <FaEdit />
                          </Link> */}
                          <button
                            className=" hover:text-red-900 p-2 cursor-pointer rounded transition-colors text-xl text-red-700"
                            title="View Details"
                            onClick={() =>  deleteCoupon(coupon._id)}
                          >
                            <FaDeleteLeft />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page