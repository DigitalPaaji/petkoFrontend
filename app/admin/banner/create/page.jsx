"use client"
import axios from 'axios'
import React, { useState, useRef } from 'react'
import { FaCloudUploadAlt, FaFile, FaTimes } from 'react-icons/fa'
import { baseurl } from '../../components/apis'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

axios.defaults.withCredentials = true;

const Page = () => {
  const [desktopImage, setDesktopImage] = useState(null)
  const [mobileImage, setMobileImage] = useState(null)
  const [dragDesktop, setDragDesktop] = useState(false)
  const [dragMobile, setDragMobile] = useState(false)

  const router = useRouter()
  const desktopInputRef = useRef(null)
  const mobileInputRef = useRef(null)

  // 🖥 Desktop Upload Handlers
  const handleDesktopChange = (e) => {
    const file = e.target.files[0]
    if (file) setDesktopImage(file)
  }
  const handleDesktopDrop = (e) => {
    e.preventDefault()
    setDragDesktop(false)
    const file = e.dataTransfer.files[0]
    if (file) setDesktopImage(file)
  }

  // 📱 Mobile Upload Handlers
  const handleMobileChange = (e) => {
    const file = e.target.files[0]
    if (file) setMobileImage(file)
  }
  const handleMobileDrop = (e) => {
    e.preventDefault()
    setDragMobile(false)
    const file = e.dataTransfer.files[0]
    if (file) setMobileImage(file)
  }

  // 🟦 Submit Both Files
  const handelSubmit = async () => {
    try {
if(!desktopImage || !mobileImage){
toast.error("Both size image are required")
return 
}

      const form = new FormData()
      if (desktopImage) form.append("desktop", desktopImage)
      if (mobileImage) form.append("mobile", mobileImage)

      const response = await axios.post(`${baseurl}/banner/create`, form)
      const data = await response.data

      if (data.success) {
        toast.success(data.message)
        router.push('/admin/banner')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Banner Upload
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Upload desktop and mobile banner images
        </p>

        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* 🖥 Desktop Upload */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Desktop Image
            </label>

            <div
              className={`relative w-full h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 
                ${dragDesktop ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'}
              `}
              onClick={() => desktopInputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragDesktop(true) }}
              onDragLeave={() => setDragDesktop(false)}
              onDrop={handleDesktopDrop}
            >
              <input
                type="file"
                onChange={handleDesktopChange}
                ref={desktopInputRef}
                className="hidden"
              />

              {desktopImage ? (
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={URL.createObjectURL(desktopImage)}
                    alt="Desktop Preview"
                    className="h-24 object-contain rounded-md"
                  />
                  <div className="flex items-center gap-2">
                    <FaFile className="text-blue-500 text-lg" />
                    <p className="text-sm text-gray-700 truncate max-w-[200px]">
                      {desktopImage.name} ({(desktopImage.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setDesktopImage(null)
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <FaCloudUploadAlt className="text-gray-400 text-3xl mb-2" />
                  <span className="text-gray-600 font-medium">
                    {dragDesktop ? 'Drop your image here' : 'Click to upload'}
                  </span>
                  <span className="text-gray-500 text-sm mt-1">or drag and drop</span>
                </>
              )}
            </div>
          </div>

          {/* 📱 Mobile Upload */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Mobile Image
            </label>

            <div
              className={`relative w-full h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 
                ${dragMobile ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'}
              `}
              onClick={() => mobileInputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragMobile(true) }}
              onDragLeave={() => setDragMobile(false)}
              onDrop={handleMobileDrop}
            >
              <input
                type="file"
                onChange={handleMobileChange}
                ref={mobileInputRef}
                className="hidden"
              />

              {mobileImage ? (
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={URL.createObjectURL(mobileImage)}
                    alt="Mobile Preview"
                    className="h-24 object-contain rounded-md"
                  />
                  <div className="flex items-center gap-2">
                    <FaFile className="text-blue-500 text-lg" />
                    <p className="text-sm text-gray-700 truncate max-w-[200px]">
                      {mobileImage.name} ({(mobileImage.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setMobileImage(null)
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <FaCloudUploadAlt className="text-gray-400 text-3xl mb-2" />
                  <span className="text-gray-600 font-medium">
                    {dragMobile ? 'Drop your image here' : 'Click to upload'}
                  </span>
                  <span className="text-gray-500 text-sm mt-1">or drag and drop</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 🟦 Submit */}
        <button
          onClick={handelSubmit}
          className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!desktopImage && !mobileImage}
        >
          Upload Banner
        </button>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Supported formats: JPG, PNG, WEBP
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
