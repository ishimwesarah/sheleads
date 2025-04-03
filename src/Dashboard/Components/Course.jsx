import React, { useEffect, useState, useRef } from "react"; // Import useRef
import axios from "axios";
import "../Styles/Coursepage.css";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  // Removed editing state for simplicity, focus on add
  // const [editingCourse, setEditingCourse] = useState(null);
  // const [updatedCourse, setUpdatedCourse] = useState({ ... });

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
    videoUrl: "", // Use a consistent name like videoUrl
  });
  const [imageFile, setImageFile] = useState(null); // State for image file object
  const [pdfFile, setPdfFile] = useState(null);   // State for PDF file object

  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for submission
  const [error, setError] = useState(''); // Error display

  // Refs for file inputs to allow resetting them
  const imageInputRef = useRef(null);
  const pdfInputRef = useRef(null);


  // Fetch courses
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await axios.get("http://localhost:5000/course/getCourse");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses.");
      } finally {
          setIsLoading(false);
      }
  }

  // Handle simple text input changes
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewCourse(prev => ({ ...prev, [name]: value }));
  }

  // Handle file input changes
  const handleImageFileChange = (e) => {
      setImageFile(e.target.files[0] || null);
  }
  const handlePdfFileChange = (e) => {
      setPdfFile(e.target.files[0] || null);
  }

  // Reset form state
  const resetForm = () => {
      setNewCourse({ title: "", description: "", instructor: "", duration: "", videoUrl: "" });
      setImageFile(null);
      setPdfFile(null);
      // Reset file input fields using refs
      if (imageInputRef.current) imageInputRef.current.value = "";
      if (pdfInputRef.current) pdfInputRef.current.value = "";
      setShowForm(false);
      setError('');
  }

  // Handle Add Course Form Submission
  const handleAddCourse = async (e) => {
    e.preventDefault(); // Prevent default page reload
    setError(''); // Clear previous errors
    setIsLoading(true);

    // Use FormData to send multipart data (including files)
    const formData = new FormData();

    // Append text fields and video URL
    formData.append("title", newCourse.title);
    formData.append("description", newCourse.description);
    formData.append("instructor", newCourse.instructor);
    formData.append("duration", newCourse.duration);
    formData.append("videoUrl", newCourse.videoUrl); // Ensure key matches backend expectation

    // Append files *only if they exist*
    if (imageFile) {
      formData.append("image", imageFile); // Key 'image' must match middleware field name
    }
    if (pdfFile) {
      formData.append("pdf", pdfFile); // Key 'pdf' must match middleware field name
    }

    try {
      // Send FormData to the backend createCourse endpoint
      const res = await axios.post(
          "http://localhost:5000/course/createCourse",
          formData,
          {
            // Axios automatically sets Content-Type to multipart/form-data
            // Add Authorization header if required by your backend
            // headers: { 'Authorization': `Bearer ${your_token}` }
          }
      );

      // Add the newly created course to the state
      setCourses(prevCourses => [...prevCourses, res.data]);
      resetForm(); // Reset form and hide it
      alert("Course added successfully!");

    } catch (err) {
      console.error("Error adding course:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to add course. Please check inputs.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Delete Course
  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    setError('');
    try {
      await axios.delete(`http://localhost:5000/course/deleteCourse/${id}`);
      setCourses(courses.filter(course => course._id !== id));
      alert("Course deleted successfully!");
    } catch (err) {
      console.error("Error deleting course:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to delete course.");
    }
  };

  return (
    <div className="courses-container">
      <div className="courses-content">

        <div className="courses-header">
          <h1>Manage Courses</h1>
          <button className="add-course-btn" onClick={() => { setShowForm(!showForm); if(showForm) resetForm(); /* Clear form on cancel */}}>
            {showForm ? "Cancel" : "+ Add Course"}
          </button>
        </div>

        {/* Display loading/error messages */}
        {isLoading && <p className="loading-message">Loading...</p>}
        {error && <p className="error-message">{error}</p>}


        {/* --- Add/Edit Course Form --- */}
        {showForm && (
          <form className="add-course-form" onSubmit={handleAddCourse}>
            {/* Use name attributes matching the state keys */}
            <input type="text" name="title" placeholder="Course Title" value={newCourse.title} onChange={handleInputChange} required />
            <textarea name="description" placeholder="Course Description" value={newCourse.description} onChange={handleInputChange} required />
            <input type="text" name="instructor" placeholder="Instructor" value={newCourse.instructor} onChange={handleInputChange} required />
            <input type="text" name="duration" placeholder="Duration (e.g., 4 weeks)" value={newCourse.duration} onChange={handleInputChange} required />

            <div className="form-group">
              <label htmlFor="imageFile">Course Image (Optional):</label>
              <input
                type="file"
                id="imageFile"
                ref={imageInputRef} // Add ref
                accept="image/*"
                onChange={handleImageFileChange}
               />
               {imageFile && <span className="file-name">{imageFile.name}</span>}
            </div>

             <div className="form-group">
              <label htmlFor="pdfFile">Course PDF (Optional):</label>
              <input
                type="file"
                id="pdfFile"
                ref={pdfInputRef} // Add ref
                accept="application/pdf"
                onChange={handlePdfFileChange}
                />
                 {pdfFile && <span className="file-name">{pdfFile.name}</span>}
            </div>

            <input type="text" name="videoUrl" placeholder="YouTube Video URL (Optional)" value={newCourse.videoUrl} onChange={handleInputChange} />

            <button type="submit" className="save-course-btn" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Course"}
            </button>
          </form>
        )}
        {/* --- End Form --- */}


        {/* --- Courses Table --- */}
        <div className="courses-main">
          {isLoading && courses.length === 0 && <p>Loading courses...</p> } {/* Initial load message */}
          <table className="courses-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                {/* <th>Description</th> */}
                <th>Instructor</th>
                <th>Duration</th>
                <th>Resources</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course._id}>
                    {/* Use course.image (Cloudinary URL), provide fallback */}
                    <td><img src={course.image || "/placeholder-image.png"} alt={course.title} className="course-image-thumbnail" /></td>
                    <td>{course.title}</td>
                    {/* <td>{course.description.substring(0, 50)}...</td> */}
                    <td>{course.instructor}</td>
                    <td>{course.duration}</td>
                    <td>
                      {/* Use course.pdf (Cloudinary URL) */}
                      {course.pdf && <a href={course.pdf} target="_blank" rel="noopener noreferrer" className="resource-link pdf-link">PDF</a>}
                      {/* Use course.video (YouTube URL) */}
                      {course.video && <a href={course.video} target="_blank" rel="noopener noreferrer" className="resource-link video-link">Video</a>}
                      {!course.pdf && !course.video && <span>N/A</span>}
                    </td>
                    <td>
                      {/* TODO: Add Edit Button Functionality later */}
                      {/* <button className="edit-btn" onClick={() => handleEditClick(course)}>Edit</button> */}
                      <button className="delete-btn" onClick={() => handleDeleteCourse(course._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                 !isLoading && ( // Only show "No courses" if not loading
                    <tr>
                    <td colSpan="6">No courses found. Add one above!</td>
                    </tr>
                 )
              )}
            </tbody>
          </table>
        </div>
        {/* --- End Courses Table --- */}

      </div>
    </div>
  );
};

export default CoursesPage;