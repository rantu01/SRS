import React from "react";
import { Link } from "react-router";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">SR</span>
              </div>
              <span className="text-2xl font-bold text-white">
                Service<span className="text-amber-500">Review</span>
              </span>
            </div>
            <p className="mb-6 text-gray-400">
              Connecting businesses with quality service providers through
              trusted reviews and ratings.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/rantubytes/"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:ml-12">
            <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-amber-500 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-Services"
                  className="text-gray-400 hover:text-amber-500 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                  All Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">
              Private
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/add-Service"
                  className="text-gray-400 hover:text-amber-500 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                  Add Services
                </Link>
              </li>
              <li>
                <Link
                  to="/My-Service"
                  className="text-gray-400 hover:text-amber-500 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                  My Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FiMapPin className="text-amber-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">
                  Bankers Lane #3, Bagmara MainRoad
                  <br />
                  Bangladesh, Khulna{" "}
                </span>
              </li>
              <li className="flex items-center">
                <FiMail className="text-amber-500 mr-3" />
                <a
                  href="mailto:info@servicereview.com"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  rantumondal06@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <FiPhone className="text-amber-500 mr-3" />
                <a
                  href="tel:+11234567890"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  +88 01*******37
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 mb-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm text-center">
            &copy; {currentYear} Rantu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
