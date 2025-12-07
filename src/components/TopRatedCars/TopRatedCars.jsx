import React, { use } from 'react'
import TopratedDetails from '../TopratedDetails/TopratedDetails';

const TopRatedCars = ({topratedCarsPromise}) => {
    const topCars = use (topratedCarsPromise);
    console.log(topCars);
  return (
    <div>
      <h2 className= "text-5xl font-bold text-center">Top Rated Cars</h2>
      <div className = "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 ">
        {
          topCars.map (topCars => 
            <TopratedDetails key={topCars._id}
            topCars={topCars}>

            </TopratedDetails>
          )
        }
      </div>

    </div>
  )
}

export default TopRatedCars
