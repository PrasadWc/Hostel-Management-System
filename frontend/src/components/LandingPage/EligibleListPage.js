// EligibleListPage.js
import React from "react";

const EligibleListPage = ({ studentIndexNumbers }) => {
  return (
    <div>
      <h2>Eligible Students List</h2>
      <ul>
        {studentIndexNumbers.map((student, index) => (
          <li key={index}>
            UniRegNo: {student.uniRegNo}, Distance: {student.distance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EligibleListPage;
