import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
import AddCar from './components/AddCar/AddCar.jsx'
import LoadingSpinner from './components/LoaderSpinner/LoaderSpinner.jsx'
import Profile from './components/Profile/Profile.jsx'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'
import { Toaster } from 'react-hot-toast'

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayouts,
    errorElement: <Errorpage></Errorpage>,
    HydrateFallback: () => <LoadingSpinner />,
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
      Component: cars,
      loader : () => fetch("http://localhost:4000/cars").then(res => res.json())
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
      element : (<PrivateRoute><MyBookings /></PrivateRoute>)
    },
    {
      path : '/myListing',
      element : (<PrivateRoute><MyListings /></PrivateRoute>)
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
  },
  {
    path : '/addcar',
    element : (<PrivateRoute><AddCar /></PrivateRoute>
  )
  
  },
  {
    path : '/profile',
    element : (
    <PrivateRoute><Profile /></PrivateRoute>
  )},
  // {
  //   path : "/forgatepassword",
  //   element : ( 
  //   <PrivateRoute>
  //     <ForgatePassword />
  //   </PrivateRoute>
  // )
  // }
  
]}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position = "top-center" />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
