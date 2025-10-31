"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Addressfield from './Addressfield'
import Showproduct from './Showproduct'
import ShowcartProduct from './ShowcartProduct'

const page = () => {
const router = useRouter()
const [buyType,setbuyType]=useState()




    useEffect(()=>{
const item=  JSON.parse(localStorage.getItem("checkoutstatus"))

if( !item || !item.type){
router.push("/")
}
setbuyType(item)

console.log(item)



    },[])



  return (
    <div className=''>


<div  className='grid grid-cols-12 lg:px-32 py-20    '>

<div className=' col-span-12 md:col-span-8'>
    <Addressfield />

 



</div>


<div className=' col-span-12 md:col-span-4'>
   {buyType?.type=="buy"
 ?
  <Showproduct   buyType={buyType}/>
: <ShowcartProduct    />
  }
</div>

</div>




      
    </div>
  )
}

export default page
