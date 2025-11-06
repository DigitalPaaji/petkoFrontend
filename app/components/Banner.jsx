'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import axios from 'axios';
import { baseurl, imgurl } from '../admin/components/apis';

export default function HeroBanner() {

  const [loading, setLoading] = useState(true);
  const [banners2, setBanners2] = useState([]);










const fetchBanners2 = async()=>{
  try {
    const response = await axios.get(`${baseurl}/banner`)
    const data = await response.data;
    if(data.success){
      setBanners2(data.banners)
    }


  } catch (error) {
    
  }
        setLoading(false);

}

  useEffect(() => {
    fetchBanners2();
  }, []);







  if (loading) {
    // Skeleton placeholder
    return (
      <div className="relative w-full h-[300px] xl:h-[700px] bg-stone-200 animate-pulse flex items-center justify-center">
        <div className=" rounded-lg animate-pulse" />
      </div>
    );
  }


  return (
    <section className="relative w-full h-[600px] md:h-[700px] xl:h-[800px] 2xl:h-[850px]">

 <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full relative h-full"
      >
        {banners2.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={`${imgurl}/uploads/${banner.imagemobile}`}
                alt={banner.image || "Mobile Banner"}
                className="block lg:hidden w-full h-full object-cover"
              />
              <img
                src={`${imgurl}/uploads/${banner.imagedesktop}`}
                alt={banner.image || "Mobile Banner"}
                className="hidden lg:block w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>












      <style jsx global>{`
        /* swiper dots */
        .swiper-pagination {
          position: absolute !important;
          bottom: 0px !important;
          text-align: center;
          width: 100%;
          z-index: 10;
        }

        .swiper-pagination-bullet {
          background-color: #F48C7F !important;
          opacity: 1 !important;
          width: 14px !important;
          height: 14px !important;
          margin: 0 6px !important;
          transition: background 0.3s ease;
          
          clip-path: polygon(
            50% 0%,   /* Top */
            100% 50%, /* Right */
            50% 100%, /* Bottom */
            0% 50%    /* Left */
          );
        }

        .swiper-pagination-bullet-active {
          background-color: #fff5e1 !important;
          transform: scale(1.1);
        }

        /* Custom Scrollbar for thumbnails */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #ccc;
          border-radius: 3px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #fff5e1 transparent;
        }

        button{
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}