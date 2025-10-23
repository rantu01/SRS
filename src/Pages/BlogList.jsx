import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("https://srs-backend-3wa7.onrender.com/blogs")
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8 grid md:grid-cols-3 gap-6">
      {blogs.map((blog) => {
        const blogId = blog._id.$oid || blog._id; // MongoDB ObjectId handling
        return (
          <div key={blogId} className="bg-white rounded-2xl shadow hover:shadow-lg transition">
            <img
              src={blog.image || "/placeholder.jpg"}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p className="text-gray-500 text-sm mb-2">
                {blog.category} | {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                {blog.content?.slice(0, 100) || "No content available"}...
              </p>
              <Link
                to={`/blogs/${blogId}`}
                className="text-blue-600 font-semibold mt-3 inline-block"
              >
                Read More →
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
