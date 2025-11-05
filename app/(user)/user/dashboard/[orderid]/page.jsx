"use client"
import { baseurl, imgurl } from '@/app/admin/components/apis';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { 
  FiArrowLeft, 
  FiPackage, 
  FiCalendar, 
  FiMapPin, 
  FiCreditCard,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiCopy,
  FiShoppingBag
} from 'react-icons/fi';
import { 
  MdOutlineLocalShipping,
  MdOutlinePayment
} from 'react-icons/md';

const OrderDetailsPage = ({params: {orderid}}) => {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${baseurl}/user/order/${orderid}`, {
        withCredentials: true
      });
      const data = await response.data;
      if (data.success) {
        setOrder(data.order);
      } else {
        setOrder(null);
      }
    } catch (error) {
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, [orderid]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <FiCheckCircle className="text-green-500 text-xl" />;
      case 'shipped':
        return <FiTruck className="text-blue-500 text-xl" />;
      case 'pending':
        return <FiClock className="text-yellow-500 text-xl" />;
      case 'cancelled':
        return <FiAlertCircle className="text-red-500 text-xl" />;
      default:
        return <FiClock className="text-gray-500 text-xl" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (isPaid) => {
    return isPaid 
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F48C7F]"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <FiPackage className="mx-auto text-4xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/user/dashboard')}
            className="bg-[#F48C7F] text-white px-6 py-2 rounded-lg hover:bg-[#e57367] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="  mx-auto px-4 sm:px-6 lg:px-36">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <FiArrowLeft />
            <span>Back</span>
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <FiPackage className="text-gray-400" />
                  <span className="text-gray-600">Order ID: {order._id.slice(-8)}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(order._id)}
                  className="flex items-center space-x-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiCopy className="text-sm" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                {getStatusIcon(order.orderStatus)}
                <span>{order.orderStatus}</span>
              </span>
              
              <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${getPaymentStatusColor(order.isPaid)}`}>
                <MdOutlinePayment />
                <span>{order.isPaid ? 'Paid' : 'Pending Payment'}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
              </div>
              <div className="p-6">
                {order.orderItems?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 py-4 border-b last:border-b-0">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.image ? (
                        <img
                          src={`${imgurl}/uploads/${item.image}`}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <FiShoppingBag className="text-gray-400 text-xl" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      {item.product?.sku && (
                        <p className="text-xs text-gray-500">SKU: {item.product.sku}</p>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${item.price?.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Total: ${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <FiMapPin />
                  <span>Shipping Address</span>
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">
                    {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                  </p>
                  <p className="text-gray-600">{order.shippingAddress?.addressLine1}</p>
                  {order.shippingAddress?.addressLine2 && (
                    <p className="text-gray-600">{order.shippingAddress.addressLine2}</p>
                  )}
                  <p className="text-gray-600">
                    {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}
                  </p>
                  <p className="text-gray-600">{order.shippingAddress?.country}</p>
                  <p className="text-gray-600 font-medium">Phone: {order.shippingAddress?.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Items Price</span>
                  <span className="font-medium">${order.itemsPrice?.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {order.shippingPrice === 0 ? 'Free' : `$${order.shippingPrice?.toLocaleString()}`}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${order.taxPrice?.toLocaleString()}</span>
                </div>
                
                {order.coupon?.discountAmount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>Discount</span>
                    <span>-${order.coupon.discountAmount?.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="border-t pt-4 flex justify-between items-center text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-[#F48C7F]">${order.totalPrice?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Order Information */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Order Information</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <FiCalendar className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-medium">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MdOutlinePayment className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-medium">{order.paymentMethod}</p>
                  </div>
                </div>
                
                {order.paidAt && (
                  <div className="flex items-center space-x-3">
                    <FiCheckCircle className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Paid On</p>
                      <p className="font-medium">
                        {new Date(order.paidAt).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                )}
                
                {order.deliveredAt && (
                  <div className="flex items-center space-x-3">
                    <FiTruck className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Delivered On</p>
                      <p className="font-medium">
                        {new Date(order.deliveredAt).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                )}
                
                {order.trackingId && (
                  <div className="flex items-center space-x-3">
                    <MdOutlineLocalShipping className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Tracking ID</p>
                      <p className="font-medium">{order.trackingId}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Actions</h3>
                <div className="space-y-3">
                  {!order.isPaid && order.paymentMethod === 'COD' && (
                    <button className="w-full bg-[#F48C7F] text-white py-2 px-4 rounded-lg hover:bg-[#e57367] transition-colors font-medium">
                      Pay Now
                    </button>
                  )}
                  
                  {order.orderStatus === 'Pending' && (
                    <button className="w-full border border-red-300 text-red-600 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors font-medium">
                      Cancel Order
                    </button>
                  )}
                  
                  <button 
                    onClick={() => router.push('/user/dashboard')}
                    className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Back to Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;