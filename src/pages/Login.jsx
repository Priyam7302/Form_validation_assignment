// import React, { useState } from "react";
// import bcrypt from "bcryptjs";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");

//   const navigate = useNavigate();

//   const validateEmail = (email) => {
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(email);
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     const savedUser = JSON.parse(localStorage.getItem("user"));

//     if (!savedUser) return setMsg("No user found. Please register.");

//     if (!validateEmail(email)) return setMsg("Enter a valid email address.");

//     const match = bcrypt.compareSync(password, savedUser.password);

//     if (savedUser.email === email && match) {
//       localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
//       navigate("/home");
//     } else {
//       setMsg("Invalid email or password.");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Login</h2>

//       <form onSubmit={handleLogin}>
//         <input placeholder="Email" type="email"
//           value={email} onChange={(e) => setEmail(e.target.value)} />

//         <input placeholder="Password" type="password"
//           value={password} onChange={(e) => setPassword(e.target.value)} />

//         <button className="btn">Login</button>
//       </form>

//       <p className="msg">{msg}</p>

//       <p>Don't have an account? <Link to="/register">Signup</Link></p>
//     </div>
//   );
// }
