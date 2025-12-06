import React from "react";

const LoadingSpinner = ({ fullScreen = false, text = "Loading..." }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        fullScreen ? "min-h-screen" : "py-10"
      }`}
    >
      {/* clean modern ring */}
      <div className="w-10 h-10 rounded-full border-2 border-base-300 border-t-black animate-spin" />

      {/* simple friendly text */}
      <p className="text-sm text-base-content/60 font-medium tracking-wide">
        {text}
      </p>
    </div>
  );
};

export default LoadingSpinner;
