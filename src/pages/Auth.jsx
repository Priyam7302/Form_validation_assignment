import { useState } from "react"
import bcrypt from "bcryptjs"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


export default function Auth() {
  const [mode, setMode] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [showPass, setShowPass] = useState(false)

  const navigate = useNavigate()

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z]{3,}$/
    return nameRegex.test(name)
  }

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return passwordRegex.test(password)
  }

  const handleSignup = (e) => {
    e.preventDefault()

    if (!name || !email || !password) return toast.error("All fields are required.")

    if (!validateName(name)) return toast.error("Name must contain only letters and be at least 3 characters.")

    if (!validateEmail(email)) return toast.error("Invalid email format.")

    if (!validatePassword(password))
      return toast.error("Password must contain letters, numbers and be at least 8 characters.")

    const users = JSON.parse(localStorage.getItem("users")) || []

    const emailExists = users.some((user) => user.email === email)
    if (emailExists) return toast.error("Email already registered!")

    const hashedPass = bcrypt.hashSync(password, 10)

    const newUser = { name, email, password: hashedPass }
    users.push(newUser)

    localStorage.setItem("users", JSON.stringify(users))

    toast.success("Signup Successful! ✔ You can login now.")

    setMode("login")
    setName("")
    setEmail("")
    setPassword("")
  }

  const handleLogin = (e) => {
    e.preventDefault()

    if (!email || !password) return toast.error("Please enter your email and password.")

    if (!validateEmail(email)) return toast.error("Enter a valid email.")

    const users = JSON.parse(localStorage.getItem("users")) || []

    if (users.length === 0) return toast.error("No users found. Please sign up first.")

    const user = users.find((u) => u.email === email)
    if (!user) return toast.error("Email not registered!")

    const validPass = bcrypt.compareSync(password, user.password)

    if (!validPass) return toast.error("Incorrect password ❌")

    localStorage.setItem("loggedInUser", JSON.stringify(user))

    toast.success("Login Successful ✔ Redirecting...")

    setTimeout(() => navigate("/home"), 1000)
  }

  return (
    <div className="main-container">
      <div className="container">

        <ToastContainer />
        <div className="toggle-box">
          <button className={mode === "login" ? "activeTab" : ""} onClick={() => setMode("login")}>
            Login
          </button>
          <button className={mode === "signup" ? "activeTab" : ""} onClick={() => setMode("signup")}>
            Signup
          </button>
        </div>

        <h2>{mode === "login" ? "Login" : "Create Account"}</h2>

        <form onSubmit={mode === "login" ? handleLogin : handleSignup}>
          {mode === "signup" && (
            <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          )}
          <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="password-box">
            <input
              placeholder="Password"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="eye-toggle"
              onClick={() => setShowPass(!showPass)}
              aria-label={showPass ? "Hide password" : "Show password"}
            >
              {showPass ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              )}
            </button>
          </div>
          <button className="btn">{mode === "login" ? "Login" : "Signup"}</button>
        </form>
      </div>
      
    </div>
  )
}
