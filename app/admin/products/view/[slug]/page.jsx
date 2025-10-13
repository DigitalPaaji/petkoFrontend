"use client"
import { baseurl, imgurl } from '@/app/admin/components/apis'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiArrowLeft, FiEdit, FiTrash2, FiEye, FiPackage, FiTag, FiDollarSign, FiTrendingUp, FiImage, FiCalendar, FiShoppingCart } from 'react-icons/fi'
import { FiFileText } from "react-icons/fi";
import { TfiPalette } from "react-icons/tfi";

import Link from 'next/link'

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
      console.error("Error fetching product:", error)
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
              Product Details
            </h1>
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Product ID: {product._id?.substring(0, 8)}...
            </p>
          </div>
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
                alt={product.title}
                className="w-full h-96 object-cover transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-96 flex flex-col items-center justify-center text-gray-400">
                <FiImage className="w-20 h-20 mb-4 opacity-50" />
                <p className="text-lg font-medium">No Image Available</p>
              </div>
            )}
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
              {activeImage + 1} / {allImages.length}
            </div>
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
                    alt={`${product.title} ${index + 1}`}
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
            <h2 className="text-2xl font-bold text-gray-900 truncate">{product.title}</h2>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Active
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
                    {product.categoryid?.product_name || 'Uncategorized'}
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
                    {product.petid?.type || 'Not specified'}
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
                  <p className="text-sm font-semibold text-gray-900">{product.views || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FiCalendar className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-orange-600 font-medium">CREATED</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {new Date(product.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
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

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-medium">VARIANTS</p>
                <p className="text-2xl font-bold text-gray-900">{colorSection.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl text-white">
                <TfiPalette className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-medium">TOTAL STOCK</p>
                <p className="text-2xl font-bold text-gray-900">
                  {colorSection.reduce((sum, color) => sum + (color.stock || 0), 0)}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white">
                <FiShoppingCart className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Color Variants Section - Separate Clean Design */}
    {colorSection.length > 0 && (
      <div className="mt-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl text-white">
                  <TfiPalette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Color Variants</h3>
                  <p className="text-sm text-gray-600">Manage product color options and pricing</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                  {colorSection.length} variants
                </span>
              </div>
            </div>
          </div>

          {/* Color Variants Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {colorSection.map((color, index) => (
                <div 
                  key={color._id} 
                  className="bg-white border-2 border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Color Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl border-3 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: color.color }}
                        title={color.color}
                      ></div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">
                          {color.color.toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-500">Variant #{index + 1}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                    color.instock 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${color.instock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    {color.instock ? 'In Stock' : 'Out of Stock'}
                  </div>

                  {/* Pricing Information */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Current Price</span>
                      <span className="font-bold text-green-600 text-lg">${color.price}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Original Price</span>
                      <span className="font-semibold text-gray-400 line-through">${color.oldprice}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">You Save</span>
                      <span className="font-bold text-red-600">
                        {Math.round(((color.oldprice - color.price) / color.oldprice) * 100)}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-sm text-gray-600">Stock Available</span>
                      <span className="font-bold text-blue-600">{color.stock} units</span>
                    </div>
                  </div>

               
                </div>
              ))}
            </div>
          </div>

          {/* Section Footer */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>In Stock: {colorSection.filter(color => color.instock).length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Out of Stock: {colorSection.filter(color => !color.instock).length}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-700">
                  Total Value: ${colorSection.reduce((sum, color) => sum + (color.price * color.stock), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Bottom Sections */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      {/* Product Details */}
      {product.details && product.details.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <FiTag className="w-5 h-5 text-blue-600" />
            </div>
            Product Specifications
          </h3>
          <div className="grid gap-3">
            {product.details.map((detail, index) => (
              <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-white transition-colors duration-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 font-medium">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {product.description && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-xl">
              <FiFileText className="w-5 h-5 text-purple-600" />
            </div>
            Product Description
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