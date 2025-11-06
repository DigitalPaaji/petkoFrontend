"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { baseurl, imgurl } from '../components/apis'
import { MdDelete, MdAdd, MdEdit, MdVisibility } from "react-icons/md"
import { FiUpload, FiCheck, FiX } from 'react-icons/fi'

import { FiImage } from "react-icons/fi"
import { toast } from 'react-toastify'

const Page = () => {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [otherImage,setOtherImage]= useState(false)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [count, setCount] = useState('')
  const [message, setMessage] = useState(null)
const [otherbannerImages,setOtherBannerImage]= useState()



 
  const fetchBanner = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${baseurl}/banner/allbanner`)
      const data = await response.data
      if (data.success) {
        setBanners(data.banners)
      } else {
        setBanners([])
      }
    } catch (error) {
      setBanners([])
    } finally {
      setLoading(false)
    }
  }




  const onDelete = async (bannerId) => {
    try {
   
      
      const response = await axios.delete(`${baseurl}/banner/delete/${bannerId}`);
      const data = await response.data;
      if(data.success){
        toast.success(data.message)

      await fetchBanner() 

      }else{
                toast.error(data.message)

      }
    

    } catch (error) {
      console.error('Error deleting banner:', error)
    } finally {
    }
  }



const handleToggle= async (bannerid)=>{
   try {
   
      
      const response = await axios.put(`${baseurl}/banner/togglebanner/${bannerid}`);
      const data = await response.data;
      if(data.success){
        toast.success(data.message)

      await fetchBanner() 

      }else{
                toast.error(data.message)

      }
    

    } catch (error) {
      console.error('Error deleting banner:', error)
    } finally {
    }
}





  function handleFileChange(e) {
    const f = e.target.files?.[0]
    if (!f) {
      setFile(null)
      setPreview(null)
      return
    }

    // Optional: limit file size (2MB) and types
    const allowed = ['image/png', 'image/jpeg', 'image/webp']
    if (!allowed.includes(f.type)) {
      setMessage({ type: 'error', text: 'Only PNG/JPEG/WEBP allowed' })
      e.target.value = ''
      setFile(null)
      setPreview(null)
      return
    }
    if (f.size > 2 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'File must be < 2MB' })
      e.target.value = ''
      setFile(null)
      setPreview(null)
      return
    }

    setFile(f)
    setPreview(URL.createObjectURL(f))
    setMessage(null)
  }

  async function handleBannerSubmit(e) {
    e.preventDefault()
    setMessage(null)

    if (!file) {
      setMessage({ type: 'error', text: 'Please choose an image' })
      return
    }

    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      if (count) fd.append('count', count)

      const res = await axios.post(`${baseurl}/banner/otherbanner`,fd)
const data = await res.data
      if (!data.success) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || 'Upload failed')
      }

      setMessage({ type: 'success', text: data.message || 'Banner uploaded' })
      // reset
      setFile(null)
      setPreview(null)
      setCount('')
      getOtherBanner()
      document.getElementById('other-banner-file').value = ''
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }


const getOtherBanner=async()=>{
  try {
     const response = await axios.get(`${baseurl}/banner/otherbanners`);
     const data = await response.data;
     if (data.success){
setOtherBannerImage(data.data)
     }
else{
  setOtherBannerImage("")
}

  } catch (error) {
      setOtherBannerImage("")

  }
}




  useEffect(() => {
    fetchBanner()
    getOtherBanner()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Banner Management</h1>
            <p className="text-gray-600 mt-2">Manage your website banners and promotions</p>
          </div>

          <div className='flex gap-3'>
             <button 
onClick={()=>setOtherImage(!otherImage)}            className={`flex items-center gap-2   ${otherImage ?" bg-green-600 hover:bg-green-700" :" bg-red-600 hover:bg-red-700"} text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 mt-4 sm:mt-0`}
          >
            <MdAdd className="text-xl" />
            {  otherImage ? "Banners" :"Other Images" }
          </button>
          
          
          <Link 
            href="/admin/banner/create"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 mt-4 sm:mt-0"
          >
            <MdAdd className="text-xl" />
            Create Banner
          </Link>
          </div>
        </div>

{!otherImage &&
        
  <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
          <tr>
            <th className="px-4 py-3">Sr.</th>
            <th className="px-4 py-3">Desktop Image</th>
            <th className="px-4 py-3">Mobile Image</th>
            <th className="px-4 py-3 text-center">Show</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {banners?.length > 0 ? (
            banners.map((item, index) => (
              <tr
                key={item._id || index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-800">
                  {index + 1}
                </td>

                <td className="px-4 py-3">
                  <img
                    src={`${imgurl}/uploads/${item.imagedesktop}`}
                    alt={item.imagedesktop}
                    className="h-16 w-28 object-cover rounded-md border"
                  />
                </td>

                <td className="px-4 py-3">
                  <img
                    src={`${imgurl}/uploads/${item.imagemobile}`}
                    alt={item.imagemobile}
                    className="h-16 w-28 object-cover rounded-md border"
                  />
                </td>

                <td className="px-4 py-3 text-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.show}
                      onChange={() => handleToggle(item._id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 relative transition">
                      <span className={`absolute top-0.5  ${item.show? "right-[2px]":"left-[2px]"}   peer-checked:translate-x-5 inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform`}></span>
                    </div>
                  </label>
                </td>

                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onDelete(item._id)}
                    className="text-red-500 hover:text-red-700 font-semibold transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center py-6 text-gray-500 italic"
              >
                No banners found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
}



{otherImage && <div className='min-h-screen'>


  <form
      onSubmit={handleBannerSubmit}
      className="max-w-md mx-auto bg-white border rounded-2xl p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold mb-4">Add Other Banner</h2>

      {/* File input */}
      <label className="block">
        <span className="sr-only">Choose image</span>
        <div className="flex items-center gap-3 p-3 border-2 border-dashed rounded-lg cursor-pointer hover:border-gray-300 transition">
          <div className="flex-shrink-0">
            <FiUpload className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Upload image</p>
            <p className="text-xs text-gray-500">PNG, JPG or WEBP — max 2MB</p>
          </div>
          <input
            id="other-banner-file"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            className="sr-only"
          />
        </div>
      </label>

      {/* Preview */}
      {preview ? (
        <div className="mt-4 flex items-center gap-3">
          <img
            src={preview}
            alt="preview"
            className="w-28 h-20 object-cover rounded-md border"
          />
          <div>
            <p className="text-sm">Selected file: {file?.name}</p>
            <p className="text-xs text-gray-500">{(file?.size / 1024).toFixed(0)} KB</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setFile(null)
              setPreview(null)
              document.getElementById('other-banner-file').value = ''
            }}
            className="ml-auto inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-50 text-red-700 text-sm hover:bg-red-100"
            title="Remove"
          >
            <FiX className="w-4 h-4" /> Remove
          </button>
        </div>
      ) : (
        <p className="mt-3 text-xs text-gray-500">No image chosen yet.</p>
      )}

      {/* Count select */}
      <div className="mt-5">
        <label htmlFor="count" className="block text-sm font-medium mb-1">
          Count
        </label>
        <select
          id="count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300"
        >
          <option value="">-- select count --</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      {/* Status / message */}
      {message && (
        <div
          className={`mt-4 px-3 py-2 rounded-md text-sm ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Submit */}
      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? 'Uploading...' : 'Upload'}
          {loading ? <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /></svg> : <FiCheck className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={() => {
            setFile(null)
            setPreview(null)
            setCount('')
            document.getElementById('other-banner-file').value = ''
            setMessage(null)
          }}
          className="px-3 py-2 rounded-lg border text-sm hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </form>



<div className='my-5 grid grid-cols-1  md:grid-cols-2  lg:grid-cols-4 gap-3'>
  {otherbannerImages?.map((item,index)=>{
    return(
      <div key={index} className='relative shadow p-1  group'>
    <img src={`${imgurl}/uploads/${item.image}`} alt=""  className='h-[17rem]'/>
     <p className='absolute top-2 text-white left-2 bg-green-600 p-2 px-4 rounded-full z-40'>{item?.count}</p>

<div className='  hidden  absolute h-full w-full bg-black/30 top-0 left-0 group-hover:flex justify-center items-center z-50 duration-150'>
<MdDelete  className='text-red-500 font-bold text-4xl shadow cursor-pointer'/>
</div>
      </div>
    )
  })}
</div>






</div>



}






      </div>


<div>


</div>


    </div>
  )
}

export default Page