import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [carToDelete, setCarToDelete] = useState(null);
  const deleteModalRef = useRef(null);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    fetch(`https://simple-rentwheel-server.vercel.app/cars?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("MyListings cars:", data);
        setCars(data);
      })
      .catch((err) => {
        console.error("Error loading listings:", err);
        toast.error("Failed to load your listings");
      })
      .finally(() => setLoading(false));
  }, [user]);

  const openDeleteModal = (car) => {
    setCarToDelete(car);
    deleteModalRef.current?.showModal();
  };

  const closeDeleteModal = () => {
    deleteModalRef.current?.close();
    setCarToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!carToDelete?._id) return;

    const id = carToDelete._id;

    fetch(`https://simple-rentwheel-server.vercel.app/cars/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if ((data.success && data.deletedCount > 0) || data.deletedCount > 0) {
          toast.success("Car deleted successfully");

          // remove from UI
          setCars((prev) => prev.filter((car) => car._id !== id));
          closeDeleteModal();
        } else {
          toast.error("Failed to delete car");
        }
      })
      .catch((err) => {
        console.error("Error deleting car:", err);
        toast.error("Error deleting car");
      });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base-content/60">
          Please login to view your listings.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-base-100 rounded-3xl shadow-xl border border-base-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              My Listings
            </h2>
            <p className="text-sm text-base-content/60 mt-1">
              All cars you’ve added to RentWheel.
            </p>
          </div>

          <NavLink to="/addcar" className="btn btn-primary btn-sm rounded-full">
            + Add New Car
          </NavLink>
        </div>

        {cars.length === 0 ? (
          <div className="py-10 text-center text-base-content/60">
            <p>You haven’t listed any cars yet.</p>
            <NavLink
              to="/addcar"
              className="btn btn-primary btn-sm mt-4 rounded-full"
            >
              Add Your First Car
            </NavLink>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-xs uppercase text-base-content/60">
                    <th>#</th>
                    <th>Car</th>
                    <th>Category</th>
                    <th>Rent Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car, index) => (
                    <tr key={car._id} className="hover">
                      <td>{index + 1}</td>
                      <td className="flex items-center gap-3">
                        <img
                          src={car.image}
                          alt={car.carName}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-semibold">{car.carName}</p>
                          <p className="text-xs text-base-content/60">
                            {car.location}
                          </p>
                        </div>
                      </td>
                      <td>{car.category}</td>
                      <td>{car.rentPrice} BDT/day</td>
                      <td>
                        <span
                          className={`badge ${
                            car.status === "Booked"
                              ? "badge-error"
                              : "badge-success"
                          }`}
                        >
                          {car.status || "Available"}
                        </span>
                      </td>

                      
                      <td>
  <div className="flex items-center gap-2 h-full py-2">
    <NavLink
      to={`/update-car/${car._id}`}
      className="btn btn-ghost btn-xs rounded-full"
    >
      Update
    </NavLink>

    <button
      onClick={() => openDeleteModal(car)}
      className="btn btn-error btn-xs rounded-full text-white"
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

            <dialog
              ref={deleteModalRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box rounded-3xl p-0 overflow-hidden shadow-2xl border border-base-200">
                <div className="p-6 md:p-7 bg-base-200 border-b border-base-300">
                  <h3 className="text-lg md:text-xl font-bold">
                    Delete this car?
                  </h3>
                  <p className="text-sm text-base-content/70 mt-1">
                    You are about to delete{" "}
                    <span className="font-semibold">
                      {carToDelete?.carName}
                    </span>
                    . This action cannot be undone.
                  </p>
                </div>

                <div className="p-6 md:p-7 space-y-4">
                  <div className="text-sm text-base-content/70">
                    <p>
                      Category:{" "}
                      <span className="font-medium">
                        {carToDelete?.category}
                      </span>
                    </p>
                    <p>
                      Rent:{" "}
                      <span className="font-medium">
                        {carToDelete?.rentPrice} BDT/day
                      </span>
                    </p>
                    <p>
                      Status:{" "}
                      <span className="font-medium">
                        {carToDelete?.status || "Available"}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeDeleteModal}
                      className="btn btn-outline rounded-full px-6"
                    >
                      Keep Car
                    </button>

                    <button
                      type="button"
                      onClick={handleConfirmDelete}
                      className="btn btn-error rounded-full px-6 text-white"
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>

              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default MyListings;
