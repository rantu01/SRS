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

      // Send user info to backend
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
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <Helmet>
        <title>Register | SRS</title>
      </Helmet>
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Sign up
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>

            <form
              onSubmit={handleRegister}
              className="w-full flex-1 mt-8 mx-auto max-w-xs flex flex-col gap-4"
            >
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                className="input-field"
              />
              <input
                name="photoURL"
                type="text"
                placeholder="Enter your photo URL"
                className="input-field"
              />
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="input-field"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="input-field"
              />
              <button type="submit" className="submit-btn">
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span className="ml-3">Sign Up</span>
              </button>
            </form>

            {/* Google Sign Up Button */}
            <button
              onClick={handleGoogleRegister}
              className="mt-4 tracking-wide font-semibold bg-red-600 text-white w-full py-3 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out flex items-center justify-center"
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
              <span>Continue with Google</span>
            </button>

            <p className="mt-6 text-xs text-gray-600 text-center">
              Already have an account?{" "}
              <a href="/login">
                <span className="text-blue-900 font-semibold">Sign in</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
