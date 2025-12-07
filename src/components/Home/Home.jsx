// src/components/Home/Home.jsx
import React from "react";
import TopRatedCars from "../TopRatedCars/TopRatedCars";
import HeroSlider from "../HeroSlider/HeroSlider";
import Header from "../Header/Header";
import Whyrent from "../Whyrent/Whyrent";
import Testimonial from "../Testimonial/Testtimonial";
import Achievement from "../Achievment/Achivment";

const topratedCarsPromise = fetch("http://localhost:4000/top-cars").then(
  (res) => res.json()
);

const Home = () => {
  return (
    <div>
      {/* 🔍 Header now only handles navigation to /cars?search=... */}
      <Header />

      <HeroSlider />

      {/* Top rated cars section */}
      <div className="my-20">
        <TopRatedCars topratedCarsPromise={topratedCarsPromise} />
      </div>

      <Testimonial />
      <Whyrent />
      <Achievement />
    </div>
  );
};

export default Home;
