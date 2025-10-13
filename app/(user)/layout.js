import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Offer from "../components/Offer";
import Navbar from "../components/Navbar";
// import CartSidebar from "../components/user/CartSidebar";
// import CartSidebar from "../components/user/CartSidebar";
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Offer/>

      <Navbar/>

          {children}
               {/* <CartSidebar/> */}

      </body>
    </html>
  );
}
