import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Rating from "react-rating";
import { AuthContext } from "../context/AuthProvider";
import { FaStar, FaRegStar } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [serviceRes, reviewsRes] = await Promise.all([
          axios.get(`https://srs-backend-3wa7.onrender.com/services/${id}`),
          axios.get(`https://srs-backend-3wa7.onrender.com/reviews?serviceId=${id}`),
        ]);
        setService(serviceRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddReview = async () => {
    if (!user) {
      return Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must be logged in to post a review.",
        confirmButtonColor: "#3085d6",
      });
    }

    if (!reviewText || rating === 0) {
      return Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please write a review and select a rating.",
        confirmButtonColor: "#d33",
      });
    }

    const newReview = {
      serviceId: id,
      serviceTitle: service.title,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      text: reviewText,
      rating,
      date: new Date().toISOString(),
    };

    try {
      const res = await axios.post("https://srs-backend-3wa7.onrender.com/reviews", newReview, {
        withCredentials: true, // ✅ Sends the JWT cookie to the backend
      });
      setReviews((prev) => [res.data, ...prev]);
      setReviewText("");
      setRating(0);
      Swal.fire({
        icon: "success",
        title: "Review Added",
        text: "Thanks for sharing your feedback!",
        confirmButtonColor: "#3085d6",
      });
    } catch (err) {
      console.error("Failed to submit review:", err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Could not post your review. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center mt-10 text-red-600">Service not found.</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">

      <Helmet>
        <title>Service Details | SRS</title>
      </Helmet>
      {/* Main two-column layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column - Service details */}
        <div className="lg:w-1/2 lg:sticky lg:top-34 lg:self-start">
          <div className="bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 rounded-2xl overflow-hidden">
            <figure className="relative group">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium text-sm bg-black/60 px-3 py-1 rounded-full">
                  {service.category}
                </span>
              </div>
            </figure>

            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-2">
                <h2 className="card-title text-2xl md:text-3xl font-bold text-gray-800">
                  {service.title}
                </h2>
                <span className="bg-primary/10 text-amber-600 font-semibold px-3 py-1 rounded-full text-sm">
                  ${service.price}
                </span>
              </div>

              {/* Category Display */}
              <div className="flex items-center text-gray-600 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <span className="font-medium">
                  Category: {service.category}
                </span>
              </div>

              {/* Company Display */}
              <div className="flex items-center text-gray-600 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span className="font-medium">Company: {service.company}</span>
              </div>

              {/* User Email Display */}
              {service.userEmail && (
                <div className="flex items-center text-gray-600 mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium">
                    Contact: {service.userEmail}
                  </span>
                </div>
              )}

              {/* Date Display */}
              {service.date && (
                <div className="flex items-center text-gray-600 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium">
                    Posted: {new Date(service.date).toLocaleDateString()}
                  </span>
                </div>
              )}

              <p className="text-gray-700 mb-4 leading-relaxed">
                {service.description}
              </p>

              <div className="card-actions justify-between items-center mt-auto">
                <a
                  href={service.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-amber-600 hover:text-primary/80 font-medium transition-colors"
                >
                  Visit Website
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Reviews section */}
        <div className="lg:w-1/2">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 h-full">
            <h3 className="text-2xl font-semibold mb-4">
              Reviews ({reviews.length})
            </h3>

            {user ? (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  rows="4"
                  placeholder="Write your review..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-gray-700">Rating:</span>
                  <Rating
                    initialRating={rating}
                    onChange={setRating}
                    emptySymbol={
                      <FaRegStar className="text-yellow-400 text-xl" />
                    }
                    fullSymbol={<FaStar className="text-yellow-500 text-xl" />}
                  />
                </div>
                <button
                  onClick={handleAddReview}
                  className="bg-amber-600 text-white px-5 py-2.5 rounded-lg hover:bg-amber-700 transition font-medium w-full sm:w-auto"
                >
                  Add Review
                </button>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 text-amber-800 p-4 rounded-lg mb-6">
                <p>Please log in to add a review.</p>
              </div>
            )}

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {reviews.length > 0 ? (
                reviews.map((rev, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <img
                        src={rev.userPhoto || "https://via.placeholder.com/40"}
                        alt={rev.userName}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/40";
                        }}
                      />
                      <div>
                        <p className="font-semibold">{rev.userName}</p>
                        <Rating
                          initialRating={rev.rating}
                          readonly
                          emptySymbol={
                            <FaRegStar className="text-yellow-400 text-sm" />
                          }
                          fullSymbol={
                            <FaStar className="text-yellow-500 text-sm" />
                          }
                        />
                      </div>
                    </div>
                    <p className="text-gray-700 mb-1">{rev.text}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(rev.date).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No reviews yet. Be the first to review!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
