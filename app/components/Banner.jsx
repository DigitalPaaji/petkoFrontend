'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function HeroBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample pet-related banner images
  const sampleBanners = [
    {
      mobileImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&h=800&fit=crop",
      desktopImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&h=600&fit=crop",
      alt: "Happy dog playing in garden"
    },
    {
      mobileImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=800&fit=crop",
      desktopImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=600&fit=crop",
      alt: "Cute cat with beautiful eyes"
    },
    {
      mobileImage: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=800&fit=crop",
      desktopImage: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1200&h=600&fit=crop",
      alt: "Dog and cat together"
    },
    {
      mobileImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=800&fit=crop",
      desktopImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&h=600&fit=crop",
      alt: "Pet supplies and accessories"
    }
  ];

  const fetchBanners = useCallback(async () => {
    try {
      // Commented out backend API call
      // const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/banner`);
      // const data = await res.json();
      // setBanners(data);
      
      // Using sample data for now
      setBanners(sampleBanners);
    } catch (err) {
      console.error("Error fetching banners:", err);
      // Fallback to sample data in case of error
      setBanners(sampleBanners);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  if (loading) {
    // Skeleton placeholder
    return (
      <div className="relative w-full h-[300px] xl:h-[700px] bg-stone-200 animate-pulse flex items-center justify-center">
        <div className=" rounded-lg animate-pulse" />
      </div>
    );
  }

  if (!loading && banners.length === 0) return null; // nothing to render

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
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={banner.mobileImage}
                alt={banner.alt || "Mobile Banner"}
                className="block lg:hidden w-full h-full object-cover"
              />
              <img
                src={banner.desktopImage}
                alt={banner.alt || "Desktop Banner"}
                className="hidden lg:block w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom CSS for pagination dots */}
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