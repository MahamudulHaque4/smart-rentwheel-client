import React from "react";
import { NavLink } from "react-router";

const TopratedDetails = ({ topCars }) => {
  const { _id, carName, rentPrice, category, providerName, image } = topCars;
  return (
    <div className="group card bg-base-100 shadow-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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

        <div className="space-y-1 text-sm text-base-content/80">
          <p>
            Rent Price (per day):{" "}
            <div className="tooltip" data-tip={`${topCars.rentPrice} BDT/day`}>
  <p className="text-primary font-bold">
    {topCars.rentPrice} BDT/day
  </p>
</div>

          </p>
          <p>
            Provider:{" "}
            <span className="font-semibold text-base-content">
              {providerName}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="card-actions justify-end mt-3">
          <NavLink
            to={`/carDetails/${_id}`}
            className="
          btn btn-primary btn-sm rounded-full px-5
          transition-all duration-300
          hover:scale-105 hover:brightness-110 hover:shadow-lg
          active:scale-95
        "
          >
            View Details
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TopratedDetails;
