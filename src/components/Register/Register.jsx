import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    const errors = [];

    if (!/[A-Z]/.test(password)) {
      errors.push("• Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("• Password must contain at least one lowercase letter");
    }

    if (password.length < 6) {
      errors.push("• Password must be at least 6 characters long");
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = formData;

    const errors = [];

    if (!name) errors.push("• Name is required");
    if (!email) errors.push("• Email is required");
    if (!password) errors.push("• Password is required");

    const passErrors = validatePassword(password);
    errors.push(...passErrors);

    if (errors.length > 0) {
      toast.error(errors.join("\n"), {
        style: { whiteSpace: "pre-line" },
      });
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log("Firebase user created:", user);

        updateProfile(user, {
          displayName: name,
          photoURL: photoURL || "",
        })
          .then(() => {
            const newUser = {
              name,
              email,
              photoURL: photoURL || "",
            };

            fetch("http://localhost:4000/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("User saved to backend:", data);
              })
              .catch((err) => {
                console.error("Error saving user to backend:", err);
              });

            toast.success("Registration successful!");
            navigate("/profile"); 
          })
          .catch((error) => {
            console.error(error);
            toast.error("User created, but failed to update profile.");
          });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message || "Registration failed.");
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);

        const newUser = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        fetch("http://localhost:4000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Data after user save", data);
          });

        toast.success("Google sign-in successful!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Google sign-in failed, please try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          Create an Account
        </h2>

        <p className="text-center text-gray-500 text-sm mb-6">
          Register to continue
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-700 mb-1">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Link to your photo"
              value={formData.photoURL}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
            <p className="mt-1 text-xs text-gray-500">
              Must contain at least one uppercase, one lowercase, and be 6+ characters long.
            </p>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full border border-gray-300 p-3 rounded-lg flex items-center justify-center gap-2 bg-white hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
            alt="Google"
          />
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="mt-5 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-600 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
