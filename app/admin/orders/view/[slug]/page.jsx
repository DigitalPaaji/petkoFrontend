"use client"
import { baseurl, imgurl } from '@/app/admin/components/apis'
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { 
  FaBox, 
  FaUser, 
  FaMapMarkerAlt, 
  
  FaReceipt,

  FaShoppingCart,
  FaPhone,
  FaEnvelope,
  FaRegEdit,
  FaPrint
} from 'react-icons/fa'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'
import Link from 'next/link'

const OrderDetailPage = ({params: {slug}}) => {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const invoiceRef = useRef()

  const fetchOrder = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseurl}/order/get/order/${slug}`)
      const data = await response.data
      if (data.success) {
        setOrder(data.data)
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Get status badge style
  const getStatusBadge = (status) => {
    const statusStyles = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Processing': 'bg-blue-100 text-blue-800 border-blue-200',
      'Shipped': 'bg-purple-100 text-purple-800 border-purple-200',
      'Delivered': 'bg-green-100 text-green-800 border-green-200',
      'Cancelled': 'bg-red-100 text-red-800 border-red-200'
    }
    return statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200'
  }


  // Print Invoice
  const printInvoice = () => {
    const printContent = invoiceRef.current.innerHTML
    const originalContent = document.body.innerHTML
    
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice #${order._id.slice(-8).toUpperCase()}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @media print {
              body { margin: 0; padding: 20px; }
              .no-print { display: none !important; }
              .print-break { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body class="bg-white">
          ${printContent}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 500);
            }
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Actions */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <FaReceipt className="text-blue-600" />
              Order Details
            </h1>
            <p className="text-gray-600 mt-2">Order ID: #{order._id.slice(-8).toUpperCase()}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusBadge(order.orderStatus)}`}>
                {order.orderStatus}
              </span>
              <p className="text-sm text-gray-500 mt-1">
                Created: {formatDate(order.createdAt)}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 no-print">
              <button 
                onClick={printInvoice}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaPrint className="text-gray-600" />
                Print Invoice
              </button>
              <Link 
               href={`/admin/orders/edit/${slug}`}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <FaRegEdit />
               Edit Order
              </Link>
            </div>
          </div>
        </div>

        {/* Invoice Content - This will be captured for PDF/Print */}
        <div ref={invoiceRef} className="bg-white rounded-lg shadow-lg p-8 print-break">
          
          {/* Invoice Header */}
          <div className="border-b-2 border-gray-200 pb-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">INVOICE</h1>
                <p className="text-gray-600 mt-2">Order #: {order._id.slice(-8).toUpperCase()}</p>
                <p className="text-gray-600">Date: {formatDate(order.createdAt)}</p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mx-auto md:mx-0">
                    <img src="/Images/frontend/logo.webp" alt="" className='w-5/6' />
                  {/* <span className="text-2xl font-bold text-gray-600">LOGO</span> */}
                </div>
                <p className="text-gray-600 mt-2">Petko</p>
                <p className="text-gray-600">company@email.com</p>
              </div>
            </div>
          </div>

          {/* Billing & Shipping Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 print-break">
            {/* Billing Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaUser className="text-blue-600" />
                Billed To
              </h3>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium text-gray-900">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </p>
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-gray-400" />
                  {order.user.email}
                </p>
                <p className="flex items-center gap-2">
                  <FaPhone className="text-gray-400" />
                  {order.shippingAddress.phone}
                </p>
              </div>
            </div>

            {/* Shipping Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-600" />
                Shipped To
              </h3>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium text-gray-900">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </p>
                <p>{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>

          {/* Order Items Table */}
          <div className="mb-8 print-break">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FaShoppingCart className="text-purple-600" />
              Order Items
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.orderItems.map((item) => (
                    <tr key={item._id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                            {item.image ? (
                              <img 
                                src={`${imgurl}/uploads/${item.image}`} 
                                alt={item.name}
                                className="h-10 w-10 object-cover rounded"
                              />
                            ) : (
                              <FaBox className="text-gray-400" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">₹{item.price}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹{item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print-break">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <span className={`font-medium ${order.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                    {order.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Status:</span>
                  <span className={`font-medium ${order.isDelivered ? 'text-green-600' : 'text-red-600'}`}>
                    {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>₹{order.itemsPrice}</span>
                </div>
                
                {order.coupon && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Coupon Discount ({order.coupon.code}):</span>
                    <span>-₹{order.coupon.discountAmount}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>₹{order.shippingPrice}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Tax:</span>
                  <span>₹{order.taxPrice}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-blue-600">₹{order.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>Thank you for your business!</p>
            <p className="mt-2">If you have any questions, please contact us at support@company.com</p>
          </div>
        </div>

        {/* Additional Action Buttons at Bottom */}
        <div className="mt-8 flex justify-center gap-4 no-print">
          <button 
            onClick={printInvoice}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FaPrint className="text-gray-600" />
            Print Invoice
          </button>
          <Link 
           href={`/admin/orders/edit/${slug}`}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FaRegEdit />
           Edit Order
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailPage