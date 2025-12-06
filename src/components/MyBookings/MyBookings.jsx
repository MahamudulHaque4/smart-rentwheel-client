import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Fetch all bookings for logged-in user
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    fetch(`http://localhost:4000/bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("MyBookings data:", data);
        setBookings(data);
      })
      .catch((err) => {
        console.error("Error loading bookings:", err);
        toast.error("Failed to load bookings");
      })
      .finally(() => setLoading(false));
  }, [user]);

  // ❌ Cancel / delete a booking
  const handleCancelBooking = (bookingId) => {
    const ok = window.confirm("Are you sure you want to cancel this booking?");
    if (!ok) return;

    fetch(`http://localhost:4000/bookings/${bookingId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.deletedCount > 0) {
          toast.success("Booking cancelled successfully");

          // remove from UI
          setBookings((prev) =>
            prev.filter((booking) => booking._id !== bookingId)
          );
        } else {
          toast.error("Failed to cancel booking");
        }
      })
      .catch((err) => {
        console.error("Error cancelling booking:", err);
        toast.error("Error cancelling booking");
      });
  };

  if (!user) {
    // Shouldn't happen because this route is private
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base-content/60">
          Please login to view your bookings.
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
              My Bookings
            </h2>
            <p className="text-sm text-base-content/60 mt-1">
              All the cars you have booked using RentWheel.
            </p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="py-10 text-center text-base-content/60">
            <p>You have not booked any cars yet.</p>
            <NavLink
              to="/cars"
              className="btn btn-primary btn-sm mt-4 rounded-full"
            >
              Browse Cars
            </NavLink>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-xs uppercase text-base-content/60">
                  <th>#</th>
                  <th>Car Name</th>
                  <th>Rent Price</th>
                  <th>Status</th>
                  <th>Booking Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking._id} className="hover">
                    <td>{index + 1}</td>
                    <td className="font-semibold">{booking.carName}</td>
                    <td>{booking.rentPrice} BDT</td>
                    <td>
                      <span
                        className={`badge ${
                          booking.status === "pending"
                            ? "badge-warning"
                            : "badge-success"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      {booking.bookingDate
                        ? new Date(booking.bookingDate).toLocaleDateString()
                        : booking.createdAt
                        ? new Date(booking.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="flex gap-2">
                      {booking.bookingId ? (
                        <NavLink
                          to={`/carDetails/${booking.bookingId}`}
                          className="btn btn-ghost btn-xs rounded-full"
                        >
                          View Car
                        </NavLink>
                      ) : (
                        "-"
                      )}

                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="btn btn-error btn-xs rounded-full text-white"
                      >
                        Cancel
                      </button>
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

export default MyBookings;
