import React, { use } from 'react'
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
    const{signInWithGoogle}= use(AuthContext);
    
        const handleGoogleSignIn = () => {
            signInWithGoogle().then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error);
            })
        }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 border border-gray-100
                      transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 text-sm mb-6">
          Login to continue
        </p>

        <form className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Login
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
        onClick ={handleGoogleSignIn}
          className="w-full border border-gray-300 p-3 rounded-lg flex items-center justify-center gap-2 bg-white hover:bg-gray-50 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
          Continue with Google
        </button>

        {/* Register Link */}
        <p className="mt-5 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>

      </div>
    </div>
  );
};

export default Login
