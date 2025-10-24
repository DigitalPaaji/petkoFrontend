"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FiPlus, FiTrash2, FiUpload, FiSave, FiDollarSign, FiTag, FiPackage, FiImage, FiList, FiFileText, FiX } from "react-icons/fi";
import { baseurl } from "../../components/apis";
import { toast } from "react-toastify";
import RichEditor from "../../components/RichEditor";
import RichTextEditor from "../../components/RichTextEditor";


const CreateProduct = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [pets, setPets] = useState([]);
  const [colorVariants, setColorVariants] = useState([]);
  const [details, setDetails] = useState([]);
  const [detailInput, setDetailInput] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryid: "",
    petid: "",
    meta_title:"",
    meta_description:""
  });

  const [bannerImage, setBannerImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

const fetchData = async () => {
      try {
        const [catRes, petRes] = await Promise.all([
          axios.get(`${baseurl}/productcat`),
          axios.get(`${baseurl}/petcat`),
        ]);

        if (catRes.data.success) setCategories(catRes.data.data);
        if (petRes.data.success) setPets(petRes.data.petCategory);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load categories and pets");
      }
    };


  useEffect(() => {
    

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    const validFiles = files.filter(file => {
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

    setGalleryImages(prev => [...prev, ...validFiles]);
  };

  // Remove gallery image
  const removeGalleryImage = (index) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  // Add color variant
  const addColorVariant = () => {
    setColorVariants(prev => [
      ...prev,
      {
        color: "#000000",
        instock: true,
        stock: 0,
        price: "",
        oldprice: "",
      }
    ]);
  };

  // Update color variant
  const updateColorVariant = (index, field, value) => {
    setColorVariants(prev => prev.map((variant, i) => 
      i === index ? { ...variant, [field]: value } : variant
    ));
  };

  // Remove color variant
  const removeColorVariant = (index) => {
    setColorVariants(prev => prev.filter((_, i) => i !== index));
  };

  // Add detail
  const addDetail = () => {
    if (detailInput.trim() && !details.includes(detailInput.trim())) {
      setDetails(prev => [...prev, detailInput.trim()]);
      setDetailInput("");
    }
  };

  // Remove detail
  const removeDetail = (detail) => {
    setDetails(prev => prev.filter(d => d !== detail));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();

      // Append basic form data
      Object.keys(formData).forEach(key => {
        if (formData[key] !== "") {
          submitData.append(key, formData[key]);
        }
      });

      // Append details array
      details.forEach(detail => submitData.append("details", detail));

      // Append color variants as JSON string
      if (colorVariants.length > 0) {
        submitData.append("colors", JSON.stringify(colorVariants));
      }

      // Append banner image
      if (bannerImage) {
        submitData.append("banner_image", bannerImage);
      }

      // Append gallery images
      galleryImages.forEach(image => {
        submitData.append("images", image);
      });




      const response = await axios.post(`${baseurl}/product/create`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success("Product created successfully!");
        router.push("/admin/products");
      }
    } catch (error) {
      console.error("Create product error:", error);
      const errorMessage = error.response?.data?.error || "Failed to create product";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 text-black" >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Create New Product</h1>
          <p className="text-lg text-gray-600">Add a new product to your inventory</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Steps */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {['Basic Info', 'Categories', 'Media', 'Variants', 'Details'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white font-semibold">
                    {index + 1}
                  </div>
                  <span className="ml-3 text-white font-medium">{step}</span>
                  {index < 4 && <div className="w-12 h-1 bg-white bg-opacity-30 mx-4 rounded-full" />}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8">
            {/* Basic Information Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiTag className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Title */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Product Title *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="Enter product title"
                    />
                    <FiTag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Product Description
                  </label>
                  <RichTextEditor
                    value={formData.description}
                    onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                    placeholder="Enter rich product description..."
                  />
                </div>
              </div>
            </div>

            {/* Categories Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FiPackage className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Product Category
                  </label>
                  <div className="relative">
                    <select
                      name="categoryid"
                      value={formData.categoryid}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none transition-all duration-200"
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category._id} value={category._id}>
                          {category.product_name}
                        </option>
                      ))}
                    </select>
                    <FiPackage className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Pet Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Pet Category
                  </label>
                  <div className="relative">
                    <select
                      name="petid"
                      value={formData.petid}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none transition-all duration-200"
                    >
                      <option value="">Select Pet Category</option>
                      {pets.map(pet => (
                        <option key={pet._id} value={pet._id}>
                          {pet.type || pet.name}
                        </option>
                      ))}
                    </select>
                    <FiPackage className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Media Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FiImage className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Media</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Banner Image */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Banner Image *
                  </label>
                  <div className="border-3 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-purple-400 transition-all duration-200 bg-gray-50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBannerImageChange}
                      className="hidden"
                      id="banner-image"
                      required
                    />
                    <label
                      htmlFor="banner-image"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                        <FiUpload className="w-8 h-8 text-purple-600" />
                      </div>
                      <span className="text-lg font-semibold text-gray-700 mb-2">
                        {bannerImage ? bannerImage.name : "Upload Banner Image"}
                      </span>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, WEBP up to 5MB
                      </p>
                    </label>
                  </div>
                </div>

                {/* Gallery Images */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Gallery Images
                  </label>
                  <div className="border-3 border-dashed border-gray-300 rounded-2xl p-8 hover:border-purple-400 transition-all duration-200 bg-gray-50">
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
                      className="cursor-pointer flex flex-col items-center mb-6"
                    >
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                        <FiUpload className="w-8 h-8 text-blue-600" />
                      </div>
                      <span className="text-lg font-semibold text-gray-700 mb-2">
                        Upload Gallery Images
                      </span>
                      <p className="text-sm text-gray-500">
                        Multiple images supported
                      </p>
                    </label>

                    {/* Gallery Images Preview */}
                    {galleryImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {galleryImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Gallery ${index + 1}`}
                              className="w-full h-24 object-cover rounded-xl shadow-md"
                            />
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors duration-200"
                            >
                              <FiX className="w-3 h-3" />
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
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    {/* <FiPalette className="w-6 h-6 text-pink-600" /> */}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Color Variants</h2>
                </div>
                <button
                  type="button"
                  onClick={addColorVariant}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-lg"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Variant
                </button>
              </div>
              
              <div className="space-y-6">
                {colorVariants.map((variant, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Color Variant #{index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeColorVariant(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Color Picker */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={variant.color}
                            onChange={(e) => updateColorVariant(index, 'color', e.target.value)}
                            className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                          />
                          <span className="text-sm text-gray-600 font-medium">{variant.color}</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                        <div className="relative">
                          <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            value={variant.price}
                            onChange={(e) => updateColorVariant(index, 'price', e.target.value)}
                            required
                            min="0"
                            step="0.01"
                            className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      {/* Old Price */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Old Price *</label>
                        <div className="relative">
                          <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            value={variant.oldprice}
                            onChange={(e) => updateColorVariant(index, 'oldprice', e.target.value)}
                            required
                            min="0"
                            step="0.01"
                            className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      {/* Stock */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                        <div className="relative">
                          <FiPackage className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            value={variant.stock}
                            onChange={(e) => updateColorVariant(index, 'stock', parseInt(e.target.value) || 0)}
                            min="0"
                            className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>

                    {/* In Stock Toggle */}
                    <div className="flex items-center gap-3 mt-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={variant.instock}
                          onChange={(e) => updateColorVariant(index, 'instock', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                      <span className="text-sm font-medium text-gray-700">In Stock</span>
                    </div>
                  </div>
                ))}

                {colorVariants.length === 0 && (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                    {/* <FiPalette className="w-16 h-16 text-gray-300 mx-auto mb-4" /> */}
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">No Color Variants Added</h3>
                    <p className="text-gray-400">Add color variants to create different product options</p>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FiList className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
              </div>
              
              <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border-2 border-gray-100">
                <div className="flex gap-3 mb-6">
                  <input
                    type="text"
                    value={detailInput}
                    onChange={(e) => setDetailInput(e.target.value)}
                    placeholder="Enter product detail"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addDetail())}
                  />
                  <button
                    type="button"
                    onClick={addDetail}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg flex items-center gap-2"
                  >
                    <FiPlus className="w-5 h-5" />
                    Add
                  </button>
                </div>
                
                {/* Details List */}
                {details.length > 0 ? (
                  <div className="space-y-3">
                    {details.map((detail, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-4 rounded-xl border-2 border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700">{detail}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDetail(detail)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <FiFileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No details added yet</p>
                  </div>
                )}
              </div>
            </div>








 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Title */}
                <div className="">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Meta Title 
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="meta_title"
                      value={formData.meta_title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="Enter product meta title"
                    />
                    <FiTag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                 <div className="">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Meta description 
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="meta_description"
                      value={formData.meta_description}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="Enter product meta description"
                    />
                    <FiTag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

              
              </div>


            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg text-lg font-semibold"
              >
                <FiSave className="w-5 h-5" />
                {loading ? "Creating Product..." : "Create Product"}
              </button>
              
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 text-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;