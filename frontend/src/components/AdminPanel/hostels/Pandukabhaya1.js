import React, { useEffect, useState } from "react";
import axios from "axios";

function Pandukabhaya1() {
  const [hostelData, setHostelData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios
      .get("http://localhost:3010/hostels/gethosteldetails")
      .then((response) => {
        setHostelData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (roomId, studentId) => {
    // Add logic to delete the student based on roomId and studentId
    console.log(`Delete student ${studentId} from room ${roomId}`);
  };

  const handleDeleteAll = () => {
    // Make an Axios request to the backend route that deletes all entries
    axios
      .delete("http://localhost:3010/hostels/deleteallrooms/")
      .then((response) => {
        console.log(response.data); // Log the response from the server
        // Add any additional logic if needed
      })
      .catch((error) => {
        console.error("Error deleting all entries:", error);
      });
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <table className="table table-bordered text-center mb-4">
        <thead>
          <tr>
            <th scope="col">Room No</th>
            <th scope="col">Student Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hostelData.map((room, index) => (
            <tr key={index}>
              <td>{room.roomNo}</td>
              <td>
                {room.students.map((student, studentIndex) => (
                  <div key={studentIndex} className="d-flex align-items-center">
                    <span>{student.name}</span>
                  </div>
                ))}
              </td>
              <td>
                {room.students.map((student, studentIndex) => (
                  <button
                    key={studentIndex}
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(room._id, student._id)}
                  >
                    Delete
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-danger" onClick={handleDeleteAll}>
        Vacate The Hostel
      </button>
    </div>
  );
}

export default Pandukabhaya1;
