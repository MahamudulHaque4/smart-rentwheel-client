import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayouts from './Layouts/MainLayouts.jsx'
import Home from './components/Home/Home.jsx'
import cars from './components/Cars/cars.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'
import MyBookings from './components/MyBookings/MyBookings.jsx'
import MyListings from './components/MyListings/MyListings.jsx'
import CarDetails from './components/CarDetails/CarDetails.jsx'
import Errorpage from './Pages/Errorpage.jsx'
import AboutUs from './Pages/AboutUs.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayouts,
    errorElement: <Errorpage></Errorpage>,
    HydrateFallback: () => <div>Loading...</div>,
    children: [{
      index: true,
      Component: Home
    },
    {
      path : '/home',
      Component : Home
    },
    {
      path: '/cars',
      Component: cars
    },
    {
      path: '/register',
      Component : Register
    },
    {
      path: '/login',
      Component : Login
    },
    {
      path : '/myBooking',
      element : <MyBookings></MyBookings>
    },
    {
      path : '/myListing',
      element : <MyListings></MyListings>
    },
    {
     path: 'carDetails/:id',
      loader: async ({ params }) => {
      try {
        console.log(' Loading car with ID:', params.id);
      
        const response = await fetch(`http://localhost:4000/cars/${params.id}`);
        console.log(' Response status:', response.status);
      
       if (!response.ok) {
        const errorText = await response.text();
        console.log(' Server error:', errorText);
        throw new Error(`Car not found: ${response.status}`);
      }
      
      const carData = await response.json();
      console.log(' Loaded car:', carData.carName);
      
      return carData;
      
    } catch (error) {
      console.error(' Loader error:', error);
      throw error;
    }
   },
   Component: CarDetails
  },
  {
    path: '/aboutus',
    Component : AboutUs
  }
  ]
  },
  // {
  //   path : '*',
  //   element : <Errorpage></Errorpage>
  // },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
