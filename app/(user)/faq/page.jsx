"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Banner from "../../components/InnerBanner"; // adjust path if needed

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Do you offer customization in jewellery?",
      answer:
        "Yes, at Saaj Riwaaj we provide complete customization options. You can share your preferred design, gemstone, or metal, and our artisans will craft it as per your requirement.",
    },
    {
      question: "Are your products made with real gold and silver?",
      answer:
        "Absolutely. All our jewellery pieces are made with authentic gold, silver, and certified gemstones. We also provide purity and authenticity certificates with our jewellery.",
    },
    {
      question: "Do you provide home delivery?",
      answer:
        "Yes, we provide safe and insured home delivery across India and selected international locations.",
    },
    {
      question: "Can I return or exchange jewellery?",
      answer:
        "We offer easy returns and exchanges within a specified period, provided the jewellery is unused and in original condition. Customized orders may not be eligible for return.",
    },
    {
      question: "Do you offer lifetime maintenance?",
      answer:
        "Yes, we provide lifetime cleaning and polishing services for our jewellery to help maintain its shine and beauty.",
    },
    {
      question: "How can I book an appointment?",
      answer:
        "You can book an appointment through our Contact Us page, call us directly, or visit our store for personalized assistance.",
    },
     {
      question: "Do you offer customization in jewellery?",
      answer:
        "Yes, at Saaj Riwaaj we provide complete customization options. You can share your preferred design, gemstone, or metal, and our artisans will craft it as per your requirement.",
    },
    {
      question: "Are your products made with real gold and silver?",
      answer:
        "Absolutely. All our jewellery pieces are made with authentic gold, silver, and certified gemstones. We also provide purity and authenticity certificates with our jewellery.",
    },
    {
      question: "Do you provide home delivery?",
      answer:
        "Yes, we provide safe and insured home delivery across India and selected international locations.",
    },
    {
      question: "Can I return or exchange jewellery?",
      answer:
        "We offer easy returns and exchanges within a specified period, provided the jewellery is unused and in original condition. Customized orders may not be eligible for return.",
    },
    {
      question: "Do you offer lifetime maintenance?",
      answer:
        "Yes, we provide lifetime cleaning and polishing services for our jewellery to help maintain its shine and beauty.",
    },
    {
      question: "How can I book an appointment?",
      answer:
        "You can book an appointment through our Contact Us page, call us directly, or visit our store for personalized assistance.",
    },
     {
      question: "Do you offer customization in jewellery?",
      answer:
        "Yes, at Saaj Riwaaj we provide complete customization options. You can share your preferred design, gemstone, or metal, and our artisans will craft it as per your requirement.",
    },
    {
      question: "Are your products made with real gold and silver?",
      answer:
        "Absolutely. All our jewellery pieces are made with authentic gold, silver, and certified gemstones. We also provide purity and authenticity certificates with our jewellery.",
    },
    {
      question: "Do you provide home delivery?",
      answer:
        "Yes, we provide safe and insured home delivery across India and selected international locations.",
    },
    {
      question: "Can I return or exchange jewellery?",
      answer:
        "We offer easy returns and exchanges within a specified period, provided the jewellery is unused and in original condition. Customized orders may not be eligible for return.",
    },
    {
      question: "Do you offer lifetime maintenance?",
      answer:
        "Yes, we provide lifetime cleaning and polishing services for our jewellery to help maintain its shine and beauty.",
    },
    {
      question: "How can I book an appointment?",
      answer:
        "You can book an appointment through our Contact Us page, call us directly, or visit our store for personalized assistance.",
    },
  ];

  return (
    <div>
      {/* Banner */}
      <Banner title="Frequently Asked Questions" />

      {/* Content */}
      <div className="px-4 sm:px-8 lg:px-24 xl:px-60 mx-auto my-16">
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-[#6666664d] bg-white "
            >
              <button
                onClick={() => toggleDropdown(index)}
                className="w-full flex justify-between items-center text-left py-4 px-6 font-semibold text-lg text-gray-800"
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="text-[#2ea2cc]" />
                ) : (
                  <FaChevronDown className="text-[#F48C7F]" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 text-[#666] leading-7 border-t border-gray-100">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faq;
