// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import StudentRegistrationForm from "./components/StudentRegistration/StudentRegistrationForm";
import Login from "./components/Login/Login";

import RoomAvailability from "./components/RoomSelection/RoomAvailability";
//import Navbar from './components/Navbar/Navbar';
import Home from "./components/Home/Home";
import Hostel from "./components/Home/Hostel";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Students from "./components/AdminPanel/Students";
import Hostels from "./components/AdminPanel/Hostels";
import UpdateStudent from "./components/Home/EditStudentDetails";
import Tabs from "./components/AdminPanel/EligibleStudents";
import EligibleListPage from "./components/LandingPage/EligibleListPage";
import Pandukabhaya1 from "./components/AdminPanel/hostels/Pandukabhaya1";

function App() {
  const [availableRooms, setAvailableRooms] = useState([
    { id: 1, name: "Room 101" },
    { id: 2, name: "Room 102" },
    // Add more rooms
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/adminpanel/eligiblestudents" exact element={<Tabs />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/eligible-list" element={<EligibleListPage />} />
        <Route path="/register" element={<StudentRegistrationForm />} />
        <Route path="/login1" element={<Login />} />
        <Route
          path="/room-availability"
          element={<RoomAvailability availableRooms={availableRooms} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/hostel" element={<Hostel />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route
          path="/room-availability/hostel/:hostelId"
          element={<RoomAvailability />}
        />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route
          path="/adminpanel/registeredstudents"
          exact
          element={<Students />}
        />
        <Route path="/adminpanel/hostels" exact element={<Hostels />} />
        <Route
          path="/adminpanel/hostels/pandukabhaya1"
          exact
          element={<Pandukabhaya1 />}
        />
        /*
        <Route path="updateStudent/:id" exact element={<UpdateStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
