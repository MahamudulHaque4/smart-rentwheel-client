import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayouts from './Layouts/MainLayouts.jsx';
import Home from './components/Home/Home.jsx';
import cars from './components/Cars/cars.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import MyBookings from './components/MyBookings/MyBookings.jsx';
import MyListings from './components/MyListings/MyListings.jsx';
import CarDetails from './components/CarDetails/CarDetails.jsx';
import Errorpage from './Pages/Errorpage.jsx';
import AboutUs from './Pages/AboutUs.jsx';
import AddCar from './components/AddCar/AddCar.jsx';
import LoadingSpinner from './components/LoaderSpinner/LoaderSpinner.jsx';
import Profile from './components/Profile/Profile.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import { Toaster } from 'react-hot-toast';
import UpdateCar from './components/UpdateCar/UpdateCar.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayouts,
    errorElement: <Errorpage />,
    HydrateFallback: () => <LoadingSpinner />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/home',
        Component: Home,
      },
      {
        path: '/cars',
        Component: cars,
        loader: () =>
          fetch('https://simple-rentwheel-server.vercel.app/cars').then((res) => res.json()),
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/myBooking',
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: '/myListing',
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
      {
        path: 'carDetails/:id',
        loader: async ({ params }) => {
          try {
            console.log(' Loading car with ID:', params.id);

            const response = await fetch(
              `https://simple-rentwheel-server.vercel.app/cars/${params.id}`
            );
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
        element: (
          <PrivateRoute>
            <CarDetails />
          </PrivateRoute>
        ),
      },

      {
        path: '/update-car/:id',
        element: (
          <PrivateRoute>
            <UpdateCar />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(
            `https://simple-rentwheel-server.vercel.app/cars/${params.id}`
          );
          return res.json();
        },
      },

      {
        path: '/aboutus',
        Component: AboutUs,
      },
      {
        path: '/addcar',
        element: (
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
