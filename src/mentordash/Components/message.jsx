import React, { useEffect, useState } from "react";
import axios from "axios";
// import "../styles/messages.css";

const Messages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/messages/mentorID");
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="messages">
            <h2>Messages</h2>
            {messages.length === 0 ? <p>No new messages.</p> : (
                <ul>
                    {messages.map((message) => (
                        <li key={message.id}>
                            <strong>{message.senderName}:</strong> {message.content}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Messages;
