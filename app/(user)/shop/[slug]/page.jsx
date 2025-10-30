"use client"
import { baseurl } from '@/app/admin/components/apis';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCompo from './ProductCompo';

const page =({params}) => {
const slug = params?.slug;
const [productData,setProductData]=useState()
const [loading,setLoading]= useState(true)

const fetchProduct= async()=>{
  setLoading(true)

    try {
        const response = await axios.get(`${baseurl}/product/${slug}`);
        const data = await response.data;
        if(data.success){
          setProductData(data.data?.product)
        }

    } catch (error) {
        
    }finally{
      setLoading(false)
    }
}





useEffect(()=>{
    fetchProduct()
},[])



  return (
    <div>
{loading && <div>

  Loading...
  </div>}


     {!loading &&  <ProductCompo productData={productData} />}
    </div>
  )
}

export default page
