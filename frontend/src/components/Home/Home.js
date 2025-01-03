// Home.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Carousel, Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import hostelPhoto1 from "./1.jpg";
import hostelPhoto2 from "./2.jpg";
import hostelPhoto3 from "./3.jpg";
import hostelPhoto4 from "./4.jpg";
import hostelPhoto5 from "./5.jpg";
import hostelPhoto6 from "./6.jpg";

import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const hostelPhotos = [
    hostelPhoto1,
    hostelPhoto2,
    hostelPhoto3,
    hostelPhoto4,
    hostelPhoto5,
    hostelPhoto6,
  ];
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [objid, setObjid] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3010/")
      .then((res) => {
        if (res.data.valid) {
          setName(res.data.name);
          setObjid(res.data.uniqno);
          console.log(res.data);
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = async () => {
    try {
      // Make a request to the logout endpoint on the backend
      await axios
        .post("http://localhost:3010/logout")
        .then(() => {
          navigate(`/`);
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">WUSL</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/hostel" style={{ color: "white" }}>
                Hostel
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"/updateStudent/" + objid}
                style={{ color: "white" }}
              >
                Edit Profile
              </Nav.Link>
              <Nav.Link
                onClick={handleLogout}
                as={Link}
                style={{ color: "white" }}
              >
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <h1>Welcome {Name}</h1>
      </div>

      <Container
        className="p-4 rounded shadow-lg"
        style={{ backgroundColor: "#46acb3", color: "white" }}
      >
        <div className="row">
          <div className="col-md-6">
            <Carousel interval={2000}>
              {hostelPhotos.map((photo, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 rounded"
                    src={photo}
                    alt={`Hostel ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div className="col-md-6">
            <div className="rules-section">
              <h3>Hostel Rules:</h3>
              <ol>
                <li>
                  Ragging is strictly prohibited inside the hostel premises.
                </li>
                <li>
                  Giving shelter to other students/outsiders in rooms is
                  prohibited; unauthorized shelter may lead to disciplinary
                  action.
                </li>
                <li>
                  Resident students cannot invite outsiders without written
                  permission from the Warden/Dean.
                </li>
                <li>
                  Switch off lights and fans when leaving rooms to economize
                  electricity; private electrical appliances are prohibited.
                </li>
                <li>
                  Students should not drive nails or screws into walls/doors;
                  repairs should be arranged through the Sub Warden.
                </li>
                <li>
                  Male students are forbidden from entering the Girls' Hostel
                  and vice versa.
                </li>
                <li>
                  Strict prohibition on consuming alcoholic drinks, drugs,
                  cigarettes, or any intoxicants inside the hostel.
                </li>
                <li>
                  Students must keep their allotted rooms clean; hostel
                  authorities have the right to inspect rooms at any time.
                </li>

                <li>
                  Combined activities should have permission and be held in open
                  spaces.
                </li>

                <li>Proper disposal of wastes is mandatory.</li>
              </ol>
            </div>
          </div>
        </div>

        <div
          className="fixed-bottom"
          style={{
            backgroundColor: "#34495e",
            height: "10%",
            padding: "20px",
            borderTop: "2px solid #2c3e50",
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <p className="mb-0">Hostel Administrator: [Name]</p>
            </div>
            <div className="col-md-4">
              <p className="mb-0">Contact Number: [Phone Number]</p>
            </div>
            <div className="col-md-4">
              <p className="mb-0">Email: [Email Address]</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
