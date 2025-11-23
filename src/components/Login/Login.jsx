import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => console.log(result.user))
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-base-100/90 backdrop-blur rounded-3xl shadow-xl border border-base-200 p-8 md:p-10 transition-all duration-300 hover:shadow-2xl">
          
          {/* Header */}
          <div className="text-center space-y-2 mb-7">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Welcome Back 👋
            </h2>
            <p className="text-sm text-base-content/70">
              Login to continue to your account
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                className="
                  input input-bordered w-full rounded-2xl
                  bg-base-200/60 focus:bg-base-100
                  focus:outline-none focus:ring-2 focus:ring-primary/40
                "
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                className="
                  input input-bordered w-full rounded-2xl
                  bg-base-200/60 focus:bg-base-100
                  focus:outline-none focus:ring-2 focus:ring-primary/40
                "
                placeholder="Enter your password"
              />
              <label className="label pt-2">
                <span className="label-text-alt text-base-content/70 cursor-pointer hover:underline">
                  Forgot password?
                </span>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="
                btn btn-black w-full rounded-full text-base font-semibold
                transition-all duration-300
                hover:scale-[1.02] hover:shadow-lg hover:brightness-110
                active:scale-95 btn-outline
              "
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-base-300" />
            <span className="text-xs text-base-content/60 uppercase tracking-widest">
              or continue with
            </span>
            <div className="flex-1 h-px bg-base-300" />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleSignIn}
            className="
              btn btn-outline w-full rounded-full gap-3
              border-base-300 hover:border-base-400
              transition-all duration-300
              hover:shadow-md hover:bg-base-200/40
              active:scale-95
            "
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt="Google"
            />
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-base-content/70">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              Register
            </a>
          </p>
        </div>

        {/* Tiny footer */}
        <p className="text-center text-xs text-base-content/50 mt-4">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
