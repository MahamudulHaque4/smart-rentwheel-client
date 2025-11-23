import React, { useContext, useRef } from "react";
import { NavLink, useLoaderData } from "react-router";
import {
  MapPin,
  CarFront,
  BadgeDollarSign,
  ShieldCheck,
  Mail,
  User,
} from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";

const CarDetails = () => {
  const car = useLoaderData(); // ✅ get full car
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

  const bookModalRef = useRef(null);
  const { user } = useContext(AuthContext); // ✅ correct hook

  const handlebookModalOpen = () => {
    bookModalRef.current?.showModal();
  };

  const handlebookSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const carNameFromForm = event.target.car.value;
    const price = event.target.price.value;

    const newBooking = {
      // ✅ now inside submit (scope ok)
      bookingId: carId,
      buyerName: name,
      buyerEmail: email,
      carName: carNameFromForm,
      rentPrice: price,
      status: "Pending",
    };

    fetch("http://localhost:4000/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newBooking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After booking data", data);
        bookModalRef.current?.close(); // optional close after success
      })
      .catch((err) => console.error(err));
  };

  const isAvailable = status === "Available";

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
                {status || "Unknown"}
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
                  value={status}
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
                className="btn btn-black btn-outline w-full rounded-full text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:brightness-110 active:scale-95"
                // disabled={!isAvailable}
              >
                Book Now
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

              <NavLink to="/" className="btn btn-outline w-full rounded-full">
                Back to Cars
              </NavLink>
            </div>
          </div>
        </div>
      </div>
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
