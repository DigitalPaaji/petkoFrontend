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
  const [activeTab, setActiveTab] = useState("trending");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data for different categories
  const productData = {
    trending: [
      {
        _id: "1",
        name: "Premium Dog Collar",
        category: { _id: "cat1", name: "Dog Accessories" },
        subcategory: { _id: "sub1", name: "Collars" },
        price: 1299,
        finalPrice: 999,
        discount: 23,
        description: {
          paragraphs: [
            "Premium leather dog collar with adjustable fit and secure buckle.",
            "Perfect for everyday walks and outdoor adventures.",
          ],
        },
        images: [
          "https://images.unsplash.com/photo-1554456854-55a089fd4cb2?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&h=500&fit=crop",
        ],
        tags: [{ name: "Popular" }, { name: "Durable" }],
      },
      {
        _id: "2",
        name: "Interactive Cat Toy Set",
        category: { _id: "cat2", name: "Cat Toys" },
        subcategory: { _id: "sub2", name: "Interactive" },
        price: 899,
        finalPrice: 699,
        discount: 22,
        description: {
          paragraphs: [
            "Set of interactive toys to keep your cat engaged and active.",
            "Includes feather wands, laser pointer, and crinkle balls.",
          ],
        },
        images: [
          "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=500&fit=crop",
        ],
        tags: [{ name: "Interactive" }, { name: "Fun" }],
      },
      {
        _id: "3",
        name: "Luxury Pet Bed",
        category: { _id: "cat3", name: "Pet Furniture" },
        subcategory: { _id: "sub3", name: "Beds" },
        price: 2499,
        finalPrice: 1999,
        discount: 20,
        description: {
          paragraphs: [
            "Orthopedic memory foam pet bed for ultimate comfort.",
            "Waterproof lining and removable washable cover.",
          ],
        },
        images: [
          "https://images.unsplash.com/photo-1559013514-75a6b44e2c83?w=500&h=500&fit=crop",
        ],
        tags: [{ name: "Comfort" }, { name: "Luxury" }],
      },
      {
        _id: "4",
        name: "Automatic Pet Feeder",
        category: { _id: "cat4", name: "Pet Tech" },
        subcategory: { _id: "sub4", name: "Feeders" },
        price: 3499,
        finalPrice: 2799,
        discount: 20,
        description: {
          paragraphs: [
            "Smart automatic pet feeder with portion control and scheduling.",
            "App-controlled with camera for remote monitoring.",
          ],
        },
        images: [
          "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=500&h=500&fit=crop",
        ],
        tags: [{ name: "Smart" }, { name: "Automatic" }],
      },
      {
        _id: "5",
        name: "Pet Grooming Kit",
        category: { _id: "cat5", name: "Grooming" },
        subcategory: { _id: "sub5", name: "Tools" },
        price: 1599,
        finalPrice: 1199,
        discount: 25,
        description: {
          paragraphs: [
            "Complete grooming kit for all your pet's hygiene needs.",
            "Includes brushes, nail clippers, and shampoo.",
          ],
        },
        images: [
          "https://images.unsplash.com/photo-1560743641-3914f2c45636?w=500&h=500&fit=crop",
        ],
        tags: [{ name: "Grooming" }, { name: "Essential" }],
      },
    ],
    newArrivals: [
      {
        _id: "6",
        name: "GPS Pet Tracker",
        category: { _id: "cat4", name: "Pet Tech" },
        subcategory: { _id: "sub6", name: "Trackers" },
        price: 4499,
        finalPrice: 3599,
        discount: 20,
        description: {
          paragraphs: [
            "Advanced GPS tracker with real-time location monitoring.",
            "Waterproof and long battery life up to 2 weeks.",
          ],
        },
        images: [
          "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=500&fit=crop",
        ],
        tags: [{ name: "New" }, { name: "GPS" }],
      },
      {
        _id: "7",
        name: "Eco-Friendly Pet Bowls",
        category: { _id: "cat6", name: "Feeding" },
        subcategory: { _id: "sub7", name: "Bowls" },
        price: 799,
        finalPrice: 599,
        discount: 25,
        description: {
          paragraphs: [
            "Sustainable bamboo pet bowls with non-slip base.",
            "Available in multiple sizes for different breeds.",
          ],
        },
        images: [
          "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500&h=500&fit=crop",
        ],
        tags: [{ name: "Eco-Friendly" }, { name: "New" }],
      },
      {
        _id: "8",
        name: "Heated Pet Mat",
        category: { _id: "cat3", name: "Pet Furniture" },
        subcategory: { _id: "sub8", name: "Comfort" },
        price: 1899,
        finalPrice: 1499,
        discount: 21,
        description: {
          paragraphs: [
            "Self-warming pet mat for cold weather comfort.",
            "Energy-efficient and safe for all pets.",
          ],
        },
        images: [
          "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&h=500&fit=crop",
        ],
        tags: [{ name: "New" }, { name: "Comfort" }],
      },
      {
        _id: "9",
        name: "Portable Pet Water Bottle",
        category: { _id: "cat7", name: "Travel" },
        subcategory: { _id: "sub9", name: "Hydration" },
        price: 499,
        finalPrice: 399,
        discount: 20,
        description: {
          paragraphs: [
            "Leak-proof portable water bottle with built-in bowl.",
            "Perfect for walks, hikes, and travel.",
          ],
        },
        images: [
          "https://images.unsplash.com/photo-1504595403659-9088ce801e17?w=500&h=500&fit=crop",
        ],
        tags: [{ name: "Portable" }, { name: "New" }],
      },
    ],
    bestSellers: [
      {
        _id: "10",
        name: "Durable Chew Toys",
        category: { _id: "cat8", name: "Toys" },
        subcategory: { _id: "sub10", name: "Chew" },
        price: 699,
        finalPrice: 499,
        discount: 29,
        description: {
          paragraphs: [
            "Indestructible chew toys for aggressive chewers.",
            "Made from natural rubber, safe for dental health.",
          ],
        },
        images: [
          "https://images.unsplash.com/photo-1558322397-4f2cb99d2d91?w=500&h=500&fit=crop",
        ],
        tags: [{ name: "Bestseller" }, { name: "Durable" }],
      },
      {
        _id: "11",
        name: "Pet Carrier Backpack",
        category: { _id: "cat7", name: "Travel" },
        subcategory: { _id: "sub11", name: "Carriers" },
        price: 2999,
        finalPrice: 2299,
        discount: 23,
        description: {
          paragraphs: [
            "Ventilated pet carrier backpack with safety features.",
            "Comfortable for both pet and owner during travel.",
          ],
        },
        images: [
          "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop",
        ],
        tags: [{ name: "Bestseller" }, { name: "Travel" }],
      },
      {
        _id: "12",
        name: "Organic Pet Shampoo",
        category: { _id: "cat5", name: "Grooming" },
        subcategory: { _id: "sub12", name: "Bathing" },
        price: 599,
        finalPrice: 449,
        discount: 25,
        description: {
          paragraphs: [
            "Natural organic shampoo for sensitive skin.",
            "pH balanced with essential oils for healthy coat.",
          ],
        },
        images: [
          "https://images.unsplash.com/photo-1601758064237-260b4c3c7a08?w=500&h=500&fit=crop",
        ],
        tags: [{ name: "Bestseller" }, { name: "Organic" }],
      },
      {
        _id: "13",
        name: "Training Treat Pouch",
        category: { _id: "cat9", name: "Training" },
        subcategory: { _id: "sub13", name: "Accessories" },
        price: 399,
        finalPrice: 299,
        discount: 25,
        description: {
          paragraphs: [
            "Convenient treat pouch for training sessions.",
            "Magnetic closure and adjustable belt clip.",
          ],
        },
        images: [
          "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=500&fit=crop",
        ],
        tags: [{ name: "Bestseller" }, { name: "Training" }],
      },
      {
        _id: "14",
        name: "Calming Pet Diffuser",
        category: { _id: "cat10", name: "Wellness" },
        subcategory: { _id: "sub14", name: "Calming" },
        price: 1299,
        finalPrice: 999,
        discount: 23,
        description: {
          paragraphs: [
            "Plug-in diffuser with calming pheromones for anxious pets.",
            "Covers up to 700 square feet, lasts 30 days.",
          ],
        },
        images: [
          "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=500&h=500&fit=crop",
        ],
        tags: [{ name: "Bestseller" }, { name: "Wellness" }],
      },
    ],
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    // Simulate API call
    setTimeout(() => {
      setProducts(productData[activeTab]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setLoading(true);
    // Simulate API call when tab changes
    setTimeout(() => {
      setProducts(productData[activeTab]);
      setLoading(false);
    }, 500);
  }, [activeTab]);

  const loop = [...products, ...products];

  const tabs = [
    { id: "trending", label: "Trending Products" },
    { id: "newArrivals", label: "New Arrivals" },
    { id: "bestSellers", label: "Best Sellers" },
  ];

  return (
    <div className="mx-4 md:mx-12 xl:mx-24 2xl:mx-40 my-16 p-6 lg:p-8">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 md:gap-4 border-b border-[#6666664d]">
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
              <SwiperSlide key={`${item._id}-${idx}`}>
                <div className="cursor-default group w-full bg-white overflow-hidden transition-transform duration-300 border border-transparent hover:border-[#6666664d]">
                  <div className="relative w-full aspect-square overflow-hidden">
                    <img
                      src={item.images?.[0]}
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
                    <h4 className="font-normal text-[#2ea2cc] group-hover:text-[#F48C7F] transition-colors text-md truncate">
                      {item.name}
                    </h4>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold text-gray-900">
                        ₹{item.finalPrice}
                      </span>
                      <span className="text-gray-500 text-sm line-through">
                        ₹{item.price}
                      </span>
                      <span className="text-green-600 text-sm font-medium">
                        ({item.discount}% off)
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