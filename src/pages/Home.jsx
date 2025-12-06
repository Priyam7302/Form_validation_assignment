import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="home-page">

      <header className="home-header">
        <h2 className="logo">My Website</h2>
        <button onClick={logout} className="logout-btn">Logout</button>
      </header>

      <section className="hero">
        <h1>Welcome to My Website 🎉</h1>
        <p>Hello <strong>{user?.name}</strong>, you are logged in.</p>
      </section>

    </div>
  );
}
