'use client';
import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  // 🐾 Sample category data for now
  const categories = [
    { _id: '1', name: 'Dog Supplies' },
    { _id: '2', name: 'Cat Supplies' },
    { _id: '3', name: 'Bird Essentials' },
    { _id: '4', name: 'Pet Grooming' },
  ];

  function formatCategoryPath(name) {
    return name.trim().toLowerCase().replace(/\s+/g, '-');
  }

  function formatCategoryLabel(name) {
    return name
      .trim()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <footer className="bg-white text-[#666] border-t border-[#f0f0f0] mt-16">
      <div className="px-4 md:px-12 xl:px-24 2xl:px-40 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* ------------ LOGO + SOCIAL ------------ */}
          <div>
            <img src="/Images/frontend/logo.webp" alt="Pet Paradise" className="h-16 mb-4" />
            <p className="text-sm text-[#666]">
              Your one-stop destination for all your pet's needs.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-[#666] hover:text-[#F48C7F]"><Facebook size={18} /></a>
              <a href="#" className="text-[#666] hover:text-[#F48C7F]"><Instagram size={18} /></a>
              <a href="#" className="text-[#666] hover:text-[#F48C7F]"><Twitter size={18} /></a>
              <a href="#" className="text-[#666] hover:text-[#F48C7F]"><Youtube size={18} /></a>
            </div>
          </div>

          {/* ------------ SHOP ------------ */}
          <div>
            <h3 className="text-[#2ea2cc] text-md font-semibold mb-2">Shop</h3>
            <ul className="text-[#666] space-y-1">
              {categories.map((cat) => (
                <li key={cat._id}>
                  <Link
                    href={`/category/${formatCategoryPath(cat.name)}/${cat._id}`}
                    className="hover:text-[#F48C7F] transition-colors"
                  >
                    {formatCategoryLabel(cat.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ------------ USEFUL LINKS ------------ */}
          <div>
            <h3 className="text-[#2ea2cc] text-md font-semibold mb-2">Useful Links</h3>
            <ul className="text-[#666] space-y-1">
              <li><Link href="/delivery-information" className="hover:text-[#F48C7F]">Delivery Information</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#F48C7F]">Return & Refund Policy</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#F48C7F]">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-[#F48C7F]">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* ------------ CUSTOMER SERVICE ------------ */}
          <div>
            <h3 className="text-[#2ea2cc] text-md font-semibold mb-2">Customer Service</h3>
            <ul className="text-[#666] space-y-1">
              <li><Link href="/contact" className="hover:text-[#F48C7F]">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-[#F48C7F]">FAQ</Link></li>
              <li><Link href="/about" className="hover:text-[#F48C7F]">About Us</Link></li>
            </ul>
          </div>
        </div>

        {/* ------------ COPYRIGHT ------------ */}
        <div className="border-t border-[#eee] mt-12 pt-8 text-center text-sm text-[#666]">
          <p>
            &copy; {new Date().getFullYear()} Pet Paradise. Designed & Developed by{" "}
            <a href="https://digitalpaaji.com" className="text-[#F48C7F] hover:text-[#2ea2cc] font-semibold">
              Digital Paaji
            </a>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
