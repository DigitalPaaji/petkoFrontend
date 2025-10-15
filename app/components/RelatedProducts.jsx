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


function RelatedProducts() {
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
            {loop.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="cursor-default group w-full p-4 bg-white overflow-hidden  transition-transform duration-300 border border-transparent hover:border-[#6666664d] ">
                  <div className="relative w-full aspect-square overflow-hidden ">
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
               <div
        // data-aos="fade-up"
        // data-aos-duration="300"
        className="absolute bottom-0 left-0 right-0 py-2 w-full bg-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <div className="w-9 h-9 p-2 hover:bg-[#F48C7F] rounded-full transition-colors duration-300">
          <HiOutlineShoppingBag
            className="w-full h-full text-gray-700 cursor-pointer"
          />
        </div>

        <div className="w-9 h-9 p-2 hover:bg-[#F48C7F] rounded-full transition-colors duration-300">
          <Heart className="w-full h-full text-gray-700 cursor-pointer" />
        </div>

        <div className="w-9 h-9 p-2 hover:bg-[#F48C7F] rounded-full transition-colors duration-300">
          <IoEyeOutline className="w-full h-full text-gray-700 cursor-pointer" />
        </div>
      </div>
                  </div>

                  <div className="p-4 ">
                    <h4 className="font-normal text-[#2ea2cc] group-hover:text-[#F48C7F] transition-colors text-md truncate">
                      {item.name}
                    </h4>

                    <div className="">
                      ₹{item.finalPrice}{" "}
                      <span className="text-[#666] text-sm line-through">
                        ₹{item.price}
                      </span>
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
