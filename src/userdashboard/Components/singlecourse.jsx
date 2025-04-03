import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/coursedetails.css"; // Make sure to create this CSS file

const CourseDetails = () => {
    const { id } = useParams(); // Get the course ID from the URL
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState('');       // Error state

    useEffect(() => {
        const fetchCourse = async () => {
            setIsLoading(true); // Start loading
            setError('');       // Clear previous errors
            try {
                // Fetch course data from your backend endpoint
                const response = await axios.get(`http://localhost:5000/course/getCourseById/${id}`);
                setCourse(response.data); // Store the fetched course data in state
            } catch (error) {
                console.error("Error fetching Course:", error);
                setError("Failed to load course details. Please try again later."); // Set error message
                setCourse(null); // Clear any potentially stale data
            } finally {
                setIsLoading(false); // Stop loading regardless of success or failure
            }
        };

        fetchCourse();
    }, [id]); // Re-run the effect if the ID changes

    // --- Helper function to extract YouTube Video ID ---
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;
        let videoId = null;
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname === "youtu.be") {
                videoId = urlObj.pathname.slice(1);
            } else if (urlObj.hostname.includes("youtube.com")) {
                videoId = urlObj.searchParams.get("v");
            }
        } catch (e) {
            console.error("Invalid video URL:", url);
            return null; // Invalid URL format
        }

        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    };


    // --- Render Loading State ---
    if (isLoading) {
        return <div className="course-details-container loading">Loading course details...</div>;
    }

    // --- Render Error State ---
    if (error) {
        return <div className="course-details-container error">{error}</div>;
    }

    // --- Render Not Found State ---
    if (!course) {
        // This case might happen if the fetch succeeded but returned no data (e.g., 404 from backend handled gracefully)
        // Or if an error occurred and we set course to null.
        return <div className="course-details-container">Course not found.</div>;
    }

    // --- Render Course Details ---
    const embedUrl = getYouTubeEmbedUrl(course.video); // Use the actual video field name from your DB (e.g., course.videoUrl or course.video)

    return (
        <div className="course-details-container">
            <article className="course-content">
                {/* Course Header */}
                <header className="course-header">
                    <h1 className="course-title">{course.title}</h1>
                    <p className="course-meta">
                        <span className="course-instructor">By: {course.instructor}</span>
                        <span className="course-duration">Duration: {course.duration}</span>
                    </p>
                </header>

                {/* Course Image */}
                {course.image && (
                    <img
                        src={course.image}
                        alt={`Cover image for ${course.title}`}
                        className="course-main-image"
                    />
                )}

                {/* Course Description */}
                <section className="course-description">
                    <h2>About this course</h2>
                    <p>{course.description}</p>
                </section>

                {/* Course Video */}
                {embedUrl && (
                    <section className="course-video">
                        <h2>Course Video</h2>
                        <div className="video-container">
                            <iframe
                                src={embedUrl}
                                title={`${course.title} Video`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </section>
                )}

                {/* Course Resources (PDF) */}
                {course.pdf && (
                    <section className="course-resources">
                        <h2>Resources</h2>
                        <a
                            href={course.pdf} // Use the actual pdf field name from your DB
                            target="_blank" // Open in new tab
                            rel="noopener noreferrer" // Security best practice
                            className="resource-link pdf-link"
                        >
                            Download Course PDF
                        </a>
                    </section>
                )}

                {!embedUrl && !course.pdf && (
                     <p className="no-materials">No additional video or PDF materials available for this course.</p>
                )}

            </article>
        </div>
    );
};

export default CourseDetails;