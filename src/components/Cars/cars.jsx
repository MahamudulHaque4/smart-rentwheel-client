// src/components/Cars/cars.jsx
import React, { useMemo } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import TopratedDetails from "../TopratedDetails/TopratedDetails";

const cars = () => {
  const allCars = useLoaderData() || [];
  const [searchParams] = useSearchParams();

  const searchQuery = (searchParams.get("search") || "").toLowerCase().trim();

  const filteredCars = useMemo(() => {
    if (!searchQuery) return allCars;

    return allCars.filter((car) => {
      const name = car.carName?.toLowerCase() || "";
      const category = car.category?.toLowerCase() || "";
      const location = car.location?.toLowerCase() || "";

      return (
        name.includes(searchQuery) ||
        category.includes(searchQuery) ||
        location.includes(searchQuery)
      );
    });
  }, [allCars, searchQuery]);

  console.log("All cars:", allCars);
  console.log("Search query from URL:", searchQuery);
  console.log("Filtered cars:", filteredCars);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          All Cars <span className="text-purple-600">Here</span>
        </h2>

        <p className="text-xs md:text-sm text-base-content/60">
          Showing {filteredCars.length} of {allCars.length} cars
          {searchQuery && (
            <span className="ml-1">
              for <span className="font-semibold">“{searchQuery}”</span>
            </span>
          )}
        </p>
      </div>

      {filteredCars.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {filteredCars.map((car) => (
            <TopratedDetails key={car._id} topCars={car} />
          ))}
        </div>
      ) : (
        <p className="text-center text-base-content/60 py-10">
          No cars found. Try a different search.
        </p>
      )}
    </div>
  );
};

export default cars;
