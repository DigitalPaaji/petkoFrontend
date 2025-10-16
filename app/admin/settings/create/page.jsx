"use client"
import axios from 'axios'
import React, { useState } from 'react'
import { FaInstagram, FaFacebook, FaWhatsapp, FaTwitter, FaUpload } from 'react-icons/fa'
import { baseurl } from '../../components/apis'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()
  const [formData, setFormData] = useState({
    email1: '',
    email2: '',
    number1: '',
    number2: '',
    address: '',
    links: {
      insta: '',
      fb: '',
      whatsapp: '',
      x: ''
    },
    layoutcolor: '#3B82F6',
    logo: null
  })

  const [logoPreview, setLogoPreview] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLinkChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      links: {
        ...prev.links,
        [name]: value
      }
    }))
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        logo: file
      }))
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setLogoPreview(previewUrl)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form Data:', formData)

    try {
      // Create FormData object for file upload
      const submitData = new FormData()
      
      // Append all form fields
      submitData.append('email1', formData.email1)
      submitData.append('email2', formData.email2)
      submitData.append('number1', formData.number1)
      submitData.append('number2', formData.number2)
      submitData.append('address', formData.address)
      submitData.append('layoutcolor', formData.layoutcolor)
      
     submitData.append("links", JSON.stringify([
      { name: "Instagram", url: formData.links.insta },
      { name: "Facebook", url: formData.links.fb },
      { name: "WhatsApp", url: formData.links.whatsapp },
      { name: "X", url: formData.links.x }
    ]));
      
      if (formData.logo) {
        submitData.append('logo', formData.logo)
      }

    

      const response = await axios.post(`${baseurl}/layout/create`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      const data = response.data
      
      if (data.success) {
        toast.success(data.message)
        // Reset form after successful submission
        setFormData({
          email1: '',
          email2: '',
          number1: '',
          number2: '',
          address: '',
          links: {
            insta: '',
            fb: '',
            whatsapp: '',
            x: ''
          },
          layoutcolor: '#3B82F6',
          logo: null
        })
        setLogoPreview('')
        router.back()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Submission error:', error)
      toast.error('Failed to submit form. Please try again.')
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 text-black'>
      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Contact Form</h1>
        
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Email Fields */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Primary Email
              </label>
              <input
                type='email'
                name='email1'
                value={formData.email1}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter primary email'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Secondary Email
              </label>
              <input
                type='email'
                name='email2'
                value={formData.email2}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter secondary email'
              />
            </div>
          </div>

          {/* Phone Number Fields */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Primary Phone
              </label>
              <input
                type='tel'
                name='number1'
                value={formData.number1}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter primary phone'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Secondary Phone
              </label>
              <input
                type='tel'
                name='number2'
                value={formData.number2}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter secondary phone'
              />
            </div>
          </div>

          {/* Address Field */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Address
            </label>
            <textarea
              name='address'
              value={formData.address}
              onChange={handleInputChange}
              rows='3'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your address'
              required
            />
          </div>

          {/* Social Media Links */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-3'>
              Social Media Links
            </label>
            <div className='space-y-3'>
              <div className='flex items-center space-x-3'>
                <FaInstagram className='text-pink-600 text-xl' />
                <input
                  type='url'
                  name='insta'
                  value={formData.links.insta}
                  onChange={handleLinkChange}
                  className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Instagram URL'
                />
              </div>
              <div className='flex items-center space-x-3'>
                <FaFacebook className='text-blue-600 text-xl' />
                <input
                  type='url'
                  name='fb'
                  value={formData.links.fb}
                  onChange={handleLinkChange}
                  className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Facebook URL'
                />
              </div>
              <div className='flex items-center space-x-3'>
                <FaWhatsapp className='text-green-500 text-xl' />
                <input
                  type='url'
                  name='whatsapp'
                  value={formData.links.whatsapp}
                  onChange={handleLinkChange}
                  className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='WhatsApp URL'
                />
              </div>
              <div className='flex items-center space-x-3'>
                <FaTwitter className='text-black text-xl' />
                <input
                  type='url'
                  name='x'
                  value={formData.links.x}
                  onChange={handleLinkChange}
                  className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='X (Twitter) URL'
                />
              </div>
            </div>
          </div>

          {/* Layout Color */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Layout Color
            </label>
            <div className='flex items-center space-x-3'>
              <input
                type='color'
                name='layoutcolor'
                value={formData.layoutcolor}
                onChange={handleInputChange}
                className='w-12 h-12 border border-gray-300 rounded-md cursor-pointer'
              />
              <span className='text-gray-600'>{formData.layoutcolor}</span>
            </div>
          </div>

          {/* Logo Upload */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Logo Upload
            </label>
            <div className='flex items-center space-x-4'>
              <label className='flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors'>
                {logoPreview ? (
                  <img 
                    src={logoPreview} 
                    alt="Logo preview" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <FaUpload className='text-gray-400 text-2xl mb-2' />
                    <span className='text-sm text-gray-500'>Upload Logo</span>
                  </>
                )}
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleLogoChange}
                  className='hidden'
                />
              </label>
              {formData.logo && (
                <div className='text-sm text-gray-600'>
                  <p>Selected: {formData.logo.name}</p>
                  <p>Size: {(formData.logo.size / 1024).toFixed(2)} KB</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex justify-center pt-4'>
            <button
              type='submit'
              className='px-6 py-3 text-white font-medium rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
              style={{ backgroundColor: formData.layoutcolor }}
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page