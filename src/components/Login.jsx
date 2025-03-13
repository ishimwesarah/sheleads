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

  const onLoginSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/user/login", data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const onRegisterSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/user/register", data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logo} alt="She Leads Finance" className="auth-brand-logo" />
        <h2 className="auth-heading">{isLogin ? "Login to Your Account" : "Create an Account"}</h2>
        <form onSubmit={handleSubmit(isLogin ? onLoginSubmit : onRegisterSubmit)} className="auth-form">
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
