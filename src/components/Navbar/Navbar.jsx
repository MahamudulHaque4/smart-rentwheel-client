import React, { use } from 'react'
import { NavLink } from 'react-router'
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
    const {user, signOutUser} = use(AuthContext);

    const handleSignOut = () => {
        signOutUser()
        .then()
        .catch()
    }

    const links = <>    
       <li><NavLink to="/">Home</NavLink></li>
       {
        user && <>
        <li><NavLink to="/addcar">Add Car</NavLink></li>
        <li><NavLink to="/myBooking">My Booking</NavLink></li>
        <li><NavLink to="/myListing">My Listing</NavLink></li>
        
        </>
       }
       <li><NavLink to="/cars">Browse Cars</NavLink></li>

       {/* <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li> */}
        {/* <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li> */}
       
    </>
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <NavLink to="/" className="btn-ghost text-xl">Rent <span className='text-purple-600'>Wheel</span></NavLink>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  
  <div className="gap-4 navbar-end">
        {/* <NavLink to="/register">Register</NavLink> */}
            {
                user ?
                <NavLink onClick={handleSignOut} to="/">Sign Out</NavLink> :
                <NavLink to="/login">Login</NavLink>
            }
  </div>
</div>
    </div>
  )
}

export default Navbar
