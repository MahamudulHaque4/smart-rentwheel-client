import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    title: "Find Your Ride in Minutes",
    subtitle: "Search cars by city, type, and budget.",
    desc: "No more calling around or visiting garages. RentWheels lets you instantly compare cars and prices.",
    image: "https://i.ibb.co.com/1fDJqYV5/photo-1549923746-c502d488b3ea.jpg",
    cta: "Browse Cars",
    link: "/cars",
    badge: "Fast Search",
  },
  {
    title: "Verified Cars, Trusted Providers",
    subtitle: "Drive confidently, every time.",
    desc: "We highlight trusted listings with clear provider details, transparent pricing, and real photos.",
    image: "https://i.ibb.co.com/TBxjvrHd/photo-1502877338535-766e1452684a.jpg",
    cta: "Learn More",
    link: "/about",
    badge: "Safe & Reliable",
  },
  {
    title: "Available Across Bangladesh",
    subtitle: "Dhaka • Chittagong • Sylhet • More",
    desc: "Whether it’s city travel or long tours, RentWheels has cars in multiple locations nationwide.",
    image: "https://i.ibb.co.com/hxw7ZRLt/photo-1492144534655-ae79c964c9d7.jpg",
    cta: "Become a Provider",
    link: "/register",
    badge: "Nationwide",
  },
];

const HeroSlider = () => {
  
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        className="rounded-3xl overflow-hidden shadow-xl"
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-[320px] md:h-[520px] w-full">
              {/* background image */}
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

              {/* content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-6xl mx-auto px-6 md:px-10">
                  <div className="max-w-xl space-y-4 text-white">
                    <span className="badge badge-outline rounded-full px-4 py-3 text-xs tracking-widest">
                      {s.badge}
                    </span>

                    <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                      {s.title}
                    </h1>

                    <p className="text-lg md:text-xl font-semibold text-white/90">
                      {s.subtitle}
                    </p>

                    <p className="text-sm md:text-base text-white/80 leading-relaxed">
                      {s.desc}
                    </p>

                    <a
                      href={s.link}
                      className="
                        inline-flex items-center gap-2
                        btn rounded-full px-7
                        transition-all duration-300
                        hover:scale-105 hover:shadow-lg hover:brightness-110
                        active:scale-95
                      "
                    >
                      {s.cta} 
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
