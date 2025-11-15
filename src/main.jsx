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

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayouts,
    children: [{
      index: true,
      Component: Home
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
    }
  ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
