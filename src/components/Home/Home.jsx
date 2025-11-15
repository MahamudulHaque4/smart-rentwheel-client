import React from 'react'
import TopRatedCars from '../TopRatedCars/TopRatedCars';

const topratedCarsPromise = fetch('http://localhost:4000/top-cars')
.then(res => res.json());
const Home = () => {
  return (
    <div>
      <h1>Welcome to RentWheel</h1>
      <TopRatedCars topratedCarsPromise = {topratedCarsPromise}></TopRatedCars>
    </div>
  )
}

export default Home
