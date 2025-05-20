import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import necessary thunks
import {
  getFaculty, // Thunk to get the list of all faculties
  getFacultyInfo, // Thunk to get details for a specific faculty
  getFacultyTeaches, // Thunk to get courses taught by a faculty
} from "../../features/user/userApiSlice";

// Import necessary selectors
import {
  selectFacultyList,
  selectFacultyLoading,
  selectFacultyError,
  selectFacultyInfo, // Selector for specific faculty info
  selectFacultyInfoLoading,
  selectFacultyInfoError,
  selectFacultyTeaches, // Selector for faculty teaches data
  selectFacultyTeachesLoading,
  selectFacultyTeachesError,
} from "../../features/user/userSlice";

import "../../styles/faculty.css";

const Faculty = () => {
  const dispatch = useDispatch();

  const [selectedFacultyId, setSelectedFacultyId] = useState(null);

  const [selectedTeachesSemester, setSelectedTeachesSemester] = useState("");
  const [selectedTeachesYear, setSelectedTeachesYear] = useState("");

  const facultyList = useSelector(selectFacultyList);
  const loading = useSelector(selectFacultyLoading);
  const error = useSelector(selectFacultyError);

  const facultyInfo = useSelector(selectFacultyInfo);
  const facultyInfoLoading = useSelector(selectFacultyInfoLoading);
  const facultyInfoError = useSelector(selectFacultyInfoError);

  const facultyTeaches = useSelector(selectFacultyTeaches);
  const facultyTeachesLoading = useSelector(selectFacultyTeachesLoading);
  const facultyTeachesError = useSelector(selectFacultyTeachesError);

  useEffect(() => {
    console.log("Faculty.jsx: Dispatching getFaculty thunk to get list.");
    dispatch(getFaculty());
  }, [dispatch]);

  // Effect to fetch specific faculty info when selectedFacultyId changes
  useEffect(() => {
    if (selectedFacultyId) {
      console.log(
        `Faculty.jsx: Dispatching getFacultyInfo for ID: ${selectedFacultyId}`,
      );
      dispatch(getFacultyInfo({ faculty_short_id: selectedFacultyId }));

      setSelectedTeachesSemester("");
      setSelectedTeachesYear("");
    }
  }, [dispatch, selectedFacultyId]);

  // Effect to fetch faculty teaches data when selectedFacultyId, semester, or year changes
  useEffect(() => {
    if (selectedFacultyId && selectedTeachesSemester && selectedTeachesYear) {
      dispatch(
        getFacultyTeaches({
          faculty_short_id: selectedFacultyId,
          semester: selectedTeachesSemester,
          year: selectedTeachesYear,
        }),
      );
    }
  }, [
    dispatch,
    selectedFacultyId,
    selectedTeachesSemester,
    selectedTeachesYear,
  ]);

  const handleSelectFaculty = (facultyId) => {
    if (selectedFacultyId === facultyId) {
      setSelectedFacultyId(null);
    } else {
      setSelectedFacultyId(facultyId);
    }
  };

  return (
    <div className="faculty-container">
      <h2>Faculty List</h2>
      <p>~ Click on desired faculty to get more info ~</p>
      {loading && <p>Loading faculties...</p>}
      {error && (
        <p className="error-message">Error fetching faculty list: {error}</p>
      )}

      {/* Faculty List Table */}
      {facultyList &&
      Array.isArray(facultyList) &&
      facultyList.length > 0 &&
      !loading &&
      !error ? (
        <div className="faculty-list-table-wrapper">
          <table className="faculty-list-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Faculty ID</th>
                <th>Email</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {facultyList.map((faculty) => (
                <tr
                  key={faculty.faculty_short_id}
                  onClick={() => handleSelectFaculty(faculty.faculty_short_id)}
                  className={
                    selectedFacultyId === faculty.faculty_short_id
                      ? "selected-row"
                      : ""
                  } // Add class for selected row styling
                  style={{ cursor: "pointer" }}
                >
                  <td data-label="Name:">{faculty.full_name}</td>
                  <td data-label="Faculty ID:">{faculty.faculty_short_id}</td>
                  <td data-label="Email:">{faculty.email || "N/A"}</td>
                  <td data-label="Department:">{faculty.dept_short_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && !error && <p>No faculties found.</p>
      )}

      {selectedFacultyId && (
        <div className="faculty-details-section">
          <h3>Faculty Details</h3>

          {facultyInfoLoading && <p>Loading faculty info...</p>}
          {facultyInfoError && (
            <p className="error-message">
              Error fetching faculty info: {facultyInfoError}
            </p>
          )}

          {/* Display Faculty Info if available */}
          {facultyInfo && !facultyInfoLoading && !facultyInfoError ? (
            <div className="faculty-info-block">
              <p>
                <strong>Name:</strong> {facultyInfo.full_name}
              </p>
              <p>
                <strong>Faculty ID:</strong> {facultyInfo.faculty_short_id}
              </p>
              <p>
                <strong>Email:</strong> {facultyInfo.email || "N/A"}
              </p>
              <p>
                <strong>Department:</strong>{" "}
                {facultyInfo.department_name || facultyInfo.dept_short_name}
              </p>{" "}
              {/* Use long name if available */}
              <p>
                <strong>Room:</strong> {facultyInfo.room_no || "TBA"} (
                {facultyInfo.building || "TBA"})
              </p>
            </div>
          ) : (
            !facultyInfoLoading &&
            !facultyInfoError && (
              <p>No details found for the selected faculty.</p>
            )
          )}

          {/* Section for Faculty Teaches */}
          <div className="faculty-teaches-section">
            <h4>Courses Taught</h4>

            <div className="teaches-parameter-selection">
              <select
                value={selectedTeachesYear}
                onChange={(e) => setSelectedTeachesYear(e.target.value)}
              >
                <option value="">Select Year</option>

                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
              <select
                value={selectedTeachesSemester}
                onChange={(e) => setSelectedTeachesSemester(e.target.value)}
              >
                <option value="">Select Semester</option>

                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Fall">Fall</option>
              </select>
            </div>

            {facultyTeachesLoading && <p>Loading courses taught...</p>}
            {facultyTeachesError && (
              <p className="error-message">
                Error fetching courses taught: {facultyTeachesError}
              </p>
            )}

            {/* Display Faculty Teaches Data if available */}
            {facultyTeaches &&
            Array.isArray(facultyTeaches) &&
            facultyTeaches.length > 0 &&
            !facultyTeachesLoading &&
            !facultyTeachesError ? (
              <div className="faculty-teaches-table-wrapper">
                <table className="faculty-teaches-table">
                  <thead>
                    <tr>
                      <th>Course ID</th>
                      <th>Title</th>
                      <th>Section</th>
                      <th>Room</th>
                      <th>Day</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facultyTeaches.map((course, index) => (
                      <tr
                        key={
                          course.course_id +
                          "-" +
                          course.section_no +
                          "-" +
                          index
                        }
                      >
                        <td data-label="Course ID:">{course.course_id}</td>
                        <td data-label="Title:">{course.course_title}</td>
                        <td data-label="Section:">{course.section_no}</td>
                        <td data-label="Room:">{course.room_no || "TBA"}</td>
                        <td data-label="Day:">{course.day || "TBA"}</td>
                        <td data-label="Time:">{`${course.start_time || "TBA"} - ${course.end_time || "TBA"}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              selectedFacultyId &&
              selectedTeachesSemester &&
              selectedTeachesYear &&
              !facultyTeachesLoading &&
              !facultyTeachesError && (
                <p>
                  No courses found for this faculty in the selected semester and
                  year.
                </p>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Faculty;
