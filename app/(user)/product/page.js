'use client';
import { useState } from 'react';
import RelatedProducts from '../../components/RelatedProducts'
import { Heart } from 'lucide-react';

export default function ProductPage() {
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const productImages = [
    '/Images/frontend/1.webp',
    '/Images/frontend/2.webp',
    '/Images/frontend/4.webp',
    '/Images/frontend/img.webp'
  ];

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      date: 'March 15, 2023',
      comment: 'My dog absolutely loves this product! The quality is excellent and it arrived quickly.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 4,
      date: 'February 28, 2023',
      comment: 'Good value for money. My pet seems happy with it, though I wish there were more size options.'
    }
  ];

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(quantity + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <>
    <div className="min-h-screen  px-4 md:px-12 xl:px-24 2xl:px-40">
      {/* Product Section */}
      <section className="py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div
              className="mb-4 bg-white shadow-sm overflow-hidden relative"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={hoveredImage || productImages[selectedImage]}
                alt="Product main"
                className={`w-full h-auto lg:h-[600px] object-contain transition-transform duration-300 ${
                  zoom ? 'scale-150' : 'scale-100'
                }`}
                style={
                  zoom
                    ? {
                        transformOrigin: `${position.x}% ${position.y}%`,
                      }
                    : {}
                }
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 border-2  cursor-pointer transition-all duration-200 ${
                    selectedImage === index ? 'border border-[#F48C7F]' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImage(index)}
                  onMouseEnter={() => setHoveredImage(image)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <img
                    src={image}
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-full object-cover  hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 lg:p-6">
           <div className="flex items-center justify-between pb-4 border-b border-[#6666664d]">


            <h1 className="text-2xl font-normal ">
              Premium Organic Dog Food
            </h1>
                  <div className="w-8 h-8">
          <Heart className="w-full h-full text-gray-700 cursor-pointer" />
        </div>
           </div>

            <div className="text-2xl font-semibold my-4">$29.99</div>
            <div className="font-semibold flex items-center gap-2">
              Stock: <span className="text-[#2ea2cc] font-bold">50 in Stock</span>
            </div>

            <p className="text-gray-600 py-6 border-b border-[#6666664d]">
              Our premium organic dog food is made with high-quality ingredients to provide complete and balanced nutrition for your furry friend. Free from artificial preservatives and fillers.
            </p>

            <div className="flex items-center justify-start flex-wrap gap-2 lg:gap-4 my-6">
              <div className="flex items-center border border-[#6666664d]">
                <button
                  className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  onClick={() => handleQuantityChange('decrement')}
                >
                  -
                </button>
                <span className="px-4 py-3">{quantity}</span>
                <button
                  className="px-3 py-3 text-gray-600 hover:text-gray-800"
                  onClick={() => handleQuantityChange('increment')}
                >
                  +
                </button>
              </div>
              <button className="bg-black font-semibold text-white px-6 py-3  transition duration-200">
                Add to Cart
              </button>
              <button className="bg-[#F48C7F] font-semibold px-6 py-3  transition duration-200">
                Buy Now
              </button>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-1 text-sm text-gray-600">
              <div>
                <b>SKU:</b> BIRDBOWL001
              </div>
              <div>
                <b>Tag:</b> Bowls & Feeders
              </div>
              <div>
                <b>Category:</b> Bowls & Feeders
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Tabs */}
      <section className="p-6 lg:p-8  border border-[#6666664d]">
        <div>
          <div className="border-b border-gray-200">
            <nav className="flex items-center gap-2 justify-start">
              {[
                { id: 'description', label: 'Description' },
                { id: 'additional', label: 'Additional Information' },
                { id: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'font-semibold text-[17px] lg:text-xl text-[#F48C7F]'
                      : 'border-transparent  font-medium text-[17px] lg:text-xl hover:border-[#f48d7f85]'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className=''>
                {/* <h3 className="text-xl font-semibold mb-4">Product Description</h3> */}
                <p className="text-gray-600 mb-4 ">
                  Our Premium Organic Dog Food is specially formulated to meet the nutritional needs of adult dogs. Made with real chicken as the first ingredient, this recipe provides high-quality protein to help maintain lean muscle mass.
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>Made with organic chicken, brown rice, and vegetables</li>
                  <li>No artificial colors, flavors, or preservatives</li>
                  <li>Supports healthy digestion with natural fiber sources</li>
                  <li>Promotes healthy skin and coat with omega fatty acids</li>
                  <li>Formulated without corn, wheat, or soy</li>
                </ul>
                <p className="text-gray-600">
                  This nutritionally complete and balanced dog food is perfect for dogs of all breeds and sizes. Your furry friend will love the taste, and you'll love the peace of mind that comes from feeding them a high-quality, natural diet.
                </p>
              </div>
            )}

            {activeTab === 'additional' && (
              <div>
                {/* <h3 className="text-xl font-semibold mb-4">Additional Information</h3> */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">Weight</td>
                        <td className="py-3 px-4 text-gray-600">5 lbs, 10 lbs, 20 lbs</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">Ingredients</td>
                        <td className="py-3 px-4 text-gray-600">
                          Organic Chicken, Brown Rice, Peas, Chicken Fat, Flaxseed, Vitamins & Minerals
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">Life Stage</td>
                        <td className="py-3 px-4 text-gray-600">Adult</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">Breed Size</td>
                        <td className="py-3 px-4 text-gray-600">All Breeds</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">Made In</td>
                        <td className="py-3 px-4 text-gray-600">USA</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                {/* <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3> */}
                <div className="mb-8">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 py-6">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">{review.name}</h4>
                        <span className="text-gray-500 text-sm">{review.date}</span>
                      </div>
                      <div className="flex text-yellow-400 mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
<RelatedProducts />
    </>

  );
}
