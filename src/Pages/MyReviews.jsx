import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import Rating from "react-rating";
import {
  FaStar,
  FaRegStar,
  FaEdit,
  FaTrash,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Helmet } from "react-helmet";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [updatedReview, setUpdatedReview] = useState({
    text: "",
    rating: 0,
  });

  // console.log("token here ",user.accessToken)

  useEffect(() => {
    const fetchReviews = async () => {
      if (user?.email) {
        try {
          setIsLoading(true);
          const res = await axios.get(
            `https://srs-backend-3wa7.onrender.com/reviews/my-reviews?userEmail=${user.email}`,
            {
              withCredentials: true, // 🔒 This ensures the JWT cookie is sent
            }
          );
          const formattedReviews = res.data.map((review) => ({
            ...review,
            rating: Number(review.rating) || 0,
            createdAt: review.createdAt
              ? new Date(review.createdAt)
              : new Date(),
          }));
          setReviews(formattedReviews);
        } catch (err) {
          console.error("Failed to fetch reviews:", err);
          Swal.fire({
            title: "Error",
            text: "Failed to load your reviews",
            icon: "error",
            background: "#1f2937",
            color: "#fff",
            confirmButtonColor: "#3b82f6",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchReviews();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Confirm Deletion",
      text: "This action cannot be undone. Are you sure you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete Review",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://srs-backend-3wa7.onrender.com/reviews/${id}`,
          {
            withCredentials: true, // ✅ Ensures JWT cookie is sent
          }
        );
        setReviews(reviews.filter((r) => r._id !== id));
        Swal.fire({
          title: "Success!",
          text: "Your review has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#1f2937",
          color: "#fff",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete review. Please try again.",
          icon: "error",
          background: "#1f2937",
          color: "#fff",
          confirmButtonColor: "#3b82f6",
        });
      }
    }
  };

  const openEditModal = (review) => {
    setEditingReview(review);
    setUpdatedReview({
      text: review.text,
      rating: Number(review.rating) || 0,
    });
  };

  const handleChange = (e) => {
    setUpdatedReview({ ...updatedReview, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (value) => {
    setUpdatedReview((prev) => ({ ...prev, rating: value }));
  };

  const handleUpdate = async () => {
    if (!updatedReview.text.trim()) {
      Swal.fire({
        title: "Incomplete Review",
        text: "Please write your review text before submitting",
        icon: "warning",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    if (updatedReview.rating === 0) {
      Swal.fire({
        title: "Rating Required",
        text: "Please select a star rating for your review",
        icon: "warning",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    try {
      await axios.put(
        `https://srs-backend-3wa7.onrender.com/reviews/${editingReview._id}`,
        updatedReview,
        {
          withCredentials: true, // ✅ Sends the JWT cookie to the backend
        }
      );
      setReviews(
        reviews.map((r) =>
          r._id === editingReview._id ? { ...r, ...updatedReview } : r
        )
      );
      setEditingReview(null);
      Swal.fire({
        title: "Updated!",
        text: "Your review has been successfully updated.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "#1f2937",
        color: "#fff",
      });
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        text: "We couldn't update your review. Please try again later.",
        icon: "error",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 h-[60vh] ">
      <Helmet>
        <title>My Reviews | SRS</title>
      </Helmet>
      <div className="mb-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold"
        >
          My Reviews
        </motion.h2>
        {reviews.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md inline-block mt-2"
          >
            {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
          </motion.span>
        )}
      </div>

      {reviews.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-gray-400 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            No reviews yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            You haven't submitted any reviews. Your feedback will appear here
            once you do.
          </p>
        </motion.div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Review
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-800 dark:text-white font-medium">
                    {review.serviceTitle}
                  </td>
                  <td className="px-4 py-4 whitespace-pre-line text-gray-600 dark:text-gray-300 max-w-xs">
                    {review.text}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap">
                    <div className="flex justify-center items-center space-x-1">
                      <Rating
                        readonly
                        initialRating={review.rating}
                        emptySymbol={
                          <FaRegStar className="text-yellow-400 text-lg" />
                        }
                        fullSymbol={
                          <FaStar className="text-yellow-500 text-lg" />
                        }
                        fractions={2}
                      />
                      <span className="text-gray-600 dark:text-gray-300 font-medium ml-1">
                        {review.rating.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                    {format(review.createdAt, "MMM d, yyyy")}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap">
                    <div className="flex justify-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openEditModal(review)}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                      >
                        <FaEdit className="text-sm" />
                        <span>Edit</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(review._id)}
                        className="flex items-center space-x-1 px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-md hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                      >
                        <FaTrash className="text-sm" />
                        <span>Delete</span>
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
      {editingReview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative shadow-xl"
          >
            <button
              onClick={() => setEditingReview(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>

            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              Update Your Review
            </h3>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Service
              </label>
              <input
                type="text"
                value={editingReview.serviceTitle}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 cursor-not-allowed text-gray-600 dark:text-gray-300"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Review
              </label>
              <textarea
                name="text"
                value={updatedReview.text}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                rows={4}
                placeholder="Share your experience..."
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Rating
              </label>
              <div className="flex items-center">
                <Rating
                  initialRating={updatedReview.rating}
                  emptySymbol={
                    <FaRegStar className="text-yellow-400 text-2xl cursor-pointer" />
                  }
                  fullSymbol={
                    <FaStar className="text-yellow-500 text-2xl cursor-pointer" />
                  }
                  onChange={handleRatingChange}
                  fractions={2}
                />
                <span className="ml-2 text-gray-600 dark:text-gray-300 font-medium">
                  {updatedReview.rating > 0
                    ? updatedReview.rating.toFixed(1)
                    : "Not rated"}
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEditingReview(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MyReviews;
