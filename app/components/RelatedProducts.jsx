"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { FaCartArrowDown, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { Heart } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { imgurl } from "../admin/components/apis";


function RelatedProducts({data}) {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const staticProducts = [
    {
      _id: "1",
      name: "Elegant Gold Rakhi",
      category: { _id: "cat1", name: "Rakhi" },
      subcategory: { _id: "sub1", name: "Premium Rakhi" },
      price: 999,
      finalPrice: 799,
      discount: 20,
      description: {
        paragraphs: [
          "This elegant gold Rakhi is crafted with precision and care, featuring intricate designs that symbolize the bond between siblings.",
          "Made with high-quality materials to ensure durability and beauty.",
        ],
      },
      images: [
        "/Images/frontend/1.webp",
        "/Images/frontend/1.webp",
        "/Images/frontend/1.webp",
      ],
      tags: [{ name: "Premium" }, { name: "Festive" }, { name: "Traditional" }],
    },
    {
      _id: "2",
      name: "Silver Thread Rakhi",
      category: { _id: "cat1", name: "Rakhi" },
      subcategory: { _id: "sub2", name: "Traditional Rakhi" },
      price: 599,
      finalPrice: 499,
      discount: 17,
      description: {
        paragraphs: [
          "Traditional silver thread Rakhi with authentic design patterns passed down through generations.",
          "Perfect for those who appreciate classic designs with modern durability.",
        ],
      },
      images: [
        "/Images/frontend/1.webp",
        "/Images/frontend/1.webp",
        "/Images/frontend/1.webp",
      ],
      tags: [{ name: "Traditional" }, { name: "Handmade" }],
    },
    {
      _id: "3",
      name: "Royal Pet Collar",
      category: { _id: "cat2", name: "Pet Accessories" },
      subcategory: { _id: "sub3", name: "Luxury Collars" },
      price: 799,
      finalPrice: 649,
      discount: 18,
      description: {
        paragraphs: [
          "A stylish royal collar designed for your pets with comfort and durability in mind.",
          "Adjustable size and premium finish.",
        ],
      },
      images: ["/Images/frontend/1.webp", "/Images/frontend/1.webp"],
      tags: [{ name: "Pets" }, { name: "Luxury" }],
    },
  ];


  useEffect(() => {
          AOS.init({ duration: 800, once: true });
    // simulate fetch
    setTimeout(() => {
      setProducts(staticProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const loop = [...products, ...products];

  return (
    <div className="mx-4 md:mx-12 xl:mx-24 2xl:mx-40 border my-12 border-[#6666664d]  p-6 lg:p-8">
      <h4 className="border-b border-[#6666664d] py-4 px-6 transition-colors duration-200 font-semibold text-[17px] lg:text-[22px] ">
        Related Products
      </h4>

      <div className="overflow-x-auto scrollbar-hide pt-8 ">
        {loading ? (
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="w-[400px] bg-white overflow-hidden animate-pulse flex-shrink-0 p-4 border border-transparent hover:border-[#6666664d] "
              >
                <div className="w-full h-[300px] bg-stone-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-stone-300 rounded w-3/4" />
                  <div className="h-3 bg-stone-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={1.3}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 1.3 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={6000}
            loop={true}
            grabCursor={true}
          >
            {data?.map((product,idx) => (
              <SwiperSlide key={idx}>
              
                            <div
                              key={product._id}
                              className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                              <div className="relative aspect-square overflow-hidden">
                                <img
                                  src={`${imgurl}/uploads/${product.images?.[0]}`||
                                    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                                  }
                                  alt={product.name || "Product"}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                  className="object- transform group-hover:scale-105 transition-transform duration-700 object-contain"
                                />
                              </div>
              
                              <div className="p-4">
                                <Link href={`/shop/${product?.slug}`} className="block">
                                  <h3 className="font-medium capitalize text-gray-900 group-hover:text-green-700 transition-colors duration-200 mb-2 line-clamp-2">
                                    {product?.name}
                                  </h3>
                                </Link>
              
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg font-semibold text-gray-900">
                                      ${product.price.toFixed(2)}
                                    </span>
                                    {product.comparePrice > product.price && (
                                      <span className="text-sm text-gray-500 line-through">
                                        ${product.comparePrice.toFixed(2)}
                                      </span>
                                    )}
                                  </div>
                                  {product.rating && (
                                    <div className="text-xs text-gray-500 flex items-center">
                                      <span>★</span>
                                      <span className="ml-1">{product.rating.rating}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                        
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default RelatedProducts;
