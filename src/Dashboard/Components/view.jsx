import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/AdminDashboard.css";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    communityPosts: 0,
    mentors: 0,
  });

  const [recentMessages, setRecentMessages] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await axios.get("http://localhost:5000/user/getUser");
        const coursesRes = await axios.get("http://localhost:5000/course/getCourse");
        const communityRes = await axios.get("http://localhost:5000/community/getpost");
        const mentorsRes = await axios.get("http://localhost:5000/mentor/getmentor");

        setStats({
          users: usersRes.data.length,
          courses: coursesRes.data.length,
          communityPosts: communityRes.data.length,
          mentors: mentorsRes.data.length,
        });

        setRecentMessages(communityRes.data.slice(0, 3)); // Show latest 3 messages
        setRecentUsers(usersRes.data.slice(0, 3)); // Show latest 3 users
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <div className="admin-dashboard-content">
        <h1>Welcome, Admin</h1>
        <p>Manage She Leads Finance platform efficiently.</p>

        {/* ✅ Dashboard Statistics */}
        <div className="dashboard-cards">
          <div className="dashboard-card">📌 Total Users: {stats.users}</div>
          <div className="dashboard-card">📖 Total Courses: {stats.courses}</div>
          <div className="dashboard-card">💬 Community Posts: {stats.communityPosts}</div>
          <div className="dashboard-card">🎓 Active Mentors: {stats.mentors}</div>
        </div>

        {/* ✅ Recent Activity */}
        <div className="recent-activity">
          <div className="activity-section">
            <h2>Recent Community Messages</h2>
            <ul>
              {recentMessages.length > 0 ? (
                recentMessages.map((msg) => (
                  <li key={msg._id}>
                    <strong>{msg.userName}</strong>: {msg.content}
                  </li>
                ))
              ) : (
                <p>No recent messages.</p>
              )}
            </ul>
          </div>

          <div className="activity-section">
            <h2>Newly Registered Users</h2>
            <ul>
              {recentUsers.length > 0 ? (
                recentUsers.map((user) => (
                  <li key={user._id}>
                    {user.name} - {user.email}
                  </li>
                ))
              ) : (
                <p>No new users.</p>
              )}
            </ul>
          </div>
        </div>

        {/* ✅ Management Buttons */}
        <div className="management-buttons">
          <button onClick={() => window.location.href = "/Userpage"}>👥 Manage Users</button>
          <button onClick={() => window.location.href = "/CoPage"}>📚 Manage Courses</button>
          <button onClick={() => window.location.href = "/AdminComm"}>💬 Manage Community</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
