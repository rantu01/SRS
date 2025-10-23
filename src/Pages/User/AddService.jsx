import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FiUpload,
  FiDollarSign,
  FiLink,
  FiBriefcase,
  FiTag,
  FiEdit2,
} from "react-icons/fi";
import CountupStats from "../Component/CountUpStats";
import { Helmet } from "react-helmet";

const AddService = () => {
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    company: "",
    website: "",
    description: "",
    category: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newService = {
      ...formData,
      price: parseFloat(formData.price),
      userEmail: user?.email,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
      date: new Date().toISOString(),
    };

    try {
      const res = await axios.post(
        "https://srs-backend-3wa7.onrender.com/services",
        newService,
        {
          withCredentials: true, // ✅ Sends the JWT cookie to the backend
        }
      );
      if (res.data.insertedId) {
        await Swal.fire({
          title: "Success!",
          text: "Your service has been published successfully!",
          icon: "success",
          confirmButtonColor: "#F59E0B",
          confirmButtonText: "Continue",
          timer: 2500,
          timerProgressBar: true,
        });

        setFormData({
          image: "",
          title: "",
          company: "",
          website: "",
          description: "",
          category: "",
          price: "",
        });
      }
    } catch (error) {
      console.error("Error adding service:", error);
      await Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to add service. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
        confirmButtonText: "Try Again",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Add Service | SRS</title>
      </Helmet>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side - Add Service Form */}
        <div>
          <div className="text-left mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              List Your Service
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              Share your expertise with our community and start getting clients
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-lg overflow-hidden bg-gradient-to-br from-amber-100">
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Image URL */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="image"
                      className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                    >
                      <FiUpload className="mr-2 text-amber-500" />
                      Service Image URL
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="image"
                        name="image"
                        type="url"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 pr-3 py-3 border-gray-300 rounded-md"
                        required
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLink className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    {formData.image && (
                      <div className="mt-2">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="h-24 w-24 object-cover rounded-md border border-gray-200"
                          onError={(e) =>
                            (e.target.src = "https://via.placeholder.com/150")
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <label
                      htmlFor="title"
                      className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                    >
                      <FiTag className="mr-2 text-amber-500" />
                      Service Title
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Professional Web Design"
                      className="mt-1 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3 border"
                      required
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="company"
                      className=" text-sm font-medium text-gray-700 mb-1 flex items-center"
                    >
                      <FiBriefcase className="mr-2 text-amber-500" />
                      Company Name
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                      className="mt-1 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3 border"
                      required
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label
                      htmlFor="website"
                      className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                    >
                      <FiLink className="mr-2 text-amber-500" />
                      Website URL
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="example.com"
                        className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-3 pr-3 py-3 border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                    >
                      <FiTag className="mr-2 text-amber-500" />
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md border"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Software Development">
                        Software Development
                      </option>
                      <option value="Video Production">Video Production</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Writing & Translation">
                        Writing & Translation
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label
                      htmlFor="price"
                      className=" text-sm font-medium text-gray-700 mb-1 flex items-center"
                    >
                      <FiDollarSign className="mr-2 text-amber-500" />
                      Price
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-7 pr-3 py-3 border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className=" text-sm font-medium text-gray-700 mb-1 flex items-center"
                  >
                    <FiEdit2 className="mr-2 text-amber-500" />
                    Service Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your service in detail..."
                    className="mt-1 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3 border"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Publishing...
                      </>
                    ) : (
                      "Publish Service"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Countup Stats */}
        <div className="flex items-start justify-center">
          <CountupStats />
        </div>
      </div>
    </div>
  );
};

export default AddService;
