import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // environment variable is logged for debug; ensure .env has REACT_APP_BACKEND_URL
  console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);

  

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/login`,
        form
      );

      // Save token
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login Failed";
      setError(errorMsg);
      alert(errorMsg);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Decode JWT token from Google
      const base64Url = credentialResponse.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const decodedToken = JSON.parse(jsonPayload);

      // Send to backend
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/google-auth`,
        {
          email: decodedToken.email,
          name: decodedToken.name,
          googleId: decodedToken.sub,
        }
      );

      // Save token
      localStorage.setItem("token", response.data.token);

      alert("Google Login Successful ✅");

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (error) {
      const errorMsg = error.response?.data?.message || "Google authentication failed";
      setError(errorMsg);
      alert(errorMsg);
    }
  };

  const handleGoogleError = () => {
    const errorMsg = "Google Login Failed";
    setError(errorMsg);
    alert(errorMsg);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="login-wrapper">
        <div className="login-card">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
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

            <button type="submit">Login</button>
          </form>

          <div className="divider">OR</div>

          <div className="google-signin">
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

export default Login;