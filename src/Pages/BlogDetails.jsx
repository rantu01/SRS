import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`https://srs-backend-3wa7.onrender.com/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!blog) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <img
        src={blog.image || "/placeholder.jpg"}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-500 mb-4">
        {blog.category} | {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-700 leading-relaxed">
        {blog.content || "No content available."}
      </p>
      <p className="mt-6 text-sm text-gray-400">
        ✍️ Written by {blog.author || "Anonymous"}
      </p>
    </div>
  );
}
