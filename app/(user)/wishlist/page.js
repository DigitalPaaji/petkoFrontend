"use client";
import Image from "next/image";
import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import InnerBanner from "../../components/InnerBanner";
import Link from "next/link";
import axios from "axios";
import { baseurl, imgurl } from "@/app/admin/components/apis";
import { useRouter } from "next/navigation";
import {
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaTrash,
  FaEye,
  FaStar,
} from "react-icons/fa";

axios.defaults.withCredentials = true;

export default function CartSidebar() {
  const [wishList, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRouter();

  const fetchWishList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/wishlist/allwishlistitem`);
      const data = await response.data;
      if (data.success) {
        setWishlist(data.data || []);
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      route.push("/user/login");
    } finally {
      setLoading(false);
    }
  };

  const removeallWishlist = async (productId) => {
    try {
      const response = await axios.delete(`${baseurl}/wishlist/removewishlist`);
      const data = await response.data;

      if (data.success) {
        toast.success("Product removed from wishlist");
        fetchWishList();
      } else {
        toast.error("Failed to remove product");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Error removing product");
    }
  };

  const removeFromWishlist = async (id) => {
try {
  
const response = await axios.put(`${baseurl}/wishlist/add/${id}`)
const data = await response.data;
if(data.success){
  toast.success(data.message);
  fetchWishList()
}else{
  toast.error(data.message)
}


} catch (error) {
    toast.error(error.message)

}  };

  const addToCart = async (product, price) => {
    try {
      const response = await axios.post(
        `${baseurl}/wishlist/addtocart/remove`,
        {
          productId: product,
          price,
        }
      );
      const data = await response.data;

      if (data.success) {
        toast.success("Product added to cart");
        fetchWishList();
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding product to cart");
    }
  };

  useEffect(() => {
    fetchWishList();
  }, []);

  if (loading) {
    return (
      <>
        <InnerBanner title={"Wishlist"} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <InnerBanner title={"Wishlist"} />

      {wishList?.productId?.length === 0 ? (
        <div className="container mx-auto px-4 py-8">
          <div className="relative flex items-center justify-center h-full w-full text-center text-gray-500 px-6">
            <div className="flex flex-col my-24 items-center justify-center">
              <img
                width={440}
                height={440}
                src="/Images/frontend/cart.gif"
                alt="Empty Wishlist"
                className="w-40 h-40 mb-4"
              />
              <p className="text-xl font-semibold mb-2">
                Your Wishlist Is Empty
              </p>
              <p className="text-gray-600 mb-6">
                Start adding items you love to your wishlist
              </p>
              <Link
                href={"/"}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600 mt-2">
                {wishList?.productId?.length}{" "}
                {wishList?.productId?.length === 1 ? "item" : "items"} in your
                wishlist
              </p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <button
                onClick={() => removeallWishlist()}
                className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition duration-300"
              >
                <FaTrash />
                Clear Wishlist
              </button>
            </div>
          </div>

          {/* Wishlist Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishList?.productId?.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    width={300}
                    height={300}
                    src={`${imgurl}/uploads/${product.images[0]}`}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => removeFromWishlist(product._id)}
                      className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition duration-300"
                    >
                      <FaTrash className="text-red-500" />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3">
                    {product.comparePrice &&
                      product.comparePrice > product.price && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                          Save ${product.comparePrice - product.price}
                        </span>
                      )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition duration-300">
                    <Link href={`/shop/${product.slug}`}>{product.name}</Link>
                  </h3>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.shortDescription}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.comparePrice &&
                      product.comparePrice > product.price && (
                        <span className="text-lg text-gray-500 line-through">
                          ${product.comparePrice}
                        </span>
                      )}
                  </div>

                  {/* Rating (if available) */}
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`text-sm ${
                          star <= (product.rating || 4)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-gray-600 text-sm ml-1">
                      ({product.reviewCount || 12})
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product._id, product.price)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition duration-300"
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>
                    <Link
                      href={`/shop/${product.slug}`}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition duration-300 flex items-center justify-center"
                    >
                      <FaEye />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
