"use client";
import { baseurl, imgurl } from "@/app/admin/components/apis";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

const ShowcartProduct = ({ setcouponCode ,setorderItems,processOrder}) => {
  const [cart, setCart] = useState([]);
  const [prices, setPrices] = useState({
    total: 0,
    old: 0,
    discount: 0,
    shipping: 0,
    tax: 0,
  });

  const [coupon, setCoupon] = useState({
    code: "",
    discount: 0,
    detail: null,
    error: "",
  });

  const [maxChargeLimit, setMaxChargeLimit] = useState(0);

  // 🧮 Fetch Cart Items
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${baseurl}/checkout/getcartproduct`);
      const data = res.data;
      if (data.success) {
        setCart(data.data);
        setPrices((prev) => ({
          ...prev,
          total: data.totalAmount,
          old: data.totaloldprice,
          discount: data.totaloldprice - data.totalAmount,
        }));

       data.data.forEach(element => {
  setorderItems(prev => [
    ...prev,
    {
      product: element?.productId?._id,
      name: element?.productId?.name,
      image: element?.productId?.images[0],
      price: element?.productId?.price,
      quantity: element?.quantity
    }
  ]);
});
              }
    } catch (err) {
      console.error("Cart fetch error:", err);
    }
  };

  // ⚙️ Fetch Charges
  const fetchCharges = async () => {
    try {
      const res = await axios.get(`${baseurl}/charges`);
      const data = res.data;
      if (data.success) {
        let shipping = 0,
          tax = 0,
          maxLimit = 0;
        data.charges.forEach((c) => {
          if (c.chargetype === "shipping") {
            shipping = c.chargeamount;
            if (c.maxvalue) maxLimit = c.maxvalue;
          } else if (c.chargetype === "tax") tax = c.chargeamount;
        });
        setPrices((p) => ({ ...p, shipping, tax }));
        setMaxChargeLimit(maxLimit);
      }
    } catch (err) {
      console.error("Charge fetch error:", err);
    }
  };

  // 💸 Verify Coupon
  const verifyCoupon = async () => {
    if (coupon.code.length < 2) return;
    try {
      const res = await axios.post(`${baseurl}/checkout/verifycouponcode`, {
        price: prices.total,
        code: coupon.code,
      });
      const data = res.data;
      if (data.success) {
        setCoupon((c) => ({
          ...c,
          discount: data.discountAmount,
          detail: data.coupon,
          error: "",
        }));
        setcouponCode(coupon.code);
      } else {
        setcouponCode("")
        setCoupon((c) => ({ ...c, discount: 0, detail: null, error: data.message }));
      }
    } catch (err) {
      setcouponCode("")
      setCoupon((c) => ({ ...c, discount: 0, detail: null, error: err.message }));
    }
  };

  useEffect(() => {
    fetchCart();
    fetchCharges();
  }, []);

  // 🧾 Compute Final Total
  const shippingCost =
    maxChargeLimit && prices.total > maxChargeLimit ? 0 : prices.shipping;
  const taxAmount = (prices.total * prices.tax) / 100;
  const finalTotal =
    prices.total - coupon.discount + shippingCost + taxAmount;

  return (
    <div className="mx-5">
      {/* 🛒 Products */}
      <div className="flex flex-col gap-3">
        {cart.map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-3 flex flex-col gap-4"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start md:gap-6">
              <div className="flex justify-between w-full gap-5 items-center">
                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                  <Link href={`/shop/${item.productId?.slug}`}>
                    <img
                      src={`${imgurl}/uploads/${item.productId?.images?.[0]}` || "/Images/img.webp"}
                      alt={item.productId?.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>

                {/* Info */}
                <div className="md:w-full">
                  <Link href={`/shop/${item.productId?.slug}`}>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 hover:text-[#2ea2cc] capitalize">
                      {item.productId?.name}
                    </h3>
                  </Link>

                  <div className="flex flex-wrap items-center gap-2 mt-1 text-gray-600">
                    <span className="text-sm font-medium">Price:</span>
                    <span className="text-[#2ea2cc] font-semibold text-lg">
                      ${item.productId?.price.toFixed(2)}
                    </span>
                    {item.productId?.comparePrice && (
                      <s className="text-gray-400 text-sm">
                        ${item.productId?.comparePrice}
                      </s>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between md:flex-col w-full md:w-fit gap-3">
                <p className="text-xl font-bold text-[#2ea2cc]">
                  ${(item.productId.price * item.quantity).toFixed(2)}
                </p>
                <div className="flex items-center gap-1">
                  Quantity: <p>{item.quantity}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 💰 Checkout Summary */}
      {cart.length > 0 && (
        <div className="my-3 mx-5 rounded-2xl overflow-hidden shadow">
          <div className="text-xl font-bold text-white bg-[#e88573] text-center py-3">
            Checkout
          </div>

          <div className="my-3 px-5 space-y-2">
            <SummaryRow label="Price" value={`$${prices.old}`} />
            <SummaryRow label="Items" value={cart.length} />
            <SummaryRow label="Discount" value={`-$${prices.discount}`} />
            <SummaryRow label="Shipping" value={`$${shippingCost}`} />
            <SummaryRow label="Tax" value={`${prices.tax}% ($${taxAmount.toFixed(2)})`} />
            <SummaryRow label="Subtotal" value={`$${finalTotal.toFixed(2)}`} />
          </div>

          {/* Coupon Input */}
          <div className="flex gap-2 items-center my-3 px-5">
            <input
              type="text"
              value={coupon.code}
              onChange={(e) => setCoupon((c) => ({ ...c, code: e.target.value }))}
              placeholder="Coupon code"
              className="border-b border-gray-600/50 focus:border-0 px-1 py-1 uppercase w-full"
            />
            <button
              onClick={verifyCoupon}
              className="text-[#db2808] bg-[#e8857367] font-bold px-3 pb-1 rounded-md cursor-pointer"
            >
              Apply
            </button>
          </div>

          {coupon.detail && (
            <p className="text-green-600 text-center">
              Coupon applied — ${coupon.discount} OFF
            </p>
          )}
          {coupon.error && (
            <p className="text-red-600 text-center">{coupon.error}</p>
          )}

          <div className="flex justify-center my-3 px-5">
            <button onClick={()=>processOrder(shippingCost,taxAmount,finalTotal)} className="px-5 py-1 font-bold text-white bg-[#e88573] rounded-xl cursor-pointer">
              Pay ${finalTotal.toFixed(2)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// 💡 Small reusable component for rows
const SummaryRow = ({ label, value }) => (
  <div className="flex justify-between border-b py-2 border-gray-600/40 border-dashed">
    <b>{label}:</b>
    <p>{value}</p>
  </div>
);

export default ShowcartProduct;
