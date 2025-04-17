// src/components/BookSession.js (or wherever your file is)
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/book.css"; // Make sure this path is correct

const BookSession = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isLoadingMentors, setIsLoadingMentors] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // --- Fetch Mentors ---
  useEffect(() => {
    const fetchMentors = async () => {
      setIsLoadingMentors(true);
      setError(""); // Clear previous errors
      try {
        // *** VERIFY THIS ENDPOINT ***
        // Should match the route you use to GET all mentors (or available ones)
        const response = await axios.get("http://localhost:5000/mentor/getmentor");
        setMentors(response.data || []); // Handle potential empty response
      } catch (err) {
        console.error("Error fetching mentors:", err);
        setError(
          err.response?.data?.message || // Use backend error message if available
            "Failed to load mentors. Please try again later."
        );
        setMentors([]); // Ensure mentors is an empty array on error
      } finally {
        setIsLoadingMentors(false);
      }
    };
    fetchMentors();
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Handle Booking Submission ---
  const handleBooking = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Clear previous errors
    setSuccessMessage("");
    setIsBooking(true);

    // Basic validation
    if (!selectedMentor || !date || !time) {
      setError("Please select a mentor, date, and time.");
      setIsBooking(false);
      return;
    }

    try {
      // 1. Get Token from Local Storage
      const token = localStorage.getItem("token");
      console.log("Retrieved token for booking:", token); // <-- DEBUG LOG

      // Check if token exists
      if (!token) {
        setError(
          "Authentication token not found. Please log in again to book a session."
        );
        setIsBooking(false);
        // Optional: Redirect to login page here if desired
        // history.push('/login');
        return;
      }

      // 2. Prepare Axios Request Config with Authorization Header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Correct format
          "Content-Type": "application/json", // Good practice to include
        },
      };
      console.log("Sending booking request with config:", config); // <-- DEBUG LOG

      // 3. Prepare Request Body
      const bookingData = {
        mentorId: selectedMentor, // Ensure this matches backend expectation (mentorId vs mentor)
        date: date,
        time: time,
      };

      // 4. Make the POST request to the booking endpoint
      // *** VERIFY THIS ENDPOINT ***
      const response = await axios.post(
        "http://localhost:5000/session/book", // Use the session booking route
        bookingData,
        config // Pass the headers config
      );

      // 5. Handle Success
      setSuccessMessage(response.data.message || "Session booked successfully!");
      // Reset form fields
      setSelectedMentor("");
      setDate("");
      setTime("");
    } catch (err) {
      // 6. Handle Errors
      console.error("Error booking session:", err); // Log the full error object
      console.error("Error response details:", err.response); // Log the response details if available

      // Set user-friendly error message, prioritizing backend message
      setError(
        err.response?.data?.message || // Use specific backend error message
          err.message || // Use general Axios error message
          "Booking failed. An unexpected error occurred. Please try again." // Fallback
      );
    } finally {
      // 7. Reset booking loading state regardless of success or error
      setIsBooking(false);
    }
  };

  // Get today's date for the 'min' attribute in the date input
  const today = new Date().toISOString().split("T")[0];

  // --- Render Component ---
  return (
    <div className="booking-container">
      <h3>Book a Session</h3>

      {/* Display Error and Success Messages */}
      {error && <p className="booking-error">{error}</p>}
      {successMessage && <p className="booking-success">{successMessage}</p>}

      <form onSubmit={handleBooking}>
        {/* Mentor Selection Dropdown */}
        <div className="form-group">
          <label htmlFor="mentorSelect">Mentor:</label>
          <select
            id="mentorSelect"
            value={selectedMentor}
            onChange={(e) => setSelectedMentor(e.target.value)}
            required // HTML5 form validation
            disabled={isLoadingMentors || mentors.length === 0} // Disable while loading or if no mentors
          >
            <option value="" disabled>
              {isLoadingMentors
                ? "Loading mentors..."
                : mentors.length === 0
                ? "No mentors available"
                : "--- Select a Mentor ---"}
            </option>
            {/* Map over the mentors array to create options */}
            {mentors.map((mentor) => (
              <option key={mentor._id} value={mentor._id}>
                {mentor.name} - {mentor.expertise}
              </option>
            ))}
          </select>
        </div>

        {/* Date Input */}
        <div className="form-group">
          <label htmlFor="dateSelect">Date:</label>
          <input
            id="dateSelect"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required // HTML5 form validation
            min={today} // Prevent booking past dates
            className="book-input" // Apply your CSS class if needed
          />
        </div>

        {/* Time Input */}
        <div className="form-group">
          <label htmlFor="timeSelect">Time:</label>
          <input
            id="timeSelect"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required // HTML5 form validation
            className="book-input" // Apply your CSS class if needed
            // Optional: Add step attribute e.g., step="1800" for 30-min intervals
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedMentor || !date || !time || isBooking} // Disable if form invalid or booking
          className="book-button" // Apply your CSS class
        >
          {isBooking ? "Booking..." : "Book Session"}
        </button>
      </form>
    </div>
  );
};

export default BookSession;