'use client';

import { FaAngleRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const BlogSection = ({ blogs = [] }) => {
  // Sample blog data
  const sampleBlogs = [
    {
      _id: "1",
      slug: "ultimate-guide-pet-nutrition",
      title: "The Ultimate Guide to Pet Nutrition and Health",
      images: [
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop"
      ],
      tag: "Nutrition",
      description: "Discover the essential nutrients your furry friend needs for a healthy and happy life. Learn about balanced diets for different breeds.",
      author: "Dr. Sarah Johnson",
      readingTime: 5,
      views: 1247,
      createdAt: "2024-01-15T10:00:00Z",
    },
    {
      _id: "2",
      slug: "pet-stress-signs-solutions",
      title: "5 Signs Your Pet Might Be Stressed and How to Help",
      images: [
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop"
      ],
      tag: "Behavior",
      description: "Learn to recognize the subtle signs of stress in your pet and discover effective ways to help them feel more comfortable and secure.",
      author: "Mike Thompson",
      readingTime: 4,
      views: 892,
      createdAt: "2024-01-12T08:30:00Z",
    },
    {
      _id: "3",
      slug: "grooming-tips-coat-types",
      title: "Complete Grooming Guide for Different Coat Types",
      images: [
        "https://images.unsplash.com/photo-1560743641-3914f2c45636?w=400&h=300&fit=crop"
      ],
      tag: "Grooming",
      description: "From short-haired to long-haired breeds, learn the best grooming practices to keep your pet's coat healthy and beautiful all year round.",
      author: "Emily Rodriguez",
      readingTime: 6,
      views: 1563,
      createdAt: "2024-01-08T14:15:00Z",
    },
    {
      _id: "4",
      slug: "cat-home-environment-tips",
      title: "Creating the Perfect Home Environment for Your Cat",
      images: [
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop"
      ],
      tag: "Cat Care",
      description: "Transform your home into a feline paradise with these simple tips for creating safe, stimulating spaces for your curious cat.",
      author: "Lisa Chen",
      readingTime: 7,
      views: 2105,
      createdAt: "2024-01-05T09:45:00Z",
    },
    {
      _id: "5",
      slug: "puppy-training-techniques",
      title: "Essential Training Techniques for New Puppy Owners",
      images: [
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop"
      ],
      tag: "Training",
      description: "Start your puppy's training journey on the right paw with these proven techniques that build trust and establish good habits.",
      author: "David Wilson",
      readingTime: 8,
      views: 1876,
      createdAt: "2024-01-02T11:20:00Z",
    },
  ];

  const displayBlogs = blogs.length > 0 ? blogs : sampleBlogs;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <section className="relative mx-4 md:mx-12 xl:mx-24 2xl:mx-40 my-16 p-6 lg:p-8">
      {/* Section Heading */}
      <div className="border-b border-[#6666664d] py-4 px-6 font-semibold text-[17px] lg:text-[22px]">
        Latest Pet Care Blogs
      </div>

      {/* Swiper Container */}
      <div className="pt-12">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="mySwiper"
        >
          {displayBlogs.map((blog) => (
            <SwiperSlide key={blog._id}>
              <div className="cursor-default group w-full bg-white rounded-lg overflow-hidden border border-transparent hover:border-[#6666664d] transition-transform duration-300">
                {/* Blog Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={blog.images?.[0] || 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop'}
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

                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {blog.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                    <span className="text-sm text-gray-500 font-medium">
                      Read More
                    </span>
                    <a
                      href={`/blog/${blog.slug}`}
                      className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full group-hover:bg-[#F48C7F] transition-all duration-300"
                    >
                      <FaAngleRight className="text-gray-600 group-hover:text-white transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Swiper Navigation Styling */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #f48c7f;
          transition: opacity 0.3s;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          opacity: 0.7;
        }
      `}</style>
    </section>
  );
};

export default BlogSection;
