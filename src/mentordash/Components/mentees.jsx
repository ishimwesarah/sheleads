// Rename this component if desired (e.g., MentorSessions.js)
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/mentees.css"; // Your styles

// --- Helper to format date/time ---
const formatDateTime = (isoDateString, timeString) => {
    if (!isoDateString) return "N/A";
    try {
        const date = new Date(isoDateString);
        const formattedDate = date.toLocaleDateString(undefined, { // User's locale
            year: 'numeric', month: 'long', day: 'numeric'
        });
        // Use the timeString directly if available and formatted as needed
        const formattedTime = timeString || date.toLocaleTimeString(undefined, {
            hour: '2-digit', minute: '2-digit', hour12: true // Example format
        });
        return `${formattedDate} at ${formattedTime}`;
    } catch (e) {
        return "Invalid Date";
    }
};


const MentorSessions = () => { // Renamed component
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMentorSessions = async () => {
            setIsLoading(true);
            setError('');
            const token = localStorage.getItem("token"); // Get mentor's token

            if (!token) {
                setError("Authentication token not found. Please log in.");
                setIsLoading(false);
                return;
            }

            try {
                // *** Use the new endpoint to get sessions FOR THIS MENTOR ***
                const response = await axios.get(
                    "http://localhost:5000/api/sessions/mentor", // <<< CHANGED ENDPOINT
                    {
                        headers: { Authorization: `Bearer ${token}` } // Send mentor's token
                    }
                );
                setSessions(response.data); // The data should be an array of session objects
            } catch (error) {
                console.error("Error fetching mentor sessions:", error.response?.data || error.message);
                setError(error.response?.data?.message || "Failed to fetch sessions.");
                setSessions([]); // Clear sessions on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchMentorSessions();
    }, []); // Run once on component mount

     // --- Optional: Function to handle session status update ---
    const handleUpdateStatus = async (sessionId, newStatus) => {
         // Add UI feedback (e.g., disable buttons)
         const token = localStorage.getItem("token");
         try {
             await axios.patch(
                 `http://localhost:5000/api/sessions/${sessionId}/status`,
                 { status: newStatus },
                 { headers: { Authorization: `Bearer ${token}` } }
             );
             // Update the session status in the local state for immediate UI feedback
             setSessions(prevSessions =>
                 prevSessions.map(session =>
                     session._id === sessionId ? { ...session, status: newStatus } : session
                 )
             );
             alert(`Session status updated to ${newStatus}`);
         } catch (error) {
             console.error("Error updating status:", error.response?.data || error.message);
             alert(error.response?.data?.message || "Failed to update status.");
         } finally {
             // Remove UI feedback
         }
     };


    return (
        <div className="mentees-container"> {/* Use a more generic class name? */}
            <h2>My Booked Sessions</h2>

            {isLoading && <p>Loading sessions...</p>}
            {error && <p className="error-message">{error}</p>}

            {!isLoading && !error && sessions.length === 0 && (
                <p>You have no upcoming or past sessions booked.</p>
            )}

            {!isLoading && !error && sessions.length > 0 && (
                <ul className="mentees-list"> {/* Or session-list */}
                    {sessions.map((session) => (
                        // Use session._id as the key
                        <li key={session._id} className={`mentee-item status-${session.status?.toLowerCase()}`}>
                            {session.userId ? ( // Check if userId was populated correctly
                                <>
                                    <img
                                        src={session.userId.profilePic || '/default-avatar.png'}
                                        alt={`${session.userId.name}'s profile`}
                                        className="mentee-avatar"
                                    />
                                    <div className="mentee-info">
                                        <h3 className="mentee-name">{session.userId.name}</h3>
                                        <p className="session-time">
                                            {/* Format the date and time */}
                                            {formatDateTime(session.sessionDate, session.sessionTime)}
                                        </p>
                                        <p className="session-status">Status: <strong>{session.status}</strong></p>
                                        <a href={`mailto:${session.userId.email}`} className="contact-link">
                                            Contact Mentee ({session.userId.email})
                                        </a>

                                         {/* Optional: Action buttons for mentor */}
                                         {session.status === 'Pending' && (
                                            <div className="session-actions">
                                                <button onClick={() => handleUpdateStatus(session._id, 'Confirmed')} className="action-btn confirm-btn">Confirm</button>
                                                <button onClick={() => handleUpdateStatus(session._id, 'Cancelled')} className="action-btn cancel-btn">Cancel</button>
                                            </div>
                                        )}
                                         {session.status === 'Confirmed' && (
                                            <div className="session-actions">
                                                <button onClick={() => handleUpdateStatus(session._id, 'Completed')} className="action-btn complete-btn">Mark as Completed</button>
                                                  <button onClick={() => handleUpdateStatus(session._id, 'Cancelled')} className="action-btn cancel-btn">Cancel</button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <p>Error: Mentee details not available.</p> // Fallback if population failed
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MentorSessions; // Export with the new name