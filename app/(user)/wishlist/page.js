"use client";
// import { useGlobalContext } from "../../components/context/GlobalContext";
import { X } from "lucide-react";
import Image from "next/image";
import { React, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import InnerBanner from '../../components/InnerBanner'
// import CheckoutSidebar from "./CheckoutSidebar";
import Link from "next/link";

export default function CartSidebar() {
//   const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQty } =
//     useGlobalContext();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const handleApplyCoupon = async () => {
    const code = coupon.trim();
    if (!code) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/coupon/${code}`
      );
      const data = await res.json();

      if (res.ok && data.valid) {
        setAppliedCoupon(code);
        setDiscountPercent(data.discountPercent);
      } else {
        setAppliedCoupon("");
        setDiscountPercent(0);
        toast.error(data.message || "Invalid coupon code");
      }
    } catch (err) {
      toast.error("Failed to validate coupon");
    }
  };

//   const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
    <InnerBanner title={"Wishlist"} />
      {/* {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[998]"
          onClick={() => setIsCartOpen(false)} // close on overlay click
        />
      )} */}

      <div 
        // className={`fixed top-0 right-0 min-h-screen 
        //  w-[90%] md:w-[40%] xl:w-[25%] bg-white shadow-lg z-[999] transition-transform duration-300 ${
        //    isCartOpen ? "translate-x-0" : "translate-x-full"
        //  }`}
      >

   {/* <h1 className=" text-center text-2xl md:text-4xl font-mosetta font-medium ">
    Cart
   </h1> */}
        {/* {cart.length === 0 ? ( */}
          <div className="relative z-[999] flex items-center justify-center h-full w-full text-center text-gray-500 px-6">
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
        {/* ) : ( */}
          {/* <div className="relative z-[999] flex flex-col justify-between h-full">
            <div className="p-4 space-y-4 overflow-y-auto flex-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-start gap-4 text-md">
                  <Link href={`/product/${item.name}/${item._id}`} 
                   onClick={() => setIsCartOpen(false)}
                  >
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      width={400}
                      height={400}
                      className="w-24 h-24 rounded-md object-cover"
                    />
                  </Link>
                  <div className="flex-1 space-y-2">
                    <p className="">{item.name}</p>
                    <p className="">₹{item.price}</p>
                   <p className=" border w-fit border-gray-200 rounded-full px-2  text-gray-600 text-sm font-semibold">{item.color}</p>

                    <div className="flex items-center gap-2 ">
                      <button
                        className="cursor-pointer px-2 text-md bg-gray-100"
                        onClick={() =>
                          updateQty(
                            item._id,
                            Math.max(1, item.quantity - 1),
                            item.color || item.selectedColor?.colorName
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        disabled={item.quantity >= (item.stock ?? 1)}
                        className={`cursor-pointer px-2 bg-gray-100 ${
                          item.quantity >= (item.stock ?? 1)
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:bg-gray-200"
                        }`}
                        onClick={() => {
                          if (item.quantity < (item.stock ?? 1)) {
                            updateQty(
                              item._id,
                              item.quantity + 1,
                              item.color || item.selectedColor?.colorName
                            );
                          }
                        }}
                      >
                        +
                      </button>

                    </div>
                  </div>
                  <button
                    onClick={() =>
                      removeFromCart(
                        item._id,
                        item.color || item.selectedColor?.colorName
                      )
                    }
                    className="cursor-pointer"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4   space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  className="flex-1 border-b-[1px] border-[#99571d]   text-md  outline-none"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-[#B67032] text-white px-4 py-2 rounded-md text-md"
                >
                  Apply
                </button>
              </div>

              <div className="text-md space-y-1">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-gray-500">Calculated at checkout</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon})</span>
                    <span>
                      - ₹{Math.floor((total * discountPercent) / 100)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-base">
                  <span>Subtotal</span>
                  <span>
                    ₹
                    {discountPercent > 0
                      ? Math.floor(total * (1 - discountPercent / 100))
                      : total}
                  </span>
                </div>
              </div>

              <Link href={'/checkout'}
            
                className="w-full bg-[#B67032] text-white py-2 mt-4 rounded-md"
              >
                Place Order
              </Link>

              <Link href={'/'}
                className="text-center text-md text-[#B67032] underline mt-3 w-full"
              >
                Or Continue Shopping
              </Link>
            </div>
          </div>
        )} */}
      </div>

      {/* <CheckoutSidebar
        isOpen={showCheckout}
        setIsOpen={setShowCheckout}
        cart={cart}
        total={total}
        discountPercent={discountPercent}
      /> */}
    </>
  );
}