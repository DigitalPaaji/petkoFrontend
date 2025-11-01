"use client";
import Banner from '@/app/components/InnerBanner';
import { useState, useEffect } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiShoppingCart, 
  FiHeart, 
  FiEdit2, 
  FiPlus,
  FiTrash2,
  FiCheck,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState('');
  const [newAddress, setNewAddress] = useState({
    type: 'home',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [showAddAddress, setShowAddAddress] = useState(false);

  // Mock user data
  useEffect(() => {
    const mockUser = {
      name: 'kashish pahuja',
      email: 'kashish.pahuja@example.com',
      phone: '+1 (555) 123-4567',
      addresses: [
        {
          id: 1,
          type: 'home',
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
          isDefault: true
        },
        {
          id: 2,
          type: 'work',
          street: '456 Business Ave',
          city: 'New York',
          state: 'NY',
          zipCode: '10002',
          country: 'USA',
          isDefault: false
        }
      ]
    };
    setUser(mockUser);
  }, []);

  const handleEdit = (field) => {
    setEditField(field);
    setIsEditing(true);
  };

  const handleSave = (field, value) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
    setIsEditing(false);
    setEditField('');
  };

  const handleAddAddress = () => {
    if (user) {
      const updatedAddresses = [...user.addresses, { ...newAddress, id: Date.now() }];
      setUser(prev => ({ ...prev, addresses: updatedAddresses }));
      setNewAddress({
        type: 'home',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      });
      setShowAddAddress(false);
    }
  };

  const handleDeleteAddress = (addressId) => {
    if (user) {
      const updatedAddresses = user.addresses.filter(addr => addr.id !== addressId);
      setUser(prev => ({ ...prev, addresses: updatedAddresses }));
    }
  };

  const setDefaultAddress = (addressId) => {
    if (user) {
      const updatedAddresses = user.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }));
      setUser(prev => ({ ...prev, addresses: updatedAddresses }));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4 md:px-12 xl:px-24 2xl:px-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e46959]"></div>
      </div>
    );
  }

  return (
    <>
          {/* Banner */}
          <Banner title="Profile" />
    <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-12 xl:px-24 2xl:px-40">
      <div className="">
        {/* Header Section */}
        <div className="bg-white border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                <FiUser className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{user.name}</h1>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="flex items-center space-x-2 bg-[#2ea2cc] text-white px-6 py-3 rounded-lg hover:bg-[#268cb3] transition-colors border border-[#2ea2cc]">
                <FiShoppingCart className="w-4 h-4" />
                <span className="text-sm font-medium">Shopping Cart</span>
              </button>
              <button className="flex items-center space-x-2 bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-300">
                <FiHeart className="w-4 h-4" />
                <span className="text-sm font-medium">Wishlist</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Personal Info & Addresses */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="space-y-4">
                {/* Name */}
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200">
                      <FiUser className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      {isEditing && editField === 'name' ? (
                        <input
                          type="text"
                          value={user.name}
                          onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                          className="border border-gray-300 rounded px-3 py-1 text-gray-900 focus:outline-none focus:border-[#2ea2cc]"
                          onBlur={() => handleSave('name', user.name)}
                          autoFocus
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{user.name}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit('name')}
                    className="text-[#2ea2cc] hover:text-[#268cb3] p-2 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200">
                      <FiMail className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      {isEditing && editField === 'email' ? (
                        <input
                          type="email"
                          value={user.email}
                          onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                          className="border border-gray-300 rounded px-3 py-1 text-gray-900 focus:outline-none focus:border-[#2ea2cc]"
                          onBlur={() => handleSave('email', user.email)}
                          autoFocus
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{user.email}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit('email')}
                    className="text-[#2ea2cc] hover:text-[#268cb3] p-2 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200">
                      <FiPhone className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      {isEditing && editField === 'phone' ? (
                        <input
                          type="tel"
                          value={user.phone}
                          onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))}
                          className="border border-gray-300 rounded px-3 py-1 text-gray-900 focus:outline-none focus:border-[#2ea2cc]"
                          onBlur={() => handleSave('phone', user.phone)}
                          autoFocus
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{user.phone}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit('phone')}
                    className="text-[#2ea2cc] hover:text-[#268cb3] p-2 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Addresses Section */}
            <div className="bg-white border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Addresses</h2>
                <button
                  onClick={() => setShowAddAddress(true)}
                  className="flex items-center space-x-2 bg-[#e46959] text-white px-4 py-2 rounded-lg hover:bg-[#d45a4a] transition-colors"
                >
                  <FiPlus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add Address</span>
                </button>
              </div>

              {/* Add Address Form */}
              {showAddAddress && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-4">Add New Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={newAddress.type}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, type: e.target.value }))}
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2ea2cc]"
                    >
                      <option value="home">Home</option>
                      <option value="work">Work</option>
                      <option value="other">Other</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Street"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, street: e.target.value }))}
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2ea2cc]"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2ea2cc]"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2ea2cc]"
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2ea2cc]"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={newAddress.country}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, country: e.target.value }))}
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2ea2cc]"
                    />
                  </div>
                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={handleAddAddress}
                      className="bg-[#2ea2cc] text-white px-4 py-2 rounded hover:bg-[#268cb3] transition-colors text-sm font-medium"
                    >
                      Save Address
                    </button>
                    <button
                      onClick={() => setShowAddAddress(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Address List */}
              <div className="space-y-4">
                {user.addresses.map((address) => (
                  <div key={address.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 mt-1">
                          <FiMapPin className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-medium text-gray-900 capitalize">
                              {address.type}
                            </span>
                            {address.isDefault && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded border border-green-200">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">{address.street}</p>
                          <p className="text-gray-600 text-sm">
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                          <p className="text-gray-600 text-sm">{address.country}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!address.isDefault && (
                          <button
                            onClick={() => setDefaultAddress(address.id)}
                            className="text-green-600 hover:text-green-700 p-2 rounded-full hover:bg-gray-50 transition-colors"
                            title="Set as default"
                          >
                            <FiCheck className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-gray-50 transition-colors"
                          title="Delete address"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Summary */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-[#2ea2cc] hover:bg-blue-50 transition-colors group">
                  <FiShoppingCart className="w-5 h-5 text-[#2ea2cc] group-hover:text-[#268cb3]" />
                  <span className="font-medium text-gray-900 group-hover:text-[#2ea2cc]">Shopping Cart</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition-colors group">
                  <FiHeart className="w-5 h-5 text-pink-500 group-hover:text-pink-600" />
                  <span className="font-medium text-gray-900 group-hover:text-pink-500">Wishlist</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
                  <FiUser className="w-5 h-5 text-green-500 group-hover:text-green-600" />
                  <span className="font-medium text-gray-900 group-hover:text-green-500">Order History</span>
                </button>
              </div>
            </div>

            {/* Account Summary */}
            <div className="bg-white border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Member since</span>
                  <span className="font-medium text-gray-900">Jan 2024</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Total orders</span>
                  <span className="font-medium text-gray-900">12</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 text-sm">Wishlist items</span>
                  <span className="font-medium text-gray-900">8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default ProfilePage;