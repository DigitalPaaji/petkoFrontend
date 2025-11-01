"use client";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import RelatedProducts from "@/app/components/RelatedProducts";
import { baseurl, imgurl } from "@/app/admin/components/apis";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchWishlist } from "@/app/components/wishlistget";
axios.defaults.withCredentials = true;

const ProductCompo = ({ productData }) => {
  const [wishlistitem, setWistlistitem] = useState([]);

  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const router = useRouter();
  const [charges, setCharges] = useState();


  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "March 15, 2023",
      comment:
        "My dog absolutely loves this product! The quality is excellent and it arrived quickly.",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 4,
      date: "February 28, 2023",
      comment:
        "Good value for money. My pet seems happy with it, though I wish there were more size options.",
    },
  ];

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity(quantity + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  const addtocart = async (id, price) => {
    try {
      const response = await axios.post(
        `${baseurl}/cart/addtocart`,
        {
          productId: id,
          price,
        },
        {
          withCredentials: true,
        }
      );
      const data = await response.data;
      if (data.success) {
        toast.success(data.message);
        router.push("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      router.push("/user/login");
    }
  };

  const handelWishlistadd = async (id) => {
    try {
      const response = await axios.put(`${baseurl}/wishlist/add/${id}`);
      const data = await response.data;
      if (data.success) {
        toast.success(data.message);
        fetchwishlst();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      router.push("/user/login");
    }
  };

  const fetchwishlst = async () => {
    const list = await fetchWishlist();
    if (list) {
      setWistlistitem(list.productId);
    }
  };

  const fetchChargies = async () => {
    try {
      const response = await axios.get(`${baseurl}/charges`);
      const data = await response.data;
      if (data.success) {
        setCharges(data.charges);
      } else {
        setCharges([]);
      }
    } catch (error) {
      setCharges([]);
    }
  };

  

  useEffect(() => {
    fetchwishlst();
    fetchChargies();
  }, []);

  const handelbuy = () => {
    localStorage.setItem(
      "checkoutstatus",
      JSON.stringify({ quantity, product: productData._id, type: "buy" })
    );
    router.push("/checkout");
  };

  return (
    <>
      <div className="min-h-screen  px-4 md:px-12 xl:px-24 2xl:px-40">
        {/* Product Section */}
        <section className="py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Images */}
            <div className="lg:w-1/2">
              <div
                className="mb-4 bg-white shadow-sm overflow-hidden relative"
                onMouseEnter={() => setZoom(true)}
                onMouseLeave={() => setZoom(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={
                    hoveredImage
                      ? `${imgurl}/uploads/${hoveredImage}`
                      : `${imgurl}/uploads/${productData?.images[selectedImage]}`
                  }
                  alt="Product main"
                  className={`w-full h-auto lg:h-[600px] object-contain transition-transform duration-300 ${
                    zoom ? "scale-150" : "scale-100"
                  }`}
                  style={
                    zoom
                      ? {
                          transformOrigin: `${position.x}% ${position.y}%`,
                        }
                      : {}
                  }
                />
              </div>

              <div className="flex gap-2 overflow-x-auto">
                {productData?.images.map((image, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-20 h-20 border-2  cursor-pointer transition-all duration-200 ${
                      selectedImage === index
                        ? "border border-[#F48C7F]"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedImage(index)}
                    onMouseEnter={() => setHoveredImage(image)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <img
                      src={`${imgurl}/uploads/${image}`}
                      alt={`Product thumbnail ${index + 1}`}
                      className="w-full h-full object-cover  hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 lg:p-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#6666664d]">
                <h1 className="text-2xl font-normal capitalize">
                  {productData?.name}
                </h1>
                <div className="w-8 h-8">
                  <Heart
                    className={`w-full h-full  cursor-pointer ${
                      wishlistitem.includes(productData._id)
                        ? "text-red-700"
                        : " text-gray-700"
                    }`}
                    onClick={() => handelWishlistadd(productData?._id)}
                  />
                </div>
              </div>

              <div className="text-2xl font-semibold my-4 flex gap-1">
                <p>
                  ${productData?.price ? productData.price.toFixed(2) : "0.00"}
                </p>

                <s className="text-[17px] font-light">
                  /{productData?.comparePrice}
                </s>
              </div>
              <div className="font-semibold flex items-center gap-2">
                Stock:{" "}
                <span className="text-[#2ea2cc] font-bold">
                  {productData?.quantity} in Stock
                </span>
              </div>

              <p className="text-gray-600 py-6 border-b border-[#6666664d]">
                {productData?.shortDescription}{" "}
              </p>

              <div className="border-t border-gray-200 pt-4 space-y-1 text-sm text-gray-600">
                {charges &&
                  charges.length > 0 &&
                  charges.map((item, index) => {
                    return (
                      <>
                        <div className="text-rose-600">
                          <b>{item.chargetype}: </b>  
                          {item.chargetype == "shipping" && "$"}
                          {item?.chargeamount}
                          {item.chargetype == "tax" && "%"} 
    {item?.maxvalue &&  <p className="text-green-600">free {item.chargetype} upto {item?.maxvalue}  </p>    }

                        </div>
                      </>
                    );
                  })}
              </div>

              <div className="flex items-center justify-start flex-wrap gap-2 lg:gap-4 my-6">
                <div className="flex items-center border border-[#6666664d]">
                  <button
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                    onClick={() => handleQuantityChange("decrement")}
                  >
                    -
                  </button>
                  <span className="px-4 py-3">{quantity}</span>
                  <button
                    className="px-3 py-3 text-gray-600 hover:text-gray-800"
                    onClick={() => handleQuantityChange("increment")}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() =>
                    addtocart(productData?._id, productData?.price)
                  }
                  className="bg-black font-semibold text-white px-6 py-3  cursor-pointer transition duration-200"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handelbuy()}
                  className="bg-[#F48C7F] font-semibold text-white cursor-pointer px-6 py-3  transition duration-200"
                >
                  Buy Now
                </button>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-1 text-sm text-gray-600">
                <div>
                  <b>SKU:</b> {productData?.sku}
                </div>
                <div className="flex  gap-1">
                  <b>Tag:</b>{" "}
                  <div className="flex gap-2">
                    {" "}
                    {productData?.tags?.map((item, index) => (
                      <p
                        className="capitalize bg-[#F48C7F]  px-4 text-white rounded-xl "
                        key={index}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <b>Category:</b> {productData?.productcategory?.product_name}
                </div>
                <div className="capitalize">
                  <b> Pet:</b> {productData?.petcategory?.type}
                </div>
                <div className="capitalize">
                  <b>Brand:</b> {productData?.brand}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="p-6 lg:p-8  border border-[#6666664d]">
          <div>
            <div className="border-b border-gray-200">
              <nav className="flex items-center  md:gap-2   justify-between md:justify-start">
                {[
                  { id: "description", label: "Description" },
                  { id: "additional", label: "Additional Information" },
                  { id: "reviews", label: "Reviews" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`py-4  md:px-6 text-nowrap font-medium text-sm border-b-2 transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "font-semibold text-[17px] lg:text-xl text-[#F48C7F]"
                        : "border-transparent  font-medium text-[17px] lg:text-xl hover:border-[#f48d7f85]"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-8">
              {activeTab === "description" && (
                <p
                  className="text-gray-600 mb-4 list-disc"
                  dangerouslySetInnerHTML={{ __html: productData?.description }}
                ></p>
              )}

              {activeTab === "additional" && (
                <div>
                  {/* <h3 className="text-xl font-semibold mb-4">Additional Information</h3> */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <tbody className="divide-y divide-gray-200">
                        {productData?.weight?.value && (
                          <tr>
                            <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                              Weight
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {productData?.weight?.value}
                              {productData?.weight?.unit}{" "}
                            </td>
                          </tr>
                        )}
                        {productData?.brand && (
                          <tr>
                            <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                              Brand
                            </td>
                            <td className="py-3 px-4 text-gray-600 capitalize">
                              {productData?.brand}
                            </td>
                          </tr>
                        )}

                        {(productData?.dimensions?.height ||
                          productData?.dimensions?.length ||
                          productData?.dimensions?.width) && (
                          <tr>
                            <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                              Dimensions
                            </td>
                            <td className="py-3 px-4 text-gray-600  flex gap-1">
                              <p>
                                {" "}
                                {productData?.dimensions?.height &&
                                  `${productData?.dimensions?.height}h`}
                              </p>
                              <p>
                                {" "}
                                {productData?.dimensions?.length &&
                                  `${productData?.dimensions?.length}l`}
                              </p>

                              <p>
                                {" "}
                                {productData?.dimensions?.width &&
                                  `${productData?.dimensions?.width}w`}
                              </p>
                              <p> {productData?.dimensions?.unit}</p>
                            </td>
                          </tr>
                        )}
                        {productData?.petcategory?.type && (
                          <tr>
                            <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                              Pet
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {productData?.petcategory?.type}
                            </td>
                          </tr>
                        )}

                        {productData?.productcategory?.product_name && (
                          <tr>
                            <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                              Category
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {productData?.productcategory?.product_name}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  {/* <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3> */}
                  <div className="mb-8">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 py-6"
                      >
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">{review.name}</h4>
                          <span className="text-gray-500 text-sm">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex text-yellow-400 mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <RelatedProducts />
    </>
  );
};

export default ProductCompo;
