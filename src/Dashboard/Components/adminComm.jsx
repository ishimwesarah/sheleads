import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/CommunityPage.css";


const AdminCommunityPage = () => {
  const [posts, setPosts] = useState([]);

  // Fetch all community posts from the database
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/community/getpost");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Handle delete post
  const handleDeletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:5000/community/delete/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="admin-community-container">
      
      <div className="admin-community-content">
       
        <div className="admin-community-main">
          <h1>Community Posts</h1>
          <table className="admin-community-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Content</th>
                <th>Likes</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post._id}>
                    <td>{post.userName || "Anonymous"}</td>
                    <td>{post.content}</td>
                    <td>{post.likes}</td>
                    <td>
                      {post.comments.length > 0 ? (
                        <ul>
                          {post.comments.map((comment, index) => (
                            <li key={index} className="admin-community-comment">
                              <strong>{comment.user}:</strong> {comment.text}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "No comments"
                      )}
                    </td>
                    <td>
                      <button className="admin-delete-btn" onClick={() => handleDeletePost(post._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No community posts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCommunityPage;
