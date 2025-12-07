import React from "react";
import { motion } from "framer-motion";
import TopRatedCars from "../TopRatedCars/TopRatedCars";
import HeroSlider from "../HeroSlider/HeroSlider";
import Header from "../Header/Header";
import Whyrent from "../Whyrent/Whyrent";
import Testimonial from "../Testimonial/Testtimonial";
import Achievement from "../Achievment/Achivment";

const topratedCarsPromise = fetch("http://localhost:4000/top-cars").then(
  (res) => res.json()
);

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  },
});

const Home = () => {
  return (
    <div>
      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        animate="visible"
      >
        <Header />
      </motion.div>

      <motion.div
        variants={fadeUp(0.15)}
        initial="hidden"
        animate="visible"
      >
        <HeroSlider />
      </motion.div>

      <motion.div
        variants={fadeUp(0.25)}
        initial="hidden"
        animate="visible"
        className="my-20"
      >
        <TopRatedCars topratedCarsPromise={topratedCarsPromise} />
      </motion.div>

      <motion.div
        variants={fadeUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Testimonial />
      </motion.div>

      <motion.div
        variants={fadeUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Whyrent />
      </motion.div>

      <motion.div
        variants={fadeUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Achievement />
      </motion.div>
    </div>
  );
};

export default Home;
