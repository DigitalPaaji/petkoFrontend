'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { FiArrowRight, FiCalendar, FiClock, FiEye, FiUser } from "react-icons/fi"; // React Icons
import { baseurl, imgurl } from "@/app/admin/components/apis";
import Link from "next/link";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${baseurl}/blog/topblog`);
        if (response.data.success) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const calculateReadTime = (htmlContent) => {
    const text = htmlContent.replace(/<[^>]*>/g, ''); // Remove HTML tags
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / 200); // Assuming 200 words per minute
  };

  return (
    <section className="bg-white py-12 ">




      <div className="  ">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#F59383] text-center">
          Latest <span className="text-gray-800">Blogs</span>
        </h2>

       <div className="px-10 py-10">
  {blogs.length > 0 ? (
   <Swiper
  modules={[Pagination, Navigation, Autoplay]}
  spaceBetween={30}
  slidesPerView={1}
  speed={3000} // smooth continuous motion
  autoplay={{
    delay: 0, // no delay between slides
    disableOnInteraction: false,
  }}
  loop={true}
  freeMode={true} // smooth continuous scroll effect
  freeModeMomentum={false}
  grabCursor={true}
  breakpoints={{
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 4 },
  }}
  className="mySwiper"
>
    
      {blogs.map((blog) => (
        <SwiperSlide key={blog._id}>
          <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="relative overflow-hidden">
              <img
                src={`${imgurl}/uploads/${blog.images[0]}`}
                alt={blog.title}
                className="w-full h-[15rem] object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#F59383] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Blog
                </span>
              </div>

              <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                <FiClock className="text-xs" />
                <span>{blog.readingTime} min read</span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#F59383] transition-colors duration-300">
                {blog.title}
              </h3>

              <div
                className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: blog.description.slice(0, 60) + "...",
                }}
              />

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-[#F59383]" />
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUser className="text-[#F59383]" />
                    <span>{blog.author || "Admin"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <FiEye className="text-gray-400" />
                  <span>1.2k</span>
                </div>
              </div>

              <Link
                href={`/blog/${blog.slug}`}
                className="group/btn inline-flex items-center gap-2 bg-[#F59383] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#e58474] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full justify-center"
              >
                Read More
                <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <div className="flex justify-center">
      <div className="text-center py-12">
        <div className="bg-gray-100 rounded-2xl p-8 max-w-md mx-auto">
          <div className="text-6xl text-gray-300 mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Blogs Found
          </h3>
          <p className="text-gray-500">
            Check back later for new articles and updates.
          </p>
        </div>
      </div>
    </div>
  )}
</div>

      </div>
    </section>


  );
};

export default BlogSection;
