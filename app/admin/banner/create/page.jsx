"use client"
import axios from 'axios'
import React, { useState } from 'react'
import { FaCloudUploadAlt, FaChevronDown, FaFile, FaTimes } from 'react-icons/fa'
import { baseurl } from '../../components/apis'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

axios.defaults.withCredentials= true;

const Page = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedCount, setSelectedCount] = useState('')
  const router = useRouter()

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
  }



const handelSubmit= async()=>{
    try {

const submitform= new FormData()

submitform.append("image",selectedFile)
if(selectedCount){
 submitform.append("count",selectedCount)
   
}



        const response = await axios.post(`${baseurl}/banner/create`,submitform)
        const data = await response.data;
        if(data.success){
            toast.success(data.message)
            router.push('/admin/banner')
        }else{
            toast.error(data.message)
        }


    } catch (error) {
                    toast.error(error.message)

        
    }
}






  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          File Upload
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Select your file and choose the count
        </p>

        {/* File Upload Section */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Upload File
          </label>
          
          {/* Custom File Input */}
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-colors duration-200 bg-gray-50 hover:bg-blue-50"
            >
              {selectedFile ? (
                <div className="flex items-center space-x-3 p-4">
                  <FaFile className="text-blue-500 text-xl" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile()
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <>
                  <FaCloudUploadAlt className="text-gray-400 text-3xl mb-2" />
                  <span className="text-gray-600 font-medium">Click to upload</span>
                  <span className="text-gray-500 text-sm mt-1">or drag and drop</span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Count Selector Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Count
          </label>
          
          {/* Custom Select Dropdown */}
          <div className="relative">
            <select
              value={selectedCount}
              onChange={(e) => setSelectedCount(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
            >
              <option value="">---Select Count---</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaChevronDown className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button

        onClick={()=>handelSubmit()}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedFile}
        >
          Process File
        </button>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Supported formats: PDF, JPG, PNG, DOC
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page