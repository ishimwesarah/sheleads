import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/AdminBlog.css";

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/Blog/getBlog");
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // ✅ Handle Image Selection
  const handleFileChange = (e) => {
    setSelectedImages([...e.target.files]);
  };

  // ✅ Add or Update Blog
  const handleSaveBlog = async () => {
    if (!title || !content) {
      alert("Title and content are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    selectedImages.forEach((image) => formData.append("images", image));

    const token = localStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" };

    try {
      if (editingBlogId) {
        await axios.put(`http://localhost:5000/Blog/updateBlog/${editingBlogId}`, formData, { headers });
      } else {
        await axios.post("http://localhost:5000/Blog/createBlog", formData, { headers });
      }
      setTitle("");
      setContent("");
      setSelectedImages([]);
      setEditingBlogId(null);
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  // ✅ Delete a Blog
  const handleDeleteBlog = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`http://localhost:5000/Blog/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="admin-blog-container">
      <h2>Manage Blogs</h2>

      <div className="blog-form">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleSaveBlog}>{editingBlogId ? "Update Blog" : "Add Blog"}</button>
      </div>

      <table>
        <thead>
          <tr><th>Title</th><th>Content</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>{blog.title}</td>
              <td>{blog.content}</td>
             
              <td>
                <button onClick={() => setEditingBlogId(blog._id)}>Edit</button>
                <button onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBlog;
