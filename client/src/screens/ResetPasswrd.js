import React, { useState, useEffect } from "react";
import "../css/resetpasswrd.css";
import { useParams, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
  
    const handlePasswordReset = async (e) => {
      e.preventDefault();
  
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }
  
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setErrorMessage("You must be logged in to reset the password.");
          return;
        }
  
    
        const decodedToken = jwtDecode(token);
        const userId = decodedToken?.userId;
        if (!userId) {
          setErrorMessage("Invalid token: userId not found.");
          return;
        }
  
       
        const response = await fetch(`https://mwt-project-main-server.vercel.app/api/users/edit`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password }),
        });
  
        if (response.ok) {
          alert("Password has been reset successfully.");
          navigate("/profile");
        } else {
          const result = await response.json();
          setErrorMessage(result.message || "Failed to reset password.");
        }
      } catch (error) {
        console.error("Error resetting password:", error);
        setErrorMessage("An error occurred. Please try again.");
      }
    };
  
    return (
      <div className="reset-password-container">
        <h2>Reset Password</h2>
        <form onSubmit={handlePasswordReset} className="reset-password-form">
          <label>
            New Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="reset-password-button">
            Reset Password
          </button>
        </form>
      </div>
    );
  }
  
  export default ResetPassword;