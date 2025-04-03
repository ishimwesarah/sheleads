import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/book.css"; // Your styles

const BookSession = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isLoadingMentors, setIsLoadingMentors] = useState(true);
  const [isBooking, setIsBooking] = useState(false); // Loading state for booking
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchMentors = async () => {
      setIsLoadingMentors(true);
      setError("");
      try {
        // Consider fetching only available mentors if you have that endpoint
        // const response = await axios.get("http://localhost:5000/api/mentors/available");
        const response = await axios.get("http://localhost:5000/mentor/getmentor"); // Or use your existing endpoint
        setMentors(response.data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        setError("Failed to load mentors. Please try again later.");
      } finally {
        setIsLoadingMentors(false);
      }
    };
    fetchMentors();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError("");
    setSuccessMessage("");
    setIsBooking(true);

    if (!selectedMentor || !date || !time) {
        setError("Please select a mentor, date, and time.");
        setIsBooking(false);
        return;
    }


    try {
      const token = localStorage.getItem("token"); // Get token from storage
      if (!token) {
          setError("You must be logged in to book a session.");
          setIsBooking(false);
          // Optional: Redirect to login page
          return;
      }

      // *** Use the new session booking endpoint ***
      const response = await axios.post(
        "http://localhost:5000/session/book", // <<< CHANGED ENDPOINT
        {
            mentorId: selectedMentor,
            date: date, // Should be in 'YYYY-MM-DD' format from input type="date"
            time: time   // Should be in 'HH:MM' format from input type="time"
        },
        {
            headers: { Authorization: `Bearer ${token}` } // Send token
        }
      );

      setSuccessMessage(response.data.message || "Session booked successfully!");
      // Reset form fields after successful booking
      setSelectedMentor("");
      setDate("");
      setTime("");

    } catch (error) {
      console.error("Error booking session:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Booking failed. The mentor might be unavailable at this time, or an error occurred.");
    } finally {
        setIsBooking(false);
    }
  };

  // Get today's date for min attribute in date input
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="booking-container">
      <h3>Book a Session</h3>
      {error && <p className="booking-error">{error}</p>}
      {successMessage && <p className="booking-success">{successMessage}</p>}

      <form onSubmit={handleBooking}>
        <div className="form-group">
          <label htmlFor="mentorSelect">Mentor:</label>
          <select
            id="mentorSelect"
            value={selectedMentor}
            onChange={(e) => setSelectedMentor(e.target.value)}
            required
            disabled={isLoadingMentors}
          >
            <option value="" disabled>
              {isLoadingMentors ? "Loading mentors..." : "--- Select a Mentor ---"}
            </option>
            {mentors.map((mentor) => (
              <option key={mentor._id} value={mentor._id}>
                {mentor.name} - {mentor.expertise}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dateSelect">Date:</label>
          <input
            id="dateSelect"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            min={today} // Prevent booking past dates
            className="book-input"
          />
        </div>

         <div className="form-group">
           <label htmlFor="timeSelect">Time:</label>
            <input
                id="timeSelect"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="book-input"
                // Optional: Add step attribute e.g., step="1800" for 30-min intervals
            />
         </div>

        <button type="submit" disabled={!selectedMentor || !date || !time || isBooking} className="book-button">
          {isBooking ? "Booking..." : "Book Session"}
        </button>
      </form>
    </div>
  );
};

export default BookSession;