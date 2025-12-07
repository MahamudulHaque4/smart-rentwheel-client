import React, { useContext, useState, useEffect } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const UpdateCar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const car = useLoaderData();

  const [formData, setFormData] = useState({
    carName: "",
    description: "",
    image: "",
    category: "",
    rentPrice: "",
    location: "",
    status: "",
    providerName: "",
    providerEmail: "",
  });

  useEffect(() => {
    if (car) {
      setFormData({
        carName: car.carName || "",
        description: car.description || "",
        image: car.image || "",
        category: car.category || "",
        rentPrice: car.rentPrice || "",
        location: car.location || "",
        status: car.status || "Available",
        providerName: car.providerName || user?.displayName || "",
        providerEmail: car.providerEmail || user?.email || "",
      });
    }
  }, [car, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:4000/cars/${car._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.acknowledged) {
          toast.success("Car updated successfully!");
          navigate("/myListing");
        } else {
          toast.error("No changes detected or update failed");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Update failed, please try again");
      });
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-base-100 rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-2">Update Car</h2>
        <p className="text-sm text-base-content/60 mb-6">
          Edit the details of your listed car. Provider info is read-only.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Car Name */}
          <div>
            <label className="block text-sm mb-1 font-medium">Car Name</label>
            <input
              type="text"
              name="carName"
              value={formData.carName}
              onChange={handleChange}
              className="input input-bordered w-full rounded-2xl"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm mb-1 font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input input-bordered w-full rounded-2xl"
              required
            />
          </div>

          {/* Rent Price */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              Rent Price (BDT/day)
            </label>
            <input
              type="number"
              name="rentPrice"
              value={formData.rentPrice}
              onChange={handleChange}
              className="input input-bordered w-full rounded-2xl"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm mb-1 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input input-bordered w-full rounded-2xl"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm mb-1 font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="select select-bordered w-full rounded-2xl"
            >
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">
              Image URL (optional)
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input input-bordered w-full rounded-2xl"
              placeholder="https://example.com/car.jpg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="textarea textarea-bordered w-full rounded-2xl"
            />
          </div>

          {/* Provider Info (read-only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-sm mb-1 font-medium">
                Provider Name
              </label>
              <input
                type="text"
                value={formData.providerName}
                disabled
                className="input input-bordered w-full rounded-2xl bg-base-200 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">
                Provider Email
              </label>
              <input
                type="email"
                value={formData.providerEmail}
                disabled
                className="input input-bordered w-full rounded-2xl bg-base-200 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="btn btn-outline rounded-full"
              onClick={() => navigate("/myListing")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary rounded-full px-8"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;

