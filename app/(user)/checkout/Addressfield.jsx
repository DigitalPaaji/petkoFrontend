"use client"
import React, { useEffect, useState } from 'react'
import AddressForm from './AddressSection'
import axios from 'axios'
import { baseurl } from '@/app/admin/components/apis'
import { 
  FaMapMarkerAlt, 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaCheckCircle,
  FaPhone,
  FaHome,
  FaUser
} from 'react-icons/fa'
import { toast } from 'react-toastify'

axios.defaults.withCredentials = true

const Addressfield = () => {
  const [showForm, setShowForm] = useState(false)
  const [addresses, setAddresses] = useState([])
  const [editingAddress, setEditingAddress] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchAddresses = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseurl}/address`) 
      const data = await response.data
      if (data.success) {
        setAddresses(data.data)
      }
    } catch (error) {
      console.error("Error fetching addresses:", error)
      toast.error("Failed to load addresses")
    } finally {
      setLoading(false)
    }
  }

  const deleteAddress = async (addressId) => {
    if (!confirm("Are you sure you want to delete this address?")) return
    
    try {
      const response = await axios.delete(`${baseurl}/address/delete/${addressId}`)
      const data = await response.data
      if (data.success) {
        toast.success("Address deleted successfully")
        fetchAddresses()
      }
    } catch (error) {
      console.error("Error deleting address:", error)
      toast.error("Failed to delete address")
    }
  }

  const setDefaultAddress = async (addressId) => {
    try {
      const response = await axios.put(`${baseurl}/address/active/${addressId}`)
      const data = await response.data
      if (data.success) {
        toast.success("Default address updated")
        fetchAddresses()
      }
    } catch (error) {
      console.error("Error setting default address:", error)
      toast.error("Failed to set default address")
    }
  }

  const handleSave = () => {
    setShowForm(false)
    setEditingAddress(null)
    fetchAddresses()
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingAddress(null)
  }

  const handleEdit = (address) => {
    setEditingAddress(address)
    setShowForm(true)
  }

  const handleAddNew = () => {
    setEditingAddress(null)
    setShowForm(true)
  }

  useEffect(() => {
    fetchAddresses()
  }, [])

  if (loading) {
    return (
      <div className="min-h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F69482]"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaMapMarkerAlt className="text-[#4B656C]" />
            My Addresses
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your delivery addresses
          </p>
        </div>
        
        {!showForm && (
          <button
            onClick={handleAddNew}
            className="bg-[#F69482] hover:bg-[#e88573] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition duration-300 mt-4 md:mt-0"
          >
            <FaPlus />
            Add New Address
          </button>
        )}
      </div>

      {/* Address Form */}
      {showForm && (
        <div className="mb-8">
          <AddressForm
            addressData={editingAddress}
            mode={editingAddress ? "edit" : "create"}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Addresses Grid */}
      {!showForm && (
        <div className=" flex flex-col gap-2 ">
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`bg-white rounded-lg shadow-md border-2 transition-all duration-300 hover:shadow-lg ${
                address.default ? 'border-[#F69482]' : 'border-gray-200'
              }`}
            >
              {/* Header */}
              <div className=" p-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-[#4B656C]" />
                    <h3 className="font-semibold text-gray-900">
                      {address.firstName} {address.lastName}
                    </h3>
                  </div>
                  {address.default && (
                    <span className="bg-[#F69482] text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <FaCheckCircle />
                      Default
                    </span>
                  )}
                </div>
              </div>

              {/* Address Details */}
              <div className=" flex flex-wrap gap-3 items-center text-nowrap p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <FaHome className="text-[#4B656C] mt-1 flex-shrink-0" />
                  <div className='flex flex-wrap gap-2'>
                    <p className="text-gray-900 font-medium">{address.addressLine1}</p>
                    {address.addressLine2 && (
                      <p className="text-gray-600">,{address.addressLine2}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-[#4B656C] flex-shrink-0" />
                  <span>
                    {address.city}, {address.state} - {address.postalCode}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-[#4B656C] flex-shrink-0" />
                  <span>{address.country}</span>
                </div>

                {address.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaPhone className="text-[#4B656C] flex-shrink-0" />
                    <span>{address.phone}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-gray-200 flex justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-[#4B656C] hover:text-[#3a545c] p-2 rounded-lg transition duration-300"
                    title="Edit Address"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteAddress(address._id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-lg transition duration-300"
                    title="Delete Address"
                  >
                    <FaTrash />
                  </button>
                </div>
                
                {!address.default && (
                  <button
                    onClick={() => setDefaultAddress(address._id)}
                    className="text-[#F69482] hover:text-[#e88573] text-sm font-semibold px-3 py-1 border border-[#F69482] rounded-lg transition duration-300"
                  >
                    Set Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!showForm && addresses.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <FaMapMarkerAlt className="text-[#4B656C] text-6xl mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Addresses Added
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't added any addresses yet. Add your first address to get started.
            </p>
            <button
              onClick={handleAddNew}
              className="bg-[#F69482] hover:bg-[#e88573] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition duration-300 mx-auto"
            >
              <FaPlus />
              Add Your First Address
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Addressfield