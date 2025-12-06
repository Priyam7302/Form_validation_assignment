import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Auth() {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password)
      return toast.error("All fields are required.");

    if (!validateEmail(email)) return toast.error("Invalid email format.");
    if (!validatePassword(password))
      return toast.error("Password must include letters, numbers and 8+ characters.");

    const existingUser = JSON.parse(localStorage.getItem("user"));

    if (existingUser && existingUser.email === email)
      return toast.error("Email already exists!");

    const hashed = bcrypt.hashSync(password, 10);

    const user = { name, email, password: hashed };
    localStorage.setItem("user", JSON.stringify(user));

    toast.success("Signup Successful! ✔");
    setMode("login");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) return toast.error("No user registered, please sign up first!");

    if (!validateEmail(email)) return toast.error("Enter a valid email.");
    
    const match = bcrypt.compareSync(password, savedUser.password);

    if (savedUser.email === email && match) {
      localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
      toast.success("Login Successful ✔");

      setTimeout(() => navigate("/home"), 1000);
    } else {
      toast.error("Invalid credentials ❌");
    }
  };

  return (
    <div className="container">
      <ToastContainer />

      {/* Toggle Buttons */}
      <div className="toggle-box">
        <button className={mode === "login" ? "activeTab" : ""}
          onClick={() => setMode("login")}>Login</button>

        <button className={mode === "signup" ? "activeTab" : ""}
          onClick={() => setMode("signup")}>Signup</button>
      </div>

      <h2>{mode === "login" ? "Login" : "Create Account"}</h2>

      <form onSubmit={mode === "login" ? handleLogin : handleSignup}>

        {mode === "signup" && (
          <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        )}

        <input placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <div className="password-box">
          <input placeholder="Password"
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)} />

          <span className="eye" onClick={() => setShowPass(!showPass)}>
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>

        <button className="btn">{mode === "login" ? "Login" : "Signup"}</button>
      </form>
    </div>
  );
}
