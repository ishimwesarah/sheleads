import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/session.css"
const MentorSession = ({ mentorId }) => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/session/mentor/${mentorId}`);
        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [mentorId]);

  return (
    <div className="mentorsessioncont">
      <h2>My Sessions</h2>
      <ul>
        {sessions.length === 0 ? (
          <p>No sessions booked yet.</p>
        ) : (
          sessions.map((session, index) => (
            <li key={index}>
              <p><strong>Mentee:</strong> {session.menteeName}</p>
              <p><strong>Date:</strong> {session.date}</p>
              <p><strong>Time:</strong> {session.time}</p>
              <p><strong>Status:</strong> {session.status}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MentorSession;
