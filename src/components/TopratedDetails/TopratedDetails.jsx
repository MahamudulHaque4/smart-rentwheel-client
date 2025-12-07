import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const TopratedDetails = ({ topCars }) => {
  const { _id, carName, rentPrice, category, providerName, image } = topCars;

  return (
    <motion.div
      className="group card bg-base-100 shadow-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      {/* Image */}
      <figure className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={carName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80" />

        {/* category badge */}
        <span className="absolute top-3 left-3 badge badge-neutral text-xs px-3 py-2 rounded-full">
          {category}
        </span>
      </figure>

      {/* Body */}
      <div className="card-body gap-2 p-5">
        <h2 className="card-title text-lg font-bold tracking-tight">
          {carName}
        </h2>

        <div className="space-y-2 text-sm text-base-content/80">
          {/* Price section */}
          <div className="flex items-center gap-2">
            <span className="text-base-content/80">Rent Price (per day):</span>
            <div className="tooltip" data-tip={`${rentPrice} BDT/day`}>
              <span className="font-bold text-black  px-2 py-1 rounded">
                {rentPrice} BDT/day
              </span>
            </div>
          </div>

          {/* Provider section */}
          <div className="flex items-center gap-2">
            <span className="text-base-content/80">Provider:</span>
            <span className="font-semibold text-base-content">
              {providerName}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="card-actions justify-end mt-3">
          <NavLink
            to={`/carDetails/${_id}`}
            className="
              btn btn-outline btn-sm rounded-full px-5
              transition-all duration-300
              hover:scale-105 hover:brightness-110 hover:shadow-lg
              active:scale-95
            "
          >
            View Details
          </NavLink>
        </div>
      </div>
    </motion.div>
  );
};

export default TopratedDetails;
