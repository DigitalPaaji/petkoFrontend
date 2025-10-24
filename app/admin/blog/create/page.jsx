"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaSave,
  FaImage,
  FaClock,
  FaUser,
  FaTag,
  FaArrowLeft,
  FaPlus,
  FaTimes,
  FaHeading,
  FaParagraph,
  FaListUl,
} from "react-icons/fa";
import dynamic from "next/dynamic";
import axios from "axios";
import { baseurl } from "../../components/apis";
import { toast } from "react-toastify";

const RichTextEditor = dynamic(() => import("@/app/admin/components/RichTextEditor"), {
  ssr: false,
});

const CreateBlogPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    readingTime: "",
    tag: "General",
  });

  const [sections, setSections] = useState([]);
  const [images, setImages] = useState([]); // Changed to array for multiple images
  const [imagePreviews, setImagePreviews] = useState([]); // Changed to array for multiple previews
  const [isLoading, setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState({
    heading: "",
    paragraphs: [""],
    points: [""],
  });

  // ✅ Input Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Multiple Images Handler
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      // Add new images to existing ones
      const newImages = [...images, ...files];
      setImages(newImages);

      // Create previews for new images
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // ✅ Remove individual image
  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  // ✅ Clear all images
  const clearAllImages = () => {
    setImages([]);
    setImagePreviews([]);
  };

  // ✅ Section Management
  const handleSectionChange = (field, value, index = null) => {
    if (field === "heading") {
      setCurrentSection(prev => ({ ...prev, heading: value }));
    } else if (field === "paragraphs" && index !== null) {
      const updatedParagraphs = [...currentSection.paragraphs];
      updatedParagraphs[index] = value;
      setCurrentSection(prev => ({ ...prev, paragraphs: updatedParagraphs }));
    } else if (field === "points" && index !== null) {
      const updatedPoints = [...currentSection.points];
      updatedPoints[index] = value;
      setCurrentSection(prev => ({ ...prev, points: updatedPoints }));
    }
  };

  const addParagraph = () => {
    setCurrentSection(prev => ({
      ...prev,
      paragraphs: [...prev.paragraphs, ""]
    }));
  };

  const addPoint = () => {
    setCurrentSection(prev => ({
      ...prev,
      points: [...prev.points, ""]
    }));
  };

  const removeParagraph = (index) => {
    const updatedParagraphs = currentSection.paragraphs.filter((_, i) => i !== index);
    setCurrentSection(prev => ({ ...prev, paragraphs: updatedParagraphs }));
  };

  const removePoint = (index) => {
    const updatedPoints = currentSection.points.filter((_, i) => i !== index);
    setCurrentSection(prev => ({ ...prev, points: updatedPoints }));
  };

  const addSection = () => {
    if (currentSection.heading.trim()) {
      const sectionToAdd = {
        heading: currentSection.heading,
        paragraphs: currentSection.paragraphs.filter(p => p.trim() !== ""),
        points: currentSection.points.filter(p => p.trim() !== ""),
      };
      
      setSections(prev => [...prev, sectionToAdd]);
      setCurrentSection({
        heading: "",
        paragraphs: [""],
        points: [""],
      });
    }
  };

  const removeSection = (index) => {
    setSections(prev => prev.filter((_, i) => i !== index));
  };

  // ✅ Submit Handler
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    if (!formData.title || !formData.description) {
      alert("Title and Description are required.");
      setIsLoading(false);
      return;
    }

    const submitData = new FormData()


    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    submitData.append("author", formData.author || "Anonymous");
    submitData.append("readingTime", formData.readingTime || 3);
    submitData.append("tag", formData.tag || "General");
    submitData.append("sections", JSON.stringify(sections || []));

    if (images && images.length > 0) {
      images.forEach((image) => {
        submitData.append("images", image);
      });
    }


    const response = await axios.post(`${baseurl}/blog/create`, submitData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    if (response.data.success) {
      toast.success("Blog created successfully!");
      router.push("/admin/blog");
    } else {
      throw new Error(response.data.message || "Failed to create blog");
    }
  } catch (error) {
    console.error("Error creating blog:", error);
    alert(`Error creating blog: ${error.message}`);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Blog Post
          </h1>
          <p className="text-gray-600 mt-2">
            Share your thoughts and ideas with the world
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          {/* Title */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter blog title..."
            />
          </div>

          {/* Description (Rich Text) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <RichTextEditor
              value={formData.description}
              onChange={(content) =>
                setFormData((prev) => ({ ...prev, description: content }))
              }
            />
          </div>

          {/* Author + Reading Time + Tag */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <FaUser className="inline mr-2 text-gray-400" />
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="readingTime"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <FaClock className="inline mr-2 text-gray-400" />
                Reading Time (minutes)
              </label>
              <input
                type="number"
                id="readingTime"
                name="readingTime"
                value={formData.readingTime}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="5"
              />
            </div>

            <div>
              <label
                htmlFor="tag"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <FaTag className="inline mr-2 text-gray-400" />
                Tag
              </label>
              <input
                type="text"
                id="tag"
                name="tag"
                value={formData.tag}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="General"
              />
            </div>
          </div>

          {/* Sections Management */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              <FaHeading className="inline mr-2 text-gray-400" />
              Blog Sections
            </label>

            {/* Current Section Form */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={currentSection.heading}
                  onChange={(e) => handleSectionChange("heading", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter section heading..."
                />
              </div>

              {/* Paragraphs */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <FaParagraph className="inline mr-2 text-gray-400" />
                    Paragraphs
                  </label>
                  <button
                    type="button"
                    onClick={addParagraph}
                    className="flex items-center px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                  >
                    <FaPlus size={12} className="mr-1" />
                    Add Paragraph
                  </button>
                </div>
                {currentSection.paragraphs.map((paragraph, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <textarea
                      value={paragraph}
                      onChange={(e) => handleSectionChange("paragraphs", e.target.value, index)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter paragraph content..."
                      rows="3"
                    />
                    {currentSection.paragraphs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeParagraph(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Key Points Array */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <FaListUl className="inline mr-2 text-gray-400" />
                    Key Points (Array)
                  </label>
                  <button
                    type="button"
                    onClick={addPoint}
                    className="flex items-center px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                  >
                    <FaPlus size={12} className="mr-1" />
                    Add Point
                  </button>
                </div>
                <div className="space-y-2">
                  {currentSection.points.map((point, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => handleSectionChange("points", e.target.value, index)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter key point..."
                      />
                      {currentSection.points.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePoint(index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Key points will be stored as an array: {JSON.stringify(currentSection.points.filter(p => p.trim()))}
                </p>
              </div>

              <button
                type="button"
                onClick={addSection}
                disabled={!currentSection.heading.trim()}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Section to Blog
              </button>
            </div>

            {/* Added Sections List */}
            {sections.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Added Sections ({sections.length}):</h4>
                {sections.map((section, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="font-medium text-lg">{section.heading}</h5>
                      <button
                        type="button"
                        onClick={() => removeSection(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    </div>
                    
                    {/* Display Paragraphs */}
                    {section.paragraphs.length > 0 && (
                      <div className="mb-3">
                        <h6 className="font-medium text-gray-700 mb-2">Paragraphs:</h6>
                        <div className="space-y-2">
                          {section.paragraphs.map((paragraph, pIndex) => (
                            <p key={pIndex} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Display Key Points Array */}
                    {section.points.length > 0 && (
                      <div>
                        <h6 className="font-medium text-gray-700 mb-2">Key Points:</h6>
                        <ul className="list-disc list-inside space-y-1">
                          {section.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="text-sm text-gray-600">
                              {point}
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-gray-500 mt-2">
                          Points array: {JSON.stringify(section.points)}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Multiple Images Upload */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                <FaImage className="inline mr-2 text-gray-400" />
                Blog Images (Multiple)
              </label>
              {images.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllImages}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Clear All
                </button>
              )}
            </div>
            
            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Selected Images ({imagePreviews.length}):
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTimes size={12} />
                      </button>
                      <div className="text-xs text-gray-500 mt-1 truncate">
                        {images[index]?.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Area */}
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {imagePreviews.length === 0 ? (
                  <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                ) : null}
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="image-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                  >
                    <span>Upload images</span>
                    <input
                      id="image-upload"
                      name="images"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                      multiple // Allow multiple file selection
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB each
                </p>
                <p className="text-xs text-gray-400">
                  {images.length} image(s) selected
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSave className="mr-2" />
              {isLoading ? "Creating..." : "Create Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPage;