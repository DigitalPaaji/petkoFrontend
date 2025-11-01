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
  const petsScrollRef = useRef(null);
  const productsScrollRef = useRef(null);

  const scrollPetsLeft = () => {
    if (petsScrollRef.current) {
      petsScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollPetsRight = () => {
    if (petsScrollRef.current) {
      petsScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const scrollProductsLeft = () => {
    if (productsScrollRef.current) {
      productsScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollProductsRight = () => {
    if (productsScrollRef.current) {
      productsScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-16 px-4 md:px-12 xl:px-24 2xl:px-40">
      {/* Header with Title */}
      <div className="mb-8">
        {/* <h2 className="font-semibold text-[17px] lg:text-[22px] text-center">
          Shop by Pet Category
        </h2> */}
      </div>

      <div className="bg-white border border-gray-100 p-6">
        {/* Pet Categories Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-8">
                   <h2 className="font-semibold text-[17px] lg:text-[22px] text-center">
          Shop by Pet Category
        </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPetsLeft}
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                aria-label="Scroll pet categories left"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={scrollPetsRight}
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                aria-label="Scroll pet categories right"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div
            ref={petsScrollRef}
            className="flex items-center justify-between gap-6 overflow-x-auto scrollbar-hide pb-2"
          >
            {Object.keys(petCategories).map((key) => {
              const category = petCategories[key];
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex flex-col items-center justify-center min-w-[100px] cursor-pointer transition-all duration-300 flex-shrink-0 p-3 border-b ${
                    activeTab === key
                      ? "border-[#e46959] "
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <div className="relative w-16 lg:w-24 h-16 lg:h-24 mb-2">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                      onError={(e) => {
                        e.currentTarget.src = fallbackImages.pet;
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Section */}
        <div className="p-6">
          <div className="flex items-center justify-end mb-4">
           
            <div className="flex items-center gap-2">
              <button
                onClick={scrollProductsLeft}
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                aria-label="Scroll products left"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={scrollProductsRight}
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                aria-label="Scroll products right"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div
            ref={productsScrollRef}
            className="flex items-center gap-8 justify-between overflow-x-auto scrollbar-hide pb-2"
          >
            {productData[activeTab]?.map((product, index) => (
              <div key={index} className="cursor-default group w-48 flex-shrink-0">
                <div className="relative w-36 h-36 overflow-hidden rounded-lg mb-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="192px"
                    onError={(e) => {
                      e.currentTarget.src = fallbackImages.product;
                    }}
                  />
                </div>

                <div className="text-center">
                  <h4 className="font-normal text-[#2ea2cc] group-hover:text-[#F48C7F] transition-colors text-sm">
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