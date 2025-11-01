'use client';
import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaStar, FaStarHalfAlt, FaRegStar, FaQuoteLeft, FaPaw } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ReviewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  // Sample review data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      pet: "Golden Retriever - Max",
      rating: 5,
      comment: "Amazing service! My Max loves coming here. The staff is incredibly caring and professional. Highly recommended!",
      avatar: "/avatars/sarah.jpg",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Mike Chen",
      pet: "Siamese Cat - Luna",
      rating: 4.5,
      comment: "Luna can be quite shy, but the team here made her feel so comfortable. Great grooming services!",
      avatar: "/avatars/mike.jpg",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      pet: "French Bulldog - Bruno",
      rating: 5,
      comment: "Bruno's health improved significantly after visiting this clinic. The veterinarians are top-notch!",
      avatar: "/avatars/emily.jpg",
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "David Kim",
      pet: "Parrot - Kiwi",
      rating: 4,
      comment: "They even take care of exotic pets! Kiwi gets so excited for his checkups. Wonderful experience.",
      avatar: "/avatars/david.jpg",
      date: "2 months ago"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      pet: "Ragdoll Cats - Snowball & Marshmallow",
      rating: 5,
      comment: "Both my cats receive excellent care here. The boarding facility is clean and the staff is loving.",
      avatar: "/avatars/lisa.jpg",
      date: "1 week ago"
    }
  ];

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-amber-600" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-amber-600" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-amber-600" />);
      }
    }
    return stars;
  };

  return (
    <section className="py-16 px-4 md:px-12 xl:px-24 2xl:px-40 bg-gradient-to-b from-transparent to-[#fff5e1b9]">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-0.5 bg-stone-300 mr-4"></div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-serif font-light text-stone-800 tracking-wider">Petko</span>
            <span className="text-xs text-stone-500 tracking-widest mt-1">HAPPY PETS • HAPPY FAMILIES</span>
          </div>
          <div className="w-16 h-0.5 bg-stone-300 ml-4"></div>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 mb-4 tracking-wide">
          Trusted by Pet Parents
        </h2>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
          Discover why families choose Petite for their beloved companions' care and wellbeing.
        </p>
      </div>

      {/* Swiper Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Custom Navigation Arrows */}
        <button 
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-stone-100 rounded-full shadow-sm flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-all duration-300 hover:scale-105 border border-stone-200 hidden md:flex"
        >
          <IoIosArrowBack className="text-xl" />
        </button>
        
        <button 
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-stone-100 rounded-full shadow-sm flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-all duration-300 hover:scale-105 border border-stone-200 hidden md:flex"
        >
          <IoIosArrowForward className="text-xl" />
        </button>

        {/* Swiper Component */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          pagination={{
            clickable: true,
            el: '.reviews-pagination',
            bulletClass: 'reviews-bullet',
            bulletActiveClass: 'reviews-bullet-active',
          }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="pb-16"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white rounded-lg p-8 h-full transform transition-all duration-500 hover:shadow-md border border-stone-200 group">
                {/* Background decorative element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-stone-50 to-amber-50 rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                
                {/* Quote Icon */}
                <div className="relative mb-6">
                  <FaQuoteLeft className="text-3xl text-stone-300 group-hover:text-stone-400 transition-colors duration-300" />
                </div>

                {/* Stars */}
                <div className="flex mb-4">
                  {renderStars(review.rating)}
                </div>

                {/* Review Comment */}
                <p className="text-stone-700 text-lg mb-8 leading-relaxed relative z-10 font-light">
                  "{review.comment}"
                </p>

                {/* Reviewer Info */}
                <div className="flex items-center relative z-10 pt-4 border-t border-stone-100">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-stone-600 to-stone-800 rounded-full flex items-center justify-center text-white font-serif font-light text-lg shadow-sm">
                      {review.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-serif font-normal text-stone-800">{review.name}</h4>
                    <p className="text-sm text-stone-600 font-light">
                      {review.pet}
                    </p>
                    <p className="text-xs text-stone-500 mt-1 font-light">{review.date}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="reviews-pagination flex justify-center space-x-2 mt-8"></div>
      </div>

      {/* Custom CSS for pagination */}
      <style jsx>{`
        .reviews-bullet {
          width: 8px;
          height: 8px;
          background: #d6d3d1;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .reviews-bullet-active {
          width: 24px;
          background: #57534e;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
};

export default ReviewsSection;