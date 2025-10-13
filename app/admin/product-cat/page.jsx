"use client"
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { baseurl, imgurl } from "../components/apis";
import { FiEdit, FiTrash2, FiPlus, FiEye } from "react-icons/fi";
import { toast } from "react-toastify";

const Page = () => {
  const [productCat, setProductCat] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/productcat`);
      const data = await response.data;
      if (data.success) {
        setProductCat(data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
       const response =   await axios.delete(`${baseurl}/productcat/${id}`);
       const data = await response.data;
       if(data.success){
        toast.success(data.message)
          fetchData(); 

       }
       else{
        toast.error(data.message)
       }

      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Product Categories</h1>
          <p className="text-gray-600 mt-1">Manage your product categories</p>
        </div>
        <Link
          href="/admin/product-cat/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <FiPlus className="w-4 h-4" />
          Create Category
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productCat && productCat.length > 0 ? (
                productCat.map((category, index) => (
                  <tr key={category._id || index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {category.img || category.petId?.img ? (
                          <img
                            src={`${imgurl}/uploads/${category.img}`}
                            alt={category.product_name}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {category.product_name || "N/A"}
                      </div>
                      {category.slug && (
                        <div className="text-sm text-gray-500">{category.slug}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {category.petId?.type || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                       
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="text-red-600 cursor-pointer hover:text-red-900 p-1 rounded transition-colors duration-200"
                          title="Delete"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <FiEye className="w-12 h-12 text-gray-300 mb-2" />
                      <p className="text-lg font-medium">No categories found</p>
                      <p className="text-sm">Create your first product category to get started</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      {productCat && productCat.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          Showing {productCat.length} categor{productCat.length === 1 ? 'y' : 'ies'}
        </div>
      )}
    </div>
  );
};

export default Page;