import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/mentees.css";

const Mentees = () => {
    const [mentees, setMentees] = useState([]);

    useEffect(() => {
        const fetchMentees = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/mentees/mentorID");
                setMentees(response.data);
            } catch (error) {
                console.error("Error fetching mentees:", error);
            }
        };

        fetchMentees();
    }, []);

    return (
        <div className="mentees">
            <h2>My Mentees</h2>
            <ul>
                {mentees.map((mentee) => (
                    <li key={mentee.id}>
                        <h3>{mentee.name}</h3>
                        <p>Progress: {mentee.progress}%</p>
                        <a href={`mailto:${mentee.email}`}>Contact</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Mentees;
