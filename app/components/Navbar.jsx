"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, User, Search, Heart } from "lucide-react";
import { LuPhone } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { FiSearch  } from "react-icons/fi";

import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { getPet } from "./store/slices/petSlice";
import axios from "axios";
import { baseurl, imgurl } from "../admin/components/apis";

export default function Navbar() {

const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
dispatch(getPet())


    AOS.init({ duration: 800, once: true });
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const navLinks = [
  {
    name: "Pages",
    dropdown: [
      {
        name: "Useful Links",
        items: [
          { name: "Delivery Information", href: "/delivery-information" },
          { name: "Return & Refund Policy", href: "/refund-policy" },
          { name: "Privacy Policy", href: "/privacy-policy" },
          { name: "Terms & Conditions", href: "/terms-and-conditions" },
        ],
      },
      {
        name: "Customer Service",
        items: [
          { name: "Contact Us", href: "/contact" },
          { name: "FAQ", href: "/faq" },
          { name: "About Us", href: "/about" },
        ],
      },
    ],
  },

  { name: "Blog", href: "/blog" },
];



 const [petcategory,setPetCategory]=useState()

const pets = useSelector((state)=>state.petslice)
 const [searchProduct,setSearchProduct]=useState()
const [searchdata,setSearchData]=useState([])




useEffect(()=>{


  if(pets?.info || pets?.info?.success){
    setPetCategory(pets?.info?.petCategory)
  }
},[pets])







const searchProfetch=async(val)=>{
try {
   const response = await axios.get(`${baseurl}/product/search/${val}`);
 const data = await response.data;
 if(data.success){
setSearchData(data.products)
 }
 else{
  setSearchData([])
 }
  
} catch (error) {
    setSearchData([])

}


}




useEffect(()=>{
  if(!searchProduct?.length > 0) return;
const setval= setTimeout(() => {
  searchProfetch(searchProduct)
},500);

return ()=>clearTimeout(setval)
},[searchProduct])



  return (
    <>
      {/* ----------------- MAIN NAVBAR (before scroll) ----------------- */}
      {!scrolled && (
        <nav className="  w-full bg-white z-[999] transition-all duration-500 ease-out border-b border-[#6666664d] ">
          {/* Top Section */}
 <div className="flex items-center justify-between py-2 px-4 md:px-12 xl:px-24 2xl:px-40">
            <Link href="/" className="w-32 ">
              <Image
                src="/Images/frontend/logo.webp"
                alt="Logo"
                width={440}
                height={440}
                className="w-full h-auto object-cover"
              />
            </Link>


<div className=" hidden  lg:flex lg:space-x-8 nav"> 

 <div
      
      className="relative group"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <Link
        href={"/"}
        className="font-semibold py-4 text-[#666] hover:text-[#F48C7F] flex items-center gap-1 relative
                   transition-all duration-300 ease-in-out
                   border-t-2 border-transparent hover:border-[#F48C7F]
                   before:content-[''] before:absolute before:top-[-1px] before:left-0 
                   before:w-full before:h-px before:bg-white before:opacity-0 
                   before:transition-opacity before:duration-300 before:ease-in-out
                   hover:before:opacity-100"
      >
        Home
      </Link>

     
    </div>



  <div
   
      className="relative group"
      onMouseEnter={() => setActiveDropdown("shop")}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <Link
        href={"/shop"}
        className="font-semibold py-4 text-[#666] hover:text-[#F48C7F] flex items-center gap-1 relative
                   transition-all duration-300 ease-in-out
                   border-t-2 border-transparent hover:border-[#F48C7F]
                   before:content-[''] before:absolute before:top-[-1px] before:left-0 
                   before:w-full before:h-px before:bg-white before:opacity-0 
                   before:transition-opacity before:duration-300 before:ease-in-out
                   hover:before:opacity-100"
      >
       Shop
         <RiArrowDropDownLine className="text-2xl" />
      </Link>

     
    {activeDropdown === "shop" && (
        <div
          className="absolute left-0 w-60 bg-white border border-gray-200 
                     py-4 px-4 shadow-xl z-50 dropdown-menu"
        >
          <div
            className="absolute top-[-8px] left-5 w-0 h-0 
                       border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent 
                       border-b-[8px] border-b-white dropdown-arrow"
          ></div>


            <div
           
            >
              <h4 className="font-semibold text-[#333] mb-2">
                Categories
              </h4>
              <ul>
                {petcategory?.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/shop/?pet=${item._id}`}
                      onClick={() => setActiveDropdown(null)}
                      className="block py-1 text-[#555] hover:text-[#F48C7F] transition-colors"
                    >
                      {item?.type}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
        
        </div>
      )} 
    </div>

  {navLinks.map((link, index) => (
    <div
      key={link.name}
      className="relative group"
      onMouseEnter={() => setActiveDropdown(index)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <Link
        href={link.href || "#"}
        className="font-semibold py-4 text-[#666] hover:text-[#F48C7F] flex items-center gap-1 relative
                   transition-all duration-300 ease-in-out
                   border-t-2 border-transparent hover:border-[#F48C7F]
                   before:content-[''] before:absolute before:top-[-1px] before:left-0 
                   before:w-full before:h-px before:bg-white before:opacity-0 
                   before:transition-opacity before:duration-300 before:ease-in-out
                   hover:before:opacity-100"
      >
        {link.name}
        {link.dropdown && <RiArrowDropDownLine className="text-2xl" />}
      </Link>

      {link.dropdown && activeDropdown === index && (
        <div
          className="absolute left-0 w-60 bg-white border border-gray-200 
                     py-4 px-4 shadow-xl z-50 dropdown-menu"
        >
          <div
            className="absolute top-[-8px] left-5 w-0 h-0 
                       border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent 
                       border-b-[8px] border-b-white dropdown-arrow"
          ></div>









          {link.dropdown.map((section, sectionIndex) => (
            <div
              key={section.name}
              className={sectionIndex > 0 ? "mt-4 dropdown-section" : "dropdown-section"}
            >
              <h4 className="font-semibold text-[#333] mb-2">
                {section.name}
              </h4>
              <ul>
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block py-1 text-[#555] hover:text-[#F48C7F] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  ))}
</div>


            
            <div className="flex items-center gap-4">
            <div className="hidden xl:flex items-center justify-center gap-1 w-[340px]">
              <div className="flex items-center gap-1 w-full px-2 py-1.5 border border-[#6666664d] rounded-md relative">
              <CiSearch  className="w-6 h-6 text-[#666] object-cover"/>
              
              <input
                type="search"
                placeholder="Search Pet Accessories "
                className="focus:outline-none  w-full"
                 value={searchProduct}
                  onChange={(e) =>setSearchProduct(e.target.value) }
              />



{ searchProduct && searchdata?.length? 

<div className="flex flex-col gap-2 absolute  top-full bg-white w-full shadow-2xl mt-2 py-2 z-[999]">
{searchdata.map((item,index)=>{
  return(
    <Link key={index}
    onClick={()=>searchProduct(null)}
      href={`/shop/${item.slug}`} className="text-sm capitalize border-b px-3 py-1 border-gray-600/50 flex gap-2 items-center ">


                <img src={`${imgurl}/uploads/${item?.images[0]}`} alt="" className="h-10 w-10 rounded-full" />

    <p>
      {item.name.length >30 ? item.name.slice(0,30) :item.name}
    </p>
    </Link>



  )
})}

</div>
:""
}





              
              </div>
              {/* <button className="text-md text-white font-semibold bg-[#F48C7F] px-4 py-1.5 rounded-md">
                Search
              </button> */}
            </div>

            <div className="hidden xl:flex items-center gap-2">
              <LuPhone className="w-6 h-6 text-[#666]" />
              <div>
                <h4 className="text-md font-medium text-[#666]">Hotline</h4>
                <h3 className="font-semibold text-md">1-800-234-5678</h3>
              </div>
            </div>

            <div className="flex items-center space-x-3 lg:space-x-6">
              <button className="block xl:hidden ">
                <FiSearch  className="w-6 h-6 text-gray-600 hover:text-[#F48C7F]" />

              </button>
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-[#F48C7F]" />
               
              </Link>
              <Link href="/wishlist">
                <Heart className="w-6 h-6 text-gray-600 hover:text-[#F48C7F]" />
              </Link>
              <Link className="" href={"/user/dashboard"}>    <User className="w-6 h-6 text-gray-600 hover:text-[#F48C7F]" />

</Link> 
              <button
                className="lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-gray-700 transition-transform transform rotate-180 duration-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700 transition-transform duration-300" />
                )}
              </button>
            </div>
</div>
          </div> 

          {/* Bottom Nav Links */}
{/* 
          <div className="hidden lg:flex items-center justify-between px-4 md:px-12 xl:px-24 2xl:px-40 navbar-container">
           
            <div className="flex space-x-8 nav-links">
              {navLinks.map((link, index) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href || "#"}
                    className="font-medium py-4 text-[#666] hover:text-[#F48C7F] flex items-center gap-1 relative"
                  >
                    {link.name}
                    {link.dropdown && (
                      <RiArrowDropDownLine className="text-2xl" />
                    )}
                  </Link>

         
{link.dropdown && activeDropdown === index && (
  <div className="dropdown-menu">
    <div className="dropdown-arrow"></div>

    {link.dropdown.map((section) => (
      <div key={section.name} className="dropdown-section">
        <h4 className="font-semibold text-[#333] mb-2 text-sm">
          {section.name}
        </h4>
        <ul>
          {section.items.map((item) => (
            <li key={item}>
              <Link
                href="#"
                className="block py-1 text-[#555] hover:text-[#F48C7F] text-sm"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)}

                </div>
              ))}
            </div>

   
            <div className="flex items-center space-x-2 text-sm text-[#2ea2cc]">
              <Heart className="w-5 h-5" />
              <span className="bg-[#F48C7F] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
              <h3 className="text-md font-medium">YOUR WISHLIST</h3>
            </div>
          </div> */}

          {/* <div className="hidden lg:flex items-center justify-between px-4 md:px-12 xl:px-24 2xl:px-40 border-y border-[#eee]">
            <div className="flex space-x-8">
              {navLinks.map((link, index) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href || "#"}
                    className="font-medium py-4 text-[#666] hover:text-[#F48C7F] flex items-center gap-1"
                  >
                    {link.name}
                    {link.dropdown && <RiArrowDropDownLine className="text-2xl" />}
                  </Link>

                  {link.dropdown && activeDropdown === index && (
                    <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-md p-4 mt-1 shadow-lg z-50 w-52">
                      {link.dropdown.map((section) => (
                        <div key={section.name}>
                          <h4 className="font-semibold text-[#333] mb-2 text-sm">
                            {section.name}
                          </h4>
                          <ul>
                            {section.items.map((item) => (
                              <li key={item}>
                                <Link
                                  href="#"
                                  className="block py-1 text-[#555] hover:text-[#F48C7F] text-sm"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2 text-sm text-[#2ea2cc]">
              <Heart className="w-5 h-5" />
              <span className="bg-[#F48C7F] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
              <h3 className="text-md font-medium">YOUR WISHLIST</h3>
            </div>
          </div> */}
        </nav>
      )}

      {/* ----------------- SCROLLED NAV ----------------- */}
      {scrolled && (
        <nav
          data-aos="fade-down"
          data-aos-offset="100"
          data-aos-duration="800"
          className={`fixed top-0 left-0 w-full bg-white z-[999] transition-all duration-500 ease-out translate-y-0 opacity-100`}
        >
          {/* Top Section */}
          <div className="flex items-center justify-between py-2 px-4 md:px-12 xl:px-24 2xl:px-40">
            {/* Logo */}
            <Link href="/" className="w-32 ">
              <Image
                src="/Images/frontend/logo.webp"
                alt="Logo"
                width={440}
                height={440}
                className="w-full h-auto object-cover"
              />
            </Link>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center justify-center gap-0.5 w-[500px] relative">
              <input
                type="search"
                placeholder="Search Pet Accessories"
                className="w-full px-6 py-1.5 border border-[#6666664d] rounded-md"
                   value={searchProduct}
                  onChange={(e) =>setSearchProduct(e.target.value) }

              />
{ searchProduct && searchdata?.length? 

<div className="flex flex-col gap-2 absolute  top-full bg-white w-full shadow-2xl mt-2 py-2 z-[999]">
{searchdata.map((item,index)=>{
  return(
    <Link key={index}
    onClick={()=>searchProduct(null)}
      href={`/shop/${item.slug}`} className="capitalize border-b px-3 py-1 border-gray-600/50  flex items-center gap-2">
                <img src={`${imgurl}/uploads/${item?.images[0]}`} alt="" className="h-10 w-10 rounded-full" />
     <p> {item.name.length >30 ? item.name.slice(0,30) :item.name}</p>
    </Link>



  )
})}

</div>
:""
}



              <button className="text-md text-white font-semibold bg-[#F48C7F] px-4 py-1.5 rounded-md">
                Search
              </button>
            </div>

            {/* Hotline */}
            <div className="hidden xl:flex items-center gap-2">
              <LuPhone className="w-6 h-6 text-[#666]" />
              <div>
                <h4 className="text-md font-medium text-[#666]">Hotline</h4>
                <h3 className="font-semibold text-md">1-800-234-5678</h3>
              </div>
            </div>

            {/* Icons + Hamburger */}
            <div className="flex items-center space-x-3 lg:space-x-6">
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-[#F48C7F]" />
                {/* <span className="absolute -top-3 -right-3 bg-[#F48C7F] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span> */}
              </Link>
              <Heart className="w-6 h-6 text-gray-600 hover:text-[#F48C7F]" />
              <User className="w-6 h-6 text-gray-600 hover:text-[#F48C7F]" />

              {/* Hamburger */}
              <button
                className="lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-gray-700 transition-transform transform rotate-180 duration-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700 transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        </nav>
      )}

      <div
        className={`fixed lg:hidden top-0 right-0 h-full w-[80%] md:w-[40%] bg-white text-[#3e5f68] shadow-lg transform transition-transform duration-300 z-[1000] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 h-[80px] border-b border-[#2D4B52]/20">
          <Link href="/" className="w-24" onClick={() => setIsOpen(false)}>
            <Image
              src="/Images/frontend/logo.webp"
              alt="Logo"
              width={220}
              height={220}
              className="w-full h-auto object-cover"
            />
          </Link>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col space-y-6 px-6 py-8">


 <Link
              
              href={"/"}
              className="text-lg font-semibold hover:text-[#F48C7F] transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>


<div
              
             
              className="text-lg font-semibold hover:text-[#F48C7F] transition"
              onClick={() => setActiveDropdown(activeDropdown==="shop"?"":"shop")}
            >
              Shop



        <div
          className={` px-4 overflow-hidden ${activeDropdown === "shop"? "h-48" :"h-0"}  duration-300      `}
        >
          <div
            className="absolute top-[-8px] left-5 w-0 h-0 
                       border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent 
                       border-b-[8px] border-b-white dropdown-arrow"
          ></div>


            <div
           
            >
              <h4 className="font-semibold text-[#333] mb-2">
                Categories
              </h4>
              <ul>
                {petcategory?.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/shop/?pet=${item._id}`}
                      onClick={() => {setIsOpen(false)}}
                      
                      className="block py-1 text-[#555] hover:text-[#F48C7F] transition-colors"
                    >
                      {item?.type}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
        
        </div>
     

<div>



</div>





            </div>





          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href || "#"}
              className="text-lg font-semibold hover:text-[#F48C7F] transition"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[900]"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
