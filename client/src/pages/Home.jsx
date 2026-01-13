import FeaturedSection from "../components/FeaturedSection";
import BannerSlider from "../components/BannerSlider";
import React from "react";

const Home = () => {
  return (
    <div>
      <div className="pt-20">
        <BannerSlider />
      </div>
      <FeaturedSection />
    </div>
  );
};

export default Home;
