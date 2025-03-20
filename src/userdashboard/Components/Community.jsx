import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaRegThumbsUp, FaReply, FaTrashAlt } from "react-icons/fa";
import "../styles/Community.css";

const Community = () => {
  const { register, handleSubmit, reset } = useForm();
  const [messages, setMessages] = useState([]); // Ensure messages always starts as an array
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("https://sheleadsbackend.onrender.com/community/getpost");
        setMessages(Array.isArray(res.data) ? res.data : []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]); // Fallback to empty array
      }
    };
    fetchMessages();
  }, []);

  // Send message
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
        "https://sheleadsbackend.onrender.com/community/Createpost",
        newMessage,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );

      setMessages([...messages, res.data]);
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Like message
  const likeMessage = async (id) => {
    try {
      const res = await axios.put(
        `https://sheleadsbackend.onrender.com/community/like/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );

      setMessages(
        messages.map((msg) =>
          msg._id === id ? { ...msg, likes: res.data.likes } : msg
        )
      );
    } catch (error) {
      console.error("Error liking message:", error);
    }
  };

  // Delete message
  const deleteMessage = async (id) => {
    try {
      await axios.delete(`https://sheleadsbackend.onrender.com/community/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // Reply to message
  const replyMessage = async (id, replyText) => {
    if (!user) {
      alert("You must be logged in to reply.");
      return;
    }

    try {
      const res = await axios.post(
        `https://sheleadsbackend.onrender.com/community/reply/${id}`,
        { text: replyText },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );

      setMessages(
        messages.map((msg) =>
          msg._id === id ? { ...msg, replies: res.data.replies } : msg
        )
      );
    } catch (error) {
      console.error("Error replying to message:", error.response?.data || error);
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
                {user && user._id === msg.userId && (
                  <button onClick={() => deleteMessage(msg._id)}>
                    <FaTrashAlt /> Delete
                  </button>
                )}
              </div>

              {/* Ensure replies exist before mapping */}
              {msg.replies && Array.isArray(msg.replies) && msg.replies.length > 0 && (
                <div className="replies">
                  <h4>Replies</h4>
                  {msg.replies.map((reply, index) => (
                    <div key={index} className="reply">
                      <div className="reply-header">
                        <span className="reply-user">{reply.userName}</span>
                        <span className="reply-time">{new Date(reply.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="reply-text">{reply.text}</p>
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

      {/* Input for sending messages */}
      {user ? (
        <form className="chat-input" onSubmit={handleSubmit(onSend)}>
          <input
            type="text"
            placeholder="Type your message..."
            {...register("content", { required: true })}
          />
          <button type="submit">Send</button>
        </form>
      ) : (
        <p className="login-message">You must be logged in to send messages.</p>
      )}
    </div>
  );
};

export default Community;
