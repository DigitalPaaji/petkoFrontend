"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import InnerBanner from "../../components/InnerBanner";
import Link from "next/link";
import axios from "axios";
import { baseurl, imgurl } from "@/app/admin/components/apis";
import { useRouter } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
axios.defaults.withCredentials = true



export default function CartSidebar() {
  // Sample product data
  const [cart, setCart] = useState([
    {
      _id: "1",
      cartItemId: "item1",
      name: "Premium Dog Food",
      price: 1200,
      quantity: 2,
      stock: 5,
      color: "Brown",
      images: ["/Images/frontend/4.webp"],
    },
    {
      _id: "2",
      cartItemId: "item2",
      name: "Cat Scratching Post",
      price: 899,
      quantity: 1,
      stock: 3,
      color: "Grey",
      images: ["/Images/frontend/2.webp"],
    },
   ]);
  const [loading,setloading] = useState(true)



  const route= useRouter()


  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  const handleApplyCoupon = async () => {
    const code = coupon.trim().toUpperCase();
    if (!code) return;

    if (code === "PETLOVE10") {
      setAppliedCoupon(code);
      setDiscountPercent(10);
      toast.success("Coupon applied successfully!");
    } else {
      setAppliedCoupon("");
      setDiscountPercent(0);
      toast.error("Invalid coupon code");
    }
  };



  const updateQty = (id, newQty) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);


const [cartItem,setCartItem] = useState()

const fetchCartitem= async()=>{
  try {
    setloading(true)


    const response = await axios.get(`${baseurl}/cart/getcartitem`)
    const data = await response.data;
  if(data.success){
    setCartItem(data.data)
  }
  else{
    setCartItem("")
  }
  } catch (error) {
    route.push("/user/login")
  }
  finally{
        setloading(false)

  }
  
}



useEffect(()=>{
  fetchCartitem()
},[])





  const removeFromCart = async(id) => {
try {
      setloading(true)

const response = await axios.delete(`${baseurl}/cart/${id}`)
const data = await response.data;
if(data.success){
  toast.success(data.message);
  fetchCartitem()
}
else{
  toast.error(data.message)
}

} catch (error) {
  
}
finally{
      setloading(false)

}
  };

  const handelAdditem = async(id)=>{

try {
    setloading(true)

  const response = await axios.put(`${baseurl}/cart/add/${id}`)
  const data = await response.data;
  if(data.success){
    toast.success(data.message)
    fetchCartitem()
  }else{
    toast.error(data.message)
  }

  
} catch (error) {
      toast.error(data.message)

}
finally{
  setloading(false)
}

  }


const handelremoveitem= async(id)=>{
  try {
    setloading(true)

  const response = await axios.put(`${baseurl}/cart/sub/${id}`)
  const data = await response.data;
  if(data.success){
    toast.success(data.message)
    fetchCartitem()
  }else{
    toast.error(data.message)
  }

  
} catch (error) {
      toast.error(data.message)

}
finally{
  setloading(false)
}
}


const handelMoveToWishlist= async(cartid,productid)=>{
 
  try {
    const response = await axios.post(`${baseurl}/wishlist/addtowish`,{productid,cartid})
    const data = await response.data;
    if(data.success){
      toast.success(data.message)
      fetchCartitem()
    }else{
      toast.error(data.message)
    }
  } catch (error) {
          toast.error(error.message)

  }
}


const handelCheckout=()=>{
localStorage.setItem("checkoutstatus",JSON.stringify({type:"cart",}))

route.push("/checkout")


}







  return (
    <>
      <InnerBanner title={"Cart"} />
{!loading &&
      <div className="relative  flex flex-col justify-between h-full  md:px-12 xl:px-24 2xl:px-0 my-16">
        {cartItem?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
            <Image
              width={300}
              height={300}
              src="/Images/frontend/cart.gif"
              alt="Empty Cart"
              className="w-40 h-40 mb-4"
            />
            <p className="text-md">Your Cart Is Empty</p>
            <Link
              href={"/"}
              className="text-md text-[#2ea2cc] underline mt-3 font-semibold"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-12 flex-wrap lg:flex-nowrap mx-4 md:mx-12 xl:mx-24 2xl:mx-40">
            {/* Cart Items */}
            <div className="flex flex-col gap-6 overflow-y-auto p-2 md:p-4 w-full">
  {cartItem?.map((item) => (
    <div
      key={item._id}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 sm:p-6 flex flex-col gap-4"
    >
      {/* Product Row */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 ">
        <div className="flex   justify-between w-full  gap-5 items-center ">
        {/* Product Image */}
        <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
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
              ${item.price.toFixed(2)}
            </span>
            {item.productId.comparePrice && (
              <s className="text-gray-400 text-sm">${item.productId.comparePrice}</s>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 mt-3">
            <button
              className={`px-3 py-1.5 bg-gray-100 rounded-lg text-gray-700 text-lg font-semibold transition ${
                item.quantity <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
              }`}
              disabled={item.quantity <= 1}
              onClick={() => handelremoveitem(item._id)}
            >
              −
            </button>

            <span className="text-base font-medium">{item.quantity}</span>

            <button
              className={`px-3 py-1.5 bg-gray-100 rounded-lg text-gray-700 text-lg font-semibold hover:bg-gray-200 transition ${
                item.quantity >= (item?.productId?.quantity ?? 1) ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={item.quantity >= (item?.productId?.quantity ?? 1)}
              onClick={() => handelAdditem(item._id)}
            >
              +
            </button>
          </div>
        </div>

        </div>

        <div className=" flex md:flex-col justify-between w-full gap-3  md:w-fit  h-full   ">
        <div className="flex   md:flex-col items-center sm:items-end gap-1 mt-4 sm:mt-0">
          <p className="text-xl font-bold text-[#2ea2cc]">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          {item.productId.comparePrice && (
            <s className="text-sm text-gray-500">
              ${(item.quantity * item.productId.comparePrice).toFixed(2)}
            </s>
          )}



          
        </div>
     
 <div className="flex gap-4 md:gap-3 items-center ">

     <div onClick={()=>handelMoveToWishlist(item._id,item?.productId?._id)} className="flex gap-1 text-sm  justify-end items-center  text-blue-500 text-nowrap cursor-pointer">
  Move to Wishlist <FaRegHeart className="" />
  </div>


        <button
          onClick={() => removeFromCart(item._id)}
          className="flex items-center gap-1 cursor-pointer text-red-500 hover:text-red-600 font-medium text-sm transition"
        >
          <X className="w-4 h-4" /> Remove
        </button>
      </div>
      </div>
        
      </div>

   
     
    </div>
  ))}
</div>


            {/* Coupon + Summary */}
            <div className="bg-white  border border-gray-100 p-6 min-w-full lg:min-w-[20rem]">
              <div className="flex   gap-4 items-center justify-between mb-4">
               

                <span>Quantity</span>


                  <span className="text-gray-500">{cartItem?.length}</span>
              </div>

              <div className="text-md space-y-2">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span className="text-gray-500">
    ${cartItem.reduce((acc,dec)=>  (dec?.productId?.comparePrice *dec.quantity) +acc ,0 )}

                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-gray-500">
   - ${cartItem.reduce((acc,dec)=> acc + (dec?.productId?.comparePrice*dec.quantity - dec?.productId?.price*dec.quantity) ,0 )}

                  </span>
                </div>

                
               
                <div className="flex justify-between font-semibold text-base border-t pt-3">
                  <span>Subtotal</span>
                  <span>
                    $
                   {
                    cartItem.reduce((acc,dec)=>  (dec?.price *dec.quantity) +acc ,0 )
                   }
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                <button
                  // href={"/checkout"}
                  onClick={()=>{handelCheckout()}}

                  className="flex-1 bg-[#F59383] text-white font-semibold py-2 text-center block hover:bg-[#F59383] transition"
                >
                  Place Order
                </button>

                <Link
                  href={"/"}
                  className="flex-1 text-center text-md text-[#F59383] underline hover:text-[#F59383]"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

}
    </>
  );
}
