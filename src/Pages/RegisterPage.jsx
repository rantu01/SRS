import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { Helmet } from "react-helmet";

const Register = () => {
  const { register, updateProfile, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!hasUpperCase || !hasLowerCase || !isValidLength) {
      setError(
        "Password must be at least 6 characters and include both uppercase and lowercase letters."
      );
      return;
    }

    try {
      const result = await register(email, password);
      await updateProfile(result, { displayName: name, photoURL });

      await fetch("https://srs-backend-3wa7.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, photoURL }),
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      await fetch("https://srs-backend-3wa7.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
        }),
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Register | SRS</title>
      </Helmet>
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Illustration */}
        <div className="hidden md:flex md:w-2/3 bg-gradient-to-br from-amber-100 to-amber-200 p-12 items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Join Our Community</h2>
            <p className="text-amber-800 mb-8">
              Connect with professionals and grow your business
            </p>
            <div className="w-full max-w-xs mx-auto ">
              <img 
                src="https://i.ibb.co/LDjT6FX3/photo-1522202176988-66273c2fd55f.jpg" 
                alt="Registration Illustration"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-amber-900 mb-2">Create Account</h1>
            <p className="text-amber-700">Start your journey with us today</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-amber-100 text-amber-800 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-amber-800 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="photoURL" className="block text-sm font-medium text-amber-800 mb-1">
                Photo URL (Optional)
              </label>
              <input
                id="photoURL"
                name="photoURL"
                type="text"
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-amber-800 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
              <p className="mt-1 text-xs text-amber-600">
                Must be at least 6 characters with uppercase and lowercase letters
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-md transition duration-300 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                ></path>
              </svg>
              Register Now
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-amber-300"></div>
            <span className="px-3 text-amber-700">or</span>
            <div className="flex-1 border-t border-amber-300"></div>
          </div>

          <button
            onClick={handleGoogleRegister}
            className="w-full py-3 px-4 border border-amber-300 bg-white hover:bg-amber-50 text-amber-800 font-medium rounded-lg shadow-sm transition duration-300 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-17.2-1.4-33.7-4-49.6H272v94h147.4c-6.3 33.8-25 62.4-53.2 81.6v67h85.8c50.3-46.3 81.5-114.7 81.5-193z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c72.6 0 133.5-24 178-65.3l-85.8-67c-23.8 16-54.3 25.4-92.2 25.4-70.8 0-130.7-47.8-152.1-112.1H32v70.6c44.4 88.3 136.4 148.4 240 148.4z"
              />
              <path
                fill="#FBBC05"
                d="M119.9 325.3c-10.5-31.4-10.5-65.6 0-97.1v-70.6H32c-36.5 71.1-36.5 155.6 0 226.7l87.9-58.9z"
              />
              <path
                fill="#EA4335"
                d="M272 107.7c39.6-.6 77.7 13.6 107 39.8l80-80C417 23.8 347.1-1.8 272 0 168.4 0 76.4 60.1 32 148.4l87.9 70.6C141.3 155.5 201.2 107.7 272 107.7z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="text-center mt-8">
            <p className="text-amber-700">
              Already have an account?{" "}
              <a href="/login" className="font-semibold text-amber-600 hover:text-amber-800 transition">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;