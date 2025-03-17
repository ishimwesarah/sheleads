import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Coursepage.css";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [updatedCourse, setUpdatedCourse] = useState({ title: "", description: "", instructor: "", duration: "" });

  // New course state
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
    image: "",
  });

  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  // Fetch all courses from the database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/course/getCourse");
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Handle delete course
  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(`http://localhost:5000/course/deleteCourse/${id}`);
      setCourses(courses.filter(course => course._id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Handle edit button click
  const handleEditClick = (course) => {
    setEditingCourse(course._id);
    setUpdatedCourse({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      duration: course.duration,
    });
  };

  // Handle update course
  const handleUpdateCourse = async (id) => {
    try {
      await axios.put(`http://localhost:5000/course/updateCourse/${id}`, updatedCourse);
      setCourses(courses.map(course => (course._id === id ? { ...course, ...updatedCourse } : course)));
      setEditingCourse(null);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // Handle adding a new course
  const handleAddCourse = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/course/createCourse", newCourse);
      setCourses([...courses, res.data]); // Add new course to the state
      setShowForm(false); // Hide form after adding
      setNewCourse({ title: "", description: "", instructor: "", duration: "", image: "" }); // Reset form
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <div className="courses-container">
      <div className="courses-content">
        
        {/* ✅ Add Course Button to Show/Hide Form */}
        <div className="courses-header">
          <h1>Manage Courses</h1>
          <button className="add-course-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Add Course"}
          </button>
        </div>

        {/* ✅ New Course Form (Toggles Visibility) */}
        {showForm && (
          <form className="add-course-form" onSubmit={handleAddCourse}>
            <input
              type="text"
              placeholder="Course Title"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Course Description"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Instructor"
              value={newCourse.instructor}
              onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Duration"
              value={newCourse.duration}
              onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={newCourse.image}
              onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
            />
            <button type="submit" className="save-course-btn">Save Course</button>
          </form>
        )}

        <div className="courses-main">
          <table className="courses-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Instructor</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course._id}>
                    <td>
                      <img src={course.image || "/default-course.jpg"} alt="Course" className="course-image" />
                    </td>
                    <td>{editingCourse === course._id ? <input type="text" value={updatedCourse.title} onChange={(e) => setUpdatedCourse({ ...updatedCourse, title: e.target.value })} /> : course.title}</td>
                    <td>{editingCourse === course._id ? <textarea value={updatedCourse.description} onChange={(e) => setUpdatedCourse({ ...updatedCourse, description: e.target.value })} /> : course.description}</td>
                    <td>{editingCourse === course._id ? <input type="text" value={updatedCourse.instructor} onChange={(e) => setUpdatedCourse({ ...updatedCourse, instructor: e.target.value })} /> : course.instructor}</td>
                    <td>{editingCourse === course._id ? <input type="text" value={updatedCourse.duration} onChange={(e) => setUpdatedCourse({ ...updatedCourse, duration: e.target.value })} /> : course.duration}</td>
                    <td>
                      {editingCourse === course._id ? (
                        <button className="update-btn" onClick={() => handleUpdateCourse(course._id)}>Save</button>
                      ) : (
                        <button className="edit-btn" onClick={() => handleEditClick(course)}>Edit</button>
                      )}
                      <button className="delete-btn" onClick={() => handleDeleteCourse(course._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No courses found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
