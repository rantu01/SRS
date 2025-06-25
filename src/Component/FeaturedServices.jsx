import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const FeaturedServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://srs-backend-3wa7.onrender.com/featured-services")
      .then(res => {
        setServices(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching services:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-8">🌟 Featured Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
              <div className="bg-gray-200 h-48 w-full"></div>
              <div className="p-6 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
          Premium Offerings
        </span>
        <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
          Our Featured Services
        </h2>
        <div className="mx-auto mt-4 h-1 w-24 bg-blue-500 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(service => (
          <div
            key={service._id}
            className="group relative bg-gradient-to-br from-amber-50 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
              <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Featured
              </span>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-lg font-bold text-blue-600">${service.price}</p>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>

              <div className="flex items-center justify-between mt-6">
                <Link
                  to={`/services/${service._id}`}
                  className="relative inline-flex items-center px-4 py-2 overflow-hidden text-sm font-medium text-blue-600 border border-blue-600 rounded-full transition-all duration-300 hover:text-white hover:bg-blue-600"
                >
                  <span className="absolute left-0 block w-full h-0 transition-all duration-300 ease-in-out bg-blue-600 opacity-100 hover:h-full top-1/2"></span>
                  <span className="relative flex items-center">
                    View Details
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/all-Services"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
        >
          View All Services
          <svg
            className="ml-3 -mr-1 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedServices;