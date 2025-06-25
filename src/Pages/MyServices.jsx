import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import UpdateServiceModal from "../Component/UpdateServiceModal";
import DeleteConfirmModal from "../Component/DeleteConfirmModal";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [deletingService, setDeletingService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // <-- New error state

  const fetchServices = () => {
    setLoading(true);
    setError(null); // Clear previous errors on new fetch
    fetch(
      `https://srs-backend-3wa7.onrender.com/my-services?email=${user?.email}`,
      {
        credentials: "include", // 🔒 This ensures the JWT cookie is sent
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load your services. Please try again later."); // <-- Set error message for UI
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
    <div className="mx-auto px-24 py-8 bg-gradient-to-br from-amber-50">

      <Helmet>
        <title>My Service | SRS</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-center">My Services</h2>

      {error && (
        <div className="text-center text-red-600 font-semibold my-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      ) : (
        !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left bg-gradient-to-br from-amber-400">
                  <th className="p-3 border">Image</th>
                  <th className="p-3 border">Title</th>
                  <th className="p-3 border">Category</th>
                  <th className="p-3 border">Price</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-gray-50">
                    <td className="p-3 border">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-20 h-14 object-cover rounded"
                      />
                    </td>
                    <td className="p-3 border">{service.title}</td>
                    <td className="p-3 border">{service.category}</td>
                    <td className="p-3 border">${service.price}</td>
                    <td className="p-3 border space-x-2">
                      <button
                        onClick={() => setEditingService(service)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setDeletingService(service)}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
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
  );
};

export default MyServices;
