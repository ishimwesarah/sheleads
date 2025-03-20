import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/User.css";



const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://sheleadsbackend.onrender.com/user/getuser");
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
      await axios.delete(`https://sheleadsbackend.onrender.com/user/deleteUser/${id}`);
      setUsers(users.filter(user => user._id !== id)); // Remove user from state
    } catch (error) {
      console.error("Error deleting user:", error);
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
                    <td>{user.userRole || "Member"}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
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
