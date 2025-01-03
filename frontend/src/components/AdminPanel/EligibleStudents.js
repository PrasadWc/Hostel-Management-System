import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import axios from "axios";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("1st year");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3010/Student/")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, []);

  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  const generateRandomPassword = (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
    return password;
  };

  let email;
  let pswd;

  const getdataforemail = (year) => {
    students.forEach((student) => {
      if (
        parseFloat(student.distance) > 40 &&
        (student.yearOfStudy === `${year}st Year` ||
          student.yearOfStudy === `${year}nd Year` ||
          student.yearOfStudy === `${year}rd Year` ||
          student.yearOfStudy === `${year}th Year`)
      ) {
        email = student.email;
        pswd = student.password;
        handleSendEmail();
      }
    });
  };

  const handleSendEmail = async () => {
    try {
      const emailData = {
        to: email,
        subject: "Login Details",
        text: pswd,
      };

      console.log(emailData);

      await axios.post("http://localhost:3010/email", emailData);
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again later.");
    }
  };

  const createPasswords = (year) => {
    const generatedPasswords = [];

    students.forEach((student) => {
      if (
        parseFloat(student.distance) > 40 &&
        (student.yearOfStudy === `${year}st Year` ||
          student.yearOfStudy === `${year}nd Year` ||
          student.yearOfStudy === `${year}rd Year` ||
          student.yearOfStudy === `${year}th Year`)
      ) {
        const randomPassword = generateRandomPassword(10);
        generatedPasswords.push({
          userid: student._id,
          password: randomPassword,
        });
      }
    });

    axios
      .put("http://localhost:3010/Student/addpswd", {
        passwords: generatedPasswords,
      })
      .then(() => {
        alert("Passwords have been added successfully");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "1st year" ? "active" : ""}`}
            onClick={() => handleTabClick("1st year")}
          >
            1st year
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "2nd year" ? "active" : ""}`}
            onClick={() => handleTabClick("2nd year")}
          >
            2nd year
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "3rd year" ? "active" : ""}`}
            onClick={() => handleTabClick("3rd year")}
          >
            3rd year
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "4th year" ? "active" : ""}`}
            onClick={() => handleTabClick("4th year")}
          >
            4th year
          </button>
        </li>
      </ul>

      <div className="tab-content mt-2">
        <div className={`tab-pane ${activeTab === "1st year" ? "active" : ""}`}>
          <button type="button" onClick={() => createPasswords(1)}>
            Create Accounts
          </button>
          <button type="button">Send emails</button>
          <table className="table table-bordered">
            <thead className="thead-dark text-center">
              <tr>
                <th>Name</th>
                <th>Index No</th>
                <th>Address</th>
                <th>District</th>
                <th>Gender</th>
                <th>Distance</th>
                <th>Contact No</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                if (
                  student.yearOfStudy === "1st Year" &&
                  parseFloat(student.distance) > 40
                ) {
                  // Render the table row for the qualifying student
                  return (
                    <tr key={student._id}>
                      <td>{student.fullName}</td>
                      <td>{student.uniRegNo}</td>
                      <td>{student.address}</td>
                      <td>{student.district}</td>
                      <td>{student.gender}</td>
                      <td>{student.distance}</td>
                      <td>{student.contactNo}</td>
                      <td>{student.email}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <div className={`tab-pane ${activeTab === "2nd year" ? "active" : ""}`}>
          <button type="button" onClick={() => createPasswords(2)}>
            Send email
          </button>
          <table className="table table-bordered">
            <thead className="thead-dark text-center">
              <tr>
                <th>Name</th>
                <th>Index No</th>
                <th>Address</th>
                <th>District</th>
                <th>Gender</th>
                <th>Distance</th>
                <th>Contact No</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                if (
                  student.yearOfStudy === "2nd Year" &&
                  parseFloat(student.distance) > 40
                ) {
                  return (
                    <tr key={student._id}>
                      <td>{student.fullName}</td>
                      <td>{student.uniRegNo}</td>
                      <td>{student.address}</td>
                      <td>{student.district}</td>
                      <td>{student.gender}</td>
                      <td>{student.distance}</td>
                      <td>{student.contactNo}</td>
                      <td>{student.email}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <div className={`tab-pane ${activeTab === "3rd year" ? "active" : ""}`}>
          <button type="button" onClick={() => createPasswords(3)}>
            Send email
          </button>
          <table className="table table-bordered">
            <thead className="thead-dark text-center">
              <tr>
                <th>Name</th>
                <th>Index No</th>
                <th>Address</th>
                <th>District</th>
                <th>Gender</th>
                <th>Distance</th>
                <th>Contact No</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                if (
                  student.yearOfStudy === "3rd Year" &&
                  parseFloat(student.distance) > 40
                ) {
                  return (
                    <tr key={student._id}>
                      <td>{student.fullName}</td>
                      <td>{student.uniRegNo}</td>
                      <td>{student.address}</td>
                      <td>{student.district}</td>
                      <td>{student.gender}</td>
                      <td>{student.distance}</td>
                      <td>{student.contactNo}</td>
                      <td>{student.email}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <div className={`tab-pane ${activeTab === "4th year" ? "active" : ""}`}>
          <button type="button" onClick={() => createPasswords(4)}>
            Create Accounts
          </button>
          <button type="button" onClick={() => getdataforemail(4)}>
            Send emails
          </button>
          <table className="table table-bordered">
            <thead className="thead-dark text-center">
              <tr>
                <th>Name</th>
                <th>Index No</th>
                <th>Address</th>
                <th>District</th>
                <th>Gender</th>
                <th>Distance</th>
                <th>Contact No</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                if (
                  student.yearOfStudy === "4th Year" &&
                  parseFloat(student.distance) > 40
                ) {
                  return (
                    <tr key={student._id}>
                      <td>{student.fullName}</td>
                      <td>{student.uniRegNo}</td>
                      <td>{student.address}</td>
                      <td>{student.district}</td>
                      <td>{student.gender}</td>
                      <td>{student.distance}</td>
                      <td>{student.contactNo}</td>
                      <td>{student.email}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
