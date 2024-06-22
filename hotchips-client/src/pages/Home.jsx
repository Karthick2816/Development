import React from "react";
import Banner from "../components/Banner";
import Catagories from "./home/Categories";
import SpecialDishes from "./home/SpecialDishes";
import Testimonials from "./home/Testimonials";
import OurServices from "./home/OurServices";

const Home = () => {
  return (
    <div className="container px-4 mx-auto max-w-screen-2xl xl:px-24">
      <Banner />
      <Catagories />
      <SpecialDishes />
      <OurServices />
      <Testimonials />
    </div>
  );
};

export default Home;
