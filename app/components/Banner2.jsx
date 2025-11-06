"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { baseurl, imgurl } from "../admin/components/apis";
import Link from "next/link";

function Banner() {
 

  const [categories,setCategories] = useState([])
  const [img,setImg]=useState(
    {
      img1:"",
      img2:"",
      img3:"",
      img4:""
    }
  )





const fetchdata = async()=>{
  try {
    const response = await axios.get(`${baseurl}/productcat/getRandom`)
    const data = await response.data
    if(data.success){
    setCategories(data.data)

    }else{
      setCategories(null)
    }
  } catch (error) {
          setCategories(null)

  }
}


const fetchbanners= async()=>{
  try {
    const response = await axios.get(`${baseurl}/banner/otherbanners`);
    const data = await response.data;
    if(data.success){
      data.data.forEach((item)=>{
        setImg((prev)=>({...prev,[`img${item.count}`]:item.image}))
      })

    }


  } catch (error) {
    

  }}





useEffect(()=>{
  fetchdata()
  fetchbanners()
},[])





  return (
    <div className="flex flex-wrap xl:flex-nowrap xl:h-[600px] px-4 md:px-12 xl:px-24 2xl:px-40 py-16 gap-4 xl:gap-6">
      
      {/* LEFT: Category Section */}
      <div className="w-full xl:w-[20%] h-full p-4 xl:p-6 bg-white rounded-lg shadow-sm overflow-y-scroll">
        <h4 className="text-lg xl:text-xl font-semibold text-center">
          SHOP BY CATEGORY
        </h4>

<div className="mt-4 max-h-[500px] ">
  <ul className="divide-y divide-[#66666625]">
    {categories?.map((cat) => (
      <Link href={`/shop/?cat=${cat._id}`}
        key={cat._id}
        className="flex items-center gap-3 text-base xl:text-lg px-3 py-2 hover:bg-gray-50 rounded-md cursor-pointer transition"
      >
        <img
          width={44}
          height={44}
          alt={cat?.product_name}
          src={`${imgurl}/uploads/${cat.img}`}
          className="w-10 h-auto object-cover"
        />
        <span className="text-gray-800 text-left">{cat?.product_name}</span>
      </Link>
    ))}
  </ul>
</div>


      </div>

      {/* RIGHT: Banner Section */}
      <div className="w-full xl:w-[80%] lg:grid lg:grid-cols-12 h-full bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="lg:col-span-7">
          <img
            width={440}
            height={440}
            alt="Main Banner"
            src={` ${img.img1? `${imgurl}/uploads/${img.img1}` :"/Images/frontend/b1.webp"}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-5 flex flex-col h-full">
          <div className="flex items-center h-1/2">
            <img
              
              alt="Banner 2"
              src={` ${img.img2? `${imgurl}/uploads/${img.img2}` :"/Images/frontend/b2.webp"}`}
              className="w-1/2 h-full object-cover"
            />
            <img
             
              alt="Banner 3"
               src={` ${img.img3? `${imgurl}/uploads/${img.img3}` :"/Images/frontend/b4.webp"}`}
              className="w-1/2 h-full object-cover"
            />
          </div>
          <div className="h-1/2">
            <img
           
              alt="Banner 4"
              src={` ${img.img4? `${imgurl}/uploads/${img.img4}` :"/Images/frontend/b3.webp"}`}
               className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
