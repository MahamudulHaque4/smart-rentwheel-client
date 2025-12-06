import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import { useLocation, useNavigate, Navigate, NavLink } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

const Login = () => {
  const { user, signInWithGoogle, signInUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const u = result.user;
        console.log("GOOGLE USER:", u);

        // 🔥 Save to localStorage – use ONE consistent key
        localStorage.setItem("username", u.displayName || "");
        localStorage.setItem("email", u.email || "");
        localStorage.setItem("photoURL", u.photoURL || ""); // 👈 consistent

        toast.success("Login successful, welcome back!");
        navigate("/profile", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login failed, please try again");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = [];

    if (!email) {
      errors.push("• Email is required");
    }

    if (!password) {
      errors.push("• Password is required");
    }

    if (errors.length > 0) {
      toast.error(errors.join("\n"), {
        duration: 4000,
        style: {
          whiteSpace: "pre-line",
        },
      });
      return;
    }

    signInUser(email, password)
      .then((result) => {
        const u = result.user;
        console.log("EMAIL/PASSWORD USER:", u);

        localStorage.setItem("username", u.displayName || "");
        localStorage.setItem("email", u.email || email);
        localStorage.setItem("photoURL", u.photoURL || ""); 

        toast.success("Login successful, welcome back!");
        navigate("/profile", { replace: true });
      })
      .catch((error) => {
        console.error("LOGIN ERROR:", error);

        if (
          error.code === "auth/invalid-credential" ||
          error.code === "auth/wrong-password"
        ) {
          toast.error("Invalid email or password.");
        } else if (error.code === "auth/user-not-found") {
          toast.error("No user found with this email.");
        } else {
          toast.error(error.message || "Login failed, please try again.");
        }
      });
  };

  const handleForgatePassword =(e) => {
    console.log();
    sendPasswordResetEmail(auth, email).then(res =>{
      toast.success("Password reset email sent. Please check your inbox.");
    }).catch( e => {
      toast.error(e.message);
    })
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-base-100/90 backdrop-blur rounded-3xl shadow-xl border border-base-200 p-8 md:p-10 transition-all duration-300 hover:shadow-2xl">
          {/* Header */}
          <div className="text-center space-y-2 mb-7">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Welcome Back 
            </h2>
            <p className="text-sm text-base-content/70">
              Login to continue to your account
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label pt-2">
                <span className="label-text-alt text-base-content/70 cursor-pointer hover:underline" onClick = {handleForgatePassword}
                    type="button"
                >
                    Forgot password?
                </span>
              </label>
              <p className="text-xs text-base-content/60 mt-1">
                Must contain 1 uppercase, 1 lowercase & 6+ characters.
              </p>
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
            Don't have an account?{" "}
            <NavLink
              to="/register"
              className="font-semibold text-primary hover:underline"
            >
              Register
            </NavLink>
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
