"use client"
import { baseurl } from '@/app/admin/components/apis'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const router = useRouter()
    const [loader,setLoader]=useState(true)

const fetchuser=async()=>{
    try {

        const response = await axios.get(`${baseurl}/user/getuser`,{
            withCredentials:true
        })

        const data = await response.data;
        if(!data.success){
router.push("/user/login")
        }
        else{
            setLoader(false)
        }
        
    } catch (error) {
        router.push("/user/login")

    }
}

useEffect(()=>{
    fetchuser()
},[])

if(loader){
    return(
        <div className='h-screen flex justify-center items-center text-3xl'>
            loading...

        </div>
    )
}






  return (
    <div>
      user dashboard

    </div>
  )
}

export default page
