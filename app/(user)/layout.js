import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Offer from "../components/Offer";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Flip, ToastContainer } from "react-toastify";
// import LoginSignup from "../components/user/LoginSignup";
// import Wishlist from "../components/user/Wishlist";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PetKō | Happy Pets, Happy Homes",
  description: "E-commerce for pets built with Next.js & Node.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>


<ToastContainer
position="top-right"
autoClose={2500}
limit={3}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Flip}
/>


        <Offer />

        <Navbar />

        {children}
        <Footer />
        {/* <PopupModal/> */}
      </body>
    </html>
  );
}
