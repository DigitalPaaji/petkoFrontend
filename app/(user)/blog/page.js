'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiArrowRight, FiCalendar, FiClock, FiEye, FiUser } from "react-icons/fi"; // React Icons
import { baseurl, imgurl } from "@/app/admin/components/apis";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

const News = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${baseurl}/blog`);
        if (response.data.success) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // const calculateReadTime = (htmlContent) => {
  //   const text = htmlContent.replace(/<[^>]*>/g, ''); // Remove HTML tags
  //   const wordCount = text.split(/\s+/).length;
  //   return Math.ceil(wordCount / 200); // Assuming 200 words per minute
  // };

  return (
    <section className="bg-white py-12 ">




      <div className="  ">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#F59383] text-center">
          Latest <span className="text-gray-800">Blogs</span>
        </h2>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5  px-4 md:px-[2rem]     lg:px-[5rem]">
      {blogs.length > 0 ? (
      blogs?.map((blog) => (
            
              <div  key={blog._id}  className="cursor-default group w-full bg-white rounded-lg overflow-hidden border border-transparent hover:border-[#6666664d] transition-transform duration-300">
                {/* Blog Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={ blog.images?.[0]? `${imgurl}/uploads/${blog.images?.[0]}`: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop'}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {blog.tag}
                    </span>
                  </div>

                  {/* Views */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-[10px]">
                      {blog.views} views
                    </span>
                  </div>
                </div>

                {/* Blog Info */}
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 group-hover:text-[#F48C7F] transition-colors text-md line-clamp-2">
                    {blog.title}
                  </h4>

                  <p className="text-gray-600 text-sm mt-2 line-clamp-3" dangerouslySetInnerHTML={{__html:blog.description}}>
                   
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                    <span className="text-sm text-gray-500 font-medium">
                      Read More
                    </span>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full group-hover:bg-[#F48C7F] transition-all duration-300"
                    >
                      <FaAngleRight className="text-gray-600 group-hover:text-white transition-colors" />
                    </Link>
                  </div>
                </div>
              </div>
           
          ))
      ) : (
        <div className="col-span-3 text-center py-12">
          <div className="bg-gray-100 rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-6xl text-gray-300 mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Blogs Found</h3>
            <p className="text-gray-500">Check back later for new articles and updates.</p>
          </div>
        </div>
      )}
    </div>
      </div>


    </section>


  );
};

export default News;
