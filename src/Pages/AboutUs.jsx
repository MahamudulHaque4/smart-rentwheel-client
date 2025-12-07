import React from "react";
import { NavLink } from "react-router";
import { Search, CarFront, ShieldCheck, Users, MapPin, BadgeDollarSign } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* HERO */}
      <section className="bg-gradient-to-br from-base-100 via-base-100 to-base-200">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className="badge badge-primary badge-outline rounded-full px-4 py-3 text-xs tracking-widest">
              ABOUT RENTWHEELS
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Making car rental easy, fast, and trustworthy in Bangladesh.
            </h1>

            <p className="text-base md:text-lg text-base-content/70 leading-relaxed">
              RentWheels was built to remove the hassle of “asking around” for a car.
              Instead of calling friends or visiting random garages, you can search, compare,
              and book verified cars in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <NavLink
                to="/cars"
                className="btn btn-primary rounded-full px-8 hover:scale-105 transition"
              >
                Browse Cars
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn-outline rounded-full px-8"
              >
                Become a Provider
              </NavLink>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-base-200">
              <img
                className="w-full h-[280px] md:h-[360px] object-cover"
                src="https://images.unsplash.com/photo-1549923746-c502d488b3ea"
                alt="RentWheels Cars"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-base-100 shadow-lg rounded-2xl p-4 border border-base-200">
              <p className="text-sm font-semibold">Trusted by riders & providers</p>
              <p className="text-xs text-base-content/60">Across Bangladesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY / HISTORY */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Our Story</h2>
            <p className="text-base-content/70 leading-relaxed">
              Before RentWheels, renting a car often meant one thing:
              <span className="font-semibold text-base-content"> searching and asking everywhere.</span>
              You’d call friends, message groups, or visit rental points hoping a car was available,
              at a fair price, and actually reliable.
            </p>
            <p className="text-base-content/70 leading-relaxed">
              We started RentWheels to turn that messy process into a smooth experience.
              Now, customers can search by location, category, or budget — and providers can manage
              their listings in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard
              icon={<Search size={20} />}
              title="Search in Seconds"
              text="Find cars by city, category, and price instantly."
            />
            <FeatureCard
              icon={<ShieldCheck size={20} />}
              title="Verified Providers"
              text="We highlight trusted providers and clear info."
            />
            <FeatureCard
              icon={<BadgeDollarSign size={20} />}
              title="Transparent Pricing"
              text="No hidden charges — what you see is what you pay."
            />
            <FeatureCard
              icon={<Users size={20} />}
              title="For Users & Providers"
              text="A platform that benefits both renters and owners."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-base-100">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            How RentWheels Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              step="01"
              icon={<Search size={22} />}
              title="Search & Compare"
              text="Browse cars by city, type, and daily rent."
            />
            <StepCard
              step="02"
              icon={<CarFront size={22} />}
              title="View Details"
              text="See photos, provider info, and car status."
            />
            <StepCard
              step="03"
              icon={<ShieldCheck size={22} />}
              title="Book Safely"
              text="Book with a click and track your booking status."
            />
          </div>
        </div>
      </section>

      {/* VALUES / PROMISE */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="rounded-3xl bg-gradient-to-r from-primary/10 via-base-100 to-secondary/10 p-8 md:p-10 border border-base-200 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            What We Promise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <PromiseItem
              icon={<ShieldCheck size={18} />}
              title="Reliability"
              text="Cars that match the listing. No surprises."
            />
            <PromiseItem
              icon={<MapPin size={18} />}
              title="Coverage"
              text="From Dhaka to Sylhet — rentals across BD."
            />
            <PromiseItem
              icon={<Users size={18} />}
              title="Support"
              text="We’re here to help riders and providers anytime."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="card bg-base-100 rounded-3xl shadow-xl border border-base-200 p-8 md:p-10 text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to ride with RentWheels?
          </h2>
          <p className="text-base-content/70">
            Search cars, compare prices, and book confidently — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <NavLink to="/cars" className="btn btn-primary rounded-full px-8">
              Find a Car
            </NavLink>
            <NavLink to="/contact" className="btn btn-outline rounded-full px-8">
              Contact Us
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, text }) => (
  <div className="p-5 rounded-2xl bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition">
    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center mb-3">
      {icon}
    </div>
    <h3 className="font-semibold text-base mb-1">{title}</h3>
    <p className="text-sm text-base-content/70">{text}</p>
  </div>
);

const StepCard = ({ step, icon, title, text }) => (
  <div className="p-6 rounded-2xl bg-base-200/60 border border-base-200 text-center hover:bg-base-200 transition">
    <div className="text-xs tracking-widest text-base-content/60 font-semibold">
      STEP {step}
    </div>
    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary grid place-items-center mx-auto my-3">
      {icon}
    </div>
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-sm text-base-content/70 mt-1">{text}</p>
  </div>
);

const PromiseItem = ({ icon, title, text }) => (
  <div className="flex items-start gap-3 p-4 rounded-2xl bg-base-200/60 border border-base-200">
    <div className="p-2 rounded-xl bg-base-100">{icon}</div>
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-base-content/70">{text}</p>
    </div>
  </div>
);

export default AboutUs;
