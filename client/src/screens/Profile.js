import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/proflie.css";
import { jwtDecode } from "jwt-decode";

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const isAuthenticated = !!token;
  let email = "";
  try {
    const decodedToken = jwtDecode(token);
    console.log(token);
    email = decodedToken?.email
  } catch (error) {
    console.error("Error decoding token", error);
  }
  const handleResetPassword = () => {
    navigate("/reset-password");
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <>
      <div className="profile-container">
        <div className="profile-header">
          <h2>User Profile</h2>
        </div>
        <div className="profile-details">
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Password:</strong> ••••••••
          </p>
          <button
            onClick={handleResetPassword}
            className="reset-password-button"
          >
            Reset Password
          </button>
          <button onClick={handleLogout} className="reset-password-button">
            logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
