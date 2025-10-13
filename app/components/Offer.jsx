'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-full py-2 text-[#666] bg-white px-4 md:px-12 xl:px-24 2xl:px-40 text-sm overflow-hidden">
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-amber-100 transition-colors z-10"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Marquee Content */}
      <div className="flex items-center gap-2">
        <div className="whitespace-nowrap animate-marquee flex items-center gap-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-[#F59383]">Welcome to PETKO</span>
              <span className="text-[#4B666E]">Online Shopping Store!</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
