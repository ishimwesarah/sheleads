import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/book.css"

const BookMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [menteeInfo, setMenteeInfo] = useState({ menteeName: "", menteeEmail: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/mentor/available")
      .then((res) => setMentors(res.data))
      .catch((err) => console.error("Error fetching mentors:", err));
  }, []);

  const fetchAvailableSlots = () => {
    axios.get(`http://localhost:5000/mentor/available`)
      .then((res) => {
        setSelectedMentor(res.data);
        setAvailableSlots(res.data.availableSlots);
      })
      .catch((err) => console.error("Error fetching availability:", err));
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedSlot) return alert("Please select a time slot.");

    try {
      const bookingData = { 
        mentorId: selectedMentor._id, 
        ...menteeInfo, 
        date: selectedSlot.date, 
        time: selectedSlot.time 
      };
      await axios.post("http://localhost:5000/booking/book", bookingData);
      alert("Booking successful!");
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="booking-container">
      <h2>Book a Mentor</h2>
      <div className="mentor-list">
        {mentors.map((mentor) => (
          <div key={mentor._id} className="mentor-card" onClick={() => fetchAvailableSlots(mentor._id)}>
            <img src={mentor.profilePic} alt={mentor.name} className="mentor-pic" />
            <h3>{mentor.name}</h3>
            <p>{mentor.expertise}</p>
          </div>
        ))}
      </div>

      {selectedMentor && (
        <div className="availability-section">
          <h3>Available Slots for {selectedMentor.name}</h3>
          <div className="slots-grid">
            {availableSlots.map((slot, index) => (
              <button key={index} onClick={() => setSelectedSlot(slot)} className={selectedSlot === slot ? "selected" : ""}>
                {slot.date} - {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedSlot && (
        <form onSubmit={handleBooking} className="booking-form">
          <input type="text" name="menteeName" placeholder="Your Name" onChange={(e) => setMenteeInfo({...menteeInfo, menteeName: e.target.value})} required />
          <input type="email" name="menteeEmail" placeholder="Your Email" onChange={(e) => setMenteeInfo({...menteeInfo, menteeEmail: e.target.value})} required />
          <button type="submit">Confirm Booking</button>
        </form>
      )}
    </div>
  );
};

export default BookMentor;