import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import UpdateServiceModal from "../Component/UpdateServiceModal";
import DeleteConfirmModal from "../Component/DeleteConfirmModal";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [deletingService, setDeletingService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = () => {
    setLoading(true);
    setError(null);
    fetch(
      `https://srs-backend-3wa7.onrender.com/my-services?email=${user?.email}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load your services. Please try again later.");
        Swal.fire({
          title: "Error",
          text: "Failed to load your services",
          icon: "error",
          background: "#1f2937",
          color: "#fff",
          confirmButtonColor: "#3b82f6",
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user?.email) {
      fetchServices();
    }
  }, [user]);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-amber-50 min-h-[60vh]">
      <Helmet>
        <title>My Services | SRS</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center ">
          My Services
        </h2>

        {error && (
          <div className="text-center text-red-600 font-semibold my-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : services.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-amber-800 mb-2">
              No services shared yet
            </h3>
            <p className="text-amber-600 max-w-md mx-auto">
              You haven't added any services yet. Your services will appear here
              once you create them.
            </p>
            <div className="mt-6">
              <a
                href="/add-service"
                className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                Add Your First Service
              </a>
            </div>
          </motion.div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-amber-200">
              <thead className="bg-gradient-to-r from-amber-400 to-amber-500">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-amber-100">
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-amber-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-amber-900 font-medium">
                      {service.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-amber-800">
                      {service.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-amber-800 font-semibold">
                      ${service.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setEditingService(service)}
                          className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            ></path>
                          </svg>
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setDeletingService(service)}
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                          Delete
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Update Modal */}
        {editingService && (
          <UpdateServiceModal
            service={editingService}
            onClose={() => setEditingService(null)}
            onUpdated={fetchServices}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deletingService && (
          <DeleteConfirmModal
            service={deletingService}
            onClose={() => setDeletingService(null)}
            onDeleted={fetchServices}
          />
        )}
      </div>
    </div>
  );
};

export default MyServices;