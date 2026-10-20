import React from "react";
import assets from "../assets/assets";

// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
// import { Pagination, Navigation, Scrollbar } from 'swiper/modules';

const HeroSection = () => {
  return (
    <div className="w-full mt-4">
      <div className="w-full h-100 relative">
        <img className="w-full h-full object-cover" src={assets.HeroImg} alt="" />
        <div className="absolute top-1/2 -translate-y-1/2 px-10 space-y-2">
          <h4 className="text-4xl font-medium text-white">Discover the Latest Deals _</h4>
          <h2 className="text-5xl font-bold italic text-white">Up to 50% off!</h2>
          <button className="py-2 px-4 rounded-md bg-white font-semibold text-green-950 mt-4 active:scale-95 transition-all duration-200 cursor-pointer">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
