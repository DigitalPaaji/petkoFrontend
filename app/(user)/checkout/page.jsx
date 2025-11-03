"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Addressfield from './Addressfield'
import Showproduct from './Showproduct'
import ShowcartProduct from './ShowcartProduct'
import axios from 'axios'
import { baseurl } from '@/app/admin/components/apis'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
axios.defaults.withCredentials= true

const page = () => {
const router = useRouter()
const [buyType,setbuyType]=useState()
const [addressId,setAddressId]= useState()
const [couponCode,setcouponCode]= useState()
const [paymentMethod,setPaymentMethod]= useState("COD")
const [orderItems,setorderItems]=useState([])


    useEffect(()=>{
const item=  JSON.parse(localStorage.getItem("checkoutstatus"))

if( !item || !item.type){
router.push("/")
}
setbuyType(item)



    },[])





const processOrder= async(shippingPrice,taxPrice,payNow)=>{
if(!addressId){
  toast.error("Add Address")
  return
}

  try {
    const response = await axios.post(`${baseurl}/order/createorder`,{
      addressId,
      couponCode,
      paymentMethod,
      orderItems,
      shippingPrice,
      taxPrice
    })

  const data = await response.data;
 
  if(data.success){
    
    localStorage.clear("checkoutstatus")
    Swal.fire({
  title: data.message,
  icon: "success",
  draggable: true
});
router.push("/")
  }else{
        toast.error(data.message)

  }




  } catch (error) {
           toast.error(error.message)
 
  }
}





  return (
    <div className=''>


<div  className='grid grid-cols-12 lg:px-32 py-20    '>

<div className=' col-span-12 md:col-span-8'>
    <Addressfield  setAddressId={setAddressId}/>

 



</div>


<div className=' col-span-12 md:col-span-4'>
   {buyType?.type=="buy"
 ?
  <Showproduct   buyType={buyType}   setcouponCode={setcouponCode} setorderItems={setorderItems}  processOrder={processOrder}/>
: <ShowcartProduct   setcouponCode={setcouponCode} setorderItems={setorderItems} processOrder={processOrder}  orderItems={orderItems} />
  }
</div>

</div>




      
    </div>
  )
}

export default page
