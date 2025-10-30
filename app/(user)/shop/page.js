"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter } from "lucide-react";
import { Heart, ShoppingBag } from "lucide-react";
import axios from "axios";
import { baseurl, imgurl } from "@/app/admin/components/apis";
import { useRouter, useSearchParams } from "next/navigation";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    priceRange: [],
    search: "",
  });
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const staticProducts = [
    {
      id: 1,
      name: "Cotton T-Shirt",
      category: "clothing",
      price: 40,
      original_price: 50,
      images: ["/Images/frontend/1.webp"],
      colors: ["red", "blue"],
      rating: 4.2,
      featured: true,
      created_date: "2025-05-01",
    },
    {
      id: 2,
      name: "Leather Bag",
      category: "bags",
      price: 120,
      original_price: 150,
      images: ["/Images/frontend/1.webp"],
      colors: ["brown"],
      rating: 4.8,
      featured: false,
      created_date: "2025-04-20",
    },
    {
      id: 3,
      name: "Silver Necklace",
      category: "jewelry",
      price: 180,
      original_price: 180,
      images: ["/Images/frontend/1.webp"],
      colors: ["silver"],
      rating: 4.7,
      featured: true,
      created_date: "2025-04-10",
    },
    {
      id: 4,
      name: "Running Shoes",
      category: "shoes",
      price: 90,
      original_price: 120,
      images: ["/Images/frontend/1.webp"],
      colors: ["black", "white"],
      rating: 4.5,
      featured: false,
      created_date: "2025-03-30",
    },
    {
      id: 5,
      name: "Classic Denim Jacket",
      category: "clothing",
      price: 85,
      original_price: 110,
      images: ["/Images/frontend/1.webp"],
      colors: ["blue"],
      rating: 4.6,
      featured: true,
      created_date: "2025-03-25",
    },
    {
      id: 6,
      name: "Luxury Watch",
      category: "accessories",
      price: 250,
      original_price: 300,
      images: ["/Images/frontend/1.webp"],
      colors: ["gold", "silver"],
      rating: 4.9,
      featured: true,
      created_date: "2025-03-15",
    },
    {
      id: 7,
      name: "Casual Hoodie",
      category: "clothing",
      price: 60,
      original_price: 75,
      images: ["/Images/frontend/1.webp"],
      colors: ["grey", "black"],
      rating: 4.3,
      featured: false,
      created_date: "2025-03-12",
    },
    {
      id: 8,
      name: "Travel Backpack",
      category: "bags",
      price: 99,
      original_price: 130,
      images: ["/Images/frontend/1.webp"],
      colors: ["black", "navy"],
      rating: 4.4,
      featured: false,
      created_date: "2025-03-05",
    },
    {
      id: 9,
      name: "Designer Earrings",
      category: "jewelry",
      price: 150,
      original_price: 200,
      images: ["/Images/frontend/1.webp"],
      colors: ["gold", "rose gold"],
      rating: 4.8,
      featured: true,
      created_date: "2025-02-25",
    },
    {
      id: 10,
      name: "Formal Leather Shoes",
      category: "shoes",
      price: 110,
      original_price: 140,
      images: ["/Images/frontend/1.webp"],
      colors: ["brown", "black"],
      rating: 4.5,
      featured: false,
      created_date: "2025-02-15",
    },
    {
      id: 11,
      name: "Printed Kurta",
      category: "clothing",
      price: 55,
      original_price: 70,
      images: ["/Images/frontend/1.webp"],
      colors: ["white", "blue"],
      rating: 4.4,
      featured: false,
      created_date: "2025-02-10",
    },
    {
      id: 12,
      name: "Mini Handbag",
      category: "bags",
      price: 80,
      original_price: 95,
      images: ["/Images/frontend/1.webp"],
      colors: ["pink", "cream"],
      rating: 4.7,
      featured: true,
      created_date: "2025-01-25",
    },
    {
      id: 13,
      name: "Gold Ring",
      category: "jewelry",
      price: 220,
      original_price: 260,
      images: ["/Images/frontend/1.webp"],
      colors: ["gold"],
      rating: 4.9,
      featured: true,
      created_date: "2025-01-18",
    },
    {
      id: 14,
      name: "Sports Sneakers",
      category: "shoes",
      price: 95,
      original_price: 120,
      images: ["/Images/frontend/1.webp"],
      colors: ["white", "blue"],
      rating: 4.5,
      featured: false,
      created_date: "2025-01-10",
    },
    {
      id: 15,
      name: "Elegant Bracelet",
      category: "jewelry",
      price: 140,
      original_price: 160,
      images: ["/Images/frontend/1.webp"],
      colors: ["silver", "gold"],
      rating: 4.8,
      featured: true,
      created_date: "2024-12-25",
    },
    {
      id: 16,
      name: "Stylish Sunglasses",
      category: "accessories",
      price: 70,
      original_price: 90,
      images: ["/Images/frontend/1.webp"],
      colors: ["black", "brown"],
      rating: 4.6,
      featured: false,
      created_date: "2024-12-15",
    },
    {
      id: 17,
      name: "Leather Belt",
      category: "accessories",
      price: 50,
      original_price: 65,
      images: ["/Images/frontend/1.webp"],
      colors: ["brown", "black"],
      rating: 4.4,
      featured: false,
      created_date: "2024-12-10",
    },
    {
      id: 18,
      name: "Casual Shorts",
      category: "clothing",
      price: 45,
      original_price: 55,
      images: ["/Images/frontend/1.webp"],
      colors: ["khaki", "navy"],
      rating: 4.3,
      featured: false,
      created_date: "2024-12-01",
    },
    {
      id: 19,
      name: "Handcrafted Purse",
      category: "bags",
      price: 110,
      original_price: 140,
      images: ["/Images/frontend/1.webp"],
      colors: ["beige", "brown"],
      rating: 4.7,
      featured: true,
      created_date: "2024-11-25",
    },
    {
      id: 20,
      name: "Running Track Pants",
      category: "clothing",
      price: 65,
      original_price: 85,
      images: ["/Images/frontend/1.webp"],
      colors: ["black", "grey"],
      rating: 4.5,
      featured: false,
      created_date: "2024-11-10",
    },
    {
      id: 21,
      name: "Elegant Gold Rakhi",
      category: "rakhi",
      price: 999,
      original_price: 1199,
      images: ["/Images/frontend/1.webp"],
      colors: ["gold"],
      rating: 4.9,
      featured: true,
      created_date: "2024-10-25",
    },
    {
      id: 22,
      name: "Silver Thread Rakhi",
      category: "rakhi",
      price: 599,
      original_price: 699,
      images: ["/Images/frontend/1.webp"],
      colors: ["silver"],
      rating: 4.7,
      featured: false,
      created_date: "2024-10-15",
    },
    {
      id: 23,
      name: "Royal Pet Collar",
      category: "pet accessories",
      price: 799,
      original_price: 950,
      images: ["/Images/frontend/1.webp"],
      colors: ["red", "blue"],
      rating: 4.6,
      featured: false,
      created_date: "2024-10-10",
    },
    {
      id: 24,
      name: "Festival Gift Box",
      category: "gifts",
      price: 499,
      original_price: 599,
      images: ["/Images/frontend/1.webp"],
      colors: ["multicolor"],
      rating: 4.5,
      featured: true,
      created_date: "2024-09-30",
    },
    {
      id: 25,
      name: "Premium Wallet",
      category: "accessories",
      price: 85,
      original_price: 100,
      images: ["/Images/frontend/1.webp"],
      colors: ["brown", "black"],
      rating: 4.7,
      featured: true,
      created_date: "2024-09-20",
    },
  ];

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setProducts(staticProducts);
    setLoading(false);
  }, []);


  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...products];
    if (filters.category.length > 0) {
      filtered = filtered.filter((p) => filters.category.includes(p.category));
    }

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q)
      );
    }

    // Price Range (checkbox)
    if (filters.priceRange.length > 0) {
      filtered = filtered.filter((p) => {
        return filters.priceRange.some((range) => {
          if (range.includes("-")) {
            const [min, max] = range.split("-").map(Number);
            return p.price >= min && p.price <= max;
          } else if (range.endsWith("+")) {
            const min = Number(range.replace("+", ""));
            return p.price >= min;
          }
          return true;
        });
      });
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.created_date) - new Date(a.created_date)
        );
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [products, filters, sortBy]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const updated = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updated };
    });
  };

  const clearFilters = () =>
    setFilters({ category: [], priceRange: [], search: "" });


  const [pagination,setPagination]=useState()
 const [allproducts,setAllProduct]=useState()
 const [petcategory,setPetCategory]=useState()
 const [searchProduct,setSearchProduct]=useState()
const [searchdata,setSearchData]=useState([])

console.log(searchdata)

 const router = useRouter()
 const searchParams = useSearchParams()
  const sort = searchParams.get("sort"); 
 const urlpage= searchParams.get("page") || 1;




const fetchpetCat= async()=>{
  const response = await axios.get(`${baseurl}/petcat/`)
  const data= await response.data;
  if(data.success){

setPetCategory(data.petCategory)
  }
}
 const fetchProduct = useCallback(
    async () => {
      try {
        const params = new URLSearchParams(searchParams.toString());
        const response = await axios.get(`${baseurl}/product/allproducts?${params.toString()}`);

        const data = response.data;
        if (data.success) {
          setPagination(data.pagination);
          setAllProduct(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    [baseurl, searchParams]
  );


   useEffect(() => {
    fetchpetCat(); 
  }, []);

useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);






  const updateQuery = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) params.set(key, value);
      else params.delete(key);

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );



 const handleSort = (value) => updateQuery("sort", value);
  const handlePet = (value) => updateQuery("pet", value);
const handelpage= (value)=>updateQuery("page",value)


const handelminmax=(value)=>{
  const minmax= value.split("-");

  // if(minmax[0]){
  //   updateQuery("minPrice",minmax[0])
  // }
  //  if(minmax[1]){
  //   updateQuery("maxPrice",minmax[1])
  // }


}



const searchProfetch=async(val)=>{
try {
   const response = await axios.get(`${baseurl}/product/search/${val}`);
 const data = await response.data;
 if(data.success){
setSearchData(data.products)
 }
 else{
  setSearchData([])
 }
  
} catch (error) {
    setSearchData([])

}


}


useEffect(()=>{
  if(!searchProduct?.length > 0) return;
const setval= setTimeout(() => {
  searchProfetch(searchProduct)
},500);

return ()=>clearTimeout(setval)
},[searchProduct])



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="py-2 px-4 lg:px-12 xl:px-24 2xl:px-40 my-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">
          Shop All Products
        </h1>
        <p className="text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      <div className="relative flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block lg:w-64 flex-shrink-0 sticky top-24 h-fit">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-gray-700 hover:underline"
              >
                Clear
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchProduct}
                  onChange={(e) =>setSearchProduct(e.target.value) }
                  className="w-full pl-10 pr-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-gray-200"
                />{ searchProduct && searchdata?.length? 

<div className="flex flex-col gap-2 absolute  top-full bg-white w-full shadow-2xl py-2">
{searchdata.map((item,index)=>{
  return(
    <Link key={index}  href={`/shop/${item.slug}`} className="capitalize border-b px-3 py-1 border-gray-600/50 ">
    {item.name}
    </Link>



  )
})}

</div>
:""
}

              </div>
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Category
              </label>
               {petcategory?.map((cat) => (
          <label
            key={cat._id}
            className="flex items-center gap-2 text-sm text-gray-700 mb-1"
          >
            <input
              type="radio"
              name="pet"
              onChange={() => handlePet(cat._id)}
              className="rounded border-gray-300 text-green-700 focus:ring-green-500"
            />
            {cat.type.toUpperCase()}
          </label>
        ))}
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Price Range
              </label>
              {[
                { label: "Under $50", value: "0-50" },
                { label: "$50 - $100", value: "50-100" },
                { label: "$100 - $200", value: "100-200" },
                { label: "$200+", value: "200," },
              ].map((p) => (
                <label
                  key={p.value}
                  onClick={()=>handelminmax(p.value)}
                  className="flex items-center gap-2 text-sm text-gray-700 mb-1"
                >
                  <input
                    type="radio"
                    name="price"

                    // checked={filters.priceRange.includes(p.value)}
                    onChange={() => handleCheckboxChange("priceRange", p.value)}
                    className="rounded border-gray-300 text-green-700 focus:ring-green-500"
                  />
                  {p.label}
                </label>
              ))}
            </div>
          </div>
        </aside>

{/* Mobile Filter Button */}
<button
  onClick={() => setMobileFiltersOpen(true)}
  className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-green-600 text-white px-3 py-3 rounded-full shadow-lg lg:hidden transition-all duration-300 hover:bg-green-700"
>
  <Filter className="w-6 h-6" />
</button>

{/* Mobile Filter Panel */}
<div
  className={`fixed inset-0 z-50 flex justify-center items-end lg:hidden transition-all duration-300 ${
    mobileFiltersOpen
      ? "bg-black/60  visible opacity-100"
      : "opacity-0 invisible"
  }`}
>
  <div
    className={`bg-white w-full p-6 overflow-y-auto transform transition-all duration-300 ${
      mobileFiltersOpen ? "translate-y-0" : "translate-y-full"
    }`}
  >
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-semibold text-gray-900">Filters</h3>
      <div className="flex items-center gap-4">
        <button
          onClick={clearFilters}
          className="text-sm text-gray-700 hover:underline"
        >
          Clear
        </button>
        <button
          onClick={() => setMobileFiltersOpen(false)}
          className="text-sm text-red-500 font-semibold"
        >
          Close
        </button>
      </div>
    </div>

    {/* Reuse same filter UI for mobile */}
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
           value={searchProduct}
                  onChange={(e) =>setSearchProduct(e.target.value) }
            className="w-full pl-10 pr-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-gray-200"
          />

      { searchProduct && searchdata?.length? 

<div className="flex flex-col gap-2 absolute  top-full bg-white w-full shadow-2xl py-2">
{searchdata.map((item,index)=>{
  return(
    <Link key={index}  href={`/shop/${item.slug}`} className="capitalize border-b px-3 py-1 border-gray-600/50 ">
    {item.name}
    </Link>



  )
})}

</div>
:""
}
          
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Category
        </label>
        {petcategory?.map((cat) => (
          <label
            key={cat._id}
            className="flex items-center gap-2 text-sm text-gray-700 mb-1"
          >
            <input
              type="checkbox"
              // checked={filters.category.includes(cat)}
               onChange={() => handlePet(cat._id)}

              className="rounded border-gray-300 text-green-700 focus:ring-green-500"
            />
            {cat.type.toUpperCase()}
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Price Range
        </label>
        {[
          { label: "Under $50", value: "0-50" },
          { label: "$50 - $100", value: "50-100" },
          { label: "$100 - $200", value: "100-200" },
          { label: "$200+", value: "200+" },
        ].map((p) => (
          <label
            key={p.value}
            className="flex items-center gap-2 text-sm text-gray-700 mb-1"
          >
            <input
              type="checkbox"
              checked={filters.priceRange.includes(p.value)}
              onChange={() => handleCheckboxChange("priceRange", p.value)}
              className="rounded border-gray-300 text-green-700 focus:ring-green-500"
            />
            {p.label}
          </label>
        ))}
      </div>
    </div>
  </div>
</div>


        {/* Products */}
        <section className="flex-1">
          {/* Sort */}
          <div className="flex justify-between items-center mb-6 bg-white rounded-lg p-4 shadow-sm">
            <span className="text-sm text-gray-600">
              {pagination?.total} Products
            </span>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700">Sort by:</label>
              <select
                value={sort}
                onChange={(e)=>handleSort(e.target.value)}
               
                className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200 bg-white"
              >
                <option value="featured">Featured</option>
                <option value="new">Newest</option>
                <option value="lowtohigh">Price: Low to High</option>
                <option value="hightolow">Price: High to Low</option>
                <option value="alpha">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Grid */}

          {allproducts?.length && <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allproducts?.map((product) => (
              <div
                key={product._id}
                className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={`${imgurl}/uploads/${product.images?.[0]}`||
                      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={product.name || "Product"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object- transform group-hover:scale-105 transition-transform duration-700 object-contain"
                  />
                </div>

                <div className="p-4">
                  <Link href={`/shop/${product?.slug}`} className="block">
                    <h3 className="font-medium capitalize text-gray-900 group-hover:text-green-700 transition-colors duration-200 mb-2 line-clamp-2">
                      {product?.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.comparePrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.comparePrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {product.rating && (
                      <div className="text-xs text-gray-500 flex items-center">
                        <span>★</span>
                        <span className="ml-1">{product.rating.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

    
<div className="flex items-center justify-center space-x-2 my-6">
  {/* Previous Button */}
  <button
    className="flex items-center justify-center px-3 h-10 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
    disabled={urlpage == 1}
    onClick={()=>handelpage(+urlpage-1)}
  >
    <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
    </svg>
    Previous
  </button>

  {/* Page Numbers */}
  {Array.from({ length: pagination.totalPages }, (_, index) => {
    const pageNumber = index + 1;
    const isNearCurrent = Math.abs(pageNumber - pagination.currentPage) <= 1;
    const isEdge = pageNumber === 1 || pageNumber === pagination.totalPages;
    
    // Show ellipsis for gaps
    if (!isNearCurrent && !isEdge) {
      if (pageNumber === 2 || pageNumber === pagination.totalPages - 1) {
        return (
          <span key={index} className="px-3 h-10 flex items-center text-gray-500">
            ...
          </span>
        );
      }
      return null;
    }

    return (
      <button
        key={index}
        onClick={()=>handelpage(pageNumber)}
        className={`flex items-center cursor-pointer justify-center px-4 h-10 text-sm font-medium border rounded-lg transition-all duration-200 ${
          urlpage==pageNumber
            ? 'text-blue-600 bg-blue-50 border-blue-300 ring-2 ring-blue-100'
            : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
        }`}
      >
        {pageNumber}
      </button>
    );
  })}

  {/* Next Button */}
  <button
 
    className="flex items-center justify-center px-3 h-10 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
    disabled={urlpage == pagination.totalPages}
     onClick={()=>handelpage(+urlpage+1)}
  >
    Next
    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
    </svg>
  </button>
</div>



          </div>}

          {allproducts?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found matching your criteria.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 inline-flex items-center px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
