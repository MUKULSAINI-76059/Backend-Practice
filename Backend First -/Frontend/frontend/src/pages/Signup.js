import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, form);

      alert("User Registered Successfully ✅");
      navigate("/login");

    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error";
      setError(errorMsg);
      alert(errorMsg);
    }
  };

  // Google Success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const base64Url = credentialResponse.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const decodedToken = JSON.parse(jsonPayload);

      const response = await axios.post(    
        `${process.env.REACT_APP_BACKEND_URL}/api/google-auth`,
        {
          email: decodedToken.email,
          name: decodedToken.name,
          googleId: decodedToken.sub,
        }
      );

      localStorage.setItem("token", response.data.token);

      alert("Google Sign Up Successful ✅");
      navigate("/dashboard");

    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Google authentication failed";
      setError(errorMsg);
      alert(errorMsg);
    }
  };

  const handleGoogleError = () => {
    alert("Google Sign Up Failed");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="signup-wrapper">
        <div className="signup-card">
          <h2>Signup</h2>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <button type="submit">Register</button>
          </form>

          {/* Google Button */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Signup;