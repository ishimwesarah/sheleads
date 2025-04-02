import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./navbar";
import "../styles/mentordash.css";
import axios from "axios";

const MentorDashboard = () => {
  const [mentor, setMentor] = useState(null);
  const [mentees, setMentees] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Fetch mentor data
    axios.get("http://localhost:5000/api/mentor/me")
      .then(res => setMentor(res.data))
      .catch(err => console.error(err));

    // Fetch mentees
    axios.get("http://localhost:5000/api/mentees")
      .then(res => setMentees(res.data))
      .catch(err => console.error(err));

    // Fetch sessions
    axios.get("http://localhost:5000/api/sessions")
      .then(res => setSessions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="mentor-dashboard">
      
      <div className="main-content">
        
        <div className="dashboard-content">
          <h2>Welcome, {mentor?.name}</h2>
          <div className="dashboard-widgets">
            <div className="widget">
              <h3>Upcoming Sessions</h3>
              <ul>
                {sessions.map(session => (
                  <li key={session.id}>{session.date} - {session.menteeName}</li>
                ))}
              </ul>
            </div>
            <div className="widget">
              <h3>Your Mentees</h3>
              <ul>
                {mentees.map(mentee => (
                  <li key={mentee.id}>{mentee.name}</li>
                ))}
              </ul>
            </div>
            <div className="widget">
              <h3>Messages</h3>
              <p>Check new messages from your mentees.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
