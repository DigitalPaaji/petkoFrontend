import Banner from "../components/Banner";
import Banner2 from "../components/Banner2";
import New from "../components/New";
import Reviews from "../components/Reviews";
import Pets from "../components/Pets"


import BlogSection from "../components/Blogs";
import Shop from "../components/Shop";
import RelatedProducts from "../components/Trending";

export default function Home() {
  return (
    <div className="bg-[#91919127]">
      <Banner/>
     <Banner2/>
       <New/>
     <Pets/>
       <Shop/>
      {/* <RelatedProducts/> */}
      {/* <Reviews/> */}

      {/* <BlogSection /> */}
    </div>
  );
}
