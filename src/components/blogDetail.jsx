import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/blogDetails.css";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/Blog/getBlogById/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };
        fetchBlog();
    }, [id]);

    if (!blog) {
        return <p>Loading...</p>;
    }

    return (
        <section className="blog-details">
            <h1>{blog.title}</h1>
            <img src={blog.images[0]} alt={blog.title} className="blog-main-image" />
            <p>{blog.content}</p>
        </section>
    );
};

export default BlogDetails;
