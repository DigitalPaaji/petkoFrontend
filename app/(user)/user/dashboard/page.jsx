"use client"
import { baseurl } from '@/app/admin/components/apis'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { 
  FiUser, 
  FiMapPin, 
  FiPackage, 
  FiSettings, 
  FiLogOut,
  FiEdit,
  FiPlus,
  FiEye,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiHome
} from 'react-icons/fi'
import { 
  MdOutlinePayment,
  MdOutlineLocalShipping
} from 'react-icons/md'
import Addressfield from '../../checkout/Addressfield'
import Link from 'next/link'

const DashboardPage = () => {
    const router = useRouter()
    const [loader, setLoader] = useState(true)
    const [activeTab, setActiveTab] = useState('overview')
    const [address, setAddress] = useState([])
    const [orders, setOrders] = useState([])
    const [user, setUser] = useState(null)

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${baseurl}/user/userdetails`, {
                withCredentials: true
            })
            const data = await response.data;
            if (!data.success) {
                router.push("/user/login")
            } else {
                setUser(data.user)
                setAddress(data.addresses || [])
                setOrders(data.orders || [])
                setLoader(false)
            }
        } catch (error) {
            router.push("/user/login")
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const handleLogout = async () => {
        try {
            await axios.get(`${baseurl}/user/logout`, { withCredentials: true })
            router.push('/user/login')
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return <FiCheckCircle className="text-green-500" />
            case 'shipped':
                return <FiTruck className="text-blue-500" />
            case 'pending':
                return <FiClock className="text-yellow-500" />
            default:
                return <FiClock className="text-gray-500" />
        }
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return 'bg-green-100 text-green-800'
            case 'shipped':
                return 'bg-blue-100 text-blue-800'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    if (loader) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F48C7F]"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-[#F48C7F] rounded-full flex items-center justify-center">
                                <FiUser className="text-white text-2xl" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Welcome back, {user?.name}!
                                </h1>
                                <p className="text-gray-600">{user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
                        >
                            <FiLogOut />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <nav className="space-y-2">
                                {[
                                    { id: 'overview', name: 'Overview', icon: FiHome },
                                    { id: 'orders', name: 'My Orders', icon: FiPackage },
                                    { id: 'addresses', name: 'Addresses', icon: FiMapPin },
                                    { id: 'profile', name: 'Profile', icon: FiUser },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                            activeTab === item.id
                                                ? 'bg-[#F48C7F] text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        <item.icon />
                                        <span>{item.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white p-6 rounded-lg shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-gray-600">Total Orders</p>
                                                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                                            </div>
                                            <FiPackage className="text-3xl text-[#F48C7F]" />
                                        </div>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-gray-600">Saved Addresses</p>
                                                <p className="text-2xl font-bold text-gray-900">{address.length}</p>
                                            </div>
                                            <FiMapPin className="text-3xl text-[#F48C7F]" />
                                        </div>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-gray-600">Member Since</p>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {new Date(user?.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <FiUser className="text-3xl text-[#F48C7F]" />
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Orders */}
                                <div className="bg-white rounded-lg shadow-sm">
                                    <div className="p-6 border-b">
                                        <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                                    </div>
                                    <div className="p-6">
                                        {orders.slice(0, 3).map((order) => (
                                            <div key={order._id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                                                <div className="flex items-center space-x-4">
                                                    {getStatusIcon(order.orderStatus)}
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            Order #{order._id.slice(-8)}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {new Date(order.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-gray-900">
                                                        ${order.totalPrice?.toLocaleString()}
                                                    </p>
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                                                        {order.orderStatus}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                        {orders.length === 0 && (
                                            <p className="text-center text-gray-600 py-8">No orders found</p>
                                        )}
                                        {orders.length > 3 && (
                                            <button
                                                onClick={() => setActiveTab('orders')}
                                                className="w-full mt-4 text-[#F48C7F] hover:text-[#e57367] transition-colors"
                                            >
                                                View all orders
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div className="bg-white rounded-lg shadow-sm">
                                <div className="p-6 border-b">
                                    <h2 className="text-xl font-semibold text-gray-900">My Orders</h2>
                                </div>
                                <div className="p-6">
                                    {orders.map((order) => (
                                        <div key={order._id} className="border rounded-lg p-4 mb-4 last:mb-0">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        Order #{order._id.slice(-8)}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                                                    {getStatusIcon(order.orderStatus)}
                                                    <span className="ml-1">{order.orderStatus}</span>
                                                </span>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                <div>
                                                    <p className="text-sm text-gray-600">Payment Method</p>
                                                    <p className="font-medium">{order.paymentMethod}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Items Price</p>
                                                    <p className="font-medium">${order.itemsPrice?.toLocaleString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Total Amount</p>
                                                    <p className="font-semibold text-lg">${order.totalPrice?.toLocaleString()}</p>
                                                </div>
                                            </div>

                                            <div className="border-t pt-4">
                                                <p className="text-sm font-medium text-gray-900 mb-2">Order Items:</p>
                                                {order.orderItems?.map((item, index) => (
                                                    <div key={index} className="flex items-center justify-between py-2">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                                                                <FiPackage className="text-gray-600" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-sm">{item.name}</p>
                                                                <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                                            </div>
                                                        </div>
                                                        <p className="font-medium">${item.price?.toLocaleString()}</p>
                                                    </div>
                                                ))}
                                                 <div className='flex justify-end'>
                                                    
                                                     <Link href={`/user/dashboard/${order._id}`} className='px-3 py-1 bg-[#F48C7F] text-white font-bold rounded-md '>View</Link>
                                                    </div> 
                                            </div>
                                        </div>
                                    ))}
                                    {orders.length === 0 && (
                                        <div className="text-center py-12">
                                            <FiPackage className="mx-auto text-4xl text-gray-400 mb-4" />
                                            <p className="text-gray-600">No orders found</p>
                                            <button 
                                                onClick={() => router.push('/shop')}
                                                className="mt-4 bg-[#F48C7F] text-white px-6 py-2 rounded-lg hover:bg-[#e57367] transition-colors"
                                            >
                                                Start Shopping
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Addresses Tab */}
                        {activeTab === 'addresses' && (

                            <Addressfield   />
                          
                        )}

                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="bg-white rounded-lg shadow-sm">
                                <div className="p-6 border-b">
                                    <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={user?.name || ''}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F48C7F] focus:border-transparent"
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={user?.email || ''}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F48C7F] focus:border-transparent"
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Member Since
                                            </label>
                                            <input
                                                type="text"
                                                value={new Date(user?.createdAt).toLocaleDateString()}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F48C7F] focus:border-transparent"
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Account Status
                                            </label>
                                            <input
                                                type="text"
                                                value={user?.status ? 'Active' : 'Inactive'}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F48C7F] focus:border-transparent"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-6 flex space-x-4">
                                        <button className="bg-[#F48C7F] text-white px-6 py-2 rounded-lg hover:bg-[#e57367] transition-colors">
                                            Edit Profile
                                        </button>
                                        <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage