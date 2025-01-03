// RoomAvailability.js
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RoomAvailability = () => {
  const { hostelId } = useParams();
  const navigate = useNavigate();
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const roomIds = Array.from({ length: 32 }, (_, index) => `Room ${index + 1}`);

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
    <div className="container mt-5 bg-light">
      <h1 className="text-center mb-4">Select Your Room</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {roomIds.map((roomId) => (
          <button
            key={roomId}
            className={`btn ${
              selectedRoom === roomId ? "btn-dark" : "btn-outline-dark"
            } m-2 room-button`}
            onClick={() => handleRoomSelection(roomId)}
            disabled={roomAvailability[roomId] === 0}
          >
            Room {roomId.slice(4)}
            <div>Available Space: {roomAvailability[roomId]}</div>
          </button>
        ))}
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
  );
};

export default RoomAvailability;
