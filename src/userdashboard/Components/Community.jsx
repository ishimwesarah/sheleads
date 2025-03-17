import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaRegThumbsUp, FaReply, FaTrashAlt, FaUndo } from "react-icons/fa";
import "../styles/Community.css";

const Community = () => {
  const { register, handleSubmit, reset } = useForm();
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/community/getpost");
        setMessages(res.data);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  const onSend = async (data) => {
    if (!user) {
      alert("You must be logged in to send a message.");
      return;
    }

    try {
      const newMessage = {
        userId: user._id,
        userName: user.name,
        content: data.content,
        likes: 0,
        replies: [],
      };

      const res = await axios.post(
        "http://localhost:5000/community/Createpost",
        newMessage,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );

      setMessages([...messages, res.data]);
      reset();
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  const likeMessage = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/community/like/${id}`,
        {}, 
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );
  
      // Update the state with the new like count
      setMessages(
        messages.map((msg) =>
          msg._id === id ? { ...msg, likes: res.data.likes } : msg
        )
      );
    } catch (error) {
      console.log("Error toggling like:", error);
    }
  };
  
  
  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/community/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (error) {
      console.log("Error deleting message:", error);
    }
  };
  const replyMessage = async (id, replyText) => {
    if (!user) {
      alert("You must be logged in to reply.");
      return;
    }
  
    try {
      const res = await axios.post(
        `http://localhost:5000/community/reply/${id}`,
        { text: replyText },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );
  
      // Update the state with the new replies
      setMessages(
        messages.map((msg) =>
          msg._id === id ? { ...msg, replies: res.data.replies } : msg
        )
      );
    } catch (error) {
      console.log("Error replying to message:", error);
    }
  };
  

  return (
    <div className="community-container">
      <h1>Community Chat</h1>
      <p>Connect, share insights, and engage with others.</p>

      <div className="chat-box">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className="message">
              <div className="message-header">
                <strong>{msg.userName}</strong>
              </div>
              <p>{msg.content}</p>
              <div className="message-actions">
                <button onClick={() => likeMessage(msg._id)}>
                  <FaRegThumbsUp /> {msg.likes}
                </button>
                <button onClick={() => replyMessage(msg._id, prompt("Enter your reply:"))}>
  <FaReply /> Reply
</button>
{msg.replies && msg.replies.length > 0 && (
  <div className="replies">
    {msg.replies.map((reply, index) => (
      <div key={index} className="reply">
        <strong>{reply.userName}:</strong> {reply.text}
      </div>
    ))}
  </div>
)}

                {user && user._id === msg.userId && (
                  <button onClick={() => deleteMessage(msg._id)}>
                    <FaTrashAlt /> Delete
                  </button>
                )}
              </div>
              {msg.replies && Array.isArray(msg.replies) && msg.replies.length > 0 && (
                <div className="replies">
                  {msg.replies.map((reply, index) => (
                    <div key={index} className="reply">
                      <strong>{reply.user}:</strong> {reply.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>

      {user ? (
        <form className="chat-input" onSubmit={handleSubmit(onSend)}>
          <input type="text" placeholder="Type your message..." {...register("content", { required: true })} />
          <button type="submit">Send</button>
        </form>
      ) : (
        <p className="login-message">You must be logged in to send messages.</p>
      )}
    </div>
  );
};

export default Community;
