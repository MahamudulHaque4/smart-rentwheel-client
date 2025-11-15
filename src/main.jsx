import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayouts from './Layouts/MainLayouts.jsx'
import Home from './components/Home/Home.jsx'
import cars from './components/Cars/cars.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'

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
