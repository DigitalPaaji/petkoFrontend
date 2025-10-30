"use client";
import Image from "next/image";
import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import InnerBanner from '../../components/InnerBanner'
import Link from "next/link";
import axios from "axios";
import { baseurl } from "@/app/admin/components/apis";
import { useRouter } from "next/navigation";
axios.defaults.withCredentials =true



export default function CartSidebar() {
  const [wishList,setWishlist]= useState([])
  const route = useRouter()



const fetchWishList= async()=>{
  try {
    const response= await axios.get(`${baseurl}/wishlist/allwishlistitem`);
    const data = await response.data;
    if(data.success){
      setWishlist(data.data?.productId)
    }else{
      setWishlist([])
    }

  } catch (error) {
    route.push("/user/login")
  }
}

console.log(wishList)

useEffect(()=>{fetchWishList()},[])
  return (
    <>
   <InnerBanner title={"Wishlist"} />
     
        
        {wishList?.length === 0 ? (
          <div className="relative flex items-center justify-center h-full w-full text-center text-gray-500 px-6">
            <div className="flex flex-col my-24 items-center justify-center">
              <Image
              width={440}
               height={440}
                src="/Images/frontend/cart.gif"
                alt="Empty Wishlist"
                className="w-40 h-40 mb-4 "
              />
              <p className="text-md">Your Wishlist Is Empty</p>
               <Link href={'/'}
                className="text-center text-md text-[#2ea2cc] underline mt-3 w-full font-semibold"
              >
                Explore Products
              </Link>
            </div>
          </div>
         ) : (
        <div>
          
        </div>
        )}  

     
    </>
  );
}