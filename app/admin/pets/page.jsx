"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { baseurl, imgurl } from '../components/apis';
import Link from 'next/link';
import { toast } from 'react-toastify';

const Page = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchPetCategories();
  }, []);

  const fetchPetCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/petcat`);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching pet cats:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId) => {
    if (!confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return;
    }

const response = await axios.delete(`${baseurl}/petcat/${categoryId}`,{
    withCredentials:true
});
const data = await response.data;
if(data.success){
fetchPetCategories()
toast.success(data.message);
}else{
toast.error(data.message)
}
  };

  const handleEdit = (category) => {
    // Implement edit functionality
    console.log('Edit category:', category);
    alert(`Edit functionality for ${category.type} would go here!`);
  };

  const handleView = (category) => {
    // Implement view functionality
    console.log('View category:', category);
    alert(`Viewing details for ${category.type}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading pet categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">😿</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error loading pet categories</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchPetCategories}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Pet Categories</h1>
            <p className="text-gray-600 text-lg">
              Manage all your pet categories in one place
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href={"/admin/pets/create"} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg flex items-center space-x-2 hover:shadow-xl">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add New Category</span>
            </Link>
            <button 
              onClick={fetchPetCategories}
              className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 shadow-sm flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Categories</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {data?.petCategory?.length || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">With Images</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {data?.petCategory?.filter(cat => cat.img).length || 0}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <span className="text-2xl">🖼️</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {data?.petCategory?.length || 0}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Last Updated</p>
                <p className="text-sm font-bold text-gray-800 mt-1">Just now</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <span className="text-2xl">🕒</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category Type
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data?.petCategory?.map((cat, index) => (
                  <tr 
                    key={cat._id} 
                    className="hover:bg-blue-50/30 transition-all duration-200 group even:bg-gray-50/50"
                  >
                    {/* Image Column */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center">
                        {cat.img ? (
                          <div className="relative group/image">
                            <img
                              src={`${imgurl}/${cat.img}`}
                              alt={cat.type}
                              className="w-16 h-16 rounded-xl object-cover shadow-md border border-gray-200 group-hover/image:scale-110 transition-transform duration-200"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl opacity-0 group-hover/image:opacity-100 transition-opacity"></div>
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border border-gray-200">
                            <span className="text-gray-400 text-2xl">🐾</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Category Type Column */}
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="ml-2">
                          <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {cat.type}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Created recently
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* ID Column */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-500 bg-gray-50 px-3 py-1 rounded-lg inline-block">
                        {cat._id.substring(0, 8)}...
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Active
                      </span>
                    </td>

                    {/* Actions Column */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {/* View Button */}
                       
                        <button 
                          onClick={() => handleDelete(cat._id)}
                          disabled={deleteLoading === cat._id}
                          className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                            deleteLoading === cat._id 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'bg-red-100 text-red-600 hover:bg-red-200'
                          }`}
                          title="Delete Category"
                        >
                          {deleteLoading === cat._id ? (
                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {(!data?.petCategory || data.petCategory.length === 0) && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-8xl mb-6">😿</div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-3">No Pet Categories Found</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Get started by adding your first pet category to organize your pets.
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg">
                Add Your First Category
              </button>
            </div>
          )}

          {/* Footer */}
          {data?.petCategory && data.petCategory.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                <div className="mb-2 sm:mb-0">
                  Showing <span className="font-semibold">{data.petCategory.length}</span> categories
                </div>
                <div>
                  Last updated: <span className="font-semibold">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;