import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/success.css";
import success1 from "../assets/wo1.jpg";


const SuccessStories = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/Blog/getBlog");
                console.log("Fetched Blogs:", response.data); // Debugging
    
                // Directly set the blogs if the response data is an array
                setBlogs(response.data || []); // Fix here
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setBlogs([]); // On error, set an empty array
            }
        };
        fetchBlogs();
    }, []);
    

    

    return (
        <section className="success-stories">
           

            {/* Blog Section */}
            <h2 className="headingblo">Latest Blog Posts</h2>
            <div className="blog-container">
                {blogs === null ? (
                    <p>Loading blogs...</p>
                ) : blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div className="blog-card" key={blog._id}>
                            <img src={blog.images?.[0] || {success1}} alt={blog.title} className="blog-image" />
                            <h3>{blog.title}</h3>
                            <button onClick={() => navigate(`/blog/${blog._id}`)}>Read More</button>
                        </div>
                    ))
                ) : (
                    <p>No blogs available.</p>
                )}
            </div>
        </section>
    );
};

export default SuccessStories;
