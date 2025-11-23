import React, { useState } from 'react'
import TopRatedCars from '../TopRatedCars/TopRatedCars';
import HeroSlider from '../HeroSlider/HeroSlider';
import Header from '../Header/Header';

const topratedCarsPromise = fetch('http://localhost:4000/top-cars')
.then(res => res.json());
const Home = () => {
  const [cars, setcars] = useState([]);
  return (
    <div>
      <Header />
      <HeroSlider/>
      <div className='my-20'>
        <TopRatedCars topratedCarsPromise = {topratedCarsPromise}></TopRatedCars>
      </div>
    </div>
  )
}

export default Home
