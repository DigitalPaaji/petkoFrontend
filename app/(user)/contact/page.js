'use client';
import Banner from '@/app/components/InnerBanner';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ContactForm() {



  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
 
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

    if (!formData.name) tempErrors.name = 'First name is required';
    if (!formData.phone) tempErrors.phone = 'Phone number is required';
    else if (!/^\+?\d{10,15}$/.test(formData.phone))
      tempErrors.phone = 'Phone number must be valid (e.g., +1234567890)';
    if (!formData.email) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = 'Email is invalid';
    if (!formData.message) tempErrors.message = 'Message is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormTouched(true);

  // Ensure selectedServices is included in formData

  setFormData({...formData}); // Update state

    const isValid = validate();
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      // const response = await fetch('https://kashishportfolio.onrender.com/send-mail', {
      const response = await fetch('http://localhost:5000/send-mail', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || 'Your message has been sent successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFormData({
          
            name: '',
            phone: '',
            email: '',
            message: ''
          
        });
        setIsFormTouched(false);

      } else {
        toast.error(data.error || 'Something went wrong!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send your message. Please try again.', {
        position: 'top-right',
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
    <Banner title='Contact'/>
    <div className=" mx-12 md:mx-12 xl:mx-32 my-12 xl:my-24  flex items-center flex-col xl:flex-row gap-6 lg:justify-between ">
      <ToastContainer style={{ zIndex: 999999999 }} />
     
      <div className="w-full xl:w-1/2  text-left text-[#666] ">
               {/* <p className='text-lg font-semibold  mb-2'>Why Choose Us</p>
       <h4 className="text-2xl xl:text-4xl font-bold text-[#033e47] mb-6">
Contact Us
</h4> */}
       <h4 className="text-2xl xl:text-4xl mb-6 text-black">
Drop Us a Line
</h4>
       
        <p className=" text-md">
       Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.



        </p>

        <div className="flex mt-4 items-center justify-start gap-4"
          >
            <Image
              alt=""
              src="/Images/frontend/map.png"
              width={48}
              height={48}
              className="w-10 lg:w-12 h-10 lg:h-12"
            />
            <div>
              <p className="text-lg  text-black ">Address</p>
              <p className="text-md  text-left ">
        

The Sms World, 294 Anand Nagar -A,Mandir Street, Tripuri Town,Patiala - 147001, Punjab,India

         
        </p>
            </div>
          </div>
            <div className="flex mt-4 items-center justify-start gap-4"
          >
            <Image
              alt=""
              src="/Images/frontend/call.png"
              width={48}
              height={48}
              className="w-10 lg:w-12 h-10 lg:h-12"
            />
            <div>
              <p className="text-lg text-black  ">Phone</p>
              <p className=" text-md  text-left ">
     

+91 98883 35805
         
        </p>
            </div>
          </div>
            <div className="flex items-center justify-start gap-4 mt-4"
          >
            <Image
              alt=""
              src="/Images/frontend/email.png"
              width={48}
              height={48}
              className="w-10 lg:w-12 h-10 lg:h-12"
            />
            <div>
              <p className="text-lg text-black  ">Send Email</p>
              <p className=" text-md  text-left ">
     
info@thesmsworld.com
         
        </p>
            </div>
          </div>
      </div>
<div className='w-full xl:w-1/2  bg-white' >

        {/* <p className=' fontfont-semibold '>
Interested in collaborating with us or have queries? Simply complete the form!
        </p> */}


<form
        className="grid grid-cols-1 md:grid-cols-2 gap-6  mt-6 "
        onSubmit={handleSubmit}
      >
        {/* First Name */}
        <div className='col-span-2 md:col-span-1'>
          <label className=" block lg:text-md mb-2">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className=" p-6  border border-[#6666664d] shadow-md hover:shadow-lg transition-all  w-full  px-6 py-3 focus:outline-none"
          />
          {isFormTouched && errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>



        {/* Phone */}
        <div className='col-span-2 md:col-span-1'>
          <label className=" block lg:text-md mb-2">Your Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 2929 29xxx"
            className=" p-6  border border-[#6666664d] shadow-md hover:shadow-lg transition-all  w-full  px-6 py-3 focus:outline-none"
          />
          {isFormTouched && errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div className='col-span-2'>
          <label className=" block lg:text-md mb-2">Your Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="youremail@domain.com"
            className=" p-6  border border-[#6666664d] shadow-md hover:shadow-lg transition-all  w-full  px-6 py-3 focus:outline-none"
          />
          {isFormTouched && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>



        {/* Message */}
        <div className="col-span-2">
          <label className=" block lg:text-md mb-2">
          Please tell us how we can help you? *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter Message"
            rows={2}
            className=" p-6  border border-[#6666664d] shadow-md hover:shadow-lg transition-all  w-full  px-6 py-3 focus:outline-none"
          ></textarea>
          {isFormTouched && errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>


              {/* <div className="col-span-2 font-semibold text-gray-800">
          <label className='space-x-2'>
          <input type="checkbox" name="terms" required />
          <span>I Agree to Use <Link className='text-blue-600' href={'/terms-and-conditions'}>Terms & Conditions</Link> and <Link className='text-blue-600' href={'/privacy-policy'}>Privacy Policy</Link> </span>
          </label>
         </div> */}

{/* 
      <div className="col-span-2 font-semibold text-gray-800">
    <label className=''>
      <input type="checkbox" id="consent" required />
     <span> Receive Messages/Email/RCS and any updates to mobile number or email.</span>
    </label>
  </div> */}

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#F48C7F] font-semibold px-6 py-3  transition duration-200 "
          >
            <span className='mx-auto'>{isSubmitting ? 'Sending...' : 'Submit'}</span>
          </button>
        </div>
      </form>
</div>

    </div>
        {/* Map with Dots */}
      <div className="w-full h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13770.9040118179!2d76.402736!3d30.358736000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3910291ec53226d3%3A0xd81cade77ecfa8d3!2sDigital%20Paaji!5e0!3m2!1sen!2sin!4v1760523862268!5m2!1sen!2sin"
          
          className="w-full h-full"
          loading="lazy"
        ></iframe>

        
      </div>
    </>
  );
}




