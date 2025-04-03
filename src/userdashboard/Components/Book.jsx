import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/book.css"
const BookSession = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/mentor/getmentor"); // Get mentors
        setMentors(response.data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };
    fetchMentors();
  }, []);

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/session/book",
        { mentorId: selectedMentor, date, time },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Error booking session:", error);
    }
  };

  return (
    <div className="booking-container">
      <h3>Book a Session</h3>
      <select value={selectedMentor} onChange={(e) => setSelectedMentor(e.target.value)}>
        <option value="" className="book-list">Select a Mentor</option>
        {mentors.map((mentor) => (
          <option key={mentor._id} value={mentor._id}>
            {mentor.name} - {mentor.expertise}
          </option>
        ))}
      </select>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="book-list" />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="book-list" />
      <button onClick={handleBooking} disabled={!selectedMentor}className="book-button">Book</button>
    </div>
  );
};

export default BookSession;
