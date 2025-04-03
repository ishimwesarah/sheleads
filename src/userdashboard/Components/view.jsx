import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/dash.css";

const DashboardView = () => {
  const [user] = useState({
    goalsProgress: 50,
  });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the backend
    axios.get("http://localhost:5000/course/getCourse")
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    <div className="slf-dashboard-wrapper">
      <div className="slf-main-content">
        <section className="slf-dashboard-body">
          

          <section className="slf-courses">
            <h2 className="slf-section-title">Available Courses</h2>
            <div className="slf-course-list">
              {courses.length > 0 ? (
                courses.map(course => (
                  <div key={course.id} className="slf-course-card">
                    <h3>{course.title}</h3>
                    <Link to={`/course/${course.id}`}>Start Course</Link>
                  </div>
                ))
              ) : (
                <p>No course available</p>
              )}
            </div>
          </section>

          
        </section>
      </div>
    </div>
  );
};

export default DashboardView;
