'use client';
import { FaAngleRight, FaCalendar, FaUser, FaClock } from 'react-icons/fa';

const BlogSection = ({ blogs = [] }) => {
  // Sample blog data matching your schema structure
  const sampleBlogs = [
    {
      _id: "1",
      slug: "ultimate-guide-pet-nutrition",
      title: "The Ultimate Guide to Pet Nutrition and Health",
      images: [
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=400&h=300&fit=crop"
      ],
      tag: "Nutrition",
      description: "Discover the essential nutrients your furry friend needs for a healthy and happy life. Learn about balanced diets for different breeds.",
      author: "Dr. Sarah Johnson",
      readingTime: 5,
      views: 1247,
      published: true,
      sections: [
        {
          heading: "Essential Nutrients",
          paragraphs: ["Proper nutrition is vital for your pet's overall health..."],
          points: ["Protein requirements", "Vitamin supplements", "Hydration needs"]
        }
      ],
      createdAt: "2024-01-15T10:00:00Z"
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
      published: true,
      sections: [
        {
          heading: "Common Stress Indicators",
          paragraphs: ["Pets communicate stress through various behaviors..."],
          points: ["Changes in appetite", "Excessive grooming", "Hiding behavior"]
        }
      ],
      createdAt: "2024-01-12T08:30:00Z"
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
      published: true,
      sections: [
        {
          heading: "Coat Type Classification",
          paragraphs: ["Different coat types require specific care routines..."],
          points: ["Short hair care", "Long hair maintenance", "Double coat handling"]
        }
      ],
      createdAt: "2024-01-08T14:15:00Z"
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
      published: true,
      sections: [
        {
          heading: "Environmental Enrichment",
          paragraphs: ["Cats thrive in environments that cater to their natural instincts..."],
          points: ["Vertical spaces", "Hiding spots", "Interactive toys"]
        }
      ],
      createdAt: "2024-01-05T09:45:00Z"
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
      published: true,
      sections: [
        {
          heading: "Basic Commands",
          paragraphs: ["Foundation training is crucial for puppy development..."],
          points: ["Sit command", "Stay training", "Leash walking"]
        }
      ],
      createdAt: "2024-01-02T11:20:00Z"
    },
        {
      _id: "6",
      slug: "ultimate-guide-pet-nutrition",
      title: "The Ultimate Guide to Pet Nutrition and Health",
      images: [
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=400&h=300&fit=crop"
      ],
      tag: "Nutrition",
      description: "Discover the essential nutrients your furry friend needs for a healthy and happy life. Learn about balanced diets for different breeds.",
      author: "Dr. Sarah Johnson",
      readingTime: 5,
      views: 1247,
      published: true,
      sections: [
        {
          heading: "Essential Nutrients",
          paragraphs: ["Proper nutrition is vital for your pet's overall health..."],
          points: ["Protein requirements", "Vitamin supplements", "Hydration needs"]
        }
      ],
      createdAt: "2024-01-15T10:00:00Z"
    },
    {
      _id: "7",
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
      published: true,
      sections: [
        {
          heading: "Common Stress Indicators",
          paragraphs: ["Pets communicate stress through various behaviors..."],
          points: ["Changes in appetite", "Excessive grooming", "Hiding behavior"]
        }
      ],
      createdAt: "2024-01-12T08:30:00Z"
    },
    {
      _id: "8",
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
      published: true,
      sections: [
        {
          heading: "Coat Type Classification",
          paragraphs: ["Different coat types require specific care routines..."],
          points: ["Short hair care", "Long hair maintenance", "Double coat handling"]
        }
      ],
      createdAt: "2024-01-08T14:15:00Z"
    },
    {
      _id: "9",
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
      published: true,
      sections: [
        {
          heading: "Environmental Enrichment",
          paragraphs: ["Cats thrive in environments that cater to their natural instincts..."],
          points: ["Vertical spaces", "Hiding spots", "Interactive toys"]
        }
      ],
      createdAt: "2024-01-05T09:45:00Z"
    },
    {
      _id: "10",
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
      published: true,
      sections: [
        {
          heading: "Basic Commands",
          paragraphs: ["Foundation training is crucial for puppy development..."],
          points: ["Sit command", "Stay training", "Leash walking"]
        }
      ],
      createdAt: "2024-01-02T11:20:00Z"
    }
  ];

  const displayBlogs = blogs.length > 0 ? blogs : sampleBlogs;

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className="relative py-16 px-4 md:px-12 xl:px-24 2xl:px-40">
      {/* Section Heading */}
      <div className="border-b border-[#6666664d] py-4 px-6 transition-colors duration-200 font-semibold text-[17px] lg:text-[22px]">
        Latest Pet Care Blogs
      </div>

      {/* Single Row Container with Horizontal Scroll */}
      <div className="flex gap-6 pt-12 overflow-x-auto pb-8 scrollbar-hide">
        {displayBlogs.map((blog) => (
          <article 
            key={blog._id}
            className="flex-shrink-0 w-80 group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <a 
              href={`/blog/${blog.slug}`}
              className="block"
            >
              {/* Blog Image - Using first image from images array */}
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ 
                    backgroundImage: `url(${blog.images[0] || 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop'})` 
                  }}
                ></div>
                
                {/* Tag Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {blog.tag}
                  </span>
                </div>

                {/* Views Count */}
                <div className="absolute top-4 right-4">
                  <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {blog.views} views
                  </span>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                {/* Meta Information */}
                {/* <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 flex-wrap">
                  <div className="flex items-center gap-1">
                    <FaCalendar className="text-[#F48C7F]" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUser className="text-[#F48C7F]" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock className="text-[#F48C7F]" />
                    <span>{blog.readingTime} min read</span>
                  </div>
                </div> */}

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-[#F48C7F] transition-colors duration-300 line-clamp-2">
                  {blog.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.description}
                </p>

                {/* Read More Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500 font-medium">
                    Read More
                  </span>
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full group-hover:bg-[#F48C7F] transition-all duration-300">
                    <FaAngleRight className="text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>



      {/* Custom Scrollbar Hide CSS */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default BlogSection;