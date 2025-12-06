// src/components/MyListings/MyListings.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`http://localhost:4000/cars?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyCars(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load your listings");
        setLoading(false);
      });
  }, [user?.email]);

  
  const handleDelete = (id) => {
    const ok = window.confirm("Are you sure you want to delete this car?");
    if (!ok) return;

    fetch(`http://localhost:4000/cars/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Car deleted successfully");
          setMyCars((prev) => prev.filter((car) => car._id !== id));
        } else {
          toast.error("Failed to delete car");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong");
      });
  };

  const handleUpdate = (id) => {
    navigate(`/update-car/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-base-100 rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">My Listings</h2>
            <p className="text-sm text-base-content/60">
              All cars you have added to RentWheel
            </p>
          </div>
          <span className="badge badge-neutral badge-lg">
            Total: {myCars.length}
          </span>
        </div>

        {myCars.length === 0 ? (
          <p className="text-center text-base-content/60">
            You have not added any cars yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-sm text-base-content/70">
                  <th>#</th>
                  <th>Car Name</th>
                  <th>Category</th>
                  <th>Rent Price</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myCars.map((car, index) => (
                  <tr key={car._id}>
                    <td>{index + 1}</td>
                    <td className="font-medium">{car.carName}</td>
                    <td>{car.category}</td>
                    <td>{car.rentPrice} BDT/day</td>
                    <td>
                      <span
                        className={`badge ${
                          car.status === "Available"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {car.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleUpdate(car._id)}
                          className="btn btn-xs btn-outline"
                        >
                          <NavLink to={`/update-car/${car._id}`}>Update</NavLink>
                        </button>
                        <button
                          onClick={() => handleDelete(car._id)}
                          className="btn btn-xs btn-error text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;

