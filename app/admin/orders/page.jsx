"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../components/apis'
import { FaBox, FaTruck, FaFilter,FaCheckCircle, FaTimesCircle, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa'
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { MdOutlinePendingActions ,MdCancel,MdPaid,MdOutlineUnpublished} from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcShipped } from "react-icons/fc";
import Link from 'next/link'



const OrdersPage = () => {
  const [allorder, setAllOrder] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilter,setShowFilter]=useState(false)
const [filterVal,setFilterVall]=useState("All")


  const filterdata= [
    {name:"All",icon:RiBarChartHorizontalLine },
    {name:"Pending",icon:MdOutlinePendingActions },
    {name:"Processing",icon:AiOutlineLoading3Quarters },
    {name:"Shipped",icon:FcShipped },
    {name:"Delivered",icon:FaBox },
    {name:"Cancelled",icon:MdCancel },
  ]




  const fetchorder = async (filt=null) => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseurl}/order/get/allorder?${filt}`)
      const data = await response.data
      if (data.success) {
        setAllOrder(data.data)
      } else {
        setAllOrder([])
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      setAllOrder([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchorder()
  }, [])

   
  useEffect(()=>{
    fetchorder(`&filter=${filterVal} `)

  },[filterVal])












  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Get status badge style
  const getStatusBadge = (status) => {
    const statusStyles = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Shipped': 'bg-purple-100 text-purple-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800'
    }
    return statusStyles[status] || 'bg-gray-100 text-gray-800'
  }

  // Get payment method icon
  const getPaymentIcon = (method) => {
    return method === 'COD' ? <FaMoneyBillWave className="text-green-600" /> : <FaCreditCard className="text-blue-600" />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return ( <>
    <div className="min-h-screen bg-gray-50 p-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FaBox className="text-blue-600" />
            Orders Management
          </h1>
          <p className="text-gray-600 mt-2">Manage and track all customer orders</p>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table Header */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {allorder.length > 0 ? (
                  allorder.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      {/* Order ID */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{order._id.slice(-8).toUpperCase()}
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order?.shippingAddress?.firstName} {order?.shippingAddress?.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{order.user.email}</div>
                      </td>

                      {/* Items */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {order.orderItems.length} item(s)
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.orderItems.slice(0, 2).map(item => item.name).join(', ')}
                          {order.orderItems.length > 2 && '...'}
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${order.totalPrice}
                        </div>
                        {order.coupon && (
                          <div className="text-xs text-green-600">
                            Coupon applied: {order.coupon.code}
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                        <div className="flex items-center gap-1 mt-1">
                          {order.isDelivered ? (
                            <FaCheckCircle className="text-green-500 text-xs" />
                          ) : (
                            <FaTimesCircle className="text-red-500 text-xs" />
                          )}
                          <span className="text-xs text-gray-500">
                            {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                          </span>
                        </div>
                      </td>

                      {/* Payment */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getPaymentIcon(order.paymentMethod)}
                          <span className="text-sm text-gray-900">{order.paymentMethod}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {order.isPaid ? (
                            <FaCheckCircle className="text-green-500 text-xs" />
                          ) : (
                            <FaTimesCircle className="text-red-500 text-xs" />
                          )}
                          <span className="text-xs text-gray-500">
                            {order.isPaid ? 'Paid' : 'Not Paid'}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link href={`/admin/orders/view/${order._id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                          View
                        </Link>
                          <Link href={`/admin/orders/edit/${order._id}`} className="text-green-600 hover:text-green-900">
                          Edit
                        </Link>
                      
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-24 text-center">
                      <FaBox className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
                      <p className="mt-1 text-sm text-gray-500">No orders have been placed yet.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        {allorder.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{allorder.length}</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Pending Orders</dt>
                <dd className="mt-1 text-3xl font-semibold text-yellow-600">
                  {allorder.filter(order => order.orderStatus === 'Pending').length}
                </dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                <dd className="mt-1 text-3xl font-semibold text-green-600">
                  ${allorder.reduce((sum, order) => sum + order.totalPrice, 0)}
                </dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Delivered</dt>
                <dd className="mt-1 text-3xl font-semibold text-blue-600">
                  {allorder.filter(order => order.isDelivered).length}
                </dd>
              </div>
            </div>
          </div>
        )}



      </div>





    </div>

   
    
    <div className=' absolute right-5 bottom-5 '>

<div className={`absolute border border-gray-400  bottom-full right-full bg-white shadow-2xl px-4 py-4  origin-bottom-right transform  ${showFilter?"scale-100" :"scale-0"}  duration-200`}>
<p>Fliter</p>

<div className='flex flex-col gap-3'>
{filterdata?.map((item,index)=>{
  return(
<div className='flex items-center gap-3'>
<input type="radio" name="filter" id={`radio-${index}`} onChange={(e)=>{setFilterVall(e.target.value),setShowFilter(false)}} value={item.name} checked={filterVal === item.name}  />
  <label htmlFor={`radio-${index}`} className='flex gap-3 items-center'>

<item.icon />
<span> {item.name}</span>
</label>

  </div>
  )
})}

<p>Paid</p>

{[{name:"Paid",val:true,icon:MdPaid},{name:"Unpaid",val:false,icon:MdOutlineUnpublished}]?.map((item,index)=>{
  return(
<div className='flex items-center gap-3'>
<input type="radio" name="paid" id={`paid-${index}`} />
  <label htmlFor={`paid-${index}`} className='flex gap-3 items-center'>

<item.icon />
<span> {item.name}</span>
</label>

  </div>
  )
})}

</div>

</div>

<div className='bg-amber-500 p-4 rounded-2xl' onClick={()=>setShowFilter(!showFilter)}>
<FaFilter  />
</div>
</div></>
  )
}

export default OrdersPage