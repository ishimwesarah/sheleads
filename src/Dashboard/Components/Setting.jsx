import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Setting.css";
import Sidebar from "./Sidebar";

const AdminSettings = () => {
  const [admin, setAdmin] = useState({ name: "", email: "", profilePic: "" });
  const [newPassword, setNewPassword] = useState("");
  const [settings, setSettings] = useState({ allowRegistration: true });

  useEffect(() => {
    // Fetch admin details
    const fetchAdminDetails = async () => {
      try {
        const res = await axios.get("https://sheleadsbackend.onrender.com/admin/details", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        setAdmin(res.data);
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };

    fetchAdminDetails();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      await axios.put(
        "https://sheleadsbackend.onrender.com/admin/update",
        { name: admin.name, email: admin.email, profilePic: admin.profilePic },
        { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handlePasswordChange = async () => {
    try {
      await axios.put(
        "https://sheleadsbackend.onrender.com/admin/change-password",
        { password: newPassword },
        { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
      );
      alert("Password changed successfully!");
      setNewPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const handleSettingsChange = async () => {
    try {
      await axios.put(
        "https://sheleadsbackend.onrender.com/admin/settings",
        settings,
        { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
      );
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <div className="admin-settings-container">
      <Sidebar />
      <div className="admin-settings-content">
        <h1>Admin Settings</h1>

        {/* ✅ Profile Settings */}
        <div className="settings-section">
          <h2>Profile Settings</h2>
          <div className="profile-details">
            <label>Name</label>
            <input type="text" value={admin.name} onChange={(e) => setAdmin({ ...admin, name: e.target.value })} />
            
            <label>Email</label>
            <input type="email" value={admin.email} onChange={(e) => setAdmin({ ...admin, email: e.target.value })} />
            
            <label>Profile Picture</label>
            <input type="text" placeholder="Image URL" value={admin.profilePic} onChange={(e) => setAdmin({ ...admin, profilePic: e.target.value })} />
            
            <button className="save-btn" onClick={handleProfileUpdate}>Save Changes</button>
          </div>
        </div>

        {/* ✅ Security Settings */}
        <div className="settings-section">
          <h2>Security Settings</h2>
          <label>New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <button className="save-btn" onClick={handlePasswordChange}>Change Password</button>
        </div>

        {/* ✅ Platform Settings */}
        <div className="settings-section">
          <h2>Platform Settings</h2>
          <label>
            <input
              type="checkbox"
              checked={settings.allowRegistration}
              onChange={() => setSettings({ ...settings, allowRegistration: !settings.allowRegistration })}
            />
            Allow User Registration
          </label>
          <button className="save-btn" onClick={handleSettingsChange}>Save Settings</button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
