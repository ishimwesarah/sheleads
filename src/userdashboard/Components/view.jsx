import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported
import axios from "axios";
import "../styles/dash.css"; // Make sure this CSS file exists and is styled

const DashboardView = () => {
  // Removed static user data as it wasn't used in the courses section
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState('');       // Add error state

  useEffect(() => {
    setIsLoading(true); // Start loading
    setError('');       // Clear previous errors

    axios.get("http://localhost:5000/course/getCourse") // Your endpoint to get all courses
      .then(response => {
        setCourses(response.data); // Set the fetched courses
      })
      .catch(error => {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses. Please try again later."); // Set error message
        setCourses([]); // Clear courses on error
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
      });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="slf-dashboard-wrapper">
      <div className="slf-main-content">
        <section className="slf-dashboard-body">
          {/* You can add other dashboard sections here if needed */}

          <section className="slf-courses">
            <h2 className="slf-section-title">Available Courses</h2>

            {/* --- Loading State --- */}
            {isLoading && <p className="slf-loading-message">Loading courses...</p>}

            {/* --- Error State --- */}
            {error && <p className="slf-error-message">{error}</p>}

            {/* --- Course List --- */}
            {!isLoading && !error && ( // Only show list if not loading and no error
              <div className="slf-course-list">
                {courses.length > 0 ? (
                  courses.map(course => (
                    // *** CRITICAL CHANGE HERE ***
                    // Use course._id (or the actual ID field from your DB)
                    // for both the key and the Link's 'to' prop.
                    <div key={course._id} className="slf-course-card">
                      <img
                        src={course.image || '/placeholder-image.png'} // Use course image if available
                        alt={`Thumbnail for ${course.title}`}
                        className="slf-course-card-image" // Add a class for styling
                      />
                      <div className="slf-course-card-content">
                        <h3 className="slf-course-card-title">{course.title}</h3>
                        <p className="slf-course-card-instructor">By: {course.instructor}</p> {/* Optional: Display instructor */}
                        {/* Construct the link using the course's unique _id */}
                        <Link to={`/course/${course._id}`} className="slf-start-course-link">
                          View Course Details
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  // Show this only if loading is finished, no error, and courses array is empty
                  <p>No courses available at the moment.</p>
                )}
              </div>
            )}
          </section>

        </section>
      </div>
    </div>
  );
};

export default DashboardView;