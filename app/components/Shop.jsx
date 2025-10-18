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
      image: "https://demo2.themelexus.com/ziggy/wp-content/uploads/2022/05/h2_category2.jpg",
      productCount: 4,
      slug: "pharmacy"
    },
    {
      id: 3,
      name: "Furniture",
      image: "https://demo2.themelexus.com/ziggy/wp-content/uploads/2022/05/h2_category3.jpg",
      productCount: 3,
      slug: "furniture"
    },
    {
      id: 4,
      name: "Toys",
      image: "https://demo2.themelexus.com/ziggy/wp-content/uploads/2022/05/h2_category4.jpg",
      productCount: 1,
      slug: "toys"
    },
    {
      id: 5,
      name: "Beds",
      image: "https://demo2.themelexus.com/ziggy/wp-content/uploads/2022/05/h2_category5.jpg",
      productCount: 5,
      slug: "beds"
    },
    {
      id: 6,
      name: "Bowls",
      image: "https://demo2.themelexus.com/ziggy/wp-content/uploads/2022/05/h2_category6.jpg",
      productCount: 3,
      slug: "bowls"
    },
    {
      id: 7,
      name: "Treats",
      image: "https://demo2.themelexus.com/ziggy/wp-content/uploads/2022/05/h2_category7.jpg",
      productCount: 4,
      slug: "treats"
    },
    {
      id: 8,
      name: "Crates",
      image: "	https://demo2.themelexus.com/ziggy/wp-content/uploads/2022/05/h2_category8.jpg",
      productCount: 3,
      slug: "crates"
    }
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <section className="relative py-24 overflow-hidden">
  {/* bg-gradient-to-br from-[#f48d7f80] to-[#f48d7f23] */}
      {/* <div className="absolute bottom-0 left-0 w-full transform rotate-180">
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
      </div> */}

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div className="text-start mb-12">
          <h2 className="border-b border-[#6666664d] py-4 px-6 transition-colors duration-200 font-semibold text-xl lg:text-3xl ">
            Shop By Pet
          </h2>
          
        </div>

        {/* Categories Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
  {displayCategories.map((category) => (
    <div 
      key={category.id}
      className="group bg-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <a 
        href={`/categories/${category.slug}`}
        className="block"
      >
        <div className="relative h-32 overflow-hidden">
          {/* Category Image with Hover Scale Effect */}
         <div className="relative w-full h-full overflow-hidden">
  {/* Background Image with Scale Effect */}
  <div
    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
    style={{ backgroundImage: `url(${category.image})` }}
  ></div>

  {/* Gradient Overlay */}
  {/* <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div> */}

  {/* Foreground Content */}
  <div className="relative h-full flex items-center justify-end gap-10 px-6">
    {/* Text Content */}
    <div className="text-white z-10">
      <h3 className="text-lg font-bold mb-1">{category.name}</h3>
      <p className="text-gray-200 text-sm font-bold">
        {category.productCount} products
      </p>
    </div>

    {/* Icon Button */}
    <div className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-white transition-all duration-300 border border-white/30 z-10">
      <FaAngleRight className="text-white group-hover:text-[#F48C7F] transition-colors" />
    </div>
  </div>
</div>

        </div>
      </a>
    </div>
  ))}
</div>


       
      </div>
    </section>
  );
};

export default ShopByPet;