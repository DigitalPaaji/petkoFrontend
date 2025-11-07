"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { baseurl, imgurl } from '../components/apis'
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaInstagram, 
  FaFacebook, 
  FaWhatsapp, 
  FaTwitter,
  FaPalette,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaImage,
  FaCheck,
  FaTimes,
  FaExternalLinkAlt
} from 'react-icons/fa'
import { toast } from 'react-toastify'

const Page = () => {
  const [layouts, setLayouts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchLayouts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseurl}/layout`)
      const data = await response.data
      if (data.success) {
        setLayouts(data.data)
      }
    } catch (error) {
        toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLayouts()
  }, [])

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this layout?')) {
      try {
        const response = await axios.delete(`${baseurl}/layout/delete/${id}`)
        const data = response.data
        if (data.success) {
          fetchLayouts() // Refresh the list
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  const toggleActive = async (id,bool) => {
if(bool==true){
    return
}

    try {
      const response = await axios.put(`${baseurl}/layout/active/${id}`)
      const data = response.data
      if (data.success) {
        fetchLayouts() // Refresh the list
      }
    } catch (error) {
        toast.error(error.message)
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

  const getSocialLinks = (linksArray) => {
    const socialLinks = {}
    
      linksArray?.forEach(link => {
        if (link?.name && link?.url) {
          socialLinks[link.name.toLowerCase()] = link.url
        }
      })
  
    return socialLinks
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading layouts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Layout Management</h1>
            <p className="text-gray-600 mt-2">Manage your contact form layouts ({layouts.length} total)</p>
          </div>
          <Link 
            href="/admin/settings/create"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors mt-4 sm:mt-0"
          >
            <FaPlus className="text-sm" />
            Add New Layout
          </Link>
        </div>

        {/* Table */}
        {layouts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Layouts Found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first layout</p>
            <Link 
              href="/admin/settings/create"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <FaPlus className="text-sm" />
              Create First Layout
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Layout
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Social Links
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {layouts.map((layout, index) => {
                    const socialLinks = getSocialLinks(layout.links)
                    return (
                    <tr key={layout._id} className="hover:bg-gray-50 transition-colors">
                      {/* Layout Info */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {layout.logo ? (
                              <img 
                                className="h-10 w-10 rounded-lg object-cover border"
                                src={`${imgurl}/${layout.logo}`}
                                alt="Layout logo"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-lg border border-gray-200 flex items-center justify-center bg-gray-100">
                                <FaImage className="text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Layout #{index + 1}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div 
                                className="w-3 h-3 rounded border border-gray-300"
                                style={{ backgroundColor: layout.layoutcolor }}
                              ></div>
                              <span className="text-xs text-gray-500">{layout.layoutcolor}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact Information */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 space-y-1">
                          <div className="flex items-center gap-2">
                            <FaEnvelope className="text-gray-400 text-xs" />
                            <span className="truncate max-w-[150px]" title={layout.email1}>
                              {layout.email1}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaPhone className="text-gray-400 text-xs" />
                            <span>{layout.number1}</span>
                          </div>
                          {layout.address && (
                            <div className="flex items-center gap-2">
                              <FaMapMarkerAlt className="text-gray-400 text-xs" />
                              <span className="truncate max-w-[150px]" title={layout.address}>
                                {layout.address}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Social Links */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {socialLinks.instagram && (
                            <a 
                              href={socialLinks.instagram} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-pink-600 hover:text-pink-700 transition-colors"
                              title="Instagram"
                            >
                              <FaInstagram />
                            </a>
                          )}
                          {socialLinks.facebook && (
                            <a 
                              href={socialLinks.facebook} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 transition-colors"
                              title="Facebook"
                            >
                              <FaFacebook />
                            </a>
                          )}
                          {socialLinks.whatsapp && (
                            <a 
                              href={socialLinks.whatsapp} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-green-500 hover:text-green-600 transition-colors"
                              title="WhatsApp"
                            >
                              <FaWhatsapp />
                            </a>
                          )}
                          {socialLinks.twitter && (
                            <a 
                              href={socialLinks.twitter} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-black hover:text-gray-700 transition-colors"
                              title="Twitter"
                            >
                              <FaTwitter />
                            </a>
                          )}
                          {Object.keys(socialLinks).length === 0 && (
                            <span className="text-xs text-gray-400">No links</span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleActive(layout._id,layout.active)}
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            layout.active 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {layout.active ? <FaCheck /> : <FaTimes />}
                          {layout.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>

                      {/* Created Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(layout.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/settings/edit/${layout._id}`}
                            className="text-blue-600 hover:text-blue-900 transition-colors p-2 rounded hover:bg-blue-50"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(layout._id)}
                            className="text-red-600 hover:text-red-900 transition-colors p-2 rounded hover:bg-red-50"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                          <Link
                            href={`/layout/${layout._id}`}
                            target="_blank"
                            className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded hover:bg-gray-50"
                            title="View"
                          >
                            <FaExternalLinkAlt />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page