"use client"
import { baseurl, imgurl } from '@/app/admin/components/apis'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
axios.defaults.withCredentials= true;


const Showproduct = ({buyType}) => {
    const [product,setProduct] =useState()
 
   const [couponval,setCouponval]=useState("")
    const [couponDiscountPrice,setCouponDiscountPrice]=useState(0)
   const [couponDetail,setCouponDetail]=useState()
   const [couponError,setCouponError]=useState()

const fetchProduct= async()=>{
    const response = await axios.get(`${baseurl}/checkout/getbuyproduct/${buyType?.product}`)
    const data = await response.data;
    if(data.success){
      setProduct(data.product)  
    }
}




const fetchcouponcode=async(price)=>{
try {
if(couponval.length <2)    return;

const response = await axios.post(`${baseurl}/checkout/verifycouponcode`,{price,code:couponval})
const data = await response.data;
if(data.success){
        setCouponError("")

    setCouponDiscountPrice(data.discountAmount)
    setCouponDetail(data.coupon)
}


else{
    setCouponDiscountPrice(0)
    setCouponDetail(null)
    setCouponError(data.message)

}


} catch (error) {
    setCouponDiscountPrice(0)
        setCouponDetail(null)

    setCouponError(error.message)
}

}











useEffect(()=>{
 fetchProduct()   
},[])









  return (
    <div>

{product &&
 <> 

<div
      
      className="bg-white mx-5 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300  p-3 flex flex-col gap-4"
    >
      {/* Product Row */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start md:gap-6 ">
        <div className="flex   justify-between w-full  gap-5 items-center ">
        {/* Product Image */}
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
          <Link href={`/shop/${product?.slug}`}>
            <img
              src={`${imgurl}/uploads/${product?.images?.[0]}` || "/Images/img.webp"}
              alt={product?.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Product Info */}
        <div className="  md:w-full ">
          <Link href={`/shop/${product?.slug}`}>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 hover:text-[#2ea2cc] capitalize">
              {product?.name}
            </h3>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mt-1 text-gray-600">
            <span className="text-sm font-medium">Price:</span>
            <span className="text-[#2ea2cc] font-semibold text-lg">
              ${product.price.toFixed(2)}
            </span>
            {product?.comparePrice && (
              <s className="text-gray-400 text-sm">${product?.comparePrice}</s>
            )}
          </div>

        
        </div>

        </div>

        <div className=" flex     md:flex-col justify-between w-full gap-3  md:w-fit  h-full   ">
        <div className="flex  justify-between w-full  md:flex-col items-center sm:items-end gap-1 mt-4 sm:mt-0">
          <p className="text-xl font-bold text-[#2ea2cc]">
            ${(product.price * buyType.quantity).toFixed(2)}
          </p>
          {product?.comparePrice && (
            <s className="text-sm text-gray-500">
              ${(buyType.quantity * product?.comparePrice).toFixed(2)}
            </s>
          )}


<div className='flex items-center gap-1'>
    Quantity:

 <p className="">
             { buyType.quantity}
          </p>
          </div>
          
        </div>
     

      </div>
        
      </div>

   
     
    </div>

  <div className='my-3  mx-5 rounded-2xl overflow-hidden shadow'>
 <div className='text-xl font-bold text-white bg-[#e88573] text-center py-3'>
    Checkout
 </div>

<div className='my-3 px-5'>
<div className='flex justify-between border-b py-2 border-gray-600/40 border-dashed'>
<b>Price:</b>
<p>${product.comparePrice}</p>


</div>


<div className='flex justify-between border-b py-2 border-gray-600/40 border-dashed'>
<b>Quantity:</b>
<p> ×{buyType.quantity}</p>


</div>

<div className='flex justify-between border-b py-2 border-gray-600/40 border-dashed'>
<b>Total Price:</b>
<p>${ product.comparePrice * buyType.quantity}</p>


</div>

<div className='flex justify-between border-b py-2 border-gray-600/40 border-dashed'>
<b>Discount:</b>
<p>${ (  product.comparePrice-product.price) * buyType.quantity}</p>


</div>


<div className='flex justify-between border-b py-2 border-gray-600/40 border-dashed'>
<b>Subtotal:</b>
<p>${ product.price* buyType.quantity}</p>


</div>








</div>

<div className='flex  gap-2 items-center my-3 px-5' >

    <input type="text" value={couponval} onChange={(e)=>setCouponval(e.target.value)} placeholder='Coupon code'  className='border-b border-gray-600/50 focus:border-0  px-1 py-1 uppercase w-full'/>
    <button  onClick={()=>fetchcouponcode((product.price* buyType.quantity))} className='text-[#db2808] bg-[#e8857367] font-bold px-3 pb-1 rounded-md cursor-pointer'>Apply</button>
 
 
    


</div>


<div>

 <div>
{couponDetail && <p className='text-green-600 text-center'>
    Coupon code applied -${couponDiscountPrice} OFF
     </p>}

   {

    couponError && <p className='text-red-600 text-center'>
        {couponError}
     </p>

   }  

  </div>

</div>


<div className='flex justify-center my-3 px-5'>

<button className='px-5 py-1 font-bold text-white bg-[#e88573] rounded-xl cursor-pointer'>Pay  ${ (product.price* buyType.quantity) - couponDiscountPrice  }</button>
</div>

  </div>


</>


}

      
    </div>
  )
}

export default Showproduct
