"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Heart, ShoppingBag, Search } from "lucide-react";

// adjust these to your actual locations
import { Product } from "../../components/entities/Product";
// import { useCart } from "../../components/context/GlobalContext";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    search: "",
  });
  const [sortBy, setSortBy] = useState("featured");
//   const { addToCart } = useCart();

  // Read ?category= from URL in a Next-safe way
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const loadProducts = useCallback(async () => {
    try {
      const allProducts = await Product.list("-created_date", 50);
      setProducts(allProducts || []);
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...products];

    // Category
    if (filters.category) {
      filtered = filtered.filter(
        (p) => (p.category || "").toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Search (name + description)
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
      );
    }

    // Price
    if (filters.priceRange) {
      if (filters.priceRange.includes("-")) {
        const [min, max] = filters.priceRange.split("-").map(Number);
        filtered = filtered.filter(
          (p) => Number(p.price) >= min && Number(p.price) <= max
        );
      } else if (filters.priceRange.endsWith("+")) {
        const min = Number(filters.priceRange.replace("+", ""));
        filtered = filtered.filter((p) => Number(p.price) >= min);
      }
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "name":
        filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.created_date) - new Date(a.created_date)
        );
        break;
      default:
        // featured first (truthy featured goes earlier)
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [products, filters, sortBy]);

  // initial load + seed category from URL
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
    }
  }, [categoryParam]);

  // re-derive whenever inputs change
  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  const handleQuickAdd = (product) => {
    const size = product.sizes?.[0] || "M";
    const color = product.colors?.[0] || "Default";
    addToCart(product, size, color);
  };

  const clearFilters = () =>
    setFilters({ category: "", priceRange: "", search: "" });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i}>
                <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">
            {filters.category
              ? filters.category.charAt(0).toUpperCase() + filters.category.slice(1)
              : "All Products"}
          </h1>
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
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

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200 bg-white"
                >
                  <option value="">All Categories</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessories">Accessories</option>
                  <option value="shoes">Shoes</option>
                  <option value="bags">Bags</option>
                  <option value="jewelry">Jewelry</option>
                </select>
              </div>

              {/* Price */}
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) =>
                    setFilters({ ...filters, priceRange: e.target.value })
                  }
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200 bg-white"
                >
                  <option value="">All Prices</option>
                  <option value="0-50">Under $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200+">$200+</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Main */}
          <section className="flex-1">
            {/* Sort Bar */}
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

            {/* Products Grid */}
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
                      priority={false}
                    />

                    {product.original_price &&
                      Number(product.original_price) > Number(product.price) && (
                        <div className="absolute top-3 left-3 bg-green-700 text-white text-xs font-medium px-2 py-1 rounded">
                          Sale
                        </div>
                      )}

                    {/* Hover Actions */}
                    <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuickAdd(product)}
                          className="flex-1 inline-flex items-center justify-center gap-1 text-sm bg-white text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Quick Add
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center px-3 py-2 text-sm bg-white hover:bg-gray-100 border border-gray-200 rounded-md"
                          aria-label="Add to wishlist"
                        >
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <Link href={`/product/${product.name}/${product.id}`} className="block">
                      <h3 className="font-medium text-gray-900 group-hover:text-green-700 transition-colors duration-200 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-900">
                          ${Number(product.price).toFixed(2)}
                        </span>
                        {product.original_price &&
                          Number(product.original_price) > Number(product.price) && (
                            <span className="text-sm text-gray-500 line-through">
                              ${Number(product.original_price).toFixed(2)}
                            </span>
                          )}
                      </div>

                      {product.rating && (
                        <div className="flex items-center text-xs text-gray-500">
                          <span>★</span>
                          <span className="ml-1">{product.rating}</span>
                        </div>
                      )}
                    </div>

                    {Array.isArray(product.colors) && product.colors.length > 0 && (
                      <div className="flex gap-1 mt-3">
                        {product.colors.slice(0, 4).map((color, i) => (
                          <span
                            key={i}
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: String(color).toLowerCase() }}
                            title={color}
                          />
                        ))}
                      </div>
                    )}
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
