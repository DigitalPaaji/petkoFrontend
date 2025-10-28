"use client"
import { baseurl } from '@/app/admin/components/apis';
import axios from 'axios';
import React, { useEffect } from 'react'

const page =({params}) => {
const slug = params.slug;


const fetchProduct= async()=>{
    try {
        const response = await axios.get(`${baseurl}/product/${slug}`);
        const data = await response.data;
        console.log(data)

    } catch (error) {
        
    }
}


useEffect(()=>{
    fetchProduct()
},[])



  return (
    <div>
      {slug}
    </div>
  )
}

export default page
