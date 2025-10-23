"use client";
import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

export default function PopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    // Open popup after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Handle outside click to close popup
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999]"
        onClick={handleClickOutside}
      >
        {/* Modal Content */}
        <div
          ref={modalRef}
          className="relative w-[600px]  h-[500px] mt-40 aspect-square  mx-auto animate-fadeOut p-6 lg:p-0 "
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute -top-4 -right-4 text-gray-600 hover:text-black  cursor-pointer"
          >
            <X size={22} />
          </button>

          {/* Static Image for Now */}
          <img
            src="/Images/frontend/popup.webp"
            alt="Popup Banner"
            className="w-full h-[100%] object-contain "
          />
        </div>
      </div>
    </div>
  );
}
