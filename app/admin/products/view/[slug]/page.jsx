"use client"
import { baseurl, imgurl } from '@/app/admin/components/apis'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiArrowLeft, FiEdit, FiTrash2, FiEye, FiPackage, FiTag, FiDollarSign, FiTrendingUp, FiImage, FiCalendar, FiShoppingCart, FiBox, FiStar } from 'react-icons/fi'
import { FiFileText } from "react-icons/fi";
import { TfiPalette } from "react-icons/tfi";

import Link from 'next/link'
import { toast } from 'react-toastify'

const Page = ({params: {slug}}) => {
  const [product, setProduct] = useState(null)
  const [colorSection, setColorSection] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseurl}/product/${slug}`)
      const data = await response.data
      if (data.success) {
        setProduct(data.data.product)
        setColorSection(data.data.colors || [])
      }
    } catch (error) {
        toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (slug) {
      fetchData()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/admin/products" className="text-blue-600 hover:text-blue-700">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }



 const getRatingPercentage = (rating) => {
    const total = product.rating.count
    return total > 0 ? Math.round((rating / total) * 100) : 0
  }

   const formattedTags = product.tags ? product.tags.flatMap(tag => {
    try {
      // Handle both string and array formats
      if (typeof tag === 'string' && tag.startsWith('[')) {
        return JSON.parse(tag)
      }
      return tag
    } catch {
      return tag
    }
  }).filter(tag => tag && typeof tag === 'string') : []


  const allImages = [product.banner_image, ...(product.images || [])].filter(Boolean)

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/products"
                className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-4 py-3 rounded-xl shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md"
              >
                <FiArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Products</span>
              </Link>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {product.name}
                </h1>
                <p className="text-gray-600 mt-2 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    product.status === 'published' ? 'bg-green-500' : 
                    product.status === 'draft' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></span>
                  Product ID: {product._id?.substring(0, 8)}... | {product.status}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition-all duration-200">
                <FiEdit className="w-4 h-4" />
                Edit Product
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="xl:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transform hover:shadow-2xl transition-all duration-300">
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100">
                {allImages[activeImage] ? (
                  <img
                    src={`${imgurl}/uploads/${allImages[activeImage]}`}
                    alt={product.name}
                    className="w-full h-96 object-cover transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-96 flex flex-col items-center justify-center text-gray-400">
                    <FiImage className="w-20 h-20 mb-4 opacity-50" />
                    <p className="text-lg font-medium">No Image Available</p>
                  </div>
                )}
                {allImages.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {activeImage + 1} / {allImages.length}
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <FiImage className="w-5 h-5 text-blue-600" />
                    </div>
                    Product Gallery
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {allImages.length} images
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative group rounded-xl overflow-hidden border-3 transition-all duration-300 transform hover:scale-105 ${
                        activeImage === index 
                          ? 'border-blue-500 ring-4 ring-blue-100 shadow-lg' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <img
                        src={`${imgurl}/uploads/${image}`}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 truncate">{product.name}</h2>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  product.status === 'published' ? 'bg-green-50 text-green-700' :
                  product.status === 'draft' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-gray-50 text-gray-700'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    product.status === 'published' ? 'bg-green-500' :
                    product.status === 'draft' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                  {product.status}
                </div>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <FiPackage className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-600 font-medium">CATEGORY</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {product.productcategory?.product_name || 'Uncategorized'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <FiTag className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-green-600 font-medium">PET TYPE</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {product.petcategory?.type || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <FiEye className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-purple-600 font-medium">VIEWS</p>
                      <p className="text-sm font-semibold text-gray-900">{product.view || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <FiShoppingCart className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-orange-600 font-medium">ORDERS</p>
                      <p className="text-sm font-semibold text-gray-900">{product.ordercount || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Information */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-xs text-gray-600 font-medium mb-1">PRICE</p>
                  <p className="text-lg font-bold text-green-600">${product.price}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-xs text-gray-600 font-medium mb-1">COMPARE AT</p>
                  <p className="text-lg font-bold text-gray-400 line-through">${product.comparePrice}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-xs text-gray-600 font-medium mb-1">COST</p>
                  <p className="text-lg font-bold text-blue-600">${product.costPrice}</p>
                </div>
              </div>

              {/* Inventory Information */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-red-600 font-medium">STOCK</p>
                      <p className="text-2xl font-bold text-gray-900">{product.quantity}</p>
                    </div>
                    <FiBox className="w-8 h-8 text-red-400" />
                  </div>
                  {product.trackQuantity && product.quantity <= product.lowStockAlert && (
                    <p className="text-xs text-red-600 mt-2 font-medium">
                      Low Stock Alert ({product.lowStockAlert})
                    </p>
                  )}
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-indigo-600 font-medium">SKU</p>
                      <p className="text-lg font-bold text-gray-900 font-mono">{product.sku}</p>
                    </div>
                    <FiTag className="w-8 h-8 text-indigo-400" />
                  </div>
                </div>
              </div>

              {/* Slug */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs text-gray-600 font-medium mb-2">PRODUCT SLUG</p>
                <p className="text-gray-900 font-mono text-sm bg-white px-3 py-2 rounded-lg border border-gray-300 truncate">
                  {product.slug}
                </p>
              </div>
            </div>

            {/* Rating Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-xl">
                  <FiStar className="w-5 h-5 text-yellow-600" />
                </div>
                Customer Ratings
              </h3>
              
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-4xl font-bold text-gray-900">{product.rating.average.toFixed(1)}</div>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(star => (
                        <FiStar 
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(product.rating.average) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {product.rating.count} review{product.rating.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5,4,3,2,1].map(rating => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-4">{rating}</span>
                    <FiStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${getRatingPercentage(product.rating.distribution[rating])}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8 text-right">
                      {product.rating.distribution[rating]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tags Section */}
        {formattedTags.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-xl">
                <FiTag className="w-5 h-5 text-purple-600" />
              </div>
              Product Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {formattedTags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 px-3 py-2 rounded-lg border border-purple-200 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Short Description */}
          {product.shortDescription && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-xl">
                  <FiFileText className="w-5 h-5 text-green-600" />
                </div>
                Short Description
              </h3>
              <div className="prose prose-sm max-w-none text-gray-700 bg-gray-50 rounded-xl p-4 border border-gray-200">
                {product.shortDescription}
              </div>
            </div>
          )}

          {/* Full Description */}
          {product.description && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <FiFileText className="w-5 h-5 text-blue-600" />
                </div>
                Full Description
              </h3>
              <div 
                className="prose prose-sm max-w-none text-gray-700 bg-gray-50 rounded-xl p-4 border border-gray-200"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page