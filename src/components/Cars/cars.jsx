import React, { useMemo } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import TopratedDetails from "../TopratedDetails/TopratedDetails";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.07,
    },
  },
};

const Cars = () => {
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
    <motion.div
      className="max-w-6xl mx-auto px-4 py-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
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
      </motion.div>

      {filteredCars.length > 0 ? (
        <motion.div
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4"
          variants={containerVariants}
        >
          {filteredCars.map((car) => (
            <TopratedDetails key={car._id} topCars={car} />
          ))}
        </motion.div>
      ) : (
        <motion.p
          className="text-center text-base-content/60 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No cars found. Try a different search.
        </motion.p>
      )}
    </motion.div>
  );
};

export default Cars;
