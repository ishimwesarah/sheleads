import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/mprofile.css"; // Add styles as needed

const MentorProfile = () => {
  const [mentor, setMentor] = useState(null); // Store mentor's data
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState(""); // For updating name
  const [newProfilePic, setNewProfilePic] = useState(null); // For updating profile picture

  useEffect(() => {
    const fetchMentorProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get("http://localhost:5000/mentor/getmentor", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMentor(res.data);
        setNewName(res.data.name); // Set the current name to the input field
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mentor profile:", error);
      }
    };
    fetchMentorProfile();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("name", newName);
      if (newProfilePic) {
        formData.append("profilePic", newProfilePic);
      }

      await axios.put("http://localhost:5000/mentor/updateProfile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile updated successfully");
      setMentor({ ...mentor, name: newName, profilePic: URL.createObjectURL(newProfilePic) });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFileChange = (event) => {
    setNewProfilePic(event.target.files[0]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mentor-profile-container">
      <h1>Your Profile</h1>
      <div className="mentor-profile-details">
        <div className="mentor-profile-pic">
          <img
            src={mentor.profilePic || "default-profile-pic.jpg"}
            alt="Profile"
            className="profile-img"
          />
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="mentor-profile-info">
          <div>
            <strong>Name:</strong>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div>
            <strong>Email:</strong>
            <p>{mentor.email}</p>
          </div>
          <div>
            <strong>Role:</strong>
            <p>{mentor.userRole || "Mentor"}</p>
          </div>
          <button onClick={handleProfileUpdate} className="update-profile-btn">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
