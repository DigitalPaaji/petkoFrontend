"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseurl } from './components/apis'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { 
  FiUsers, 
  FiShoppingBag, 
  FiFolder, 
  FiMessageSquare,
  FiTrendingUp,
  FiActivity,
  FiEye
} from 'react-icons/fi'

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseurl}/layout/dashboard`)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Sample chart data
  const salesData = [
    { name: 'Jan', sales: 4000, revenue: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398 },
    { name: 'Mar', sales: 2000, revenue: 9800 },
    { name: 'Apr', sales: 2780, revenue: 3908 },
    { name: 'May', sales: 1890, revenue: 4800 },
    { name: 'Jun', sales: 2390, revenue: 3800 },
  ]

  const categoryData = [
    { name: 'Electronics', value: 400 },
    { name: 'Clothing', value: 300 },
    { name: 'Books', value: 300 },
    { name: 'Home', value: 200 },
  ]


  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Users Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {data?.users || 0}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FiUsers className="text-blue-600 text-xl" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <FiTrendingUp className="text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">+12%</span>
            <span className="text-gray-500 text-sm ml-2">from last month</span>
          </div>
        </div>
        {/* Products Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Products</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {data?.product || 0}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FiShoppingBag className="text-green-600 text-xl" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <FiTrendingUp className="text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">+8%</span>
            <span className="text-gray-500 text-sm ml-2">from last month</span>
          </div>
        </div>

        {/* Categories Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Categories</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {data?.PatCategory || 0}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FiFolder className="text-purple-600 text-xl" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <FiActivity className="text-blue-500 mr-1" />
            <span className="text-gray-500 text-sm">Active categories</span>
          </div>
        </div>

        {/* Messages Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Messages</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {data?.message?.length || 0}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <FiMessageSquare className="text-orange-600 text-xl" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <FiEye className="text-green-500 mr-1" />
            <span className="text-gray-500 text-sm">
              {data?.message?.filter(msg => msg.read).length || 0} read
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" name="Sales" />
              <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Blogs */}
        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Blogs</h3>
          <div className="space-y-4">
            {data?.blog?.map((blog) => (
              <div key={blog._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-medium text-gray-800">{blog.title}</h4>
                  <p className="text-sm text-gray-600">Slug: {blog.slug}</p>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                    {blog.tag}
                  </span>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                  View
                </button>
              </div>
            ))}
            {(!data?.blog || data.blog.length === 0) && (
              <p className="text-gray-500 text-center py-4">No blogs available</p>
            )}
          </div>
        </div>
      </div>

      {/* Messages Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Messages</h3>
        <div className="space-y-3">
          {data?.message?.map((msg) => (
            <div key={msg._id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${msg.read ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <span className="text-sm text-gray-600">Message ID: {msg._id}</span>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${msg.read ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {msg.read ? 'Read' : 'Unread'}
              </span>
            </div>
          ))}
          {(!data?.message || data.message.length === 0) && (
            <p className="text-gray-500 text-center py-4">No messages available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard