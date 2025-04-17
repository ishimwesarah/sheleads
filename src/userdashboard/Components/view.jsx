import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/dash.css"; // Ensure this includes styles for new sections

// Helper to format date/time (same as in MentorSessions)
const formatDateTime = (isoDateString, timeString) => {
    // ... (copy the formatDateTime function from the previous answer)
     if (!isoDateString) return "N/A";
    try {
        const date = new Date(isoDateString);
        const formattedDate = date.toLocaleDateString(undefined, {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        const formattedTime = timeString || date.toLocaleTimeString(undefined, {
            hour: '2-digit', minute: '2-digit', hour12: true
        });
        return `${formattedDate} at ${formattedTime}`;
    } catch (e) {
        return "Invalid Date";
    }
};


const DashboardView = () => {
  // --- State for different data sections ---
  const [courses, setCourses] = useState([]);
  const [userSessions, setUserSessions] = useState([]);
  const [userName, setUserName] = useState('');

  // --- State for Loading/Errors ---
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [coursesError, setCoursesError] = useState('');
  const [sessionsError, setSessionsError] = useState('');

  useEffect(() => {
    // --- Get User Name ---
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
        setUserName(storedUser.name);
    } else {
        // Optional: Fetch user name if not in localStorage or needs refresh
        // e.g., fetch('/api/users/me', { headers: { Authorization: `Bearer ${token}` } });
        setUserName('User'); // Default if not found
    }


    // --- Fetch Available Courses ---
    const fetchCourses = async () => {
        setIsLoadingCourses(true);
        setCoursesError('');
        try {
            const response = await axios.get("http://localhost:5000/course/getCourse");
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error.response?.data || error.message);
            setCoursesError("Failed to load courses.");
            setCourses([]);
        } finally {
            setIsLoadingCourses(false);
        }
    };

    // --- Fetch User's Booked Sessions ---
    const fetchUserSessions = async () => {
        setIsLoadingSessions(true);
        setSessionsError('');
        const token = localStorage.getItem("token");

        if (!token) {
            setSessionsError("Please log in to see your sessions.");
            setIsLoadingSessions(false);
            return;
        }

        try {
            // Assuming this endpoint exists and returns sessions for the logged-in user
            const response = await axios.get("http://localhost:5000/api/sessions/user", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserSessions(response.data);
        } catch (error) {
            console.error("Error fetching user sessions:", error.response?.data || error.message);
            setSessionsError(error.response?.data?.message || "Failed to load your sessions.");
            setUserSessions([]);
        } finally {
            setIsLoadingSessions(false);
        }
    };

    fetchCourses();
    fetchUserSessions();

  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="slf-dashboard-wrapper">
      <div className="slf-main-content">

        {/* --- Welcome Message --- */}
        <section className="slf-welcome">
           <h1>Welcome back, {userName}!</h1>
           <p>Ready to take control of your finances and future?</p>
        </section>

         {/* --- Quick Links --- */}
         <section className="slf-quick-links">
             <h2 className="slf-section-title-sub">Quick Actions</h2>
             <div className="quick-links-container">
                 <Link to="/bookMentor" className="quick-link-btn">Book a Mentor Session</Link>
                 <Link to="/Community" className="quick-link-btn">Join the Community</Link>
                 {/* Add more relevant links */}
                 {/* <Link to="/community" className="quick-link-btn">Join the Community</Link> */}
             </div>
         </section>

        <section className="slf-dashboard-body">

          {/* --- My Sessions Section --- */}
         
          {/* --- Available Courses Section (Existing) --- */}
          <section className="slf-courses">
            <h2 className="slf-section-title">Available Courses</h2>
            {isLoadingCourses && <p className="slf-loading-message">Loading courses...</p>}
            {coursesError && <p className="slf-error-message">{coursesError}</p>}
            {!isLoadingCourses && !coursesError && (
              <div className="slf-course-list">
                {courses.length > 0 ? (
                  courses.map(course => (
                    <div key={course._id} className="slf-course-card">
                      <img
                        src={course.image || '/placeholder-image.png'}
                        alt={`Thumbnail for ${course.title}`}
                        className="slf-course-card-image"
                      />
                      <div className="slf-course-card-content">
                        <h3 className="slf-course-card-title">{course.title}</h3>
                        <p className="slf-course-card-instructor">By: {course.instructor}</p>
                        <Link to={`/course/${course._id}`} className="slf-start-course-link">
                          View Course Details
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
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