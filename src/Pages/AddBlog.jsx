import { useState } from "react";
import axios from "axios";

export default function AddBlog() {
  const [form, setForm] = useState({
    title: "",
    image: "",
    category: "",
    content: "",
    author: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://srs-backend-3wa7.onrender.com/blogs", form);
      alert("✅ Blog added successfully!");
      setForm({ title: "", image: "", category: "", content: "", author: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add blog.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Add a New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Image URL"
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
        <textarea
          className="w-full border p-2 rounded"
          rows="5"
          placeholder="Content"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          required
        ></textarea>
        <input
          className="w-full border p-2 rounded"
          placeholder="Author Name"
          value={form.author}
          onChange={e => setForm({ ...form, author: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Blog
        </button>
      </form>
    </div>
  );
}
