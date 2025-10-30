import Image from "next/image";
import React from "react";

function Banner() {
  return (
    <div 
    className="flex flex-wrap xl:flex-nowrap px-4 md:px-12 xl:px-24 2xl:px-40 py-16 gap-4 xl:gap-6">
      <div className="w-full xl:w-[20%] h-full p-4 xl:p-6 bg-white ">
        <h4 className="text-lg xl:text-xl font-semibold">SHOP BY CATEGORY</h4>
        <ul className="space-y-2  mt-3 text-center">
          <li className="flex items-center gap-2 text-lg">
            <Image
              width={44}
              height={44}
              alt=""
              src={"/Images/frontend/cat.png"}
              className="w-10 h-auto object-cover "
            />
            Dog Accessories
          </li>
          <hr className="text-[#66666652]"/>
          <li className="flex items-center gap-2 text-lg">
            <Image
              width={44}
              height={44}
              alt=""
              src={"/Images/frontend/cat.png"}
              className="w-10 h-auto object-cover "
            />
            Dog Accessories
          </li>
          <hr className="text-[#66666652]"/>

<li className="flex items-center gap-2 text-lg">
            <Image
              width={44}
              height={44}
              alt=""
              src={"/Images/frontend/cat.png"}
              className="w-10 h-auto object-cover "
            />
            Dog Accessories
          </li>
          <hr className="text-[#66666652]"/>

          <li className="flex items-center gap-2 text-lg">
            <Image
              width={44}
              height={44}
              alt=""
              src={"/Images/frontend/cat.png"}
              className="w-10 h-auto object-cover "
            />
            Dog Accessories
          </li>
          <hr className="text-[#66666652]"/>

          <li className="flex items-center gap-2 text-lg">
            <Image
              width={44}
              height={44}
              alt=""
              src={"/Images/frontend/cat.png"}
              className="w-10 h-auto object-cover "
            />
            Dog Accessories
          </li>

                <hr className="text-[#66666652]"/>

          <li className="flex items-center gap-2 text-lg">
            <Image
              width={44}
              height={44}
              alt=""
              src={"/Images/frontend/cat.png"}
              className="w-10 h-auto object-cover "
            />
            Dog Accessories
          </li>
                {/* <hr className="text-[#66666652]"/>

          <li className="flex items-center gap-2 text-lg">
            <Image
              width={44}
              height={44}
              alt=""
              src={"/Images/frontend/cat.png"}
              className="w-10 h-auto object-cover "
            />
            Dog Accessories
          </li> */}
          
        </ul>
      </div>
      <div className="w-full xl:w-[80%] lg:grid lg:grid-cols-12 h-full bg-white ">
        <div className="lg:col-span-7 ">
          <Image
            width={440}
            height={440}
            alt=""
            src={"/Images/frontend/b1.webp"}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="col-span-5 flex-col h-full ">
          <div className="flex items-center  h-1/2">
            <Image
              width={440}
              height={440}
              alt=""
              src={"/Images/frontend/b2.webp"}
              className="w-1/2 h-full object-cover "
            />
            <Image
              width={440}
              height={440}
              alt=""
              src={"/Images/frontend/b4.webp"}
              className="w-1/2 h-full object-cover "
            />
          </div>
          <div className=" h-1/2">
            <Image
              width={440}
              height={440}
              alt=""
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