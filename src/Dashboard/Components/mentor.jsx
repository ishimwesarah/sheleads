import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/mentor.css";

const MentorManagement = () => {
  const [mentors, setMentors] = useState([]);
  const [showForm, setShowForm] = useState(false); // ✅ State to toggle form visibility
  const [newMentor, setNewMentor] = useState({
    name: "",
    email: "",
    expertise: "",
    bio: "",
    availability: true,
    availableDays: [],
    availableTime: "",
    image: null,
  });

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/mentor/getmentor");
      setMentors(res.data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  const handleChange = (e) => {
    setNewMentor({ ...newMentor, [e.target.name]: e.target.value });
  };

  const handleDaysChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setNewMentor({ ...newMentor, availableDays: options });
  };

  const handleFileChange = (e) => {
    setNewMentor({ ...newMentor, image: e.target.files[0] });
  };

  const addMentor = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in newMentor) {
      formData.append(key, newMentor[key]);
    }

    try {
      await axios.post("https://sheleadsbackend.onrender.com/mentor/addmentor", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchMentors();
      setNewMentor({ name: "", email: "", expertise: "", bio: "", availability: true, availableDays: [], availableTime: "", image: null });
      setShowForm(false); // ✅ Hide the form after submission
    } catch (error) {
      console.error("Error adding mentor:", error);
    }
  };

  return (
    <div className="mentor-container">
      <h2>Manage Mentors</h2>

      {/* ✅ Toggle Button to Show/Hide Form */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Mentor"}
      </button>

      {/* ✅ Show Form Only When `showForm` is True */}
      {showForm && (
        <form onSubmit={addMentor} className="mentor-form">
          <input type="text" name="name" placeholder="Name" value={newMentor.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={newMentor.email} onChange={handleChange} required />
          <input type="text" name="expertise" placeholder="Expertise" value={newMentor.expertise} onChange={handleChange} required />
          <textarea name="bio" placeholder="Bio" value={newMentor.bio} onChange={handleChange}></textarea>

          <label>Availability Days:</label>
          <select name="availableDays" multiple onChange={handleDaysChange} required>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>

          <label>Available Time:</label>
          <input type="text" name="availableTime" placeholder="e.g., 10:00 AM - 3:00 PM" value={newMentor.availableTime} onChange={handleChange} required />

          <input type="file" name="image" onChange={handleFileChange} required />
          <button type="submit">Submit</button>
        </form>
      )}

      <h3>Mentor List</h3>
      <div className="mentor-list">
        {mentors.map((mentor) => (
          <div key={mentor._id} className="mentor-card">
            <img src={mentor.profilePic || "/default-avatar.jpg"} alt={mentor.name} />
            <h4>{mentor.name}</h4>           
            <p><strong>Email:</strong> {mentor.email}</p>
            <p><strong>Expertise:</strong> {mentor.expertise}</p>
            <p><strong>Availability:</strong> {mentor.availability ? "Available" : "Not Available"}</p>
            <p><strong>Days:</strong> {mentor.availableDays.join(", ")}</p>
            <p><strong>Time:</strong> {mentor.availableTime}</p>
            <p><strong>Bio:</strong> {mentor.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorManagement;
