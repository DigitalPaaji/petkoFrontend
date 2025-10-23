"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RelatedProducts from "@/app/components/RelatedProducts";

const News = () => {
  const [selectedBlog, setSelectedBlog] = useState(0);
  const blogs = [
    {
      id: 1,
      title: "5 Essential Grooming Tips for Your Furry Friend",
      images: ["/Images/frontend/img.webp", "/Images/frontend/img.webp"],
      date: "April 29, 2025",
      tag: "Pet Grooming",
      description: "Discover the top 5 grooming practices that will keep your pet healthy, happy, and looking their best. From brushing techniques to nail care, we cover everything you need to know.",
      sections: [
        {
          heading: "Why Regular Grooming Matters",
          paragraphs: [
            "Regular grooming is essential for your pet's health and wellbeing. It's not just about keeping them looking cute - it's about preventing skin issues, matting, and other health problems.",
            "At Paws & Claws Care, we believe grooming should be a positive experience for both you and your pet."
          ]
        },
        {
          heading: "Brushing Basics",
          paragraphs: [
            "Regular brushing removes dirt, spreads natural oils, and prevents tangles. The frequency depends on your pet's coat type."
          ],
          points: [
            "Short-haired pets: Brush once a week",
            "Long-haired pets: Daily brushing recommended",
            "Use the right brush for your pet's coat type",
            "Make it a bonding experience with treats and praise"
          ]
        },
        {
          heading: "Bathing Your Pet Safely",
          paragraphs: [
            "Bathing too frequently can strip natural oils, while not bathing enough can lead to skin issues."
          ],
          points: [
            "Use pet-specific shampoo",
            "Test water temperature before bathing",
            "Protect ears from water",
            "Dry thoroughly after bath"
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Understanding Your Pet's Nutritional Needs",
      images: ["/Images/frontend/img.webp", "/Images/frontend/img.webp"],
      date: "April 28, 2025",
      tag: "Pet Nutrition",
      description: "Learn how to choose the right food for your pet based on their age, breed, and health requirements. Proper nutrition is key to a long, healthy life.",
      sections: [
        {
          heading: "Life Stage Nutrition",
          paragraphs: [
            "Pets have different nutritional needs at various life stages. Puppies and kittens need more protein and calories, while seniors may require joint support."
          ],
          points: [
            "Puppy/Kitten: High protein for growth",
            "Adult: Balanced maintenance diet",
            "Senior: Joint support and easier digestion"
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Training Tips for New Pet Parents",
      images: ["/Images/frontend/img.webp", "/Images/frontend/img.webp"],
      date: "April 27, 2025",
      tag: "Pet Training",
      description: "Essential training techniques for new pet owners. Build a strong bond with your pet through positive reinforcement and consistent training methods.",
      sections: [
        {
          heading: "Positive Reinforcement Works Best",
          paragraphs: [
            "Using treats, praise, and play as rewards creates a positive learning environment for your pet."
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Creating a Pet-Friendly Home Environment",
      images: ["/Images/frontend/img.webp", "/Images/frontend/img.webp"],
      date: "April 26, 2025",
      tag: "Pet Safety",
      description: "Transform your home into a safe and comfortable space for your furry family members with these practical tips and design ideas.",
      sections: [
        {
          heading: "Safety First",
          paragraphs: [
            "Pet-proofing your home prevents accidents and keeps your pets safe."
          ]
        }
      ]
    },
    {
      id: 5,
      title: "Recognizing Common Pet Health Issues",
      images: ["/Images/frontend/img.webp", "/Images/frontend/img.webp"],
      date: "April 25, 2025",
      tag: "Pet Health",
      description: "Learn to identify common health problems in pets and when to seek veterinary care. Early detection can save lives.",
      sections: [
        {
          heading: "Warning Signs to Watch For",
          paragraphs: [
            "Knowing what's normal for your pet helps you spot problems early."
          ]
        }
      ]
    }
  ];

  return (
  
    <div className=" ">
      {/* Main Content */}
      <div className="mx-4 md:mx-12 xl:mx-24 2xl:mx-40 my-12  ">
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-12 w-full">
          
          {/* Main Blog */}
          <div className="border border-[#6666664d]  col-span-8 w-full">
            <article className="">
              
              {/* Blog Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                {blogs[selectedBlog].images.map((img, i) => (
                  <div key={i} className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                    <Image 
                      src={img}
                      alt={`${blogs[selectedBlog].title} image ${i + 1}`}
                      fill
                      className=" object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>

              {/* Blog Content */}
              <div className="p-6 md:p-8 text-[#4B666E]">
                {/* Tag and Date */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-[#F59383] text-white px-3 py-1 rounded-xl text-sm font-medium">
                    {blogs[selectedBlog].tag}
                  </span>
                  <span className="text-[#4B666E]/70 text-sm">
                    {blogs[selectedBlog].date}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-semibold mb-4 leading-tight text-[#4B666E]">
                  {blogs[selectedBlog].title}
                </h1>

                {/* Description */}
                <p className=" text-[#4B666E]/80 mb-8 leading-relaxed">
                  {blogs[selectedBlog].description}
                </p>

                {/* Blog Sections */}
                <div className="space-y-8">
                  {blogs[selectedBlog].sections.map((section, index) => (
                    <div key={index} className="border-l-4 border-[#F59383] pl-6">
                      <h2 className="text-xl mb-4 text-[#4B666E]">
                        {section.heading}
                      </h2>

                      <div className="space-y-4 text-[#4B666E]/90 leading-relaxed">
                        {section.paragraphs.map((para, i) => (
                          <p key={i} className="">{para}</p>
                        ))}
                      </div>

                      {section.points && (
                        <ul className="mt-4 space-y-2">
                          {section.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 text-[#4B666E]/90">
                              <span className="text-[#F59383] mt-1">•</span>
                              <span className="">{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t border-[#4B666E33]">
                  <h3 className="text-lg font-semibold mb-4 text-[#4B666E]">
                    Share this article
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    {['Facebook', 'Twitter', 'Pinterest', 'Email'].map((platform) => (
                      <button
                        key={platform}
                        className="bg-[#4B666E]/10 hover:bg-[#F59383]/20 text-[#4B666E] px-4 py-2 rounded-lg transition-colors duration-200"
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className=" border border-[#6666664d] col-span-4">
            <div className="lg:sticky lg:top-24 space-y-8">

              {/* Recent Blogs */}
              <div className="p-6">
                <h2 className="text-xl mb-6 pb-3 border-b-2 border-[#F59383]/40 text-[#4B666E]">
                  Recent Articles
                </h2>
                <div className="space-y-6">
                  {blogs.map((blog, index) => (
                    <div
                      key={blog.id}
                      className={`group cursor-pointer transition-all duration-300 ${
                        selectedBlog === index 
                          ? 'bg-[#F59383]/10 border-l-4 border-[#F59383]' 
                          : 'hover:bg-[#FFF6E2]/70'
                      }`}
                      onClick={() => setSelectedBlog(index)}
                    >
                      <div className="flex gap-4 p-3">
                        <div className="flex-shrink-0">
                          <div className="relative w-20 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={blog.images[0]}
                              alt={blog.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold text-sm leading-tight mb-1 group-hover:text-[#F59383] transition-colors ${
                            selectedBlog === index ? 'text-[#F59383]' : 'text-[#4B666E]'
                          }`}>
                            {blog.title}
                          </h3>
                          <p className="text-xs text-[#4B666E]/70">{blog.date}</p>
                          <span className="inline-block mt-1 text-xs bg-[#F59383] text-white px-2 py-1 rounded-lg">
                            {blog.tag}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Cloud */}
              <div className="p-6">
                <h2 className="text-xl mb-6 pb-3 border-b-2 border-[#f592834f] text-[#4B666E]">
                  Popular Tags
                </h2>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Pet Grooming", "Nutrition", "Training", "Health", 
                    "Behavior", "Toys", "Safety", "Adoption", "Senior Pets"
                  ].map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag.toLowerCase().replace(' ', '-')}`}
                      className="bg-[#f592831e] hover:bg-[#f5928328] text-[#4B666E] px-4 py-2  text-sm font-medium transition-all duration-200 hover:scale-105 shadow-sm"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-[#F59383] p-6 text-white">
                <h3 className="text-xl mb-3 font-semibold">Join Our Pet Community</h3>
                <p className="text-[#fff] mb-4">Get the latest pet care tips and exclusive content</p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-white/20 placeholder-[#f5f3ee] text-white border border-[#f5f3ee] focus:outline-none "
                  />
                  <button className="w-full bg-[#FFF6E2] text-[#4B666E] font-semibold py-3 hover:bg-[#fcefd9] transition-colors duration-200">
                    Subscribe Now
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

<RelatedProducts/>
    </div>
  );
};

export default News;