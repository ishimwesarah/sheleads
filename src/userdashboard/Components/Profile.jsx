import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState({ name: "", email: "", profilePic: "", _id: "" });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setUser((prevUser) => ({ ...prevUser, profilePic: URL.createObjectURL(file) })); // ✅ Preview image before upload
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const res = await axios.put(
        `http://localhost:5000/user/upload-profile/${user._id}`, // ✅ Fixed missing `id`
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const updatedUser = { ...user, profilePic: res.data.profilePic };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ Save to localStorage
      window.dispatchEvent(new Event("userUpdated")); // ✅ Update sidebar
      setSelectedImage(null); // ✅ Clear selected image after upload
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>

      <div className="profile-card">
        <img
          src={user.profilePic || "/default-profile.jpg"} // ✅ Updated to show preview before upload
          alt="Profile"
          className="profile-image"
        />
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Role: Member</p>

        <input type="file" onChange={handleFileChange} className="upload-input" />
        <button onClick={handleImageUpload} className="edit-btn">Save Profile Picture</button>
      </div>
    </div>
  );
};

export default ProfilePage;
