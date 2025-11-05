"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { 
  FiPlus, 
  FiTrash2, 
  FiUpload, 
  FiSave, 
  FiDollarSign, 
  FiTag, 
  FiPackage, 
  FiImage, 
  FiList, 
  FiFileText, 
  FiX,
  FiBox,
  FiTruck,
  FiStar,
  FiLayers,
  FiHash
} from "react-icons/fi";
import { baseurl } from "../../components/apis";
import { toast } from "react-toastify";
import RichTextEditor from "../../components/RichTextEditor";






const CreateProduct = () => {

  const  [createPage,setCreatepage]= useState(1)



  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shortDescription: "",
        price: "",
    comparePrice: "",
    costPrice: "",
    
    sku: "",
    quantity: "",
    trackQuantity: true,
    allowBackorder: false,
    lowStockAlert: 10,
    
    petcategory: "",
    productcategory: "",
    tags: [],
    brand: "",
    
  
    
    
    weight: { value: "", unit: "g" },
    dimensions: { length: "", width: "", height: "", unit: "cm" },
    isShippingRequired: true,
    
    seo: { title: "", description: "", canonicalUrl: "" },
    
    status: "draft",
    isFeatured: false,
  });

  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState([]);



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
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith("seo.")) {
      const seoField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        seo: { ...prev.seo, [seoField]: value }
      }));
    } else if (name.startsWith("weight.")) {
      const weightField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        weight: { ...prev.weight, [weightField]: value }
      }));
    } else if (name.startsWith("dimensions.")) {
      const dimField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        dimensions: { ...prev.dimensions, [dimField]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
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

    
  setImages((prev) => [...prev, ...validFiles]);
  };

  // Remove image
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };



  // Handle tags
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim().toLowerCase()]
      }));
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

 



 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();

      // Append basic form data
      Object.keys(formData).forEach(key => {
        if (key === 'images' ) return;
        
        if (typeof formData[key] === 'object' && formData[key] !== null && formData[key] !="tags") {
          submitData.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] !== "" && formData[key] !== null) {
          submitData.append(key, formData[key]);
        }
      });

      
     images.forEach((file,index) => {
      submitData.append("images", file);
    });

     
      // formData.tags.forEach(tag => {
      //   submitData.append("tags", tag);
      // });



      const response = await axios.post(`${baseurl}/product/create`, submitData,{
          headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success("Product created successfully!");
        router.push("/admin/products");
      }
    } catch (error) {
      console.error("Create product error:", error);
      const errorMessage = error.response?.data?.message || "Failed to create product";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }; 

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 text-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Create New Product</h1>
          <p className="text-lg text-gray-600">Add a new product to your inventory</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Steps */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {['Basic Info', 'Pricing', 'Inventory', 'Media', 'Variants', 'Shipping', 'SEO'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white font-semibold">
                    {index + 1}
                  </div>
                  <span className="ml-3 text-white font-medium hidden sm:block">{step}</span>
                  {index < 6 && <div className="w-8 h-1 bg-white bg-opacity-30 mx-2 sm:mx-4 rounded-full" />}
                </div>
              ))}
            </div>
          </div>

     <div className="p-8">
            {/* Basic Information Section */}
   { createPage ===1 &&   <>           <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiTag className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Product Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="Enter product name"
                    />
                    <FiTag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Short Description */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Short Description
                  </label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Brief product description (max 500 characters)"
                    maxLength="500"
                  />
                </div>

                {/* Description */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Product Description *
                  </label>
                  <RichTextEditor
                    value={formData.description}
                    onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                    placeholder="Enter detailed product description..."
                  />
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Enter brand name"
                  />
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    SKU
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 uppercase"
                      placeholder="PRODUCT-SKU-001"
                    />
                    <FiHash className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>


            {/* Pricing Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FiDollarSign className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Pricing</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Price *
                  </label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Compare Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Compare Price
                  </label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="comparePrice"
                      value={formData.comparePrice}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Cost Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Cost Price
                  </label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="costPrice"
                      value={formData.costPrice}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FiPackage className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Inventory</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="0"
                  />
                </div>

                {/* Low Stock Alert */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Low Stock Alert
                  </label>
                  <input
                    type="number"
                    name="lowStockAlert"
                    value={formData.lowStockAlert}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="10"
                  />
                </div>

                {/* Track Quantity */}
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="trackQuantity"
                      checked={formData.trackQuantity}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                  <span className="text-sm font-medium text-gray-700">Track Quantity</span>
                </div>

                {/* Allow Backorder */}
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="allowBackorder"
                      checked={formData.allowBackorder}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                  <span className="text-sm font-medium text-gray-700">Allow Backorder</span>
                </div>
              </div>
            </div>

            {/* Categories Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FiLayers className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Product Category *
                  </label>
                  <select
                    name="productcategory"
                    value={formData.productcategory}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category._id} value={category._id}>
                        {category.product_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pet Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Pet Category *
                  </label>
                  <select
                    name="petcategory"
                    value={formData.petcategory}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    <option value="">Select Pet Category</option>
                    {pets.map(pet => (
                      <option key={pet._id} value={pet._id}>
                        {pet.type || pet.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tags
                </label>
                <div className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Enter tag"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 flex items-center gap-2"
                  >
                    <FiPlus className="w-5 h-5" />
                    Add Tag
                  </button>
                </div>
                
                {/* Tags List */}
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>


            <div className="flex justify-between items-center">
    <button disabled  className="px-4  cursor-not-allowed  py-1 rounded-2xl bg-red-300 text-white font-bold text-xl">Prev</button>
    <button 
     onClick={()=>setCreatepage((prev)=>prev+1)} 
     className="px-4 py-1 rounded-2xl bg-green-700 text-white font-bold text-xl cursor-pointer">  Next</button>

            </div>

</> }

     { createPage ===2 &&  <>   <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <FiImage className="w-6 h-6 text-pink-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Media</h2>
              </div>
              
              <div className="border-3 border-dashed border-gray-300 rounded-2xl p-8 hover:border-pink-400 transition-all duration-200 bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="product-images"
                />
                <label
                  htmlFor="product-images"
                  className="cursor-pointer flex flex-col items-center mb-6"
                >
                  <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-4">
                    <FiUpload className="w-8 h-8 text-pink-600" />
                  </div>
                  <span className="text-lg font-semibold text-gray-700 mb-2">
                    Upload Product Images
                  </span>
                  <p className="text-sm text-gray-500">
                    Multiple images supported (PNG, JPG, WEBP up to 5MB)
                  </p>
                </label>


                {/* Images Preview */}
                {images.length > 0 && (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {images.map((file, index) => (
      <div key={index} className="relative group">
        <img
          src={URL.createObjectURL(file)}
          alt={`Product ${index + 1}`}
          className="w-full h-32 object-cover rounded-xl shadow-md"
        />
        <div className="absolute inset-0 bg bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-xl flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => removeImage(index)}
            className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    ))}
  </div>
)}
              </div>
            </div>


  <div className="flex justify-between items-center">

 <button 
 onClick={()=>setCreatepage((prev)=>prev-1)}   className="px-4  cursor-pointer  py-1 rounded-2xl bg-red-700 text-white font-bold text-xl" >Prev</button>
    <button 
     onClick={()=>setCreatepage((prev)=>prev+1)} 
     className="px-4 py-1 rounded-2xl bg-green-700 text-white font-bold text-xl cursor-pointer">  Next</button>


            </div>
</> 
            }


           
   {  createPage ===3 &&  <>     <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <FiTruck className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Shipping</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="number"
                        name="weight.value"
                        value={formData.weight.value}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        placeholder="Quantity"
                      />
                    </div>
                    <div>
                      <select
                        name="weight.unit"
                        value={formData.weight.unit}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      >
 
  <optgroup label="Weight">
    <option value="mg">Milligram (mg)</option>
    <option value="g">Gram (g)</option>
    <option value="kg">Kilogram (kg)</option>
    <option value="oz">Ounce (oz)</option>
    <option value="lb">Pound (lb)</option>
  </optgroup>


  <optgroup label="Volume">
    <option value="ml">Millilitre (ml)</option>
    <option value="l">Litre (L)</option>
  </optgroup>

  <optgroup label="Length">
    <option value="mm">Millimetre (mm)</option>
    <option value="cm">Centimetre (cm)</option>
    <option value="m">Metre (m)</option>
  </optgroup>

  <optgroup label="Area">
    <option value="sqm">Square Metre (sqm)</option>
  </optgroup>

  <optgroup label="Quantity">
    <option value="piece">Piece</option>
    <option value="pcs">Pieces</option>
    <option value="pair">Pair</option>
    <option value="dozen">Dozen</option>
    <option value="set">Set</option>
  </optgroup>

  <optgroup label="Packaging">
    <option value="pack">Pack</option>
    <option value="box">Box</option>
    <option value="bottle">Bottle</option>
    <option value="can">Can</option>
    <option value="tube">Tube</option>
    <option value="roll">Roll</option>
    <option value="sheet">Sheet</option>
    <option value="bag">Bag</option>
    <option value="carton">Carton</option>
  </optgroup>



                      </select>
                    </div>
                  </div>
                </div>

              
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Dimensions</label>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <input
                        type="number"
                        name="dimensions.length"
                        value={formData.dimensions.length}
                        onChange={handleInputChange}
                        min="0"
                        step="0.1"
                        className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        placeholder="L"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        name="dimensions.width"
                        value={formData.dimensions.width}
                        onChange={handleInputChange}
                        min="0"
                        step="0.1"
                        className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        placeholder="W"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        name="dimensions.height"
                        value={formData.dimensions.height}
                        onChange={handleInputChange}
                        min="0"
                        step="0.1"
                        className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        placeholder="H"
                      />
                    </div>
                    <div>
                      <select
                        name="dimensions.unit"
                        value={formData.dimensions.unit}
                        onChange={handleInputChange}
                        className="w-full px-2 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      >
                        <option value="cm">cm</option>
                        <option value="m">m</option>
                        <option value="in">in</option>
                        <option value="ft">ft</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isShippingRequired"
                    checked={formData.isShippingRequired}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
                <span className="text-sm font-medium text-gray-700">Shipping Required</span>
              </div>


              
            </div> 


 <div className="flex justify-between items-center">

 <button 
 onClick={()=>setCreatepage((prev)=>prev-1)}   className="px-4  cursor-pointer  py-1 rounded-2xl bg-red-700 text-white font-bold text-xl" >Prev</button>
    <button 
     onClick={()=>setCreatepage((prev)=>prev+1)} 
     className="px-4 py-1 rounded-2xl bg-green-700 text-white font-bold text-xl cursor-pointer">  Next</button>


            </div>

            </>


   }

            {createPage ===4 &&  <> <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <FiFileText className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">SEO</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    name="seo.title"
                    value={formData.seo.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="SEO title (max 60 characters)"
                    maxLength="60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    name="seo.canonicalUrl"
                    value={formData.seo.canonicalUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="https://example.com/product"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    SEO Description
                  </label>
                  <textarea
                    name="seo.description"
                    value={formData.seo.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="SEO description (max 160 characters)"
                    maxLength="160"
                  />
                </div>
              </div>
            </div> 
            
            
            <div className="flex justify-between items-center">

 <button 
 onClick={()=>setCreatepage((prev)=>prev-1)}   className="px-4  cursor-pointer  py-1 rounded-2xl bg-red-700 text-white font-bold text-xl" >Prev</button>
    <button 
     onClick={()=>setCreatepage((prev)=>prev+1)} 
     className="px-4 py-1 rounded-2xl bg-green-700 text-white font-bold text-xl cursor-pointer">  Next</button>


            </div>
            
              </>}

            {createPage ===5 && <>  <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FiStar className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Status & Features</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                  <span className="text-sm font-medium text-gray-700">Featured Product</span>
                </div>
              </div>
            </div>
            
            
             

               <div className="flex justify-between items-center">

 <button 
 onClick={()=>setCreatepage((prev)=>prev-1)}   className="px-4  cursor-pointer  py-1 rounded-2xl bg-red-700 text-white font-bold text-xl" >Prev</button>

 <div className=" flex gap-5 items-center">
<button className="cursor-pointer bg-purple-600 text-white font-bold text-xl px-4 py-1 rounded-2xl  ">Cancel</button>

    <button 
    type="submit"
    
     className="px-4 py-1 rounded-2xl bg-green-700 text-white font-bold text-xl cursor-pointer">  Create</button>


            </div> 
            </div> 


            </>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;