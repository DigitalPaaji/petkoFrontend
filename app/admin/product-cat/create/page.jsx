"use client"
import React, { useEffect, useState } from 'react'
import { baseurl, imgurl } from '../../components/apis';
import axios from 'axios';
import { FiUpload, FiSave, FiX, FiPlus, FiShoppingBag } from 'react-icons/fi';

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form state
  const [formData, setFormData] = useState({
    cat: '',
    petId: '',
    file: null
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchPetCategories();
  }, []);

  const fetchPetCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/petcat`);
      const data = await response.data;
      if (data.success) {
        setData(data.petCategory);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      file: null
    }));
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.cat.trim() || !formData.petId || !formData.file) {
      setMessage({ type: 'error', text: 'All fields are required' });
      return;
    }

    setSubmitLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = new FormData();
      submitData.append('cat', formData.cat);
      submitData.append('petId', formData.petId);
      submitData.append('image', formData.file);

      const response = await axios.post(`${baseurl}/productcat/create`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setMessage({ type: 'success', text: 'Product category created successfully!' });
        setFormData({ cat: '', petId: '', file: null });
        setPreviewImage(null);
        // Reset file input
        document.getElementById('file-upload').value = '';
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to create product category' });
    } finally {
      setSubmitLoading(false);
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiShoppingBag className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Create Product Category
          </h1>
          <p className="text-gray-600">
            Add a new product category for your pet shop
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* Message Alert */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl border ${
              message.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    message.type === 'success' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {message.type === 'success' ? '✓' : '!'}
                  </div>
                  {message.text}
                </div>
                <button
                  onClick={() => setMessage({ type: '', text: '' })}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Category Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Product Category Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cat"
                  value={formData.cat}
                  onChange={handleInputChange}
                  placeholder="e.g., Dog Food, Cat Toys, Bird Cages"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-800 placeholder-gray-400 pr-12"
                  disabled={submitLoading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <FiShoppingBag className="text-gray-400" size={20} />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Enter the name of the product category
              </p>
            </div>

            {/* Pet Category Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Pet Category *
              </label>
              <div className="relative">
                <select
                  name="petId"
                  value={formData.petId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-800 appearance-none pr-12"
                  disabled={submitLoading}
                >
                  <option value="">Choose a pet category</option>
                  {data?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.type}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Select which pet category this product belongs to
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Category Image *
              </label>
              
              {/* Image Preview */}
              {previewImage && (
                <div className="mb-4">
                  <div className="relative inline-block">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-32 h-32 rounded-xl object-cover border-2 border-blue-200 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      disabled={submitLoading}
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors duration-200 bg-gray-50/50">
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={submitLoading}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                      <FiUpload className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">
                        {previewImage ? 'Change Image' : 'Upload Category Image'}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        PNG, JPG, JPEG up to 5MB
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitLoading || !formData.cat.trim() || !formData.petId || !formData.file}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                  submitLoading || !formData.cat.trim() || !formData.petId || !formData.file
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {submitLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Category...</span>
                  </>
                ) : (
                  <>
                    <FiSave size={20} />
                    <span>Create Product Category</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Form Guidelines */}
        <div className="mt-6 bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Form Guidelines
          </h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• All fields marked with * are required</li>
            <li>• Product category name should be descriptive</li>
            <li>• Choose the appropriate pet category</li>
            <li>• Upload a clear, high-quality image</li>
            <li>• Image will be used to represent this product category</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Page;