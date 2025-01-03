// StudentRegistrationForm.js
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentRegistrationForm = () => {
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
    distance: "",
    contactNo: "",
    email: "",
    medicalHistory: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState("");

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

  const handleClearForm = () => {
    setFormData({
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
      distance: "",
      contactNo: "",
      email: "",
      medicalHistory: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
    });
    setFormErrors({});
    setSubmissionMessage("");
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }
    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }
    if (!formData.district.trim()) {
      errors.district = "District is required";
    }
    if (!formData.province.trim()) {
      errors.province = "Province is required";
    }
    if (!formData.gender.trim()) {
      errors.gender = "Gender is required";
    }
    if (!formData.birthday.trim()) {
      errors.birthday = "Date of Birth is required";
    }
    if (!formData.nic.trim()) {
      errors.nic = "NIC Number is required";
    }
    if (!formData.uniRegNo.trim()) {
      errors.uniRegNo = "University Registration Number is required";
    }
    if (!formData.faculty.trim()) {
      errors.faculty = "Faculty is required";
    }
    if (!formData.yearOfStudy.trim()) {
      errors.yearOfStudy = "Year of Study is required";
    }
    if (!formData.distance.trim()) {
      errors.distance = "Distance is required";
    }
    if (!formData.contactNo.trim()) {
      errors.contactNo = "Contact Number is required";
    } else if (!/^\d+$/.test(formData.contactNo)) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    //console.log(formData);

    axios
      .post("http://localhost:3010/Student/addStudent", formData)
      .then(() => {
        alert("Student added successfully");
      })
      .catch((err) => {
        alert(err);
      });

    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      setSubmissionMessage("Registration successful!");
      console.log("Form submitted:", formData);
    } else {
      setFormErrors(errors);
    }
  };

  const handleCalculateDistance = async () => {
    const apiKey = "API key";
    const fixedLocation = "7.464703061231379, 80.02165005401687";

    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/distancematrix/json",
        {
          params: {
            origins: fixedLocation,
            destinations: formData.address,
            key: apiKey,
          },
        }
      );

      console.log("API Response:", response.data);

      // Check if the necessary properties exist in the response
      if (
        response.data.rows &&
        response.data.rows.length > 0 &&
        response.data.rows[0].elements &&
        response.data.rows[0].elements.length > 0 &&
        response.data.rows[0].elements[0].distance &&
        response.data.rows[0].elements[0].distance.text
      ) {
        // Extract distance from the response
        const distance = response.data.rows[0].elements[0].distance.text;

        // Use the distance as needed
        setFormData((prevFormData) => ({
          ...prevFormData,
          distance: distance || "",
        }));
      } else {
        console.error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching distance:", error);
    }
  };

  return (
    <div
      className="container-fluid fixed my-4"
      style={{
        backgroundColor: "#ccfeed",
        border: "2px solid #",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <div className="text-center mb-4">
        <h2 className="mt-4 mb-4">Student Registration</h2>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">
            Full Name:
          </label>
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

        <div className="col-md-6">
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
              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="" disabled>
                  Select a district
                </option>
                <option value="Colombo">Colombo</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Kandy">Kandy</option>
                <option value="Matale">Matale</option>
                <option value="Nuwara Eliya">Nuwara Eliya</option>
                <option value="Galle">Galle</option>
                <option value="Matara">Matara</option>
                <option value="Hambantota">Hambantota</option>
                <option value="Jaffna">Jaffna</option>
                <option value="Kilinochchi">Kilinochchi</option>
                <option value="Mannar">Mannar</option>
                <option value="Vavuniya">Vavuniya</option>
                <option value="Mullaitivu">Mullaitivu</option>
                <option value="Batticaloa">Batticaloa</option>
                <option value="Ampara">Ampara</option>
                <option value="Trincomalee">Trincomalee</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Puttalam">Puttalam</option>
                <option value="Kegalle">Kegalle</option>
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Polonnaruwa">Polonnaruwa</option>
                <option value="Badulla">Badulla</option>
                <option value="Monaragala">Monaragala</option>
                <option value="Ratnapura">Ratnapura</option>
              </select>
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
              <select
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="" disabled>
                  Select a province
                </option>
                <option value="Western">Western</option>
                <option value="Central">Central</option>
                <option value="Southern">Southern</option>
                <option value="Northern">Northern</option>
                <option value="Eastern">Eastern</option>
                <option value="North Western">North Western</option>
                <option value="North Central">North Central</option>
                <option value="Uva">Uva</option>
                <option value="Sabaragamuwa">Sabaragamuwa</option>
              </select>
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

            <div className="form-group mt-3">
              <label htmlFor="distance">Distance to University</label>
              <div className="row align-items-start">
                <div className="col-6 md-ms-auto">
                  <input
                    type="text"
                    id="distance"
                    name="distance"
                    value={formData.distance}
                    onChange={handleChange}
                    className="form-control"
                    required
                    readOnly="true"
                    disabled
                  />
                </div>
                <div className="col-auto">
                  <button
                    type="button"
                    onClick={handleCalculateDistance}
                    className="btn btn-outline-primary"
                  >
                    Check Distance
                  </button>
                </div>
              </div>
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
            type="submit"
            className="btn btn-success"
            style={{ backgroundColor: "blue" }}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-4"
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
        {submissionMessage && <p className="success">{submissionMessage}</p>}
      </form>
    </div>
  );
};

export default StudentRegistrationForm;
