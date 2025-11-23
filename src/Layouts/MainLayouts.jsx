import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router'

const MainLayouts = () => {
  return (
    <div className='max-w-7xl mx-auto'>   
    {/*  */}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayouts
