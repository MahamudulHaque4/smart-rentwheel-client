import React, { useContext, useRef, useEffect, useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import {
  MapPin,
  CarFront,
  BadgeDollarSign,
  ShieldCheck,
  Mail,
  User,
} from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

// ⭐ Lottie imports
import Lottie from "lottie-react";
import bookingSuccessAnimation from "../../assets/booking_success.json";

const CarDetails = () => {
  const car = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const bookModalRef = useRef(null);

  const {
    _id: carId,
    carName,
    description,
    image,
    category,
    rentPrice,
    location,
    status,
    providerName,
    providerEmail,
  } = car || {};

  // 🔥 keep live status in state so UI updates after booking
  const [currentStatus, setCurrentStatus] = useState(status || "Available");

  // 🔥 control Lottie success overlay
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (car?.status) {
      setCurrentStatus(car.status);
    }
  }, [car]);

  const isAvailable = currentStatus === "Available";

  const handlebookModalOpen = () => {
    if (!isAvailable) return;
    bookModalRef.current?.showModal();
  };

  const handlebookSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const carNameFromForm = event.target.car.value;
    const price = event.target.price.value;
    const bookingDate = event.target.bookingDate.value;

    const newBooking = {
      bookingId: carId,
      buyerName: name,
      buyerEmail: email,
      carName: carNameFromForm,
      rentPrice: price,
      bookingDate,
      status: "Booked",
      createdAt: new Date().toISOString(),
    };

    try {
      // 1️⃣ Save booking
      const res = await fetch("http://localhost:4000/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newBooking),
      });

      const data = await res.json();
      console.log("After booking data", data);

      if (!res.ok) {
        throw new Error(data?.error || "Booking failed");
      }

      // 2️⃣ Update car status in DB
      const statusRes = await fetch(`http://localhost:4000/cars/${carId}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: "Booked" }),
      });

      const statusData = await statusRes.json();
      console.log("Car status update:", statusData);

      if (!statusRes.ok) {
        throw new Error(statusData?.error || "Failed to update car status");
      }

      // 3️⃣ Update UI + show success animation
      setCurrentStatus("Booked");
      bookModalRef.current?.close();
      toast.success("Booking confirmed! Car is now booked.");
      setShowSuccess(true); // 🔥 show Lottie overlay
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to create booking");
    }
  };

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base-content/60">Car details not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 via-base-200 to-base-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-3 card bg-base-100 shadow-xl rounded-3xl overflow-hidden border border-base-200">
          <figure className="relative h-[280px] md:h-[420px] overflow-hidden">
            <img
              src={image}
              alt={carName}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute top-4 left-4 flex gap-2">
              <span className="badge badge-neutral px-4 py-3 rounded-full text-xs tracking-wide">
                {category}
              </span>
            </div>

            <div className="absolute top-4 right-4">
              <span
                className={`badge px-4 py-3 rounded-full text-xs font-semibold tracking-wide
                ${isAvailable ? "badge-success" : "badge-warning"}`}
              >
                {currentStatus || "Unknown"}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-sm">
                {carName}
              </h2>
              <p className="text-white/80 text-sm mt-1 line-clamp-2">
                {description}
              </p>
            </div>
          </figure>

          <div className="p-6 md:p-8 space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="text-sm text-base-content/70">
                Premium Rental Rate
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-black">
                {rentPrice} BDT
                <span className="text-sm font-medium text-base-content/60 ml-1">
                  /day
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoTile
                icon={<CarFront size={18} />}
                label="Car Name"
                value={carName}
              />
              <InfoTile
                icon={<ShieldCheck size={18} />}
                label="Category"
                value={category}
              />
              <InfoTile
                icon={<MapPin size={18} />}
                label="Location"
                value={location}
              />
              <InfoTile
                icon={<BadgeDollarSign size={18} />}
                label="Rent Price"
                value={`${rentPrice} BDT/day`}
              />
              <div className="md:col-span-2">
                <InfoTile
                  icon={<ShieldCheck size={18} />}
                  label="Car Status"
                  value={currentStatus}
                  valueClass={isAvailable ? "text-success" : "text-warning"}
                />
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-base-content/80 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-base-100 shadow-xl rounded-3xl border border-base-200">
            <div className="p-6 md:p-7 space-y-4">
              <h3 className="text-lg font-bold">Provider Information</h3>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-base-200/70">
                <div className="p-2 rounded-xl bg-base-100">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-xs text-base-content/60">Provider Name</p>
                  <p className="font-semibold">{providerName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-base-200/70">
                <div className="p-2 rounded-xl bg-base-100">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-base-content/60">Provider Email</p>
                  <p className="font-semibold break-all">{providerEmail}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl rounded-3xl border border-base-200">
            <div className="p-6 md:p-7 space-y-4">
              <h3 className="text-lg font-bold">Ready to book?</h3>
              <p className="text-sm text-base-content/70">
                Lock in this ride now. Instant confirmation if available.
              </p>

              <button
                onClick={handlebookModalOpen}
                disabled={!isAvailable}
                className={`
                  btn btn-black btn-outline w-full rounded-full text-base font-semibold
                  transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:brightness-110 active:scale-95
                  ${!isAvailable ? "btn-disabled opacity-60 cursor-not-allowed" : ""}
                `}
              >
                {isAvailable ? "Book Now" : "Already Booked"}
              </button>

              {/* MODAL */}
              <dialog
                ref={bookModalRef}
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box rounded-3xl p-0 overflow-hidden shadow-2xl border border-base-200">
                  <div className="p-6 md:p-7 bg-gradient-to-r from-primary/10 via-base-100 to-secondary/10 border-b border-base-200">
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                      Confirm Your Booking
                    </h3>
                    <p className="text-sm text-base-content/70 mt-1">
                      Please review your info before submitting.
                    </p>
                  </div>

                  <div className="p-6 md:p-7">
                    <form onSubmit={handlebookSubmit} className="space-y-4">
                      {/* Name */}
                      <div className="form-control">
                        <label className="label pb-1">
                          <span className="label-text font-medium">Name</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          readOnly
                          defaultValue={user?.displayName}
                          className="input input-bordered w-full rounded-2xl bg-base-200/60"
                        />
                      </div>

                      {/* Email */}
                      <div className="form-control">
                        <label className="label pb-1">
                          <span className="label-text font-medium">Email</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          readOnly
                          defaultValue={user?.email}
                          className="input input-bordered w-full rounded-2xl bg-base-200/60"
                        />
                      </div>

                      {/* Car */}
                      <div className="form-control">
                        <label className="label pb-1">
                          <span className="label-text font-medium">Car</span>
                        </label>
                        <input
                          type="text"
                          name="car"
                          readOnly
                          defaultValue={carName}
                          className="input input-bordered w-full rounded-2xl bg-base-200/60"
                        />
                      </div>

                      {/* Price */}
                      <div className="form-control">
                        <label className="label pb-1">
                          <span className="label-text font-medium">Price</span>
                        </label>
                        <input
                          type="text"
                          name="price"
                          readOnly
                          defaultValue={`${rentPrice} BDT / day`}
                          className="input input-bordered w-full rounded-2xl bg-base-200/60"
                        />
                      </div>

                      {/* Booking Date */}
                      <div className="form-control">
                        <label className="label pb-1">
                          <span className="label-text font-medium">
                            Select Booking Date
                          </span>
                        </label>
                        <input
                          type="date"
                          name="bookingDate"
                          required
                          className="input input-bordered w-full rounded-2xl bg-base-200/60"
                        />
                      </div>

                      <div className="pt-3 flex flex-col sm:flex-row gap-3 sm:justify-end">
                        <button
                          type="submit"
                          className="btn btn-black btn-outline rounded-full"
                        >
                          Submit Booking
                        </button>

                        <button
                          type="button"
                          onClick={() => bookModalRef.current?.close()}
                          className="btn btn-outline rounded-full px-8"
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>

              <NavLink
                to="/cars"
                className="btn btn-outline w-full rounded-full"
              >
                Back to Cars
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* ⭐ LOTTIE SUCCESS OVERLAY */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-base-100 rounded-3xl p-6 md:p-8 shadow-2xl max-w-sm w-full text-center space-y-4">
            <div className="w-40 h-40 mx-auto">
              <Lottie
                animationData={bookingSuccessAnimation}
                loop={false}
                onComplete={() => {
                  // hide automatically after animation ends (optional)
                  setShowSuccess(false);
                }}
              />
            </div>
            <h3 className="text-xl font-bold">Booking Successful!</h3>
            <p className="text-sm text-base-content/70">
              Your car has been booked. You can view details in{" "}
              <b>My Bookings</b>.
            </p>
            <button
              className="btn btn-primary rounded-full w-full"
              onClick={() => {
                setShowSuccess(false);
                navigate("/myBooking");
              }}
            >
              Go to My Bookings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoTile = ({ icon, label, value, valueClass = "" }) => (
  <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-base-200/60 border border-base-200">
    <div className="flex items-center gap-2 text-sm text-base-content/70">
      <span className="p-2 rounded-xl bg-base-100">{icon}</span>
      {label}
    </div>
    <div className={`font-semibold text-sm md:text-base ${valueClass}`}>
      {value}
    </div>
  </div>
);

export default CarDetails;
