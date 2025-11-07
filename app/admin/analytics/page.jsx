"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../components/apis'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import {
  FaShoppingCart,
  FaUsers,
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaChartLine
} from 'react-icons/fa'

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchOrderData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseurl}/layout/analytics/orders`)
      const data = response.data
      console.log(data)
      setAnalyticsData(data.data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrderData()
  }, [])

  // Prepare monthly data for charts
  const monthlyChartData = analyticsData?.monthlyStats?.map((value, index) => ({
    name: new Date(2024, index).toLocaleString('default', { month: 'short' }),
    orders: value,
    revenue: value * 50 // Example revenue calculation
  })) || []


 const monthlyrevinuChartData = analyticsData?.montlyrevinu?.map((value, index) => ({
    name: new Date(2024, index).toLocaleString('default', { month: 'short' }),
    // orders: value,
    revenue: value  // Example revenue calculation
  })) || []




  // Pie chart data for order status
  const orderStatusData = [
    { name: 'Completed', value: analyticsData?.completedOrders || 0 },
    { name: 'Pending', value: analyticsData?.pendingOrders || 0 }
  ]

  const COLORS = ['#00C49F', '#FF8042']

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaChartLine className="text-blue-600" />
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Overview of your business performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ${analyticsData?.totalRevenue?.toLocaleString() || '0'}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FaMoneyBillWave className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <span>+2.5%</span>
              <span className="ml-1">from last month</span>
            </div>
          </div>

          {/* Total Orders Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {analyticsData?.totalOrders || '0'}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FaShoppingCart className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <span>+5.1%</span>
              <span className="ml-1">from last month</span>
            </div>
          </div>

          {/* Total Customers Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {analyticsData?.totalCustomers || '0'}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FaUsers className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <span>+8.7%</span>
              <span className="ml-1">from last month</span>
            </div>
          </div>

          {/* Completed Orders Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Orders</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {analyticsData?.completedOrders || '0'}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <FaCheckCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <FaClock className="h-4 w-4 mr-1" />
              <span>Real-time</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Orders Bar Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FaChartLine className="text-blue-600" />
              Monthly Orders Overview
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="orders" 
                    name="Number of Orders"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Order Status Pie Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FaShoppingCart className="text-green-600" />
              Order Status Distribution
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Revenue Trend Line Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaMoneyBillWave className="text-green-600" />
            Revenue Trend (Last 12 Months)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyrevinuChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Revenue ($)"
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{analyticsData?.pendingOrders || 0}</div>
            <div className="text-sm text-gray-600 mt-2">Pending Orders</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{analyticsData?.completedOrders || 0}</div>
            <div className="text-sm text-gray-600 mt-2">Completed Orders</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {analyticsData?.totalOrders ? 
                Math.round((analyticsData.completedOrders / analyticsData.totalOrders) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600 mt-2">Completion Rate</div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={fetchOrderData}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition duration-300"
          >
            <FaChartLine />
            Refresh Analytics
          </button>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage