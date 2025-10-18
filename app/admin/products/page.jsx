"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FiPlus, FiEdit, FiTrash2, FiEye, FiImage, FiPackage, FiTag, FiCalendar } from 'react-icons/fi';
import { baseurl, imgurl } from '../components/apis';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseurl}/product`)
      const data = await response.data;
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${baseurl}/product/${id}`);
        toast.success("Product deleted successfully!");
        fetchData(); // Refresh the data
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600 mt-2">Manage your product inventory and listings</p>
            </div>
            <Link
              href="/admin/products/create"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg font-medium"
            >
              <FiPlus className="w-5 h-5" />
              Create Product
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{products.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiPackage className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">
                  {new Set(products.map(p => p.categoryid?.product_name)).size}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <FiTag className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">
                  {products.reduce((sum, p) => sum + (p.views || 0), 0)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <FiEye className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Category & Pet Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <tr 
                      key={product._id} 
                      className="hover:bg-gray-50 transition-colors duration-150 group"
                    >
                      {/* Product Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            {product.banner_image ? (
                              <img
                                src={`${imgurl}/uploads/${product.banner_image}`}
                                alt={product.title}
                                className="w-16 h-16 rounded-xl object-cover shadow-sm border border-gray-200"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200">
                                <FiImage className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                              {product.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {product.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Views */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <FiEye className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">{product.views || 0}</span>
                        </div>
                      </td>

                      {/* Category & Pet Type */}
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          {product.categoryid && (
                            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              <FiPackage className="w-3 h-3 mr-1" />
                              {product.categoryid.product_name}
                            </span>
                          )}
                          {product.petid && (
                            <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium ">
                              <FiTag className="w-3 h-3 mr-1" />
                              {product.petid.type}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiCalendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {formatDate(product.createdAt)}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/products/view/${product.slug}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 group/tooltip relative"
                            title="View Product"
                          >
                            <FiEye className="w-4 h-4" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              View Product
                            </div>
                          </Link>
                          
                          <Link
                            href={`/admin/products/edit/${product.slug}`}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 group/tooltip relative"
                            title="Edit Product"
                          >
                            <FiEdit className="w-4 h-4" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Edit Product
                            </div>
                          </Link>
                          
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 group/tooltip relative"
                            title="Delete Product"
                          >
                            <FiTrash2 className="w-4 h-4" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Delete Product
                            </div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <FiPackage className="w-16 h-16 text-gray-300 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-400 mb-2">No products found</h3>
                        <p className="text-gray-400 mb-6">Get started by creating your first product</p>
                        <Link
                          href="/admin/products/create"
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                        >
                          <FiPlus className="w-4 h-4" />
                          Create Product
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Stats */}
        {products && products.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
            <div>
              Showing <span className="font-semibold text-gray-700">{products.length}</span> product{products.length !== 1 ? 's' : ''}
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <div className="flex items-center gap-2">
                <FiPackage className="w-4 h-4 text-blue-500" />
                <span>Categories: {new Set(products.map(p => p.categoryid?.product_name)).size}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiEye className="w-4 h-4 text-orange-500" />
                <span>Total Views: {products.reduce((sum, p) => sum + (p.views || 0), 0)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;