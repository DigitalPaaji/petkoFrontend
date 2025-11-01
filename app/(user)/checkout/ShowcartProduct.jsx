"use client"
import { baseurl, imgurl } from '@/app/admin/components/apis';
import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
axios.defaults.withCredentials = true;


const ShowcartProduct = ({setcouponCode}) => {
    const [allproductData,setAllproductData]=useState()
    const [totalPrice,setTotalPrice]=useState(0)
    const [discountPrice,setDiscountPrice]=useState(0)
 const [couponval,setCouponval]=useState("")
    const [couponDiscountPrice,setCouponDiscountPrice]=useState(0)
   const [couponDetail,setCouponDetail]=useState()
   const [couponError,setCouponError]=useState()
   const [oldprice,setAllprice]=useState()
       const [charges, setCharges] = useState();
      const [ deleveryCharge,setDeleveryCharge]=useState()
   const [taxCharge,setTacCharge]=useState()
   const [maxchagevall,setMAxchagevall]=useState()




const fetchproduct= async()=>{
    try {
         const response = await axios.get(`${baseurl}/checkout/getcartproduct`);
         const data = await response.data;
         console.log(data)
         if(data.success){
            setAllproductData(data.data);
            setTotalPrice(data.totalAmount);
            setAllprice(data.totaloldprice)
         }


    } catch (error) {
        
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
    setcouponCode(couponval)
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





 const fetchChargies = async () => {
    try {
      const response = await axios.get(`${baseurl}/charges`);
      const data = await response.data;
      if (data.success) {
        console.log(data.charges);
data.charges.forEach((item,index)=>{
if(item.chargetype =="shipping"){
  setDeleveryCharge(item?.chargeamount)
   item?.maxvalue && setMAxchagevall(item.maxvalue)

}
else if(item.chargetype =="tax"){
setTacCharge(item?.chargeamount)
}


})

      } else {
        setCharges([]);
      }
    } catch (error) {
      setCharges([]);
    }
  };




useEffect(()=>{
    fetchproduct()
    fetchChargies()
},[])





  return (
    <div className='mx-5'>
   <div className='flex flex-col gap-3'>
{allproductData?.map((item,index)=>{
    return(
         <> 

<div
      key={index}
      className="bg-white mx-5 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300  p-3 flex flex-col gap-4"
    >
      {/* Product Row */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start md:gap-6 ">
        <div className="flex   justify-between w-full  gap-5 items-center ">
        {/* Product Image */}
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
          <Link href={`/shop/${item?.productId?.slug}`}>
            <img
              src={`${imgurl}/uploads/${item?.productId?.images?.[0]}` || "/Images/img.webp"}
              alt={item?.productId?.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Product Info */}
        <div className="  md:w-full ">
          <Link href={`/shop/${item?.productId?.slug}`}>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 hover:text-[#2ea2cc] capitalize">
              {item?.productId?.name}
            </h3>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mt-1 text-gray-600">
            <span className="text-sm font-medium">Price:</span>
            <span className="text-[#2ea2cc] font-semibold text-lg">
              ${item?.productId.price.toFixed(2)}
            </span>
            {item?.productId?.comparePrice && (
              <s className="text-gray-400 text-sm">${item?.productId?.comparePrice}</s>
            )}
          </div>

        
        </div>

        </div>

        <div className=" flex     md:flex-col justify-between w-full gap-3  md:w-fit  h-full   ">
        <div className="flex  justify-between w-full  md:flex-col items-center sm:items-end gap-1 mt-4 sm:mt-0">
          <p className="text-xl font-bold text-[#2ea2cc]">
            ${(item?.productId.price * item?.quantity).toFixed(2)}
          </p>
          {item?.productId?.comparePrice && (
            <s className="text-sm text-gray-500">
              ${(item?.quantity * item?.productId?.comparePrice).toFixed(2)}
            </s>
          )}


<div className='flex items-center gap-1'>
    Quantity:

 <p className="">
             { item?.quantity}
          </p>
          </div>
          
        </div>
     

      </div>
        
      </div>

   
     
    </div>

 


</>
    )
})}
   
   </div>



{allproductData &&  <div className='my-3  mx-5 rounded-2xl overflow-hidden shadow'>
 <div className='text-xl font-bold text-white bg-[#e88573] text-center py-3'>
    Checkout
 </div>

<div className='my-3 px-5'>
<div className='flex justify-between border-b py-2 border-gray-600/40 border-dashed'>
<b>Price:</b>
<p>${oldprice}</p>


</div>


<div className='flex justify-between border-b py-2 border-gray-600/40 border-dashed'>
<b>Quantity:</b>
<p> {allproductData.length}</p>


</div>

{/* <div className='flex justify-between border-b py-2 border-gray-600/40 border-dashed'>
<b>Total Price:</b>
<p>${ product.oldprice * buyType.quantity}</p>


</div> */}

<div className='flex justify-between border-b py-2 border-gray-600/40 border-dashed'>
<b>Discount:</b>
<p>${ oldprice-totalPrice}</p>


</div>


<div className='flex justify-between border-b py-2 border-gray-600/40 border-dashed'>
<b>Shipping:</b>
<p>${ maxchagevall? totalPrice < maxchagevall ? deleveryCharge : 0 : deleveryCharge }</p>
</div>
<div className='flex justify-between border-b py-2 border-gray-600/40 border-dashed'>
<b>Tax:</b>
<p>{taxCharge ? `${taxCharge}%  ($${(totalPrice *taxCharge)/100}) `:`$0` } </p>
</div>



<div className='flex justify-between border-b py-2 border-gray-600/40 border-dashed'>
<b>Subtotal:</b>
<p>${ totalPrice 
  + ( maxchagevall ? totalPrice < maxchagevall ? deleveryCharge : 0:deleveryCharge) +  (taxCharge?  (totalPrice *taxCharge)/100:0)}</p>


</div>








</div>

<div className='flex  gap-2 items-center my-3 px-5' >

    <input type="text" value={couponval} onChange={(e)=>setCouponval(e.target.value)} placeholder='Coupon code'  className='border-b border-gray-600/50 focus:border-0  px-1 py-1 uppercase w-full'/>
    <button  onClick={()=>fetchcouponcode(totalPrice)} className='text-[#db2808] bg-[#e8857367] font-bold px-3 pb-1 rounded-md cursor-pointer'>Apply</button>
 
 
    


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

<button className='px-5 py-1 font-bold text-white bg-[#e88573] rounded-xl cursor-pointer'>Pay  ${ totalPrice - couponDiscountPrice  + ( maxchagevall ? totalPrice < maxchagevall ? deleveryCharge : 0:deleveryCharge) +  (taxCharge?  (totalPrice *taxCharge)/100:0)  }</button>
</div>

  </div>
}


<div>


</div>


    </div>
  )
}

export default ShowcartProduct
