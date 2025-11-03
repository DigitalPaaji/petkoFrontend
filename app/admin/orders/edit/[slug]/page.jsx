"use client"
import { baseurl, imgurl } from '@/app/admin/components/apis'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { 
  FaBox, 
  FaUser, 
  FaMapMarkerAlt, 
  FaReceipt,
  FaShoppingCart,
  FaPhone,
  FaEnvelope,
  FaSave,
  FaTimes,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
  FaCreditCard,
  FaCalendarAlt,
  FaTag
} from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const OrderEditPage = ({params: {slug}}) => {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    orderStatus: '',
    trackingId: '',
    isPaid: false,
    isDelivered: false,
    deliveredAt: ''
  })
  const router = useRouter()

  const fetchOrder = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseurl}/order/get/order/${slug}`)
      const data = await response.data
      if (data.success) {
        setOrder(data.data)
        setFormData({
          orderStatus: data.data.orderStatus || 'Pending',
          trackingId: data.data.trackingId || '',
          isPaid: data.data.isPaid || false,
          isDelivered: data.data.isDelivered || false,
          deliveredAt: data.data.deliveredAt || ''
        })
      }
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [slug])

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name === 'isDelivered' && checked) {
      setFormData(prev => ({
        ...prev,
        [name]: checked,
        deliveredAt: new Date().toISOString()
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  // Save order updates
  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await axios.put(`${baseurl}/order/update/${slug}`, formData)
      const data = await response.data
      if (data.success) {
        alert('Order updated successfully!')
        router.push('/admin/orders')
      }
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Error updating order. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // Cancel editing
  const handleCancel = () => {
    router.push('/admin/orders')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaBox className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600">The order you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }


  const handelStatue=async(val)=>{
try {
  const response = await axios.put(`${baseurl}/order/status`,{orderid:order._id, status:val})
  const data = await response.data;
  if(data.success){
    toast.success(data.message)
        fetchOrder()

  }
  else{
        toast.error(data.message)  }

} catch (error) {
   toast.error(error.message)
}



  }


  const handelpaid=async(val)=>{
try {
  const response = await axios.put(`${baseurl}/order/paid`,{orderid:order._id,isPaid:val})
  const data = await response.data;
  if(data.success){
    toast.success(data.message)
        fetchOrder()

  }
  else{
        toast.error(data.message)  }

} catch (error) {
   toast.error(error.message)
}
  }



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FaReceipt className="text-blue-600" />
                Edit Order
              </h1>
              <p className="text-gray-600 mt-2">Order ID: #{order._id.slice(-8).toUpperCase()}</p>
              <p className="text-sm text-gray-500">Created: {formatDate(order.createdAt)}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaTimes />
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaSave />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Edit Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Order Status Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaTruck className="text-blue-600" />
                Order Status & Tracking
              </h2>
              
              <div className="space-y-6">
                {/* Order Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Status *
                  </label>
                  <select
                    name="orderStatus"
                    value={formData.orderStatus}
                    onChange={(e)=>handelStatue(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Tracking ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tracking Number
                  </label>
                  <input
                    type="text"
                    name="trackingId"
                    value={formData.trackingId}
                    onChange={handleInputChange}
                    placeholder="Enter tracking number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Leave empty if no tracking available
                  </p>
                </div>
              </div>
            </div>

            {/* Payment & Delivery Status */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaMoneyBillWave className="text-green-600" />
                Payment & Delivery
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Payment Status */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Payment Status</h3>
                  
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <input
                      type="checkbox"
                      name="isPaid"
                      checked={formData.isPaid}
                      onChange={(e)=>handelpaid(e.target.checked)}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Payment Received
                      </label>
                      <p className="text-sm text-gray-500">
                        Mark as paid when payment is confirmed
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">Current Status:</p>
                    <p className={`text-sm ${order.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                      {order.isPaid ? 'Paid' : 'Pending Payment'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Method: {order.paymentMethod}
                    </p>
                  </div>
                </div>

                {/* Delivery Status */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Delivery Status</h3>
                  
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <input
                      type="checkbox"
                      name="isDelivered"
                      checked={formData.isDelivered}
                      disabled
                      onChange={handleInputChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Order Delivered
                      </label>
                      <p className="text-sm text-gray-500">
                        Mark when order is delivered to customer
                      </p>
                    </div>
                  </div>

                  {formData.isDelivered && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        name="deliveredAt"
                        value={formData.deliveredAt ? formData.deliveredAt.slice(0, 16) : ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">Current Status:</p>
                    <p className={`text-sm ${order.isDelivered ? 'text-green-600' : 'text-red-600'}`}>
                      {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                    </p>
                    {order.deliveredAt && (
                      <p className="text-sm text-gray-500 mt-1">
                        Delivered: {formatDate(order.deliveredAt)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            
            {/* Order Summary Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaShoppingCart className="text-purple-600" />
                Order Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items Price:</span>
                  <span className="font-medium">₹{order.itemsPrice}</span>
                </div>
                
                {order.coupon && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span className="flex items-center gap-1">
                      <FaTag className="text-xs" />
                      Coupon ({order.coupon.code}):
                    </span>
                    <span>-₹{order.coupon.discountAmount}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">₹{order.shippingPrice}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">₹{order.taxPrice}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-blue-600">₹{order.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaUser className="text-blue-600" />
                Customer
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaUser className="text-gray-400" />
                  <span>{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaEnvelope className="text-gray-400" />
                  <span>{order.user?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaPhone className="text-gray-400" />
                  <span>{order.shippingAddress?.phone}</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaBox className="text-orange-600" />
                Order Items ({order.orderItems.length})
              </h3>
              
              <div className="space-y-3">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-3 p-2 border border-gray-100 rounded">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      {item.image ? (
                        <img 
                          src={`${imgurl}/uploads/${item.image}`} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <FaBox className="text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Status Overview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Order Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.orderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.orderStatus === 'Processing' ? 'bg-blue-100 text-blue-800' :
                    order.orderStatus === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                    order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.orderStatus}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Payment:</span>
                  <span className={`flex items-center gap-1 text-sm ${
                    order.isPaid ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {order.isPaid ? <FaCheckCircle /> : <FaTimesCircle />}
                    {order.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Delivery:</span>
                  <span className={`flex items-center gap-1 text-sm ${
                    order.isDelivered ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {order.isDelivered ? <FaCheckCircle /> : <FaTimesCircle />}
                    {order.isDelivered ? 'Delivered' : 'Pending'}
                  </span>
                </div>

                {order.trackingId && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tracking:</span>
                    <span className="text-sm font-mono">{order.trackingId}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <button 
            onClick={handleCancel}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderEditPage