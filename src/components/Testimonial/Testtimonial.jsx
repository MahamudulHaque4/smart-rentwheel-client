import React from "react";

const testimonials = [
  {
    name: "Ariyan Hossain",
    role: "Car Buyer",
    message:
      "Amazing service! I found my dream car within a day. The website is smooth and easy to navigate.",
    image: "https://randomuser.me/api/portraits/men/39.jpg",
  },
  {
    name: "Nadia Rahman",
    role: "Customer",
    message:
      "Great experience! The car details were accurate and customer support was super helpful.",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    name: "Rifat Hasan",
    role: "Verified Buyer",
    message:
      "Fast, simple, and trustworthy. Definitely the best car marketplace I've used!",
    image: "https://randomuser.me/api/portraits/men/57.jpg",
  },
];

const Testimonial = () => {
  return (
    <div className="bg-base-200 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="text-4xl font-extrabold">What Our Customers Say</h2>
        <p className="text-base-content/70 mt-2">
          Real experiences from our valued customers
        </p>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-base-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
            >
              {/* Profile Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-primary"
              />

              {/* Name + Role */}
              <h3 className="text-xl font-semibold mt-4">{item.name}</h3>
              <p className="text-primary text-sm">{item.role}</p>

              {/* Message */}
              <p className="text-base-content/70 mt-3">{item.message}</p>

              {/* Stars */}
              <div className="flex justify-center mt-4 text-yellow-400">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
