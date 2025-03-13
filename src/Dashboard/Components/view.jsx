import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    quizzes: 0,
    mentors: 0,
    stories: 0,
    availableMentors: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await axios.get("http://localhost:5000/user/getUser");
        const coursesRes = await axios.get("http://localhost:5000/courses/getcourses");
        const quizzesRes = await axios.get("http://localhost:5000/quizzes/getquizzes");
        const mentorsRes = await axios.get("http://localhost:5000/users/getmentors");
        const storiesRes = await axios.get("http://localhost:5000/stories/getstories");
        const availableMentorsRes = await axios.get("http://localhost:5000/users/getavailablementors");

        setStats({
          users: usersRes.data.length,
          courses: coursesRes.data.length,
          quizzes: quizzesRes.data.length,
          mentors: mentorsRes.data.length,
          stories: storiesRes.data.length,
          availableMentors: availableMentorsRes.data.length,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar />
        <div className="dashboard-main">
          <h1>Welcome to She Leads Finance Dashboard</h1>
          <div className="dashboard-widgets">
            <div className="widget">📌 Total Users: {stats.users}</div>
            <div className="widget">📖 Total Courses: {stats.courses}</div>
            <div className="widget">📝 Total Quizzes: {stats.quizzes}</div>
            <div className="widget">🎓 Total Mentors: {stats.mentors}</div>
            <div className="widget">📖 Total Stories: {stats.stories}</div>
            <div className="widget">✅ Available Mentors: {stats.availableMentors}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashDashboard;
