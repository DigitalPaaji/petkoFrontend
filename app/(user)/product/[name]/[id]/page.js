"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import {
  ShoppingCart,
  CreditCard,
  Heart,
} from "lucide-react";
import { FaHeart } from "react-icons/fa";

// Static product data
const staticProducts = [
  {
    _id: "1",
    name: "Elegant Gold Rakhi",
    category: {
      _id: "cat1",
      name: "Rakhi"
    },
    subcategory: {
      _id: "sub1",
      name: "Premium Rakhi"
    },
    price: 999,
    finalPrice: 799,
    discount: 20,
    description: {
      paragraphs: [
        "This elegant gold Rakhi is crafted with precision and care, featuring intricate designs that symbolize the bond between siblings.",
        "Made with high-quality materials to ensure durability and beauty."
      ],
      bulletPoints: [
        "24K Gold Plated",
        "Waterproof coating",
        "Elegant packaging included",
        "Perfect for festive occasions"
      ]
    },
    images: [
      "/Images/frontend/img.webp",
      "/Images/frontend/img.webp",
      "/Images/frontend/img.webp",
      "/Images/frontend/img.webp"
    ],
    colorVariants: [
      {
        colorName: "Gold",
        quantity: 15
      },
      {
        colorName: "Silver",
        quantity: 8
      },
      {
        colorName: "Rose Gold",
        quantity: 12
      }
    ],
    tags: [
      { name: "Premium" },
      { name: "Festive" },
      { name: "Traditional" }
    ]
  },
  {
    _id: "2",
    name: "Silver Thread Rakhi",
    category: {
      _id: "cat1",
      name: "Rakhi"
    },
    subcategory: {
      _id: "sub2",
      name: "Traditional Rakhi"
    },
    price: 599,
    finalPrice: 499,
    discount: 17,
    description: {
      paragraphs: [
        "Traditional silver thread Rakhi with authentic design patterns passed down through generations.",
        "Perfect for those who appreciate classic designs with modern durability."
      ],
      bulletPoints: [
        "Pure silver threads",
        "Handcrafted design",
        "Comfortable wear",
        "Traditional motifs"
      ]
    },
    images: [
      "/Images/frontend/img.webp",
      "/Images/frontend/img.webp",
      "/Images/frontend/img.webp"
    ],
    colorVariants: [
      {
        colorName: "Silver",
        quantity: 20
      },
      {
        colorName: "White",
        quantity: 10
      }
    ],
    tags: [
      { name: "Traditional" },
      { name: "Handmade" }
    ]
  }
];

// Local storage helper functions
const getLocalStorage = (key, defaultValue) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

const setLocalStorage = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Local state for cart, wishlist, etc.
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [flipped, setFlipped] = useState([false, false, false]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);

  // Initialize from localStorage
  useEffect(() => {
    setWishlist(getLocalStorage('wishlist', []));
    setCart(getLocalStorage('cart', []));
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    setLocalStorage('wishlist', wishlist);
  }, [wishlist]);

  useEffect(() => {
    setLocalStorage('cart', cart);
  }, [cart]);

  // Mock functions to replace Global Context
  const addToWishlist = (productId) => {
    const productToAdd = staticProducts.find(p => p._id === productId);
    if (productToAdd && !wishlist.some(w => w._id === productId)) {
      setWishlist(prev => [...prev, productToAdd]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item._id !== productId));
  };

  const addToCart = (productData) => {
    const cartItem = {
      _id: productData._id,
      name: productData.name,
      price: productData.finalPrice,
      originalPrice: productData.price,
      image: productData.images[0],
      color: productData.color,
      qty: productData.qty || 1,
      maxQuantity: productData.colorVariants?.find(v => v.colorName === productData.color)?.quantity || 1
    };

    setCart(prev => {
      const existingItem = prev.find(item => 
        item._id === cartItem._id && item.color === cartItem.color
      );
      
      if (existingItem) {
        return prev.map(item =>
          item._id === cartItem._id && item.color === cartItem.color
            ? { ...item, qty: Math.min(item.qty + cartItem.qty, item.maxQuantity) }
            : item
        );
      } else {
        return [...prev, cartItem];
      }
    });
  };

  const updateQty = (productId, newQty, color) => {
    setCart(prev =>
      prev.map(item =>
        item._id === productId && item.color === color
          ? { ...item, qty: newQty }
          : item
      )
    );
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const toggleFlip = (index) => {
    setFlipped((prev) => prev.map((f, i) => (i === index ? !f : f)));
  };

  const cards = [
    {
      img: "/Images/frontend/shipping.webp",
      frontTitle: "Shipping Policy",
      frontSubtitle: "Free shipping on orders above ₹499",
      backContent: (
        <div className="text-sm space-y-1">
          <div>International delivery in 8-10 days</div>
          <div>Order Rakhi early to ensure timely delivery</div>
          <div className="italic text-stone-700">
            *Delivery times may vary by location
          </div>
        </div>
      ),
    },
    {
      img: "/Images/frontend/return.webp",
      frontTitle: "Returns & Refunds",
      frontSubtitle: "Easy 10-day returns",
      backContent: (
        <div className="list-disc list-inside text-sm space-y-1">
          <p>Rakhi items are non-returnable</p>
          <p>Lab-grown jewellery requires quality check</p>
          <p>All items with certificate & box must be returned</p>
        </div>
      ),
    },
    {
      img: "/Images/frontend/care.webp",
      frontTitle: "Care Instructions",
      frontSubtitle: "Handle with love & care",
      backContent: (
        <div className="list-disc list-inside text-sm space-y-1">
          <p>Avoid water, perfume, and hairspray</p>
          <p>Store in a dry, cool place separately</p>
          <p>Clean gently with a soft cloth</p>
          <p>Remove before physical activity</p>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (id) {
      const foundProduct = staticProducts.find(p => p._id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images?.[0]);
      }
    }
  }, [id]);

  useEffect(() => {
    if (product?.colorVariants?.length > 0) {
      setSelectedColor(product.colorVariants[0]);
      setSelectedQty(1);
    }
  }, [product]);

  if (!product)
    return (
      <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-12 xl:px-40 py-12 ">
        {/* Left: Image Skeleton */}
        <div className="w-full xl:w-1/2 space-y-4">
          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-24 h-24 bg-gray-200 animate-pulse rounded-lg"
                />
              ))}
            </div>
            <div className="flex-1 h-[400px] xl:h-[600px] bg-gray-200 animate-pulse rounded-md" />
          </div>
        </div>

        {/* Right: Details Skeleton */}
        <div className="w-full xl:w-1/2 flex flex-col gap-6">
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 animate-pulse w-2/3 rounded" />
            <div className="h-4 bg-gray-200 animate-pulse w-1/3 rounded" />
          </div>
          <div className="h-6 bg-gray-200 animate-pulse w-1/4 rounded" />
          <div className="flex gap-4">
            <div className="h-10 bg-gray-200 animate-pulse flex-1 rounded" />
            <div className="h-10 bg-gray-200 animate-pulse flex-1 rounded" />
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 animate-pulse rounded w-full"
              />
            ))}
          </div>
          <div className="h-40 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
    );

  return (
    <div>
      <div className="relative flex flex-col items-center lg:flex-row lg:items-start justify-center flex-wrap lg:flex-nowrap gap-6 px-4 md:px-12 xl:px-24 py-12 ">
        {/* Left: Sticky Images */}
        <div className="w-full xl:w-1/2 lg:sticky lg:top-24">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
              {product.images.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  width={100}
                  height={100}
                  className={`w-24 h-24 object-cover rounded-tl-2xl rounded-br-2xl cursor-pointer transition-all duration-200 ${
                    selectedImage === img ? "border-2 border-[#B67032]" : ""
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div
              className="relative w-full h-[400px] xl:h-[700px] overflow-hidden rounded-md cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundSize: isZoomed ? "150%" : "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: isZoomed
                  ? `${zoomPos.x}% ${zoomPos.y}%`
                  : "center",
                transition: "background-size 0.3s ease",
              }}
            ></div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full xl:w-1/2 flex flex-col gap-2">
          {/* Title */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl md:text-4xl font-serif text-stone-900">
                {product.name}
              </h1>
              <p className="lg:text-md text-stone-700 mt-2 capitalize">
                {product.category?.name}{" "}
                {product.subcategory?.name && `→ ${product.subcategory.name}`}
              </p>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() =>
                wishlist?.some((w) => w._id === product._id)
                  ? removeFromWishlist(product._id)
                  : addToWishlist(product._id)
              }
              className="cursor-pointer"
            >
              {wishlist?.some((w) => w._id === product._id) ? (
                <FaHeart className="w-6 h-6 text-red-500" />
              ) : (
                <Heart className="w-6 h-6 text-stone-700" />
              )}
            </button>
          </div>

          {/* Price, Discount & Quantity */}
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-end gap-2">
              <span className="text-[#B67032] text-2xl font-bold tracking-wide">
                ₹{product.finalPrice}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="line-through text-stone-600 text-lg">
                    ₹{product.price}
                  </span>
                  <span className="text-green-600 text-sm">
                    ({product.discount}% OFF)
                  </span>
                </>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-6 border border-gray-200 rounded-full px-4 py-2 text-gray-700 font-medium">
              <button
                disabled={selectedQty === 1}
                className={`cursor-pointer text-lg rounded px-2 ${
                  selectedQty === 1 ? "opacity-40 cursor-not-allowed" : ""
                }`}
                onClick={() => {
                  if (selectedQty > 1) {
                    const newQty = selectedQty - 1;
                    setSelectedQty(newQty);
                    const inCart = cart.find(
                      (item) =>
                        item._id === product._id &&
                        item.color === selectedColor?.colorName
                    );
                    if (inCart) updateQty(product._id, newQty, selectedColor?.colorName);
                  }
                }}
              >
                -
              </button>

              <span className="text-md font-semibold">{selectedQty}</span>

              <button
                disabled={selectedQty >= (selectedColor?.quantity ?? 1)}
                className={`cursor-pointer text-lg rounded px-2 ${
                  selectedQty >= (selectedColor?.quantity ?? 1)
                    ? "opacity-40 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => {
                  if (selectedQty < (selectedColor?.quantity ?? 1)) {
                    const newQty = selectedQty + 1;
                    setSelectedQty(newQty);
                    const inCart = cart.find(
                      (item) =>
                        item._id === product._id &&
                        item.color === selectedColor?.colorName
                    );
                    if (inCart) updateQty(product._id, newQty, selectedColor?.colorName);
                  }
                }}
              >
                +
              </button>
            </div>
          </div>

          <span className="text-sm text-stone-700 block mt-1">
            Inclusive of all taxes
          </span>

          {/* Colors */}
          {product.colorVariants?.length > 0 && selectedColor && (
            <div className="space-y-2 mt-4">
              <h3 className="text-lg font-mosetta font-semibold text-[#B67032] tracking-wide">
                Available Colors
              </h3>

              <div className="flex flex-wrap gap-2">
                {product.colorVariants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedColor(v);
                      setSelectedQty(1);
                    }}
                    className={`px-3 py-1 rounded-md border text-sm transition ${
                      selectedColor?.colorName === v.colorName
                        ? "ring-2 ring-[#B67032] border-[#B67032] text-[#B67032] font-medium"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    {v.colorName}
                  </button>
                ))}
              </div>

              <p className="text-sm text-stone-600">
                {selectedColor.quantity > 0 ? (
                  <>
                    Only{" "}
                    <span className="font-semibold">
                      {selectedColor.quantity}
                    </span>{" "}
                    left - order fast!
                  </>
                ) : (
                  <span className="text-red-600 font-semibold">
                    Out of Stock
                  </span>
                )}
              </p>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            {cart.some(
              (item) =>
                item._id === product._id &&
                item.color === selectedColor?.colorName
            ) ? (
              <button
                onClick={() => setIsCartOpen(true)}
                className="cursor-pointer w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 transition text-sm font-medium tracking-wide"
              >
                <ShoppingCart className="w-4 h-4" />
                Go to Cart
              </button>
            ) : (
              <button
                onClick={() => {
                  addToCart({
                    ...product,
                    color: selectedColor?.colorName,
                    qty: selectedQty,
                  });
                  setSelectedQty(1);
                }}
                className="cursor-pointer w-full flex items-center justify-center gap-2 bg-[#B67032] text-white px-4 py-3 rounded hover:bg-[#a95c2e] transition text-sm font-medium tracking-wide"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            )}

            <button
              onClick={() => {
                if (
                  !cart.some(
                    (item) =>
                      item._id === product._id &&
                      item.color === selectedColor?.colorName
                  )
                ) {
                  addToCart({
                    ...product,
                    color: selectedColor?.colorName,
                    qty: selectedQty,
                  });
                }
                setIsCartOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 border border-[#B67032] text-[#B67032] px-4 py-3 rounded hover:bg-[#fff4ed] transition text-sm font-medium tracking-wide"
            >
              <CreditCard className="w-4 h-4" />
              Buy Now
            </button>
          </div>

          {/* Description */}
          {(product.description?.paragraphs?.length > 0 ||
            product.description?.bulletPoints?.length > 0) && (
            <div className="my-4">
              <h3 className="text-lg font-mosetta font-semibold text-[#B67032]">
                Description
              </h3>

              {product.description?.paragraphs?.map((para, idx) => (
                <p key={idx} className="lg:text-md text-stone-800 my-4">
                  {para}
                </p>
              ))}

              {product.description?.bulletPoints?.length > 0 && (
                <div className="list-disc ml-6 lg:text-md text-stone-800 marker:text-[#B67032] space-y-2">
                  {product.description.bulletPoints.map((point, idx) => (
                    <h6 key={idx}>{point}</h6>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Shipping Info Section */}
          <div className="relative bg-cover md:bg-contain py-4">
            <div className="relative z-10 grid md:grid-cols-3 mx-auto">
              {cards.map((card, i) => (
                <div
                  key={i}
                  className="group perspective cursor-pointer"
                  onClick={() => toggleFlip(i)}
                >
                  <div
                    className={`relative w-full h-52 lg:h-64 xl:h-52 transition-transform duration-700 preserve-3d ${
                      flipped[i] ? "rotate-y-180" : ""
                    } md:group-hover:rotate-y-180`}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-end rounded-2xl backface-hidden p-6 text-center text-white">
                      <img
                        src={card.img}
                        alt={card.frontTitle}
                        className="w-24 h-auto object-cover mb-4"
                      />
                      <h3 className="text-md md:text-lg font-mosetta text-black tracking-wide">
                        {card.frontTitle}
                      </h3>
                      <p className="mt-2 text-sm text-gray-800">
                        {card.frontSubtitle}
                      </p>
                    </div>

                    <div className="absolute inset-0 rounded-2xl backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-end text-white">
                      <h3 className="text-lg font-mosetta text-black tracking-wide">
                        {card.frontTitle}
                      </h3>
                      <div className="text-sm leading-relaxed text-gray-800">
                        {card.backContent}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}