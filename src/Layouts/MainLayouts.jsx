import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet, useNavigation } from "react-router-dom";
import LoaderSpinner from "../components/LoaderSpinner/LoaderSpinner";

const MainLayouts = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  useEffect(() => {
    const cursor = document.getElementById("customCursor");
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseDown = () => {
      cursor.classList.add("cursor-click");
    };

    const handleMouseUp = () => {
      cursor.classList.remove("cursor-click");
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    const hoverTargets = document.querySelectorAll(
      "a, button, input, textarea, .auth-card"
    );

    const handleMouseEnter = () => cursor.classList.add("cursor-hover");
    const handleMouseLeave = () => cursor.classList.remove("cursor-hover");

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    let animationFrameId;

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;
      cursor.style.transform = `translate(${cursorX - 12}px, ${
        cursorY - 12
      }px)`;
      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="mx-auto flex flex-col min-h-screen relative">
      <div
        id="customCursor"
        className="
          fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-primary 
          pointer-events-none z-[9999]
          transition-transform duration-150 ease-out
        "
      ></div>

      <Navbar />

      {isLoading && (
        <div className="absolute inset-0 z-50 bg-base-200/60 backdrop-blur-sm flex items-center justify-center">
          <LoaderSpinner fullScreen={false} />
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