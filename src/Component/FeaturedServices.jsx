import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const FeaturedServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  axios
    .get("https://srs-backend-3wa7.onrender.com/services")
    .then(res => {
      // Limit to max 8 services
      const limitedServices = res.data.slice(0, 8);
      setServices(limitedServices);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching services:", err);
      setLoading(false);
    });
}, []);


  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-wider text-amber-600 uppercase">
            Premium Offerings
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Our Featured Services
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 bg-amber-500 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
              <div className="bg-amber-100 h-56 w-full"></div>
              <div className="p-6 space-y-3">
                <div className="h-6 bg-amber-100 rounded w-3/4"></div>
                <div className="h-4 bg-amber-100 rounded w-full"></div>
                <div className="h-4 bg-amber-100 rounded w-5/6"></div>
                <div className="h-10 bg-amber-100 rounded w-1/2 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold tracking-wider text-amber-600 uppercase">
          Premium Offerings
        </span>
        <h2 className="mt-2 text-3xl font-bold text-amber-900 sm:text-4xl lg:text-5xl">
          Our Featured Services
        </h2>
        <div className="mx-auto mt-4 h-1 w-24 bg-amber-500 rounded-full"></div>
        <p className="mt-4 text-lg text-amber-800 max-w-2xl mx-auto">
          Discover our hand-picked selection of premium services tailored for your needs
        </p>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-amber-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-amber-800 mb-2">
            No Featured Services Available
          </h3>
          <p className="text-amber-600 max-w-md mx-auto">
            Currently there are no featured services. Check back later for updates.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map(service => (
              <div
                key={service._id}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-amber-100"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent"></div>
                  <span className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Featured
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-amber-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                      {service.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-amber-700">{service.category}</span>
                    <p className="text-lg font-bold text-amber-600">${service.price}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link
                      to={`/services/${service._id}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors"
                    >
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
                        />
                      </svg>
                    </Link>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-amber-700 ml-1">
                        {service.rating || '4.8'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/all-services"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 transition-colors duration-300"
            >
              Explore All Services
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedServices;