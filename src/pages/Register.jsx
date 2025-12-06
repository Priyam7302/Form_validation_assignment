// import React, { useState } from "react";
// import bcrypt from "bcryptjs";
// import { Link, useNavigate } from "react-router-dom";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");

//   const navigate = useNavigate();

//   const validateEmail = (email) => {
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(email);
//   };
//   const validatePassword = (password) => {
//   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
//   return passwordRegex.test(password);
// };

//     const handleSignup = (e) => {
//   e.preventDefault();

//   if (!name || !email || !password) return setMsg("All fields are required.");

//   if (!validateEmail(email)) return setMsg("Enter a valid email address.");

//   if (!validatePassword(password)) {
//     return setMsg(
//       "Password must be at least 8 characters long and include both letters and numbers."
//     );
//   }

//   const hashedPass = bcrypt.hashSync(password, 10);
//   const user = { name, email, password: hashedPass };

//   localStorage.setItem("user", JSON.stringify(user));

//   setMsg("Signup successful! Redirecting...");
//   setTimeout(() => navigate("/login"), 1200);
// };


//   return (
//     <div className="container">
//       <h2>Create Account</h2>

//       <form onSubmit={handleSignup}>
//         <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />

//         <input placeholder="Email" type="email" value={email}
//           onChange={(e) => setEmail(e.target.value)} />

//         <input placeholder="Password" type="password" value={password}
//           onChange={(e) => setPassword(e.target.value)} />

//         <button className="btn">Signup</button>
//       </form>

//       <p className="msg">{msg}</p>
//       <p>Already have an account? <Link to="/login">Login</Link></p>
//     </div>
//   );
// }
