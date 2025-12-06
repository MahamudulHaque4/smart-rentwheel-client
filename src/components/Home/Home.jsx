// src/components/Home/Home.jsx
import React, { useEffect, useState } from "react";
import TopRatedCars from "../TopRatedCars/TopRatedCars";
import HeroSlider from "../HeroSlider/HeroSlider";
import Header from "../Header/Header";
import Whyrent from "../Whyrent/Whyrent";
import Testimonial from "../Testimonial/Testtimonial";
import Achievement from "../Achievment/Achivment";

// ❌ DO NOT import "../Cars/cars" here

const topratedCarsPromise = fetch("http://localhost:4000/top-cars").then(
  (res) => res.json()
);

const Home = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  // Load all cars once
  useEffect(() => {
    fetch("http://localhost:4000/cars")
      .then((res) => res.json())
      .then((data) => {
        console.log("All cars from /cars:", data);
        setCars(data);
        setFilteredCars(data); // default: show all
      })
      .catch((err) => console.error("Failed to load cars:", err));
  }, []);

  // 🔍 search handler (connected to Header)
  const handleSearch = (text) => {
    const query = text.toLowerCase().trim();
    console.log("Searching for:", query);

    // no text → show all
    if (!query) {
      setFilteredCars(cars);
      return;
    }

    const result = cars.filter((car) => {
      const name = car.carName?.toLowerCase() || "";
      const category = car.category?.toLowerCase() || "";
      const location = car.location?.toLowerCase() || "";
      // match by name OR category OR location
      return (
        name.includes(query) ||
        category.includes(query) ||
        location.includes(query)
      );
    });

    setFilteredCars(result);
  };

  return (
    <div>
      {/* 🔗 very important: pass onSearch */}
      <Header onSearch={handleSearch} />

      <HeroSlider />

      {/* Search result section */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold mb-4">Search Results</h2>

        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <div
                key={car._id}
                className="card bg-base-100 shadow-md rounded-2xl overflow-hidden border border-base-200"
              >
                <figure className="h-40 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.carName}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body p-4 space-y-1">
                  <h3 className="font-semibold text-lg">{car.carName}</h3>
                  <p className="text-xs text-base-content/60">
                    {car.category} • {car.location}
                  </p>
                  <p className="font-bold text-primary">
                    {car.rentPrice} BDT
                    <span className="text-xs text-base-content/60"> /day</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-base-content/60">
            No cars found for your search.
          </p>
        )}
      </div>

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
