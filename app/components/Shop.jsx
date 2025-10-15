// components/ShopByPet.jsx
import { FaPaw, FaAngleRight } from 'react-icons/fa';

const ShopByPet = ({ categories = [] }) => {
  // Default categories if none provided from backend
  const defaultCategories = [
    {
      id: 1,
      name: "Food",
      image: "/Images/frontend/bg.webp",
      productCount: 4,
      slug: "food"
    },
    {
      id: 2,
      name: "Pharmacy",
      image: "/Images/frontend/bg.webp",
      productCount: 4,
      slug: "pharmacy"
    },
    {
      id: 3,
      name: "Furniture",
      image: "/Images/frontend/furniture.jpg",
      productCount: 3,
      slug: "furniture"
    },
    {
      id: 4,
      name: "Toys",
      image: "/Images/frontend/toys.jpg",
      productCount: 1,
      slug: "toys"
    },
    {
      id: 5,
      name: "Beds",
      image: "/Images/frontend/beds.jpg",
      productCount: 5,
      slug: "beds"
    },
    {
      id: 6,
      name: "Bowls",
      image: "/Images/frontend/bowls.jpg",
      productCount: 3,
      slug: "bowls"
    },
    {
      id: 7,
      name: "Treats",
      image: "/Images/frontend/treats.jpg",
      productCount: 4,
      slug: "treats"
    },
    {
      id: 8,
      name: "Crates",
      image: "/Images/frontend/crates.jpg",
      productCount: 3,
      slug: "crates"
    }
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <section className="relative py-16 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Top Wave Shape */}
      <div className="absolute bottom-0 left-0 w-full transform rotate-180">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-16 text-white"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="currentColor"
          ></path>
        </svg>
      </div>

      {/* Bottom Wave Shape */}
      <div className="absolute top-0 left-0 w-full">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-16 text-white"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="currentColor"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <FaPaw className="text-indigo-600 text-2xl" />
            <span>Shop By Pet</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover everything your furry friend needs for a happy and healthy life
          </p>
        </div>

        {/* Categories Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
  {displayCategories.map((category) => (
    <div 
      key={category.id}
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <a 
        href={`/categories/${category.slug}`}
        className="block"
      >
        <div className="relative h-48 overflow-hidden">
          {/* Category Image with Hover Scale Effect */}
          <div 
            className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
            style={{ backgroundImage: `url(${category.image})` }}
          >
            {/* Gradient Overlay for Better Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            
            {/* Content Overlay - Flex Row Layout */}
            <div className="relative h-full flex items-center justify-between px-6">
              {/* Text Content */}
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-1 transform group-hover:translate-x-1 transition-transform duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-200 text-sm font-medium">
                  {category.productCount} products
                </p>
              </div>
              
              {/* Icon/Link Button */}
              <div className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-white group-hover:scale-110 transition-all duration-300 border border-white/30">
                <FaAngleRight className="text-white group-hover:text-indigo-600 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  ))}
</div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopByPet;