import React, { useState,useEffect  } from "react";
import "../styles/Community.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate
import axios from "axios";  // ✅ Import axios

const Community = () => {
  const { register, handleSubmit } = useForm();
  const [messages, setMessages] = useState([]); 
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/community/getpost");
        setMessages(res.data);  // ✅ Store fetched messages
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const onSend = async (data) => {
    try {
      const { content } = data;
      const formData = new FormData();
     
      formData.append("content", content);

      const res = await axios.post("http://localhost:5000/community/Createpost", formData, {
        headers: { "Content-Type": "application/json" },
      
      });

      console.log(res.data);
      // Redirect to another page if needed
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/community/delete/${id}`);
      setMessages(messages.filter((msg) => msg._id !== id)); // Remove from state
    } catch (error) {
      console.log("Error deleting message:", error);
    }
  };
  return (
    <div className="community-container">
      <h1>Community Chat</h1>
      <p>Connect, share insights, and learn from fellow members.</p>

      <div className="chat-box">
      {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className="message">
              <p>{msg.content}</p>
              <button onClick={() => deleteMessage(msg._id)}>Delete</button>  {/* ✅ Delete button */}
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>

      <form className="chat-input" onSubmit={handleSubmit(onSend)}>  {/* ✅ Fixed */}
        <input
          type="text"
          placeholder="Type your message..."
          {...register("content", { required: true })}  
        />
        <button type="submit">Send</button>  
      </form>
    </div>
  );
};

export default Community;
