"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../components/apis'
import { FaTrash, FaUser, FaEnvelope, FaCalendar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'

const UsersPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseurl}/user/all`)
      const data = response.data
      if(data.success){
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      // Optimistic update
    //   setUsers(prevUsers => 
    //     prevUsers.map(user => 
    //       user._id === userId 
    //         ? { ...user, status: !currentStatus }
    //         : user
    //     )
    //   )

      // API call to update status
      const response = await axios.put(`${baseurl}/user/status/${userId}`, {
        status: !currentStatus
      })

      if (response.data.success) {
        // Revert if API call fails
        // setUsers(prevUsers => 
        //   prevUsers.map(user => 
        //     user._id === userId 
        //       ? { ...user, status: currentStatus }
        //       : user
        //   )
        // )
        console.error('Failed to update status')
        fetchUsers()
      }
    } catch (error) {
      // Revert on error
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === userId 
            ? { ...user, status: currentStatus }
            : user
        )
      )
      console.error('Error updating status:', error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }




  const handelDelete= async(id)=>{
const response = await axios.delete(`${baseurl}/user/delete/${id}`)
const data = await response.data;
if(data.success){
    toast.success(data.message)
    fetchUsers()
}
else{
       toast.error(data.message)
 
}
  }



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FaUser className="text-blue-600" />
            User Management
          </h1>
          <p className="text-gray-600 mt-2">Manage your application users</p>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table Header */}
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                    {/* Name Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FaUser className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {user._id.substring(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Email Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <FaEnvelope className="h-4 w-4 text-gray-400 mr-2" />
                        {user.email}
                      </div>
                    </td>

                    {/* Status Column with Toggle */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* <button
                        onClick={() => toggleUserStatus(user._id, user.status)}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                          user.status 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        } cursor-pointer`}
                      >
                        {user.status ? (
                          <>
                            <FaCheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <FaTimesCircle className="h-3 w-3 mr-1" />
                            Inactive
                          </>
                        )}
                      </button> */}




  <label className="relative inline-flex cursor-pointer items-center"  onClick={() => toggleUserStatus(user._id, user.status)}>
      <input className="peer sr-only" type={`checkbox`}  checked={user.status}/>
      <div className="border-gray-500 shadow-lg  border flex h-6 w-12 items-center outline-none rounded bg-red-600 pl-7 text-white transition-all duration-300 peer-checked:bg-green-600 peer-checked:pl-2 peer-focus:outline-none" />
      <svg className="peer-checked:opacity-0 transition-all duration-500 opacity-100 absolute left-6 stroke-gray-900 w-5 h-5" height={100} preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width={100} x={0} xmlns="http://www.w3.org/2000/svg" y={0}>
        <path className="svg-fill-primary" d="M50,18A19.9,19.9,0,0,0,30,38v8a8,8,0,0,0-8,8V74a8,8,0,0,0,8,8H70a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H38V38a12,12,0,0,1,23.6-3,4,4,0,1,0,7.8-2A20.1,20.1,0,0,0,50,18Z" />
      </svg>
      <svg className="absolute transition-all duration-500 peer-checked:opacity-100 opacity-0 left-1 stroke-gray-900 w-5 h-5" height={100} preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width={100} x={0} xmlns="http://www.w3.org/2000/svg" y={0}>
        <path d="M30,46V38a20,20,0,0,1,40,0v8a8,8,0,0,1,8,8V74a8,8,0,0,1-8,8H30a8,8,0,0,1-8-8V54A8,8,0,0,1,30,46Zm32-8v8H38V38a12,12,0,0,1,24,0Z" fillRule="evenodd" />
      </svg>
      <div className="absolute left-1 top-1 flex h-3.5 w-4 items-center justify-center rounded-sm bg-white shadow-lg transition-all duration-300 peer-checked:left-7" />
    </label>

                    </td>

                    {/* Created Date Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <FaCalendar className="h-4 w-4 text-gray-400 mr-2" />
                        {formatDate(user.createdAt)}
                      </div>
                    </td>

                    {/* Actions Column - Only Delete */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button  onClick={()=>handelDelete(user._id)}   className="text-red-600 hover:text-red-900 cursor-pointer transition-colors duration-150 p-1 rounded hover:bg-red-50">
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {users.length === 0 && (
            <div className="text-center py-12">
              <FaUser className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No users</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding some users.</p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {users.length} user{users.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}

export default UsersPage