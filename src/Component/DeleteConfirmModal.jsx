import React from "react";

const DeleteConfirmModal = ({ service, onClose, onDeleted }) => {
  const handleDelete = async () => {
    const res = await fetch(`https://srs-backend-3wa7.onrender.com/services/${service._id}`, {
      method: "DELETE",
      credentials: "include", 

    });

    if (res.ok) {
      onDeleted();
      onClose();
    } else {
      
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
        <p>Do you really want to delete <strong>{service.title}</strong>?</p>
        <div className="mt-6 flex justify-center space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;