import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

 return (
  <div className="dashboard-wrapper">
    <div className="dashboard-card">
      <h2>Dashboard</h2>
      <p>Welcome! You are logged in 🎉</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  </div>
);
}

export default Dashboard;