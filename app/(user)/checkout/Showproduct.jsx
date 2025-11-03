"use client";

import { baseurl, imgurl } from "@/app/admin/components/apis";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

const Showproduct = ({
  buyType,
  setcouponCode,
  setorderItems,
  processOrder,
}) => {
  const [product, setProduct] = useState();
  const [coupon, setCoupon] = useState({
    code: "",
    discount: 0,
    detail: null,
    error: "",
  });
  const [charges, setCharges] = useState({
    shipping: 0,
    tax: 0,
    maxShipping: 0,
  });

  // Fetch selected product
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${baseurl}/checkout/getbuyproduct/${buyType?.product}`
      );
      if (data.success) {
        setProduct(data.product);
        setorderItems([
          {
            product: data.product._id,
            name: data.product.name,
            image: data.product.images[0],
            price: data.product.price,
            quantity: buyType.quantity,
          },
        ]);

        // setorderItems([
        //   {
        //     product: data.product._id,
        //     name: data.product.name,
        //     image: data.product.images[0],
        //     price: data.product.price,
        //     quantity: buyType.quantity,
        //   },
        // ]);
      }
    } catch {
      console.error("Error fetching product");
    }
  };

  // Fetch charges (shipping, tax)
  const fetchCharges = async () => {
    try {
      const { data } = await axios.get(`${baseurl}/charges`);
      if (data.success) {
        const updated = { shipping: 0, tax: 0, maxShipping: 0 };
        data.charges.forEach((item) => {
          if (item.chargetype === "shipping") {
            updated.shipping = item.chargeamount;
            if (item.maxvalue) updated.maxShipping = item.maxvalue;
          } else if (item.chargetype === "tax") {
            updated.tax = item.chargeamount;
          }
        });
        setCharges(updated);
      }
    } catch {
      console.error("Error fetching charges");
    }
  };

  // Verify coupon code
  const verifyCoupon = async (price) => {
    if (coupon.code.length < 2) return;
    try {
      const { data } = await axios.post(
        `${baseurl}/checkout/verifycouponcode`,
        {
          price,
          code: coupon.code,
        }
      );
      if (data.success) {
        setCoupon({
          code: coupon.code,
          discount: data.discountAmount,
          detail: data.coupon,
          error: "",
        });
        setcouponCode(coupon.code);
      } else {
        setcouponCode(null)
        setCoupon({
          ...coupon,
          discount: 0,
          detail: null,
          error: data.message,
        });
      }
    } catch (err) {
              setcouponCode(null)

      setCoupon({ ...coupon, discount: 0, detail: null, error: err.message });
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCharges();
  }, []);

  if (!product) return null;

  // 🧮 Calculations
  const totalPrice = product.price * buyType.quantity;
  const compareTotal = product.comparePrice * buyType.quantity;
  const discount = (product.comparePrice - product.price) * buyType.quantity;
  const shipping = charges.maxShipping
    ? totalPrice < charges.maxShipping
      ? charges.shipping
      : 0
    : charges.shipping;
  const taxAmount = charges.tax ? (totalPrice * charges.tax) / 100 : 0;
  const subtotal = totalPrice + shipping + taxAmount - coupon.discount;
  const payNow = subtotal;

  return (
    <div className="mx-5">
      {/* Product */}
      <div className="bg-white border rounded-2xl shadow-sm hover:shadow-xl p-3 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
          <div className="flex items-center gap-4">
            <Link href={`/shop/${product.slug}`}>
              <img
                src={`${imgurl}/uploads/${product.images[0]}`}
                alt={product.name}
                className="w-20 h-20 rounded-xl object-cover shadow-sm"
              />
            </Link>
            <div>
              <Link href={`/shop/${product.slug}`}>
                <h3 className="text-lg font-semibold text-gray-800 hover:text-[#2ea2cc] capitalize">
                  {product.name}
                </h3>
              </Link>
              <p className="text-gray-600">
                <span className="font-medium">Price: </span>
                <span className="text-[#2ea2cc] font-semibold">
                  ${product.price.toFixed(2)}
                </span>
                {product.comparePrice && (
                  <s className="ml-2 text-gray-400 text-sm">
                    ${product.comparePrice}
                  </s>
                )}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-[#2ea2cc]">
              ${totalPrice.toFixed(2)}
            </p>
            {product.comparePrice && (
              <s className="text-sm text-gray-500">
                ${compareTotal.toFixed(2)}
              </s>
            )}
            <p className="text-sm mt-1">Qty: {buyType.quantity}</p>
          </div>
        </div>
      </div>

      {/* Checkout */}
      <div className="my-4 border rounded-2xl overflow-hidden shadow">
        <div className="text-xl font-bold text-white bg-[#e88573] text-center py-3">
          Checkout
        </div>

        <div className="px-5 py-3 space-y-2">
          {[
            ["Price:", `$${product.comparePrice}`],
            ["Quantity:", `×${buyType.quantity}`],
            ["Total Price:", `$${compareTotal}`],
            ["Discount:", `-$${discount}`],
            ["Shipping:", `$${shipping}`],
            [
              "Tax:",
              charges.tax ? `${charges.tax}% ($${taxAmount.toFixed(2)})` : "$0",
            ],
            ["Subtotal:", `$${subtotal.toFixed(2)}`],
          ].map(([label, value], i) => (
            <div
              key={i}
              className="flex justify-between border-b border-gray-300/50 pb-1 text-sm"
            >
              <b>{label}</b>
              <p>{value}</p>
            </div>
          ))}

          {/* Coupon */}
          <div className="flex gap-2 items-center mt-3">
            <input
              type="text"
              value={coupon.code}
              onChange={(e) =>
                setCoupon({ ...coupon, code: e.target.value.toUpperCase() })
              }
              placeholder="Coupon code"
              className="border-b border-gray-500 px-2 py-1 w-full uppercase outline-none"
            />
            <button
              onClick={() => verifyCoupon(totalPrice)}
              className="text-[#db2808] bg-[#e8857367] font-bold px-3 py-1 rounded-md"
            >
              Apply
            </button>
          </div>

          {coupon.detail && (
            <p className="text-green-600 text-center">
              Coupon applied: -${coupon.discount} OFF
            </p>
          )}
          {coupon.error && (
            <p className="text-red-600 text-center">{coupon.error}</p>
          )}

          <div className="flex justify-center mt-3">
            <button
              onClick={() => processOrder(shipping, taxAmount,payNow)}
              className="px-5 py-2 font-bold text-white bg-[#e88573] rounded-xl"
            >
              Pay ${payNow.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showproduct;
