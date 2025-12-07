import React from "react";

const stats = [
  { value: "12,500+", label: "Happy Customers" },
  { value: "3,200+", label: "Cars Sold" },
  { value: "4.9★", label: "Average Rating" },
  { value: "180+", label: "Trusted Dealerships" },
];

const Achievement = () => {
  return (
    <div className="bg-base-100 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-4xl font-extrabold">Our Achievements & Stats</h2>
        <p className="text-base-content/70 mt-2">
          Numbers that reflect our dedication and service excellence  
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-base-200 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <h3 className="text-3xl font-bold text-primary">{item.value}</h3>
              <p className="text-base-content/70 mt-1 text-sm">{item.label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Achievement;

