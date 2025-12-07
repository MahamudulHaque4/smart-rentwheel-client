import React from "react";
import { NavLink, useRouteError } from "react-router";

const Errorpage = () => {
  const error = useRouteError();

  const status = error?.status || 404;
  const title =
    status === 404 ? "Page not found" : "Something went wrong";
  const message =
    error?.statusText ||
    error?.message ||
    "We couldn’t find the page you’re looking for.";

  return (
    <div className="min-h-screen grid place-items-center bg-base-200 px-4">
      
      <div className="text-center max-w-lg">
        {/* floating number */}
        <div className="relative inline-block">
          <h1
            className="
              text-7xl md:text-8xl font-extrabold tracking-tight text-black/10
              animate-bounce
            "
          >
            {status}
          </h1>
          <span className="absolute -right-6 -top-4 w-6 h-6 rounded-full bg-primary/30 blur-sm animate-ping" />
        </div>

        <h2 className="mt-4 text-2xl md:text-3xl font-bold">
          {title}
        </h2>

        <p className="mt-2 text-sm md:text-base text-base-content/70">
          {message}
        </p>

        {/* actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <NavLink
            to="/"
            className="
              btn btn-outline rounded-full px-8
              transition-all duration-300
              hover:scale-105 hover:shadow-lg hover:brightness-110
              active:scale-95
            "
          >
            Go Home
          </NavLink>

          <button
            onClick={() => window.history.back()}
            className="
              btn btn-outline rounded-full px-8
              transition-all duration-300 hover:shadow-md
            "
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Errorpage;



