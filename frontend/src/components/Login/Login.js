import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

// Define darkBackdropStyles here
const darkBackdropStyles = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1030, // Set a value below the modal's zIndex
  backgroundColor: "rgba(0, 0, 0, 0.7)",
};

const Login = ({ showModal, handleClose }) => {
  const [indexNumber, setIndexNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleLogin = (e) => {
    e.preventDefault();

    if (indexNumber === "HostelAdmin1") {
      axios
        .post("http://localhost:3010/login", {
          uniRegNo: indexNumber,
          password: password,
        })
        .then((result) => {
          navigate(`adminpanel/`);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post("http://localhost:3010/login", {
          uniRegNo: indexNumber,
          password: password,
        })
        .then((result) => {
          navigate(`home/`);
        })
        .catch((err) => console.error(err));
    }

    // Placeholder for authentication logic
    /*if (indexNumber === "admin" && password === "admin") {
      navigate("/adminpanel"); // Navigate on successful login
      handleClose(); // Close the modal on successful login
    } else {
      alert("Authentication failed. Please check your credentials."); // Provide user feedback
    }*/
  };

  return (
    <>
      {/* dark backdrop */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1030, // Set a value below the modal's zIndex
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        />
      )}
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
        style={darkBackdropStyles.darkModalBackdrop}
      >
        {" "}
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="indexNumber" className="form-label">
                UserName:
              </label>
              <input
                type="text"
                className="form-control"
                id="indexNumber"
                value={indexNumber}
                onChange={(e) => setIndexNumber(e.target.value)}
                placeholder="Index Number"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg">
                Login
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
