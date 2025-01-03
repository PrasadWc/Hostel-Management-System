// EligibleStudentsList.js
import React from "react";

const EligibleStudentsList = ({ studentIds }) => {
  return (
    <div>
      <h2>Eligible Students List</h2>
      <ul>
        {studentIds.map((studentId) => (
          <li key={studentId}>ID: {studentId}</li>
        ))}
      </ul>
    </div>
  );
};

export default EligibleStudentsList;
