"use client";
import Banner from "@/app/components/InnerBanner";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormTouched, setIsFormTouched] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validation function
  const validate = () => {
    const tempErrors = {};

    if (!formData.name) tempErrors.name = "First name is required";
    if (!formData.phone) tempErrors.phone = "Phone number is required";
    else if (!/^\+?\d{10,15}$/.test(formData.phone))
      tempErrors.phone = "Phone number must be valid (e.g., +1234567890)";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email is invalid";
    if (!formData.message) tempErrors.message = "Message is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormTouched(true);

    // Ensure selectedServices is included in formData
    setFormData({ ...formData }); // Update state

    const isValid = validate();
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      // const response = await fetch('https://kashishportfolio.onrender.com/send-mail', {
      const response = await fetch("http://localhost:5000/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(
          data.message || "Your message has been sent successfully!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
        setIsFormTouched(false);
      } else {
        toast.error(data.error || "Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send your message. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Banner title="Contact" />
      <div className="py-2 px-4 md:px-12 xl:px-24 2xl:px-40 my-16">
        <div className="flex flex-col xl:flex-row gap-8 lg:justify-between">
          <ToastContainer style={{ zIndex: 999999999 }} />

          {/* Contact Info Section */}
          <div className="w-full xl:w-1/2 text-left">
            <h4 className="text-3xl xl:text-4xl font-bold text-gray-800 mb-6">
              Drop Us a Line
            </h4>

            <p className="text-gray-600 leading-relaxed mb-8">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>

            {/* Contact Items */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Image
                    alt="Map location"
                    src="/Images/frontend/map.png"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">Address</p>
                  <p className="text-gray-600">
                    The Sms World, 294 Anand Nagar -A, Mandir Street, Tripuri
                    Town, Patiala - 147001, Punjab, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Image
                    alt="Phone number"
                    src="/Images/frontend/call.png"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">Phone</p>
                  <p className="text-gray-600">+91 98883 35805</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Image
                    alt="Email address"
                    src="/Images/frontend/email.png"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Send Email
                  </p>
                  <p className="text-gray-600">info@thesmsworld.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="w-full xl:w-1/2 bg-white p-6 rounded-xl shadow-lg">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleSubmit}
            >
              {/* Name */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none   focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
                {isFormTouched && errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Your Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98883 35805"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none   focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
                {isFormTouched && errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div className="col-span-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="youremail@domain.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none   focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
                {isFormTouched && errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div className="col-span-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Please tell us how we can help you? *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message here..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none   focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-vertical"
                ></textarea>
                {isFormTouched && errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F48C7F] text-white font-semibold px-6 py-3  transition-all duration-200 transform hover:scale-105 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Submit Message"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full h-[400px] mt-16 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13770.9040118179!2d76.402736!3d30.358736000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3910291ec53226d3%3A0xd81cade77ecfa8d3!2sDigital%20Paaji!5e0!3m2!1sen!2sin!4v1760523862268!5m2!1sen!2sin"
            className="w-full h-full"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
