import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet, useNavigation } from "react-router-dom";
import LoadingSpinner from "../components/LoaderSpinner/LoaderSpinner";


const MainLayouts = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-screen relative">
      <Navbar />

      {isLoading && (
        <div className="absolute inset-0 z-50 bg-base-200/60 backdrop-blur-sm flex items-center justify-center">
          <LoadingSpinner fullScreen={false} />
        </div>
      )}

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayouts;
