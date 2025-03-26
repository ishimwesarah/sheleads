import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState({ name: "", email: "", profilePic: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setPreviewImage(storedUser.profilePic || "/default-profile.jpg");
    }
  }, []);

  // ✅ Handle File Selection & Show Preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview before upload
    }
  };

  // ✅ Upload Image to Cloudinary & Update User Profile
  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", selectedImage);
  
    try {
      const token = localStorage.getItem("authToken"); // ✅ Get Token from Local Storage
      if (!token) {
        alert("You are not logged in. Please log in again.");
        return;
      }
  
      const res = await axios.put(
        "http://localhost:5000/user/upload-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Upload successful:", res.data);
      const updatedUser = { ...user, profilePic: res.data.profilePic };
      setUser(updatedUser);
      setPreviewImage(res.data.profilePic); // ✅ Update UI
      localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ Save updated user data
      window.dispatchEvent(new Event("userUpdated")); // ✅ Trigger sidebar update
      setSelectedImage(null);
    } catch (error) {
      console.error("Error uploading image:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Upload failed. Please try again.");
    }
  };
  
  

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>

      <div className="profile-card">
        <img src={previewImage} alt="Profile" className="profile-image" />
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>

        <input type="file" onChange={handleFileChange} className="upload-input" />
        <button onClick={handleImageUpload} className="edit-btn">Save Profile Picture</button>
      </div>
    </div>
  );
};

export default ProfilePage;
