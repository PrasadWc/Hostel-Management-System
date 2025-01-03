import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "./Navbar";

function AdminPanel() {
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default AdminPanel;
