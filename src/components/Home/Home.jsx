import React, { useEffect, useState } from "react";
import TopRatedCars from "../TopRatedCars/TopRatedCars";
import HeroSlider from "../HeroSlider/HeroSlider";
import Header from "../Header/Header";
import cars from "../Cars/cars";


const topratedCarsPromise = fetch("http://localhost:4000/top-cars").then(
  (res) => res.json()
);
const Home = () => {
  // const [cars, setcars] = useState([]);
  // const [filteredCars, setFilteredCars] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:4000/cars")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setcars(data);
  //       setFilteredCars(data);
  //     });
  // }, []);

  // const handlesearch = (text) => {
  //   const query = text.toLowerCase().trim();

  //   if (!query) {
  //     setFilteredCars(cars);
  //     return;
  //   }

  //   const result = cars.filter((car) => cars.name.toLowerCase().includes(query));
  //   setFilteredCars(result);
  // };

  return (
    <div>
      {/* <Header onSearch={handlesearch} />
      <div>
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.length > 0 ? (
            filteredCars.map((cars) => <CarCard key={cars._id} cars={cars} />)
          ) : (
            <p className="text-center col-span-full text-base-content/60">
              No cars found for your search.
            </p>
          )}
        </div>
      </div> */}
      <Header />
      <HeroSlider />
      <div className="my-20">
        <TopRatedCars topratedCarsPromise={topratedCarsPromise}></TopRatedCars>
      </div>
    </div>
  );
};

export default Home;
