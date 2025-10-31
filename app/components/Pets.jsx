"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

// Simplified JSON data with product images and names only
const productData = {
  dog: [
    {
      image: "/Images/frontend/auth.webp",
      name: "Premium Dog Food"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Chew Toys"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Leather Collar"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Comfort Bed"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Organic Shampoo"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Training Leash"
    }
  ],
  cat: [
    {
      image: "/Images/frontend/auth.webp",
      name: "Dry Cat Food"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Interactive Toy"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Scratching Post"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Cat Tree House"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Clumping Litter"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Travel Carrier"
    }
  ],
  rabbit: [
    {
      image: "/Images/frontend/auth.webp",
      name: "Hay Pellets"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Chew Toys"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Soft Bed"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Spacious Cage"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Outdoor Hutch"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Healthy Treats"
    }
  ],
  reptile: [
    {
      image: "/Images/frontend/auth.webp",
      name: "Live Insects"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Heat Lamp"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Glass Terrarium"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Desert Sand"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Rock Hideout"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Water Bowl"
    }
  ],
  bird: [
    {
      image: "/Images/frontend/auth.webp",
      name: "Seed Mix"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Swing Toy"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Large Cage"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Natural Perch"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Bath House"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Auto Feeder"
    }
  ],
  fish: [
    {
      image: "/Images/frontend/auth.webp",
      name: "Flake Food"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Aquarium Decor"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Filter Pump"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Water Medicine"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Glass Tank"
    },
    {
      image: "/Images/frontend/auth.webp",
      name: "Water Heater"
    }
  ]
};

// Pet categories data with cat.png for all pets
const petCategories = {
  dog: {
    name: "Dog",
    image: "/Images/frontend/cat.png",
    description: "Everything your dog loves — from food to toys, collars, and comfy beds."
  },
  cat: {
    name: "Cat",
    image: "/Images/frontend/cat.png",
    description: "For your furry friend — find the best food, toys, and accessories."
  },
  rabbit: {
    name: "Rabbit",
    image: "/Images/frontend/cat.png",
    description: "Soft, adorable, and happy! Treat your rabbit with the best care."
  },
  reptile: {
    name: "Reptile",
    image: "/Images/frontend/cat.png",
    description: "Terrarium essentials and healthy meals for your cold-blooded buddies."
  },
  bird: {
    name: "Bird",
    image: "/Images/frontend/cat.png",
    description: "From cages to nutritious seeds — everything for your chirpy friends."
  },
  fish: {
    name: "Fish",
    image: "/Images/frontend/cat.png",
    description: "Decorate your aquarium and keep your fish healthy and happy."
  }
};

// Fallback images
const fallbackImages = {
  pet: "/Images/frontend/cat.png",
  product: "/Images/frontend/auth.webp"
};

function PetCategories() {
  const [activeTab, setActiveTab] = useState("dog");
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 2xl:mx-40 my-12 lg:my-16 ">
      {/* Header with Title and Scroll Controls */}
      <div className="flex items-start sm:items-center justify-between mb-4 gap-4 sm:gap-0">
        <h2 className="py-4 px-6 transition-colors duration-200 font-semibold text-[17px] lg:text-[22px] ">
          Shop by Pet Category
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            className="p-2 sm:p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 sm:p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
        </div>
      </div>
<div className="px-6 py-12 lg:py-16 bg-white">
      {/* Pet Category Tabs with Horizontal Scroll */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex items-center justify-start gap-4 md:gap-8 lg:gap-32 overflow-x-auto scrollbar-hide border-b border-gray-200 pb-4"
        >
          {Object.keys(petCategories).map((key) => {
            const category = petCategories[key];
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex flex-col border-b-2  items-center justify-center min-w-[70px] sm:min-w-[80px] lg:min-w-[100px] xl:min-w-[120px] cursor-pointer transition-all duration-300 flex-shrink-0 pb-2 ${
                  activeTab === key
                    ? "opacity-100 scale-105  border-[#e46959]"
                    : "border-transparent"
                }`}
              >
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, (max-width: 1024px) 80px, 96px"
                    onError={(e) => {
                      e.currentTarget.src = fallbackImages.pet;
                    }}
                  />
                </div>
                <span className="text-xs sm:text-sm lg:text-base mt-2 sm:mt-3 font-medium text-gray-700 text-center">
                  {category.name}
                </span>
              </button>
            );       
          })}
        </div>
      </div>



      {/* Products Swiper */}
<div className="mt-8 sm:mt-12 lg:mt-16">
  <div className="flex items-center justify-start gap-4 md:gap-8 lg:gap-32 overflow-x-auto scrollbar-hide  px-4">
    {productData[activeTab]?.map((product, index) => (
      <div key={index} className="cursor-default group w-40 flex-shrink-0 overflow-hidden">
        <div className="relative w-40 h-40 overflow-hidden ">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 160px, 160px"
            onError={(e) => {
              e.currentTarget.src = fallbackImages.product;
            }}
          />
        </div>

        <div className="p-3 sm:p-4">
          <h4 className="font-normal text-[#2ea2cc] group-hover:text-[#F48C7F] transition-colors text-sm sm:text-md text-center">
            {product.name}
          </h4>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default PetCategories;