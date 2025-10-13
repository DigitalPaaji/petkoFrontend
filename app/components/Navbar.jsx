"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Search,
  Heart,
} from "lucide-react";
import { LuPhone } from "react-icons/lu";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    const handleScroll = () => setScrolled(window.scrollY > 120);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Shop",
      dropdown: [
        {
          name: "Shop Pages",
          items: ["Shop Default", "Shop Carousel", "Woo Pages", "Order Tracking"],
        },
      ],
    },
    {
      name: "Pages",
      dropdown: [
        {
          name: "General Pages",
          items: ["About Us", "Contact", "FAQs", "Coming Soon", "Become a Vendor"],
        },
      ],
    },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      {/* ----------------- MAIN NAVBAR (before scroll) ----------------- */}
      {!scrolled && (

  <nav
  className=' w-full bg-white z-[999] transition-all duration-500 ease-out '
>

          {/* Top Section */}
          <div className="flex items-center justify-between py-4 px-4 md:px-12 xl:px-24 2xl:px-40">
            {/* Logo */}
            <Link href="/" className="w-32 md:w-36">
              <Image
                src="/Images/logo.webp"
                alt="Logo"
                width={440}
                height={440}
                className="w-full h-auto object-cover"
              />
            </Link>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center justify-center gap-0.5 w-[500px]">
              <input
                type="search"
                placeholder="Search Pet Accessories"
                className="w-full px-6 py-1.5 border border-[#6666664d] rounded-md"
              />
              <button className="text-md text-white font-semibold bg-[#F48C7F] px-4 py-1.5 rounded-md">
                Search
              </button>
            </div>

            {/* Hotline */}
            <div className="hidden xl:flex items-center gap-2">
              <LuPhone className="w-6 h-6 text-[#666]" />
              <div>
                <h4 className="text-md font-medium text-[#666]">Hotline</h4>
                <h3 className="font-semibold text-md">1-800-234-5678</h3>
              </div>
            </div>

            {/* Icons + Hamburger */}
            <div className="flex items-center space-x-3 lg:space-x-6">
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-7 h-7 text-gray-600 hover:text-[#F48C7F]" />
                <span className="absolute -top-3 -right-3 bg-[#F48C7F] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
              <Heart className="w-7 h-7 text-gray-600 hover:text-[#F48C7F]" />
              <User className="w-7 h-7 text-gray-600 hover:text-[#F48C7F]" />

              {/* Hamburger */}
              <button
                className="lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                {isOpen ? (
                  <X className="w-7 h-7 text-gray-700 transition-transform transform rotate-180 duration-300" />
                ) : (
                  <Menu className="w-7 h-7 text-gray-700 transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>

          {/* Bottom Nav Links */}

        
        <div className="hidden lg:flex items-center justify-between px-4 md:px-12 xl:px-24 2xl:px-40 navbar-container">
  {/* ---------- LEFT NAV LINKS ---------- */}
  <div className="flex space-x-8 nav-links">
    {navLinks.map((link, index) => (
      <div
        key={link.name}
        className="relative group"
        onMouseEnter={() => setActiveDropdown(index)}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <Link
          href={link.href || "#"}
          className="font-medium py-4 text-[#666] hover:text-[#F48C7F] flex items-center gap-1 relative"
        >
          {link.name}
          {link.dropdown && (
            <RiArrowDropDownLine className="text-2xl" />
          )}
        </Link>

        {/* Dropdown Menu */}
        {link.dropdown && activeDropdown === index && (
          <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-md p-4 mt-1 shadow-lg z-50 w-52">
            {link.dropdown.map((section) => (
              <div key={section.name}>
                <h4 className="font-semibold text-[#333] mb-2 text-sm">
                  {section.name}
                </h4>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="block py-1 text-[#555] hover:text-[#F48C7F] text-sm"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>

  {/* ---------- RIGHT WISHLIST ---------- */}
  <div className="flex items-center space-x-2 text-sm text-[#2ea2cc]">
    <Heart className="w-5 h-5" />
    <span className="bg-[#F48C7F] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
      0
    </span>
    <h3 className="text-md font-medium">YOUR WISHLIST</h3>
  </div>
</div>

        
          {/* <div className="hidden lg:flex items-center justify-between px-4 md:px-12 xl:px-24 2xl:px-40 border-y border-[#eee]">
            <div className="flex space-x-8">
              {navLinks.map((link, index) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href || "#"}
                    className="font-medium py-4 text-[#666] hover:text-[#F48C7F] flex items-center gap-1"
                  >
                    {link.name}
                    {link.dropdown && <RiArrowDropDownLine className="text-2xl" />}
                  </Link>

                  {link.dropdown && activeDropdown === index && (
                    <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-md p-4 mt-1 shadow-lg z-50 w-52">
                      {link.dropdown.map((section) => (
                        <div key={section.name}>
                          <h4 className="font-semibold text-[#333] mb-2 text-sm">
                            {section.name}
                          </h4>
                          <ul>
                            {section.items.map((item) => (
                              <li key={item}>
                                <Link
                                  href="#"
                                  className="block py-1 text-[#555] hover:text-[#F48C7F] text-sm"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2 text-sm text-[#2ea2cc]">
              <Heart className="w-5 h-5" />
              <span className="bg-[#F48C7F] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
              <h3 className="text-md font-medium">YOUR WISHLIST</h3>
            </div>
          </div> */}



        </nav>
      )}

      {/* ----------------- SCROLLED NAV ----------------- */}
      {scrolled && (
        <nav
     
         data-aos="fade-down"
          data-aos-offset="100"
          data-aos-duration="800"
     
  className={`fixed top-0 left-0 w-full bg-white z-[999] transition-all duration-500 ease-out translate-y-0 opacity-100`}
>

          {/* Top Section */}
          <div className="flex items-center justify-between py-4 px-4 md:px-12 xl:px-24 2xl:px-40">
            {/* Logo */}
            <Link href="/" className="w-32 md:w-36">
              <Image
                src="/Images/logo.webp"
                alt="Logo"
                width={440}
                height={440}
                className="w-full h-auto object-cover"
              />
            </Link>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center justify-center gap-0.5 w-[500px]">
              <input
                type="search"
                placeholder="Search Pet Accessories"
                className="w-full px-6 py-1.5 border border-[#6666664d] rounded-md"
              />
              <button className="text-md text-white font-semibold bg-[#F48C7F] px-4 py-1.5 rounded-md">
                Search
              </button>
            </div>

            {/* Hotline */}
            <div className="hidden xl:flex items-center gap-2">
              <LuPhone className="w-6 h-6 text-[#666]" />
              <div>
                <h4 className="text-md font-medium text-[#666]">Hotline</h4>
                <h3 className="font-semibold text-md">1-800-234-5678</h3>
              </div>
            </div>

            {/* Icons + Hamburger */}
            <div className="flex items-center space-x-3 lg:space-x-6">
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-7 h-7 text-gray-600 hover:text-[#F48C7F]" />
                <span className="absolute -top-3 -right-3 bg-[#F48C7F] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
              <Heart className="w-7 h-7 text-gray-600 hover:text-[#F48C7F]" />
              <User className="w-7 h-7 text-gray-600 hover:text-[#F48C7F]" />

              {/* Hamburger */}
              <button
                className="lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                {isOpen ? (
                  <X className="w-7 h-7 text-gray-700 transition-transform transform rotate-180 duration-300" />
                ) : (
                  <Menu className="w-7 h-7 text-gray-700 transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>


        </nav>
      )}

      {/* ----------------- SIDEBAR ----------------- */}
      <div
        className={`fixed lg:hidden top-0 right-0 h-full w-[80%] md:w-[40%] bg-white text-[#3e5f68] shadow-lg transform transition-transform duration-300 z-[1000] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 h-[80px] border-b border-[#2D4B52]/20">
          <Link href="/" className="w-24" onClick={() => setIsOpen(false)}>
            <Image
              src="/Images/logo.webp"
              alt="Logo"
              width={220}
              height={220}
              className="w-full h-auto object-cover"
            />
          </Link>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col space-y-6 px-6 py-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href || "#"}
              className="text-lg font-semibold hover:text-[#F48C7F] transition"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[900]"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}