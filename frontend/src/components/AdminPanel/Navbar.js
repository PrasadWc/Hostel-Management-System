import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Nav
      variant="tabs"
      className="justify-content-center"
      defaultActiveKey="/adminpanel/students"
    >
      <Nav.Item>
        <Nav.Link>
          <Link to="/adminpanel/registeredstudents">Registered Students</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Link to="/adminpanel/eligiblestudents">Eligible Students</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Link to="/adminpanel/hostels">Hostels</Link>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
