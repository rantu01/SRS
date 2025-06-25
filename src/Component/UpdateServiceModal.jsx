import React, { useState } from "react";
import Swal from "sweetalert2";

const UpdateServiceModal = ({ service, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    title: service.title,
    category: service.category,
    price: service.price,
    image: service.image,
    website: service.website,
    description: service.description,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://srs-backend-3wa7.onrender.com/services/${service._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Service updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        onUpdated();
        onClose();
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update the service. Please try again.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Update Service</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input w-full p-2 border rounded"
            placeholder="Title"
            required
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input w-full p-2 border rounded"
            placeholder="Category"
            required
          />
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="input w-full p-2 border rounded"
            type="number"
            placeholder="Price"
            required
          />
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input w-full p-2 border rounded"
            placeholder="Image URL"
            required
          />
          <input
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="input w-full p-2 border rounded"
            placeholder="Website"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input w-full p-2 border rounded"
            placeholder="Description"
            required
          />
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateServiceModal;
