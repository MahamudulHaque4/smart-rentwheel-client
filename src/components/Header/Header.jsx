// src/components/Header/Header.jsx
import React, { useState } from "react";
import {
  Search,
  Sparkles,
  ShieldCheck,
  BadgeDollarSign,
  Headset,
} from "lucide-react";

const Header = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  // avoid crash if onSearch not passed
  const safeOnSearch = (value) => {
    if (typeof onSearch === "function") {
      onSearch(value);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    safeOnSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    safeOnSearch(searchText);
  };

  const quickSearch = (text) => {
    setSearchText(text);
    safeOnSearch(text);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-base-100 via-base-100 to-base-200">
      {/* soft blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14 relative">
        {/* Badge */}
        <div className="flex justify-center mb-4">
          <span className="badge badge-primary badge-outline rounded-full px-4 py-3 text-xs tracking-widest inline-flex items-center gap-2">
            <Sparkles size={14} />
            RENTWHEELS
          </span>
        </div>

        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Find Your Perfect Ride
          </h1>
          <p className="text-sm md:text-base text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            RentWheels helps you find cars instantly by name, category, and
            location. Book in minutes from trusted providers across Bangladesh.
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="
            mt-6 md:mt-8 max-w-3xl mx-auto
            flex items-center gap-2
            bg-base-100/70 backdrop-blur
            border border-base-300 rounded-full px-3 py-2
            shadow-lg shadow-base-300/40
            focus-within:ring-2 focus-within:ring-primary/40
            transition-all duration-300
          "
        >
          <div className="ml-2 text-base-content/60">
            <Search size={18} />
          </div>

          <input
            type="text"
            placeholder="Search by car name (e.g. Toyota Corolla)"
            value={searchText}
            onChange={handleChange}
            className="
              input bg-transparent border-none w-full
              focus:outline-none text-sm md:text-base
              placeholder:text-base-content/50
            "
          />

          <button
            type="submit"
            className="
              btn btn-primary rounded-full px-6 md:px-8
              transition-all duration-300
              hover:scale-105 hover:shadow-lg hover:brightness-110
              active:scale-95
            "
          >
            Search
          </button>
        </form>

        {/* Quick chips */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {["Toyota Corolla", "Honda Civic", "SUV", "Electric", "Luxury"].map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => quickSearch(item)}
                className="
                  badge badge-outline px-4 py-2 text-xs md:text-sm rounded-full
                  hover:bg-primary hover:text-primary-content hover:border-primary
                  transition-all duration-300
                "
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* Info row */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <InfoCard
            icon={<ShieldCheck size={18} />}
            title="Verified Cars"
            text="Trusted listings with real photos and provider info."
          />
          <InfoCard
            icon={<BadgeDollarSign size={18} />}
            title="Transparent Pricing"
            text="Clear daily rent—no hidden costs or surprises."
          />
          <InfoCard
            icon={<Headset size={18} />}
            title="24/7 Support"
            text="We help riders and providers anytime you need."
          />
        </div>
      </div>
    </section>
  );
};

const InfoCard = ({ icon, title, text }) => (
  <div className="p-5 rounded-2xl bg-base-100/80 backdrop-blur border border-base-200 shadow-sm hover:shadow-md transition">
    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center mb-3">
      {icon}
    </div>
    <h3 className="font-semibold text-base mb-1">{title}</h3>
    <p className="text-sm text-base-content/70 leading-relaxed">{text}</p>
  </div>
);

export default Header;
