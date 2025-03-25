import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AuthModal.css";
import logo from "../assets/logo.webp"; // Ensure the path matches your project

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const endpoint = isLogin ? "login" : "register";
      const res = await axios.post(`https://sheleadsbackend.onrender.com/user/${endpoint}`, data, {
        headers: { "Content-Type": "application/json" },
      });

      const { token, user } = res.data; // Get user & token from response
      localStorage.setItem("authToken", token); // Store token in localStorage
      localStorage.setItem("user", JSON.stringify(user)); // Store user info

      // Redirect based on role
      if (user.userRole === "admin") {
        navigate("/Dashboard");
      } else {
        navigate("/Dashbo");
      }
    } catch (error) {
      console.log("Login/Register Error:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logo} alt="She Leads Finance" className="auth-brand-logo" />
        <h2 className="auth-heading">{isLogin ? "Login to Your Account" : "Create an Account"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          {!isLogin && (
            <input type="text" placeholder="Full Name" {...register("name", { required: true })} className="auth-input" />
          )}
          <input type="email" placeholder="Email Address" {...register("email", { required: true })} className="auth-input" />
          <input type="password" placeholder="Password" {...register("password", { required: true })} className="auth-input" />
          <button type="submit" className="auth-submit-btn">{isLogin ? "Login" : "Register"}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
