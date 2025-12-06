import React from "react";

const Whyrent = () => {
  const benefits = [
    {
      title: "Easy Booking",
      desc: "Book your rental in minutes with a smooth and simple process.",
    },
    {
      title: "Affordable Rates",
      desc: "Enjoy the best prices with no hidden fees.",
    },
    {
      title: "Trusted Providers",
      desc: "We work with verified partners to ensure quality and reliability.",
    },
    {
      title: "24/7 Support",
      desc: "Our support team is always ready to help.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-10">Why Rent With Us</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {benefits.map((b, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-xl shadow hover:-translate-y-1 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
            <p className="text-gray-600">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Whyrent;
