import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/coursedetails.css";

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/course/getCourseById/${id}`);
                setCourse(response.data);
            } catch (error) {
                console.error("Error fetching Course:", error);
            }
        };
        fetchCourse();
    }, [id]);

    if (!course) {
        return <p>Loading...</p>;
    }

    return (
        <section className="course-details">
            <h1>{course.title}</h1>
            <h3>{course.instructor}</h3>
            <h5>{course.duration}</h5>
            <img src={course.image}  className="course-main-image" />
            <p>{course.description}</p>
        </section>
    );
};

export default CourseDetails;
