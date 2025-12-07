// src/components/Navbar/Navbar.jsx
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../hooks/useTheme";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/addcar">Add Car</NavLink>
          </li>
          <li>
            <NavLink to="/myBooking">My Booking</NavLink>
          </li>
          <li>
            <NavLink to="/myListing">My Listing</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/cars">Browse Cars</NavLink>
      </li>
      <li>
        <NavLink to="/aboutus">About Us</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        {/* mobile dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <NavLink to="/" className="btn-ghost text-3xl">
          Rent <span className="text-primary">Wheel</span>
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="gap-4 navbar-end flex items-center">
    
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            <NavLink
              to="/profile"
              className="btn-ghost flex items-center gap-2"
            >
              <img
                src={user.photoURL || "https://via.placeholder.com/150"}
                alt={user.displayName || "User"}
                className="rounded-full w-[40px] h-[40px] mx-auto"
              />
              <h2 className="text-xl font-semibold">{user?.displayName}</h2>
            </NavLink>
          </div>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
