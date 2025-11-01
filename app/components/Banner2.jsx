"use client";

import Image from "next/image";
import React from "react";

function Banner() {
  // Temporary static array (can later be fetched from backend)
  const categories = [
    { id: 1, name: "Dog Accessories", img: "/Images/frontend/cat.png" },
    { id: 2, name: "Dog Food", img: "/Images/frontend/cat.png" },
    { id: 3, name: "Dog Toys", img: "/Images/frontend/cat.png" },
    { id: 4, name: "Dog Grooming", img: "/Images/frontend/cat.png" },
    { id: 5, name: "Cat Accessories", img: "/Images/frontend/cat.png" },
    { id: 6, name: "Cat Food", img: "/Images/frontend/cat.png" },
    { id: 7, name: "Cat Toys", img: "/Images/frontend/cat.png" },
    { id: 8, name: "Pet Health", img: "/Images/frontend/cat.png" },
    { id: 9, name: "Pet Cleaning", img: "/Images/frontend/cat.png" },
  ];

  return (
    <div className="flex flex-wrap xl:flex-nowrap h-[600px] px-4 md:px-12 xl:px-24 2xl:px-40 py-16 gap-4 xl:gap-6">
      
      {/* LEFT: Category Section */}
      <div className="w-full xl:w-[20%] h-full p-4 xl:p-6 bg-white rounded-lg shadow-sm overflow-y-scroll">
        <h4 className="text-lg xl:text-xl font-semibold text-center">
          SHOP BY CATEGORY
        </h4>

<div className="mt-4 max-h-[500px] ">
  <ul className="divide-y divide-[#66666625]">
    {categories.map((cat) => (
      <li
        key={cat.id}
        className="flex items-center gap-3 text-base xl:text-lg px-3 py-2 hover:bg-gray-50 rounded-md cursor-pointer transition"
      >
        <Image
          width={44}
          height={44}
          alt={cat.name}
          src={cat.img}
          className="w-10 h-auto object-cover"
        />
        <span className="text-gray-800 text-left">{cat.name}</span>
      </li>
    ))}
  </ul>
</div>


      </div>

      {/* RIGHT: Banner Section */}
      <div className="w-full xl:w-[80%] lg:grid lg:grid-cols-12 h-full bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="lg:col-span-7">
          <Image
            width={440}
            height={440}
            alt="Main Banner"
            src={"/Images/frontend/b1.webp"}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-5 flex flex-col h-full">
          <div className="flex items-center h-1/2">
            <Image
              width={440}
              height={440}
              alt="Banner 2"
              src={"/Images/frontend/b2.webp"}
              className="w-1/2 h-full object-cover"
            />
            <Image
              width={440}
              height={440}
              alt="Banner 3"
              src={"/Images/frontend/b4.webp"}
              className="w-1/2 h-full object-cover"
            />
          </div>
          <div className="h-1/2">
            <Image
              width={440}
              height={440}
              alt="Banner 4"
              src={"/Images/frontend/b3.webp"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
