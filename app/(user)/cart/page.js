"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { React, useState } from "react";
import { toast } from "react-toastify";
import InnerBanner from "../../components/InnerBanner";
import Link from "next/link";

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

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQty = (id, newQty) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <InnerBanner title={"Cart"} />

      <div className="relative z-[999] flex flex-col justify-between h-full px-4 md:px-12 xl:px-24 2xl:px-0 my-16">
        {cart.length === 0 ? (
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
            <div className="space-y-6 overflow-y-auto flex flex-col ">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-white  shadow-md border border-gray-100 hover:shadow-lg transition p-5"
                >
                  <div className="flex flex-wrap md:grid md:grid-cols-5 lg:grid-cols-12 place-items-center gap-4">
                    {/* Product Image */}
                    <div className="lg:col-span-1 w-20 h-20 rounded-lg overflow-hidden bg-gray-50">
                      <Link href={`/product/${item.name}/${item._id}`}>
                        <Image
                          src={item.images[0] || "/Images/img.webp"}
                          alt={item.name}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </div>

                    {/* Product Details */}
                    <div className="lg:col-span-5 flex flex-col w-full pl-4">
                      <p className="text-lg font-medium text-gray-700 font-serif">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Color:{" "}
                        <span className="font-medium text-gray-700">
                          {item.color}
                        </span>
                      </p>
                    </div>

                    {/* Quantity & Price */}
                    <div className="lg:col-span-3 flex flex-col sm:flex-row md:flex-col gap-2 items-center justify-center">
                      <div className="flex items-center gap-2 border border-gray-200 rounded-md px-2 py-1">
                        <button
                          className="px-2 text-md bg-gray-100 rounded"
                          onClick={() =>
                            updateQty(item._id, Math.max(1, item.quantity - 1))
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          disabled={item.quantity >= (item.stock ?? 1)}
                          className={`px-2 bg-gray-100 rounded ${
                            item.quantity >= (item.stock ?? 1)
                              ? "opacity-40 cursor-not-allowed"
                              : "hover:bg-gray-200"
                          }`}
                          onClick={() =>
                            item.quantity < (item.stock ?? 1) &&
                            updateQty(item._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <p className="text-lg font-semibold text-[#2ea2cc]">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <div className="lg:col-span-3 ">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="p-2 bg-red-50 hover:bg-red-100 rounded-full transition"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                 </div>
              ))}
            </div>

            {/* Coupon + Summary */}
            <div className="bg-white  border border-gray-100 p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
                <input
                  type="text"
                  placeholder="Enter coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  className="flex-1 border-b text-md outline-none py-1"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-[#F59383] text-white px-6 py-2 rounded-md text-md w-full sm:w-auto"
                >
                  Apply
                </button>
              </div>

              <div className="text-md space-y-2">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-gray-500">Calculated at checkout</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon})</span>
                    <span>- ₹{Math.floor((total * discountPercent) / 100)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-base border-t pt-3">
                  <span>Subtotal</span>
                  <span>
                    ₹
                    {discountPercent > 0
                      ? Math.floor(total * (1 - discountPercent / 100))
                      : total}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                <Link
                  href={"/checkout"}
                  className="flex-1 bg-[#F59383] text-white py-2 text-center block hover:bg-[#F59383] transition"
                >
                  Place Order
                </Link>

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
    </>
  );
}
