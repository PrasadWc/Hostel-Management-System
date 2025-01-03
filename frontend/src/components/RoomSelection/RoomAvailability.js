import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar, Nav, Container } from "react-bootstrap";

const RoomAvailability = () => {
  const { hostelId } = useParams();
  const navigate = useNavigate();
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [Name, setName] = useState("");
  const [objid, setObjid] = useState("");
  const [studentRoom, setStudentRoom] = useState(null);
  let studentNames = [];

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

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const [isCurrentUserRegistered, setIsCurrentUserRegistered] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3010/hostels/gethosteldetails")
      .then((res) => {
        const updatedRoomAvailability = {};
        let updatedIsCurrentUserRegistered = false;
        let loggedInUserRoom = null;

        roomIds.forEach((roomId) => {
          const roomData = res.data.find((room) => room.roomNo === roomId);
          const availableSpace = roomData ? 4 - roomData.students.length : 4;
          updatedRoomAvailability[roomId] = availableSpace;

          studentNames = roomData
            ? roomData.students.map((student) => student.name)
            : [];

          if (studentNames.some((student) => student === Name)) {
            updatedIsCurrentUserRegistered = true;
            loggedInUserRoom = roomId;
          }

          console.log(`Students in Room ${roomId}:`, studentNames);
        });

        setRoomAvailability(updatedRoomAvailability);
        setIsCurrentUserRegistered(updatedIsCurrentUserRegistered);
        setStudentRoom(loggedInUserRoom);
      })
      .catch((err) => console.log(err));
  }, [Name]);

  const roomIds = Array.from({ length: 32 }, (_, index) => `Room ${index + 1}`);

  const renderRoomButtons = () => {
    return roomIds.map((roomId) => (
      <button
        key={roomId}
        className={`btn m-2 room-button ${
          studentRoom === roomId
            ? "btn-success"
            : selectedRoom === roomId || roomAvailability[roomId] === 0
            ? "btn-dark"
            : "btn-outline-dark"
        }`}
        onClick={() => handleRoomSelection(roomId)}
        disabled={
          roomAvailability[roomId] === 0 ||
          (isCurrentUserRegistered && studentRoom !== roomId)
        }
      >
        Room {roomId.slice(4)}
        <div>Available Space: {roomAvailability[roomId]}</div>
      </button>
    ));
  };

  const initialRoomAvailability = roomIds.reduce((acc, roomId) => {
    acc[roomId] = 4;
    return acc;
  }, {});

  const [roomAvailability, setRoomAvailability] = useState(
    initialRoomAvailability
  );

  const handleRoomSelection = (roomId) => {
    if (!selectedRoom && roomAvailability[roomId] > 0) {
      setSelectedRoom(roomId);
      setRoomAvailability((prevAvailability) => ({
        ...prevAvailability,
        [roomId]: prevAvailability[roomId] - 1,
      }));
    } else if (selectedRoom) {
      alert("Please reset your selection before choosing another room.");
    } else {
      alert("Sorry, the room is already filled.");
    }
  };

  const validateForm = () => {
    return {};
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    const requestData = {
      selectedRoom: selectedRoom,
      student: {
        Name: Name,
        uniqno: objid,
      },
    };

    if (Object.keys(errors).length === 0 && selectedRoom) {
      setSubmissionMessage("You registered for the selected room");
      console.log("Registered:", selectedRoom, Name, objid);
    } else {
      setFormErrors(errors);
    }

    axios
      .post("http://localhost:3010/hostels/regToRoom", requestData)
      .then(() => {
        alert(`Registered For Room ${selectedRoom}`);
        setSubmitSuccess(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleReset = () => {
    setSelectedRoom(null);
    setRoomAvailability(initialRoomAvailability);
    setSubmitSuccess(false);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">WUSL</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/hostel" style={{ color: "white" }}>
                Hostel
              </Nav.Link>
              <Nav.Link as={Link} to="/home" style={{ color: "white" }}>
                Home
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container mt-5 bg-light">
        <h1 className="text-center mb-4">Select Your Room</h1>
        <div className="d-flex flex-wrap justify-content-center">
          {renderRoomButtons()}
        </div>
        {selectedRoom && (
          <div className="text-center my-3">Selected Room: {selectedRoom}</div>
        )}
        <div className="text-center my-4">
          <button
            className="btn btn-success mx-2"
            onClick={handleSubmit}
            disabled={!selectedRoom || submitSuccess}
          >
            Submit
          </button>
          <button
            className="btn btn-danger mx-2"
            onClick={handleReset}
            disabled={!selectedRoom || submitSuccess}
          >
            Reset Your Selection
          </button>
          <Link to="/hostel" className="btn btn-primary mx-2">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomAvailability;
