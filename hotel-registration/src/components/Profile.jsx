// # src/components/Profile.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext'; 

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <h2>Profile</h2>
      {currentUser && (
        <>
          <p>Email: {currentUser.email}</p>
        </>
      )}
    </div>
  );
};

export default Profile;