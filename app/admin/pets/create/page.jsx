"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { baseurl } from '../../components/apis';
import { toast } from 'react-toastify';
// import { baseurl, imgurl } from '../components/apis';


const Page = () => {
  const [formData, setFormData] = useState({
    type: '',
    img: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        img: file
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
      img: null
    }));
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.type.trim()) {
      setMessage({ type: 'error', text: 'Please enter a pet type' });
      return;
    }


    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = new FormData();
      submitData.append('cat', formData.type);
      if (formData.img) {
        submitData.append('image', formData.img);
      }

      const response = await axios.post(`${baseurl}/petcat/create`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setMessage({ type: 'success', text: 'Pet category created successfully!' });
        setFormData({ type: '', img: null });
        setPreviewImage(null);
        // Reset file input
        document.getElementById('image-upload').value = '';
      }
    } catch (error) {
        toast.error(error.message)
      setMessage({ type: 'error', text: 'Failed to create pet category. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const popularPetTypes = [
    'Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Hamster',
    'Guinea Pig', 'Turtle', 'Snake', 'Lizard', 'Ferret',
    'Chinchilla', 'Hedgehog', 'Parrot', 'Canary', 'Finch'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Add New Pet Category
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create a new pet category to organize your pets. Add a category type and upload an image.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {/* Message Alert */}
              {message.text && (
                <div className={`mb-6 p-4 rounded-xl border ${
                  message.type === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      message.type === 'success' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {message.type === 'success' ? '✓' : '!'}
                    </div>
                    {message.text}
                  </div>
                </div>
              )}


              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Pet Type Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Pet Type *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      placeholder="e.g., Golden Retriever, Persian Cat, etc."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                      disabled={loading}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <span className="text-2xl">🐾</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Enter the specific type or breed of the pet
                  </p>
                </div>

                {/* Popular Pet Types Suggestions */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Popular Pet Types
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {popularPetTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, type }))}
                        className="px-3 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg text-sm transition-colors duration-200 border border-transparent hover:border-blue-200"
                        disabled={loading}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Category Image
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
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors duration-200 bg-gray-50/50">
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={loading}
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="space-y-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-700 font-medium">
                            Click to upload image
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
                    disabled={loading || !formData.type.trim()}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                      loading || !formData.type.trim()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating Category...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>➕</span>
                        <span>Create Pet Category</span>
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Guidelines */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Guidelines
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Clear Category Name</p>
                    <p className="text-xs text-gray-600 mt-1">Use specific and descriptive names for pet types.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">High-Quality Images</p>
                    <p className="text-xs text-gray-600 mt-1">Use clear, high-resolution images that represent the category well.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Be Specific</p>
                    <p className="text-xs text-gray-600 mt-1">Instead of "Dog", use "Golden Retriever" for better organization.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Check for Duplicates</p>
                    <p className="text-xs text-gray-600 mt-1">Ensure the category doesn't already exist to avoid confusion.</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Tips</h4>
                <div className="space-y-2 text-xs text-gray-600">
                  <p>• Use breed names when possible</p>
                  <p>• Square images work best</p>
                  <p>• Keep names consistent</p>
                  <p>• Add multiple variations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Categories Preview */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Category Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Preview Card */}
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                  ) : (
                    <span className="text-2xl text-gray-400">🐾</span>
                  )}
                </div>
                <p className="font-medium text-gray-800">
                  {formData.type || 'Category Name'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {formData.type ? 'Preview' : 'Enter name to see preview'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;