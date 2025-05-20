import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getStudent } from "../../features/user/userApiSlice";

import {
  selectUserLoading,
  selectUserError,
  selectStudentProfile,
} from "../../features/user/userSlice";
import "../../styles/profile.css";

const Profile = () => {
  const dispatch = useDispatch();

  const studentProfile = useSelector(selectStudentProfile);

  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  useEffect(() => {
    dispatch(getStudent());
  }, [dispatch]);

  useEffect(() => {
    if (studentProfile) {
      console.log(
        "Profile.jsx useEffect: Student profile data available:",
        studentProfile,
      );
    } else {
      console.log(
        "Profile.jsx useEffect: Student profile data is null or undefined.",
      );
    }
  }, [studentProfile]);

  return (
    <div className="welcome-content">
      <h2>Student Profile</h2>

      {loading && <p>Loading profile...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {studentProfile ? (
        <div className="profile-table-wrapper">
          <table className="profile-table">
            <tbody>
              <tr>
                <td className="label">Name:</td>
                <td>
                  {studentProfile?.first_name} {studentProfile?.last_name}
                </td>
              </tr>
              <tr>
                <td className="label">Student ID:</td>
                <td>{studentProfile?.id}</td>
              </tr>
              <tr>
                <td className="label">Email:</td>
                <td>{studentProfile?.email}</td>
              </tr>
              <tr>
                <td className="label">Mobile No:</td>
                <td>{studentProfile?.mobile_no}</td>
              </tr>
              <tr>
                <td className="label">Department:</td>
                <td>{studentProfile?.dept_short_name}</td>
              </tr>
              <tr>
                <td className="label">Dismissed:</td>
                <td>{studentProfile?.is_dismissed ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="label">Address:</td>
                <td>{studentProfile?.address}</td>
              </tr>
              <tr>
                <td className="label">Guardian Name:</td>
                <td>{studentProfile?.gardian_name}</td>
              </tr>
              <tr>
                <td className="label">Guardian Phone:</td>
                <td>{studentProfile?.gardian_phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        !loading &&
        !error && (
          <div className="user">
            <p>Student profile not available.</p>
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
