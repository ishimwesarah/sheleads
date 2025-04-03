import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/User.css"; // Make sure this path is correct

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [roleSelections, setRoleSelections] = useState({});

  // --- State for Add User Form ---
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    password: "",
    userRole: "user", // Default role
  });
  const [addError, setAddError] = useState(''); // State for add user error messages
  // --- End State for Add User Form ---

  useEffect(() => {
    fetchUsers(); // Fetch users on initial load
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/getuser");
      setUsers(res.data);
      setAddError(''); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching users:", error);
      setAddError("Failed to load users.");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/user/deleteUser/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
      alert("Failed to delete user. " + (error.response?.data?.message || ''));
    }
  };

  const handleRoleChange = (userId, selectedValue) => {
    setRoleSelections((prevSelections) => ({
      ...prevSelections,
      [userId]: selectedValue,
    }));
  };

  const handleUpdateRole = async (userId) => {
    const newRole = roleSelections[userId];
    if (!newRole) {
      alert("Please select a role from the dropdown first.");
      return;
    }
    const payload = { userRole: newRole };
    if (newRole === 'mentor') {
        const expertise = prompt("Enter mentor expertise (required for promotion):");
        if (!expertise) {
            alert("Mentor expertise is required to assign this role.");
            return;
        }
        payload.expertise = expertise;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/user/updateRole/${userId}`,
        payload
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...response.data.user } : user // Use updated user from response
        )
      );
      setRoleSelections((prevSelections) => {
        const newState = { ...prevSelections };
        delete newState[userId];
        return newState;
      });
      alert(`Role updated successfully!`);
    } catch (error) {
      console.error("Error updating role:", error.response?.data || error.message);
      alert("Failed to update role. " + (error.response?.data?.message || ''));
    }
  };

  // --- Functions for Add User Form ---
  const handleNewUserInputChange = (event) => {
    const { name, value } = event.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setAddError(''); // Clear previous errors

    // Basic validation
    if (!newUserData.name || !newUserData.email || !newUserData.password) {
        setAddError("Name, Email, and Password are required.");
        return;
    }

    try {
        console.log("Registering user with data:", newUserData);
        // Use the register endpoint - ensure the URL is correct
        const response = await axios.post("http://localhost:5000/user/register", newUserData);

        console.log("Registration successful:", response.data);

        // Add the new user to the state
        // Make sure the backend returns the user object compatible with your table structure
        // The register endpoint should return something like { user: { _id, name, email, userRole, createdAt, ...} }
        const registeredUser = response.data.user;
        if (registeredUser && registeredUser._id) {
           setUsers(prevUsers => [...prevUsers, registeredUser]);
        } else {
           // If backend doesn't return user, fetch all users again (less efficient)
           fetchUsers();
        }


        // Reset form and hide it
        setNewUserData({ name: "", email: "", password: "", userRole: "user" });
        setIsAddFormVisible(false);
        alert("User registered successfully!");

    } catch (error) {
        console.error("Error registering user:", error.response?.data || error.message);
        // Display specific error from backend if available
        setAddError(error.response?.data?.message || "Failed to register user. Please try again.");
    }
  };
  // --- End Functions for Add User Form ---


  return (
    <div className="users-container">
      <div className="users-content">
        <div className="users-main">
          <h1>Registered Users</h1>

          {/* --- Add User Button --- */}
          <button
            className="add-user-btn"
            onClick={() => setIsAddFormVisible(!isAddFormVisible)} // Toggle form visibility
          >
            {isAddFormVisible ? "Cancel Adding User" : "Add New User"}
          </button>
          {/* --- End Add User Button --- */}


          {/* --- Add User Form (Conditional Rendering) --- */}
          {isAddFormVisible && (
            <div className="add-user-form-container">
              <h2>Add New User</h2>
              {addError && <p className="error-message">{addError}</p>} {/* Display errors */}
              <form onSubmit={handleRegisterSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newUserData.name}
                    onChange={handleNewUserInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newUserData.email}
                    onChange={handleNewUserInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password" // Use password type
                    id="password"
                    name="password"
                    value={newUserData.password}
                    onChange={handleNewUserInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="userRole">Role:</label>
                  <select
                    id="userRole"
                    name="userRole"
                    value={newUserData.userRole}
                    onChange={handleNewUserInputChange}
                  >
                    <option value="user">User</option>
                    <option value="mentor">Mentor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-btn">Register User</button>
                    <button type="button" className="cancel-btn" onClick={() => { setIsAddFormVisible(false); setAddError(''); }}>Cancel</button> {/* Added explicit cancel */}
                </div>
              </form>
            </div>
          )}
          {/* --- End Add User Form --- */}


          {/* --- Existing Users Table --- */}
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Current Role</th>
                <th>Change Role To</th>
                <th>Registered On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  // Make sure user and user._id exist before rendering row
                  user && user._id ? (
                    <tr key={user._id}>
                        <td>{user.name || 'N/A'}</td>
                        <td>{user.email || 'N/A'}</td>
                        <td>{user.userRole || "N/A"}</td>
                        <td>
                        <select
                            value={roleSelections[user._id] || ""}
                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                            className="role-select"
                        >
                            <option value="">-- Select New Role --</option>
                            <option value="user">User</option>
                            <option value="mentor">Mentor</option>
                            <option value="admin">Admin</option>
                        </select>
                        </td>
                        {/* Ensure createdAt exists and is valid */}
                        <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                        <td>
                        <button
                            className="update-btn"
                            onClick={() => handleUpdateRole(user._id)}
                            disabled={!roleSelections[user._id]}
                        >
                            Update Role
                        </button>
                        <button
                            className="delete-btn"
                            onClick={() => handleDeleteUser(user._id)}
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                  ) : null // Don't render row if user data is incomplete
                ))
              ) : (
                <tr>
                  <td colSpan="6">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
          {/* --- End Existing Users Table --- */}

        </div>
      </div>
    </div>
  );
};

export default UsersPage;