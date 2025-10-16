"use client";
import { baseurl, imgurl } from "@/app/admin/components/apis";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiSave,
  FiPlus,
  FiTrash2,
  FiUpload,
  FiImage,
  FiPackage,
  FiTag,
  FiX,
} from "react-icons/fi";
import Link from "next/link";
import { toast } from "react-toastify";
import RichEditor from "@/app/admin/components/RichEditor";

const Page = ({ params: { slug } }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState(null);
  const [colorVariants, setColorVariants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pets, setPets] = useState([]);
  const [activeImage, setActiveImage] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryid: "",
    petid: "",
  });

  const [details, setDetails] = useState([]);
  const [detailInput, setDetailInput] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  // Fetch product data
  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/product/${slug}`);
      const data = await response.data;

      if (data.success) {
        const productData = data.data.product;
        setProduct(productData);
        setColorVariants(data.data.colors || []);

        // Set form data
        setFormData({
          title: productData.title || "",
          description: productData.description || "",
          categoryid: productData.categoryid?._id || "",
          petid: productData.petid?._id || "",
        });

        // Set details
        setDetails(productData.details || []);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories and pets
  const fetchCategoriesAndPets = async () => {
    try {
      const [catRes, petRes] = await Promise.all([
        axios.get(`${baseurl}/productcat`),
        axios.get(`${baseurl}/petcat`),
      ]);

      if (catRes.data.success) setCategories(catRes.data.data);
      if (petRes.data.success) setPets(petRes.data.petCategory);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    if (slug) {
      fetchProductData();
      fetchCategoriesAndPets();
    }
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle banner image upload
  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setBannerImage(file);
    }
  };

  // Handle gallery images upload
  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    setGalleryImages((prev) => [...prev, ...validFiles]);
  };

  // Remove gallery image
  const removeGalleryImage = (index, isExisting = false) => {
    if (isExisting) {
      setImagesToDelete((prev) => [...prev, product.images[index]]);
    } else {
      setGalleryImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Add detail
  const addDetail = () => {
    if (detailInput.trim() && !details.includes(detailInput.trim())) {
      setDetails((prev) => [...prev, detailInput.trim()]);
      setDetailInput("");
    }
  };

  // Remove detail
  const removeDetail = (index) => {
    setDetails((prev) => prev.filter((_, i) => i !== index));
  };

  // Color Variant Functions
  const addColorVariant = () => {
    setColorVariants((prev) => [
      ...prev,
      {
        color: "#000000",
        instock: true,
        stock: 0,
        price: "",
        oldprice: "",
        _id: `temp-${Date.now()}`,
      },
    ]);
  };

  const updateColorVariant = (index, field, value) => {
    setColorVariants((prev) =>
      prev.map((variant, i) =>
        i === index
          ? {
              ...variant,
              [field]: field === "stock" ? parseInt(value) || 0 : value,
            }
          : variant
      )
    );
  };

  const removeColorVariant = (index) => {
    setColorVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const submitData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== "") {
          submitData.append(key, formData[key]);
        }
      });

      details.forEach((detail) => submitData.append("details", detail));

      if (colorVariants.length > 0) {
        submitData.append("colors", JSON.stringify(colorVariants));
      }

      imagesToDelete.forEach((image) =>
        submitData.append("imagesToDelete", image)
      );

      if (bannerImage) {
        submitData.append("banner_image", bannerImage);
      }

      galleryImages.forEach((image) => {
        submitData.append("images", image);
      });

      const response = await axios.put(
        `${baseurl}/product/edit/${slug}`,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Product updated successfully!");
        // Refresh data
        fetchProductData();
        setBannerImage(null);
        setGalleryImages([]);
        setImagesToDelete([]);
      }
    } catch (error) {
      console.error("Update product error:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to update product";
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };


  const allImages = [
    ...(product?.images || []).filter((img) => !imagesToDelete.includes(img)),
    ...galleryImages.map((file) => URL.createObjectURL(file)),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <Link
            href="/admin/products"
            className="text-blue-600 hover:text-blue-700"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/products"
                className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-4 py-3 rounded-xl shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md"
              >
                <FiArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Products</span>
              </Link>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text ">
                  Edit Product
                </h1>
                <p className="text-gray-600 mt-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Editing: {product.title}
                </p>
              </div>
            </div>

            <button
              type="submit"
              form="product-form"
              disabled={saving}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FiSave className="w-5 h-5" />
              <span className="font-semibold">
                {saving ? "Saving..." : "Save Changes"}
              </span>
            </button>
          </div>
        </div>

        <form id="product-form" onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Images */}
            <div className="xl:col-span-2 space-y-6">
              {/* Main Image */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <FiImage className="w-5 h-5 text-blue-600" />
                  </div>
                  Banner Image
                </h3>

                <div className="space-y-4">
                  {/* Current Banner Image */}
                  {product.banner_image && !bannerImage && (
                    <div className="relative">
                      <img
                        src={`${imgurl}/uploads/${product.banner_image}`}
                        alt={product.title}
                        className="w-full h-64 object-cover rounded-xl border-2 border-gray-200"
                      />
                      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        Current
                      </div>
                    </div>
                  )}

                  {/* New Banner Image Preview */}
                  {bannerImage && (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(bannerImage)}
                        alt="New banner"
                        className="w-full h-64 object-cover rounded-xl border-2 border-green-200"
                      />
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                        New
                      </div>
                      <button
                        type="button"
                        onClick={() => setBannerImage(null)}
                        className="absolute top-4 left-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors duration-200">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBannerImageChange}
                      className="hidden"
                      id="banner-image"
                    />
                    <label
                      htmlFor="banner-image"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                        <FiUpload className="w-8 h-8 text-blue-600" />
                      </div>
                      <span className="text-lg font-semibold text-gray-700 mb-2">
                        {bannerImage
                          ? "Change Banner Image"
                          : "Upload Banner Image"}
                      </span>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, WEBP up to 5MB
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              {/* Gallery Images */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-xl">
                    <FiImage className="w-5 h-5 text-purple-600" />
                  </div>
                  Gallery Images
                </h3>

                {/* Current Images Grid */}
                {(product.images?.length > 0 || galleryImages.length > 0) && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Current Images
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {/* Existing Images */}
                      {product.images?.map((image, index) => {
                        if (imagesToDelete.includes(image)) return null;
                        return (
                          <div key={index} className="relative group">
                            <img
                              src={`${imgurl}/uploads/${image}`}
                              alt={`Gallery ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(index, true)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors duration-200"
                            >
                              <FiX className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}

                      {/* New Images */}
                      {galleryImages.map((image, index) => (
                        <div key={`new-${index}`} className="relative group">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`New image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border-2 border-green-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(index, false)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors duration-200"
                          >
                            <FiX className="w-3 h-3" />
                          </button>
                          <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                            New
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload New Images */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryImagesChange}
                    className="hidden"
                    id="gallery-images"
                  />
                  <label
                    htmlFor="gallery-images"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                      <FiUpload className="w-8 h-8 text-purple-600" />
                    </div>
                    <span className="text-lg font-semibold text-gray-700 mb-2">
                      Add Gallery Images
                    </span>
                    <p className="text-sm text-gray-500">
                      Multiple images supported, max 5MB each
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column - Basic Info */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-xl">
                    <FiTag className="w-5 h-5 text-green-600" />
                  </div>
                  Basic Information
                </h3>

                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="Enter product title"
                    />
                  </div>

                  {/* Categories */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Product Category
                      </label>
                      <select
                        name="categoryid"
                        value={formData.categoryid}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.product_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pet Category
                      </label>
                      <select
                        name="petid"
                        value={formData.petid}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      >
                        <option value="">Select Pet Category</option>
                        {pets.map((pet) => (
                          <option key={pet._id} value={pet._id}>
                            {pet.type || pet.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <RichEditor
                      value={formData.description}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, description: value }))
                      }
                      placeholder="Enter product description..."
                    />
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-xl">
                    <FiTag className="w-5 h-5 text-orange-600" />
                  </div>
                  Product Details
                </h3>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={detailInput}
                      onChange={(e) => setDetailInput(e.target.value)}
                      placeholder="Enter product detail"
                      className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addDetail())
                      }
                    />
                    <button
                      type="button"
                      onClick={addDetail}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                    >
                      <FiPlus className="w-4 h-4" />
                      Add
                    </button>
                  </div>

                  {/* Details List */}
                  {details.length > 0 && (
                    <div className="space-y-2">
                      {details.map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
                        >
                          <span className="text-gray-700">{detail}</span>
                          <button
                            type="button"
                            onClick={() => removeDetail(index)}
                            className="text-red-600 hover:text-red-800 transition-colors duration-200"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Color Variants Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl text-white">
                    <FiPackage className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Color Variants
                    </h3>
                    <p className="text-sm text-gray-600">
                      Manage product color options and pricing
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addColorVariant}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Variant
                </button>
              </div>
            </div>

            <div className="p-6">
              {colorVariants.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {colorVariants.map((variant, index) => (
                    <div
                      key={variant._id}
                      className="border-2 border-gray-200 rounded-xl p-4 bg-white"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">
                          Variant #{index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeColorVariant(index)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        {/* Color Picker */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Color
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={variant.color}
                              onChange={(e) =>
                                updateColorVariant(
                                  index,
                                  "color",
                                  e.target.value
                                )
                              }
                              className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                            />
                            <span className="text-sm text-gray-600 font-medium">
                              {variant.color}
                            </span>
                          </div>
                        </div>

                        {/* Pricing */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Price *
                            </label>
                            <input
                              type="number"
                              value={variant.price}
                              onChange={(e) =>
                                updateColorVariant(
                                  index,
                                  "price",
                                  e.target.value
                                )
                              }
                              required
                              min="0"
                              step="0.01"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                              placeholder="0.00"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Old Price *
                            </label>
                            <input
                              type="number"
                              value={variant.oldprice}
                              onChange={(e) =>
                                updateColorVariant(
                                  index,
                                  "oldprice",
                                  e.target.value
                                )
                              }
                              required
                              min="0"
                              step="0.01"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                              placeholder="0.00"
                            />
                          </div>
                        </div>

                        {/* Stock */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Stock
                            </label>
                            <input
                              type="number"
                              value={variant.stock}
                              onChange={(e) =>
                                updateColorVariant(
                                  index,
                                  "stock",
                                  e.target.value
                                )
                              }
                              min="0"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                              placeholder="0"
                            />
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={variant.instock}
                              onChange={(e) =>
                                updateColorVariant(
                                  index,
                                  "instock",
                                  e.target.checked
                                )
                              }
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="ml-2 text-sm font-medium text-gray-700">
                              In Stock
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FiPackage className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No color variants added yet</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>

  );
};



export default Page;
