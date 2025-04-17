import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/mentor.css"; // Assuming you have styles for the delete button here too

const MentorManagement = () => {
  const [mentors, setMentors] = useState([]);
  const [showForm, setShowForm] = useState(false);
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
  const [error, setError] = useState(''); // State for displaying errors
  const [isLoading, setIsLoading] = useState(false); // Loading state for operations

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.get("http://localhost:5000/mentor/getmentor");
      setMentors(res.data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
      setError("Failed to fetch mentors.");
    } finally {
      setIsLoading(false);
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
    setError('');
    setIsLoading(true);
    const formData = new FormData();
    // Append text fields
    formData.append("name", newMentor.name);
    formData.append("email", newMentor.email);
    formData.append("expertise", newMentor.expertise);
    formData.append("bio", newMentor.bio);
    formData.append("availability", newMentor.availability);
    formData.append("availableTime", newMentor.availableTime);
    // Append array correctly
    newMentor.availableDays.forEach(day => formData.append("availableDays[]", day)); // Important for backend array parsing
    // Append file if it exists
    if (newMentor.image) {
        formData.append("image", newMentor.image); // Key 'image' should match backend middleware field name
    }


    try {
      await axios.post("http://localhost:5000/mentor/addmentor", formData, {
        // Axios will set Content-Type to multipart/form-data automatically with FormData
      });
      fetchMentors(); // Re-fetch the list to include the new mentor
      // Reset form state
      setNewMentor({ name: "", email: "", expertise: "", bio: "", availability: true, availableDays: [], availableTime: "", image: null });
      setShowForm(false);
      alert("Mentor added successfully!");
    } catch (error) {
      console.error("Error adding mentor:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to add mentor.");
    } finally {
        setIsLoading(false);
    }
  };

  // --- NEW: Delete Handler Function ---
  const handleDeleteMentor = async (mentorId) => {
    // Ask for confirmation before deleting
    if (!window.confirm(`Are you sure you want to delete this mentor? This action cannot be undone.`)) {
      return; // Stop if user clicks 'Cancel'
    }

    setError('');
    setIsLoading(true); // Optional: Show loading indicator during delete

    try {
      // Make sure the endpoint matches your backend route (e.g., using deleteMentor controller)
      await axios.delete(`http://localhost:5000/mentor/deleteMentor/${mentorId}`); // <<< USE TEMPLATE LITERAL FOR ID

      // Update the state to remove the deleted mentor *without* re-fetching
      setMentors(prevMentors => prevMentors.filter(mentor => mentor._id !== mentorId));
      alert("Mentor deleted successfully!");

    } catch (error) {
      console.error("Error deleting mentor:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to delete mentor.");
    } finally {
      setIsLoading(false);
    }
  };
  // --- End Delete Handler ---

  return (
    <div className="mentor-container">
      <h2>Manage Mentors</h2>

      {/* Add/Hide Form Button */}
      <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel Adding Mentor" : "+ Add New Mentor"}
      </button>

      {/* Display loading/error messages */}
       {isLoading && <p className="loading-message">Processing...</p>}
       {error && <p className="error-message">{error}</p>}


      {/* Add Mentor Form */}
      {showForm && (
        <form onSubmit={addMentor} className="mentor-form">
          {/* ... (form inputs remain the same) ... */}
           <input type="text" name="name" placeholder="Name" value={newMentor.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={newMentor.email} onChange={handleChange} required />
          <input type="text" name="expertise" placeholder="Expertise" value={newMentor.expertise} onChange={handleChange} required />
          <textarea name="bio" placeholder="Bio" value={newMentor.bio} onChange={handleChange}></textarea>

          <label>Availability Days:</label>
          <select name="availableDays" multiple value={newMentor.availableDays} onChange={handleDaysChange} required>
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

          <label>Profile Picture (Optional):</label>
          <input type="file" name="image" onChange={handleFileChange} accept="image/*"/> {/* Allow only images */}
          <button type="submit" className="submit-mentor-btn" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Mentor"}
          </button>
        </form>
      )}

      <h3>Mentor List</h3>
      {isLoading && mentors.length === 0 && <p>Loading mentors...</p>} {/* Initial load message */}
      {!isLoading && !error && mentors.length === 0 && <p>No mentors found. Add one using the button above.</p>}

      <div className="mentor-list">
        {mentors.map((mentor) => (
          <div key={mentor._id} className="mentor-card">
            <img src={mentor.profilePic || "/default-avatar.png"} alt={mentor.name} className="mentor-avatar"/> {/* Added class */}
            <h4>{mentor.name}</h4>
            <p><strong>Email:</strong> {mentor.email}</p>
            <p><strong>Expertise:</strong> {mentor.expertise}</p>
            <p><strong>Availability:</strong> {mentor.availability ? "Available" : "Not Available"}</p>
            <p><strong>Days:</strong> {mentor.availableDays.join(", ")}</p>
            <p><strong>Time:</strong> {mentor.availableTime}</p>
            <p><strong>Bio:</strong> {mentor.bio || "N/A"}</p> {/* Show N/A if bio is empty */}

            {/* --- Add Action Buttons --- */}
            <div className="mentor-actions">
                {/* Optional: Add Edit Button Later */}
                {/* <button className="edit-mentor-btn">Edit</button> */}

                {/* --- Delete Button --- */}
                <button
                    className="delete-mentor-btn"
                    onClick={() => handleDeleteMentor(mentor._id)} // Pass mentor ID here
                    disabled={isLoading} // Disable while another operation is in progress
                >
                    Delete
                </button>
            </div>
             {/* --- End Action Buttons --- */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorManagement;