import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "./c.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";

const Hostel = () => {
  const containerStyle = {
    position: "relative",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(5px)",
  };

  const contentContainerStyle = {
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "30px",
    borderRadius: "15px",
    maxWidth: "600px",
    width: "100%",
    border: "2px solid #000",
  };

  const hostelButtonStyle = {
    marginTop: "20px",
    marginBottom: "20px",
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">WUSL</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/home" style={{ color: "white" }}>
                Home
              </Nav.Link>
              {/* Add other Navbar links here as needed */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="bg-container" style={containerStyle}>
        <div style={overlayStyle}></div>
        <div className="container" style={contentContainerStyle}>
          <div className="row">
            <div className="col-12">
              <h2 className="text-dark">Boys' Hostel</h2>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                <Link
                  to="/room-availability/hostel/1"
                  className="btn btn-primary"
                  style={hostelButtonStyle}
                >
                  Wijitha Kuruwita
                </Link>
                <Link
                  to="/room-availability/hostel/2"
                  className="btn btn-primary"
                  style={hostelButtonStyle}
                >
                  Chithra Devi
                </Link>
                <Link
                  to="/room-availability/hostel/3"
                  className="btn btn-primary"
                  style={hostelButtonStyle}
                >
                  Pandukabhaya 1
                </Link>
                <Link
                  to="/room-availability/hostel/4"
                  className="btn btn-primary"
                  style={hostelButtonStyle}
                >
                  Pandukabhaya 2
                </Link>
              </div>
            </div>

            <div className="col-12 mt-4">
              <h2 className="text-dark">Girls' Hostel</h2>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                <Link
                  to="/room-availability/hostel/1"
                  className="btn btn-primary"
                  style={hostelButtonStyle}
                >
                  Swarnapali 1
                </Link>
                <Link
                  to="/room-availability/hostel/2"
                  className="btn btn-primary"
                  style={hostelButtonStyle}
                >
                  Swarnapali 2
                </Link>
                <Link
                  to="/room-availability/hostel/3"
                  className="btn btn-primary"
                  style={hostelButtonStyle}
                >
                  Panduwasdev 1
                </Link>
                <Link
                  to="/room-availability/hostel/4"
                  className="btn btn-primary"
                  style={hostelButtonStyle}
                >
                  Panduwasdev 2
                </Link>
                <Link
                  to="/room-availability/hostel/5"
                  className="btn btn-primary"
                  style={hostelButtonStyle}
                >
                  Anula Devi
                </Link>
                <Link
                  to="/room-availability/hostel/6"
                  className="btn btn-primary"
                  style={hostelButtonStyle}
                >
                  Seetha Devi
                </Link>
                <Link
                  to="/room-availability/hostel/7"
                  className="btn btn-primary"
                  style={hostelButtonStyle}
                >
                  Vishaka
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hostel;
