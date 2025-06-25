import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { Helmet } from "react-helmet";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://srs-backend-3wa7.onrender.com/services",
        {
          params: {
            search: searchTerm,
            category: category,
          },
        }
      );
      setServices(response.data);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to load services. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [searchTerm, category]);

  useEffect(() => {
    setCategories([
      "All",
      "Design",
      "Marketing",
      "Web Development",
      "Software Development",
      "Video Production",
      "Consulting",
      "Writing & Translation",
    ]);
  }, []);

  return (
    <div className=" mx-auto px-12 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-amber-50">
      <Helmet>
        <title>All Services | SRS</title>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Discover Professional Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect service for your business needs from our curated
            selection of professionals.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Side - Service Cards */}
          <div className="lg:col-span-8">
            {/* Loading */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* No Results */}
            {!isLoading && !error && services.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No services found
                </h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="bg-gradient-to-br from-amber-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={service.image || "/placeholder-service.jpg"}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          e.target.src = "/placeholder-service.jpg";
                        }}
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-800 shadow-sm">
                        {service.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                          {service.title}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          ${service.price}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {service.description}
                      </p>
                      <p className="text-amber-600 mb-4 line-clamp-2">
                        {service.category}
                      </p>
                      <p className="text-blue-600 mb-4 line-clamp-2 font-bold">
                        Company : {service.company}
                      </p>
                      <Link
                        to={`/services/${service._id}`}
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      >
                        View Details
                        <svg
                          className="ml-2 -mr-1 w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Filters */}
          <div className="lg:col-span-4 ">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6 sticky top-34 bg-gradient-to-br from-amber-50">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Services
                </label>
                <input
                  type="text"
                  placeholder="Search by title, description, or company"
                  className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Category
                </label>
                <select
                  className="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value === "All" ? "" : e.target.value)
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllServices;
