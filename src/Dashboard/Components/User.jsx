import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/User.css";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState(""); // Track the selected role for update

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user/getuser");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/user/deleteUser/${id}`);
      setUsers(users.filter(user => user._id !== id)); // Remove user from state
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdateRole = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/user/updateRole/${id}`, {
        userRole: selectedRole, // Send the new role
      });
      alert("User role updated successfully");
      setUsers(users.map(user => user._id === id ? { ...user, userRole: selectedRole } : user)); // Update the state with the new role
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Error updating role");
    }
  };

  return (
    <div className="users-container">
      <div className="users-content">
        <div className="users-main">
          <h1>Registered Users</h1>
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Registered On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.userRole || "Member"}
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="role-select"
                      >
                        <option value="admin">Admin</option>
                        <option value="mentor">mentor</option>
                        <option value="member">user</option>
                      </select>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="update-btn" onClick={() => handleUpdateRole(user._id)}>
                        Update Role
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteUser(user._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
