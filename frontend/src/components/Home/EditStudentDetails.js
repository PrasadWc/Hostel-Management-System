// EditStudentDetails.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";

const EditStudentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    district: "",
    province: "",
    gender: "",
    birthday: "",
    nic: "",
    uniRegNo: "",
    faculty: "",
    yearOfStudy: "",
    contactNo: "",
    email: "",
    medicalHistory: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3010/Student/get/" + id)
      .then((res) => {
        const studentData = res.data.Student; // Assuming user data is in res.data.Student

        // Set the form data with the fetched user details
        setFormData({
          fullName: studentData.fullName || "",
          address: studentData.address || "",
          district: studentData.district || "",
          province: studentData.province || "",
          gender: studentData.gender || "",
          birthday: studentData.birthday || "",
          nic: studentData.nic || "",
          uniRegNo: studentData.uniRegNo || "",
          faculty: studentData.faculty || "",
          yearOfStudy: studentData.yearOfStudy || "",
          contactNo: studentData.contactNo || "",
          email: studentData.email || "",
          medicalHistory: studentData.medicalHistory || "",
          emergencyContactName: studentData.emergencyContactName || "",
          emergencyContactPhone: studentData.emergencyContactPhone || "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [formErrors, setFormErrors] = useState({});
  //const [submissionMessage, setSubmissionMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!/^\d+$/.test(formData.contactNo)) {
      errors.contactNo = "Invalid Contact Number";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid Email";
    }
    // Add validations for other fields

    return errors;
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    //console.log(formData);

    axios
      .put("http://localhost:3010/Student/update/" + id, formData)
      .then(() => {
        alert("Student added successfully");
        navigate("/adminpanel/students");
      })
      .catch((err) => {
        alert(err);
      });

    const errors = validateForm();
  };

  return (
    <div className="registration-form-container container">
      <div className="text-center">
        <h2 className="mt-4 mb-4">Update Student Details</h2>
        <h3 className="mt-2 mb-4">
          Please note that you should only fill the input fields of which you
          need to update, leave others blank
        </h3>
      </div>

      <form onSubmit={handleUpdate} className="registration-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="form-control"
            required
          />
          {formErrors.fullName && (
            <p className="error">{formErrors.fullName}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
            required
          />
          {formErrors.address && <p className="error">{formErrors.address}</p>}
        </div>

        <form className="row">
          <div className="col-lg-4">
            <div className="d-flex mt-3">
              <label htmlFor="district" className="col-form-label me-3">
                District:
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="form-control"
                required
              />
              {formErrors.district && (
                <p className="error">{formErrors.district}</p>
              )}
            </div>
          </div>

          <div className="col-auto">
            <div className="d-flex mt-3">
              <label htmlFor="province" className="col-form-label me-3">
                Province:
              </label>
              <input
                type="text"
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="form-control"
                required
              />
              {formErrors.province && (
                <p className="error">{formErrors.province}</p>
              )}
            </div>
          </div>

          <div className="col-auto">
            <div className="d-flex mt-3">
              <label htmlFor="gender" className="col-form-label me-3">
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {formErrors.gender && (
                <p className="error">{formErrors.gender}</p>
              )}
            </div>
          </div>
          <div className="col-auto">
            <div className="d-flex mt-3">
              <label htmlFor="birthday" className="col-form-label me-3">
                Birthday:
              </label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="form-control"
                required
              />
              {formErrors.birthday && (
                <p className="error">{formErrors.birthday}</p>
              )}
            </div>
          </div>
        </form>

        <div className="row mt-3">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="nic">NIC Number:</label>
              <input
                type="text"
                id="nic"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                className="form-control"
                required
              />
              {formErrors.nic && <p className="error">{formErrors.nic}</p>}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="uniRegNo">University Registration Number:</label>
              <input
                type="text"
                id="uniRegNo"
                name="uniRegNo"
                value={formData.uniRegNo}
                onChange={handleChange}
                className="form-control"
                required
              />
              {formErrors.uniRegNo && (
                <p className="error">{formErrors.uniRegNo}</p>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="faculty">Faculty:</label>
              <select
                id="faculty"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select Faculty</option>
                <option value="FAS">Faculty of Applied Sciences (FAS)</option>
                <option value="FOT">Faculty of Technology (FOT)</option>
                <option value="BSF">Business Studies and Finance (BSF)</option>
              </select>
              {formErrors.faculty && (
                <p className="error">{formErrors.faculty}</p>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="yearOfStudy">Year of Study:</label>
              <select
                id="yearOfStudy"
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select Year</option>
                <option value="1st Year">1st year</option>
                <option value="2nd Year">2nd year</option>
                <option value="3rd Year">3rd year</option>
                <option value="4th Year">4th year</option>
              </select>
              {formErrors.yearOfStudy && (
                <p className="error">{formErrors.yearOfStudy}</p>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group ">
              <label htmlFor="contactNo">Contact Number:</label>
              <input
                type="text"
                id="contactNo"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                className="form-control"
                required
              />
              {formErrors.contactNo && (
                <p className="error">{formErrors.contactNo}</p>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
              {formErrors.email && <p className="error">{formErrors.email}</p>}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="medicalHistory">Medical History:</label>
              <input
                type="text"
                id="medicalHistory"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                className="form-control"
                placeholder="If you have, state briefly. Otherwise leave blank"
              />
              {formErrors.medicalHistory && (
                <p className="error">{formErrors.medicalHistory}</p>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="emergencyContactName">
                Emergency Contact Name:
              </label>
              <input
                type="text"
                id="emergencyContactName"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                className="form-control"
                required
              />
              {formErrors.emergencyContactName && (
                <p className="error">{formErrors.emergencyContactName}</p>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="emergencyContactPhone">
                Emergency Contact Phone:
              </label>
              <input
                type="text"
                id="emergencyContactPhone"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
                className="form-control"
                required
              />
              {formErrors.emergencyContactPhone && (
                <p className="error">{formErrors.emergencyContactPhone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Add more fields as needed */}
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-primary submit-button mt-3"
            type="submit"
            style={{ transform: "scale(2.0)" }}
          >
            Update Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudentDetails;
