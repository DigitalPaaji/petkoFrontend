"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Search } from "lucide-react";

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

  // ✅ Static products for now
  const staticProducts = [
    {
      id: 1,
      name: "Cotton T-Shirt",
      category: "clothing",
      price: 40,
      original_price: 50,
      images: ["/images/sample1.jpg"],
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
      images: ["/images/sample2.jpg"],
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
      images: ["/images/sample3.jpg"],
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
      images: ["/images/sample4.jpg"],
      colors: ["black", "white"],
      rating: 4.5,
      featured: false,
      created_date: "2025-03-30",
    },
  ];

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setProducts(staticProducts);
    setLoading(false);
  }, []);

  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...products];

    // Category (checkbox)
    if (filters.category.length > 0) {
      filtered = filtered.filter((p) =>
        filters.category.includes(p.category)
      );
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="">
      <div className="py-2 px-4 md:px-12 xl:px-24 2xl:px-40">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">
            Shop All Products
          </h1>
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <aside className="lg:w-64 flex-shrink-0">
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
                    type="text"
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                    className="w-full pl-10 pr-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              </div>

              {/* Category Checkboxes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Category
                </label>
                {["clothing", "accessories", "shoes", "bags", "jewelry"].map(
                  (cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 text-sm text-gray-700 mb-1"
                    >
                      <input
                        type="checkbox"
                        checked={filters.category.includes(cat)}
                        onChange={() => handleCheckboxChange("category", cat)}
                        className="rounded border-gray-300 text-green-700 focus:ring-green-500"
                      />
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </label>
                  )
                )}
              </div>

              {/* Price Range Checkboxes */}
              <div className="mb-2">
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
          </aside>

          {/* Products */}
          <section className="flex-1">
            {/* Sort */}
            <div className="flex justify-between items-center mb-6 bg-white rounded-lg p-4 shadow-sm">
              <span className="text-sm text-gray-600">
                {filteredProducts.length} Products
              </span>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200 bg-white"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={
                        product.images?.[0] ||
                        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={product.name || "Product"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-4">
                    <Link href="#" className="block">
                      <h3 className="font-medium text-gray-900 group-hover:text-green-700 transition-colors duration-200 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.original_price > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.original_price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {product.rating && (
                        <div className="text-xs text-gray-500 flex items-center">
                          <span>★</span>
                          <span className="ml-1">{product.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
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
    </div>
  );
}
