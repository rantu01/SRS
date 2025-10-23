import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom"; // ✅ fixed import
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-white font-semibold border-b-2 border-amber-500"
      : "text-gray-300 hover:text-white transition-colors duration-200";

  // ✅ Updated nav items
  const navItems = (
    <>
      <li className="mx-2 my-1">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li className="mx-2 my-1">
        <NavLink to="/all-services" className={navLinkClass}>
          All Services
        </NavLink>
      </li>
      <li className="mx-2 my-1">
        <NavLink to="/promotion" className={navLinkClass}>
          Promotional
        </NavLink>
      </li>

      {user ? (
        <>
          {/* ✅ Added Dashboard link */}
          <li className="mx-2 my-1">
            <NavLink to="/dashboard/user" className={navLinkClass}>
              Dashboard
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li className="mx-2 my-1">
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          </li>
          <li className="mx-2 my-1">
            <NavLink to="/register" className={navLinkClass}>
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-amber-500 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-32"></div>
        </div>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg backdrop-blur-sm bg-opacity-95 pt-4">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center text-2xl font-bold text-white hover:text-amber-400 transition duration-200"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">SR</span>
              </div>
              <span className="text-2xl font-bold text-white">
                Service<span className="text-amber-500">Review</span>
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <ul className="flex items-center space-x-1">{navItems}</ul>
          </nav>

          {/* User Avatar & Logout or Login + Mobile Toggle */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="hidden sm:flex items-center space-x-2">
                <div className="avatar">
                  <div className="w-9 h-9 rounded-full ring-2 ring-amber-500 ring-offset-2 overflow-hidden">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt={user.displayName || "User"}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-white">
                  {user.displayName?.split(" ")[0] || "Welcome"}
                </span>
              </div>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow-md hover:shadow-lg transition duration-200 text-sm font-medium flex items-center"
              >
                Logout
              </button>
            ) : null}

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white hover:text-amber-400 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } mt-3 py-2 border-t border-gray-700`}
        >
          <ul className="flex flex-col space-y-2 px-2">{navItems}</ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
