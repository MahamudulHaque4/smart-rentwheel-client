import React from "react";
import { useLoaderData } from "react-router";
import TopratedDetails from "../TopratedDetails/TopratedDetails";

const cars = () => {
  const allCars = useLoaderData();
  console.log(allCars);

  return (
    <div>
      <div className="text-2xl text-center font-bold my-6">
      All Cars <span className='text-purple-600'> Here</span>
    </div>
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 ">
      {
        allCars.map(topCars => <TopratedDetails key={topCars._id} topCars={topCars}></TopratedDetails>)
        
      }
    </div>


    </div>
    
  );
};

export default cars;
