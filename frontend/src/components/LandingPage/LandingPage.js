// LandingPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import hostelImage from "./hostel.jpg";
import backgroundImage from "./a.jpg";
import axios from "axios";
import Login from "../Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  const bodyStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    margin: 0,
    padding: 0,
  };
  const overlayStyle = {
    backgroundColor: "rgba(255, 255, 255, 1)", // Adjust the alpha value for the desired frosted effect
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <div style={bodyStyle}>
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <div
          className="landing-page-content text-center border rounded p-4 shadow "
          style={overlayStyle}
        >
          <div className="row">
            <div className="col-md-6">
              <h1 className="display-3">Welcome to Hostel Management System</h1>
              <h2>Wayamba University Of Sri Lanka</h2>
              <p className="lead">
                Any student who is wishing to apply for hostel accommodation
                should submit a completed application. Please submit your
                application by clicking Register Now.
              </p>
              <div className="button-container">
                <Link to="/register" className="btn btn-primary me-2 mb-3">
                  Register Now
                </Link>
                <button
                  className="btn btn-primary me-2 mb-3"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
              </div>
            </div>
            <Login
              showModal={showLoginPopup}
              handleClose={() => setShowLoginPopup(false)}
            />

            <div className="col-md-6">
              <img
                src={hostelImage}
                alt="Hostel Image"
                className="landing-image img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
