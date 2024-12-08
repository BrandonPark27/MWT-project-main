import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import "../css/Signup.css";

function SignUpOut() {
  return (
    <>
      <SignUp />
    </>
  );
}

function SignUp() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`https://mwt-project-main-server.vercel.app/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setIsSignUp(false); 
      } else {
        setErrorMessage(data.message || "Registration failed.");
      }
    } catch (error) {
        console.log(process.env.REACT_APP_SERVER_URL)
      console.error("Error during registration:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    

    try {
      const response = await fetch(`https://mwt-project-main-server.vercel.app/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("authToken", result.token);
        alert("Login successful!");
        setIsLoggedIn(true);
        navigate("/"); 
      } else {
        setErrorMessage(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Error logging in. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    alert("Logged out");
    navigate("/");
  };

  return (
    <div className="signup-container">
      {!isLoggedIn ? (
        <>
          <div className="toggle-buttons">
            <button
              className={`toggle-button ${!isSignUp ? "active" : ""}`}
              onClick={() => setIsSignUp(false)}
            >
              <MusicNoteIcon className="icon" /> SIGN IN
            </button>
            <button
              className={`toggle-button ${isSignUp ? "active" : ""}`}
              onClick={() => setIsSignUp(true)}
            >
              <MusicNoteIcon className="icon" /> SIGN UP
            </button>
          </div>

          {isSignUp ? (
            <form className="signup-form" onSubmit={handleSignUp}>
              <h2 className="signup-header">Sign Up</h2>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button type="submit" className="signup_button">
                Sign Up
              </button>
            </form>
          ) : (
            <form className="signup-form" onSubmit={handleSignIn}>
              <h2 className="signup-header">Sign In</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="signup_button">
                Sign In
              </button>
            </form>
          )}
          {errorMessage && <p className="error">{errorMessage}</p>}
        </>
      ) : (
        <div className="logout">
          <h2>Welcome, {formData.email}!</h2>
          <button onClick={() => navigate("/")} className="logout_button">
            Return Home
          </button>
          <button onClick={handleLogout} className="logout_button">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default SignUpOut;
