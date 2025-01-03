// UserProfile.js
import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      {/* Add more user profile details as needed */}
    </div>
  );
};

export default UserProfile;
