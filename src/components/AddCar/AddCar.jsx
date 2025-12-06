import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";

const AddCar = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddCar = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const newCar = {
      carName: form.carName.value,
      description: form.description.value,
      category: form.category.value,
      rentPrice: Number(form.rentPrice.value),
      location: form.location.value,
      image: form.image.value,
      providerName: user?.displayName || "Unknown",
      providerEmail: user?.email || "Unknown",
      status: "Available",
      createdAt: new Date().toISOString().split("T")[0],
    };

    fetch("http://localhost:4000/cars", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newCar),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Car added successfully ");
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add car ");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 via-base-200 to-base-100 py-10 px-4">
      
      
      <Toaster position="top-center" />

      <div className="max-w-3xl mx-auto card bg-base-100 shadow-xl rounded-3xl border border-base-200 overflow-hidden">
        
        
        <div className="p-6 md:p-8 bg-gradient-to-r from-primary/10 via-base-100 to-secondary/10 border-b border-base-200 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Add a New Car
          </h2>
          <p className="text-sm text-base-content/70 mt-1">
            List your car in RentWheels and start earning today.
          </p>
        </div>

        <div className="card-body p-6 md:p-8 space-y-6">
          
          {/* Form */}
          <form onSubmit={handleAddCar} className="space-y-4">

            {/* Car Name */}
            <div className="form-control">
              <label className="label font-medium">Car Name</label>
              <input
                type="text"
                name="carName"
                required
                placeholder="e.g. Toyota Corolla"
                className="input input-bordered rounded-2xl bg-base-200/40 focus:bg-base-100 transition-all duration-200 focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label font-medium">Description</label>
              <textarea
                name="description"
                required
                placeholder="Write a short description..."
                className="textarea textarea-bordered rounded-2xl min-h-[110px] bg-base-200/40 focus:bg-base-100 transition-all duration-200 focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Category + RentPrice */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Category */}
              <div className="form-control">
                <label className="label font-medium">Category</label>
                <select
                  name="category"
                  required
                  className="select select-bordered rounded-2xl bg-base-200 focus:bg-base-100 transition-all duration-200 focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Select Category</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              {/* Rent Price */}
              <div className="form-control">
                <label className="label font-medium">
                  Rent Price (per day)
                </label>
                <input
                  type="number"
                  name="rentPrice"
                  required
                  placeholder=" "
                  className="input input-bordered rounded-2xl bg-base-200/40 focus:bg-base-100 transition-all duration-200 focus:ring-2 focus:ring-primary/30"
                />
                <p className="text-xs text-base-content/60 mt-1">
                  Example: 2500 BDT / day
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label font-medium">Location</label>
              <input
                type="text"
                name="location"
                required
                placeholder="  "
                className="input input-bordered rounded-2xl bg-base-200/40 focus:bg-base-100 transition-all duration-200 focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Image URL */}
            <div className="form-control">
              <label className="label font-medium">Hosted Image URL</label>
              <input
                type="url"
                name="image"
                required
                placeholder=" "
                className="input input-bordered rounded-2xl bg-base-200/40 focus:bg-base-100 transition-all duration-200 focus:ring-2 focus:ring-primary/30"
              />
              <p className="text-xs text-base-content/60 mt-1">
                Use a clear front/side view photo for better bookings.
              </p>
            </div>

            {/* Provider Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Provider Name */}
              <div className="form-control">
                <label className="label font-medium">Provider Name</label>
                <input
                  type="text"
                  readOnly
                  defaultValue={user?.displayName}
                  className="input input-bordered rounded-2xl bg-base-200/70"
                />
              </div>

              {/* Provider Email */}
              <div className="form-control">
                <label className="label font-medium">Provider Email</label>
                <input
                  type="email"
                  readOnly
                  defaultValue={user?.email}
                  className="input input-bordered rounded-2xl bg-base-200/70"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              className="
                btn btn-primary w-full rounded-full text-base font-semibold mt-2
                transition-all duration-300
                hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110
                active:translate-y-0 active:scale-95
              "
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Add Car"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
