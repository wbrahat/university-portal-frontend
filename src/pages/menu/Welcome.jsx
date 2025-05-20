import React, { useEffect } from "react";
import "../../styles/welcome.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";

const Welcome = () => {
  const user = useSelector(selectUser);

  useEffect(() => {
    console.log("Welcome.jsx: User state from Redux:", user);
    if (user) {
      console.log("Welcome.jsx: User data available:", user);
    } else {
      console.log("Welcome.jsx: User data is null or undefined.");
    }
  }, [user]);

  return (
    <div className="welcome-content">
      <h2>Left-Right University</h2>

      {user ? (
        <div className="user">
          <p>
            Welcome - {user?.first_name} {user?.last_name}
          </p>
          <p>{user?.id}</p>
          <p>{user?.email}</p>
        </div>
      ) : (
        <div className="user">
          <p>Getting user info...</p>
        </div>
      )}

      <p>
        Welcome to your university portal dashboard. Use the menu on the left to
        navigate.
      </p>
    </div>
  );
};

export default Welcome;
