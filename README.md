# RentWheels – Car Rental Web Application

RentWheels is a modern car rental platform where users can browse cars, search by name/category/location, book available cars, and manage their bookings. Car providers can also add, update, and manage their listings easily.

## Live Website

Add your live URL here : 

## Features

### 1. Smart Car Search System
- Search cars by name, category, or location.
- Search results are filtered based on user input.
- Quick search tags such as “SUV”, “Luxury”, “Honda Civic”, etc.

### 2. Car Details and Booking
- Each car has a dedicated details page with full information.
- Shows live availability status: “Available” or “Booked”.
- When a booking is made:
  - Booking data is stored in the database.
  - The car status is updated to “Booked”.
  - The “Book Now” button becomes disabled for booked cars.

### 3. User Authentication
- Login and Register system.
- Google sign-in support.
- Protected routes using `PrivateRoute`.
- Only logged-in users can book cars or view their bookings.

### 4. My Bookings Page
- Displays all bookings made by the logged-in user.
- Shows car name, rent price, booking date, and status.
- Users can cancel a booking.
- Canceling can also update the car status back to “Available” (if implemented on the backend).

### 5. My Listings (For Providers)
- Providers can view the list of cars they have added.
- Can update car information (except provider name/email if restricted).
- Can delete their own listings.
- Listing status stays in sync with booking information.

### 6. User Interface and Experience
- Clean, responsive layout.
- Animated sections and car cards using Framer Motion.
- Booking confirmation animation using Lottie.
- Tooltips and hover effects to show extra information such as price.

### 7. Extra Sections
- Hero banner with a typewriter text effect.
- Custom cursor effect for a more unique feel.
- Additional sections like:
  - Top Rated Cars
  - Testimonials
  - Why Rent
  - Achievements


## Tech Stack

- React + Vite
- Firebase Authentication
- Node.js + Express (Backend)
- MongoDB (Database)
- React Router
- Framer Motion
- React Simple Typewriter
- Lottie React
- Tailwind CSS + DaisyUI

