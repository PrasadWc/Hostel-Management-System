import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3010/Student/")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3010/Student/delete/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-auto">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="thead-dark text-center">
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>District</th>
                    <th>Province</th>
                    <th>Gender</th>
                    <th>Birthday</th>
                    <th>NIC Number</th>
                    <th>Index No</th>
                    <th>Faculty</th>
                    <th>Year OF Study</th>
                    <th>Distance</th>
                    <th>Contact No</th>
                    <th>Email</th>
                    <th>Medical History</th>
                    <th>Emergency Contact Name</th>
                    <th>Emergency Contact Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td>{student.fullName}</td>
                      <td>{student.address}</td>
                      <td>{student.district}</td>
                      <td>{student.province}</td>
                      <td>{student.gender}</td>
                      <td>{student.birthday}</td>
                      <td>{student.nic}</td>
                      <td>{student.uniRegNo}</td>
                      <td>{student.faculty}</td>
                      <td>{student.yearOfStudy}</td>
                      <td>{student.distance}</td>
                      <td>{student.contactNo}</td>
                      <td>{student.email}</td>
                      <td>{student.medicalHistory}</td>
                      <td>{student.emergencyContactName}</td>
                      <td>{student.emergencyContactPhone}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={(e) => handleDelete(student._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;
