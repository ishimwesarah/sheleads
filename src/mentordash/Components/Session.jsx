import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/sessions.css";

const MySessions = () => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/sessions/mentorID");
                setSessions(response.data);
            } catch (error) {
                console.error("Error fetching sessions:", error);
            }
        };

        fetchSessions();
    }, []);

    return (
        <div className="sessions">
            <h2>My Sessions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Mentee</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map((session) => (
                        <tr key={session.id}>
                            <td>{session.menteeName}</td>
                            <td>{session.date}</td>
                            <td>{session.time}</td>
                            <td className={session.status.toLowerCase()}>{session.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MySessions;
