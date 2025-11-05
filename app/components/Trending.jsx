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
import axios from "axios";
import { baseurl, imgurl } from "../admin/components/apis";
import { FiBox } from "react-icons/fi";

function RelatedProducts() {
  const [activeTab, setActiveTab] = useState("isFeatured");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  

const fetchProduct= async(filter="isFeatured")=>{
try {
  setLoading(true)
      setProducts([])

  const response = await axios.get(`${baseurl}/product/feature/?get=${filter}`);
  const data = await response.data;
  if(data.success){
setProducts(data.products)
  }
  else{
    setProducts([])
  }


} catch (error) {
      setProducts([])

}
finally{
  setLoading(false)
}
}



  useEffect(() => {
    fetchProduct()
  }, []);

useEffect(()=>{

  if(activeTab){
        fetchProduct(activeTab)
      }
},[activeTab])


  const tabs = [
    { id: "isFeatured", label: "Trending Products" },
    { id: "new", label: "New Arrivals" },
    { id: "best", label: "Best Sellers" },
  ];




  return (
    <div className="mx-4 md:mx-12 xl:mx-24 2xl:mx-40 my-16 p-6 lg:p-8">
      {/* Tab Navigation */}
      <div className="flex flex-nowrap gap-2 md:gap-4 border-b border-[#6666664d]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-4 md:px-6 transition-colors duration-200 font-semibold text-[17px] lg:text-xl border-b-2 ${
              activeTab === tab.id
                ? "text-[#e46959] border-[#e46959]"
                : " border-transparent hover:text-[#e46959]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto scrollbar-hide pt-12">
        {loading ? (
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="w-[280px] sm:w-[300px] md:w-[320px] bg-white overflow-hidden animate-pulse flex-shrink-0 p-4 border border-transparent hover:border-[#6666664d]"
              >
                <div className="w-full h-[250px] sm:h-[280px] md:h-[300px] bg-stone-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-stone-300 rounded w-3/4" />
                  <div className="h-3 bg-stone-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
<>
          {products.length >0 ?
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
           { products?.map((item, idx) => (
              <SwiperSlide key={`${item._id}-${idx}`}>
                <div className="cursor-default group w-full bg-white overflow-hidden transition-transform duration-300 border border-transparent hover:border-[#6666664d]">
                  <div className="relative w-full aspect-square overflow-hidden">
                    <img
                      src={`${imgurl}/uploads/${item.images?.[0]}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 py-2 w-full bg-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2">
                      <div className="w-9 h-9 p-2 hover:bg-[#F48C7F] rounded-full transition-colors duration-300">
                        <HiOutlineShoppingBag className="w-full h-full text-gray-700 cursor-pointer" />
                      </div>

                      <div className="w-9 h-9 p-2 hover:bg-[#F48C7F] rounded-full transition-colors duration-300">
                        <Heart className="w-full h-full text-gray-700 cursor-pointer" />
                      </div>

                      <div className="w-9 h-9 p-2 hover:bg-[#F48C7F] rounded-full transition-colors duration-300">
                        <IoEyeOutline className="w-full h-full text-gray-700 cursor-pointer" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <Link href={`/shop/${item.slug}`} className="font-normal text-[#2ea2cc] group-hover:text-[#F48C7F] transition-colors text-md truncate">
                      {item.name}
                    </Link>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold text-gray-900">
                        ₹{item.price}
                      </span>
                      <span className="text-gray-500 text-sm line-through">
                        ₹{item.comparePrice}
                      </span>
                      <span className="text-green-600 text-sm font-medium">
              ({Math.round(((item.comparePrice - item.price) / item.comparePrice) * 100)}% off)
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

:
<>

 <div className="flex flex-col items-center justify-center w-full py-16 px-4 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-sm border border-gray-200">
      <div className="bg-orange-100 p-6 rounded-full mb-4">
        <FiBox className="text-orange-500 w-12 h-12" />
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Product Not Found
      </h2>
      <p className="text-gray-500 text-center max-w-sm mb-6">
        We couldn’t find any products matching your search.  
        Try adjusting filters or check back later.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all duration-200"
      >
        Refresh
      </button>
    </div>

</>

          }
    


          </>
        )
        
        
        
        }
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