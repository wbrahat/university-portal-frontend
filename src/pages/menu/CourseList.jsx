import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import the necessary thunks
import { getCourses, getCourseInfo } from "../../features/user/userApiSlice";

// Import the necessary selectors
import {
  selectCourseList,
  selectCourseListLoading,
  selectCourseListError,
  selectCourseInfo,
  selectCourseInfoLoading,
  selectCourseInfoError,
} from "../../features/user/userSlice";

import "../../styles/courseList.css";

const CourseList = () => {
  const dispatch = useDispatch();

  const [selectedDept, setSelectedDept] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [selectedCourseIdForDetails, setSelectedCourseIdForDetails] =
    useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const courseList = useSelector(selectCourseList);
  const loading = useSelector(selectCourseListLoading);
  const error = useSelector(selectCourseListError);

  const courseDetails = useSelector(selectCourseInfo);
  const detailsLoading = useSelector(selectCourseInfoLoading);
  const detailsError = useSelector(selectCourseInfoError);

  useEffect(() => {
    if (selectedDept && selectedSemester && selectedYear) {
      dispatch(
        getCourses({
          dept_short_name: selectedDept,
          semester: selectedSemester,
          year: selectedYear,
        }),
      );
    } else {
      console.log(
        "CourseList.jsx: Missing parameters, not dispatching getCourses.",
      );
    }
  }, [dispatch, selectedDept, selectedSemester, selectedYear]);

  // Effect to fetch details for a specific course when selected
  useEffect(() => {
    if (selectedCourseIdForDetails && selectedSemester && selectedYear) {
      dispatch(
        getCourseInfo({
          course_id: selectedCourseIdForDetails,
          semester: selectedSemester,
          year: selectedYear,
        }),
      );

      setShowDetailsModal(true);
    }
  }, [dispatch, selectedCourseIdForDetails, selectedSemester, selectedYear]);

  const handleViewDetails = (courseId) => {
    if (!selectedSemester || !selectedYear) {
      alert(
        "Please select a semester and year from the form above to view course details.",
      );
      return;
    }

    setSelectedCourseIdForDetails(courseId);
  };

  // Handler to close the details modal
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedCourseIdForDetails(null);
  };

  return (
    <div className="course-list-container">
      <h2>Course List</h2>

      <div className="parameter-selection">
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="">Select Department</option>

          <option value="CSE">Computer Science</option>
          <option value="EEE">Electrical Engineering</option>
          <option value="BBA">Business Administration</option>
        </select>

        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          <option value="">Select Semester</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select Year</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>

      {loading && <p>Loading courses...</p>}
      {error && (
        <p className="error-message">Error fetching course list: {error}</p>
      )}

      {/* Course List Table */}
      {!loading && !error && (
        <div className="course-list-table-wrapper">
          <table className="course-list-table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Title</th>
                <th>Credit</th>
                <th>Section</th>
                <th>Capacity</th>
                <th>Enrolled</th>
                <th>Room</th>
                <th>Building</th>
                <th>Day</th>
                <th>Time</th>
                <th>Faculty</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {courseList &&
              Array.isArray(courseList) &&
              courseList.length > 0 ? (
                courseList.map((section, index) => (
                  <tr
                    key={`${section.course_id}-${section.section_no}-${index}`}
                  >
                    <td data-label="Course ID:">{section.course_id}</td>
                    <td data-label="Title:">{section.course_title}</td>
                    <td data-label="Credit:">{section.credit_hours}</td>
                    <td data-label="Section:">{section.section_no}</td>
                    <td data-label="Capacity:">{section.capacity}</td>
                    <td data-label="Enrolled:">
                      {section.enrolled_students || 0}
                    </td>
                    <td data-label="Room:">{section.room_no || "TBA"}</td>
                    <td data-label="Building:">{section.building || "TBA"}</td>
                    <td data-label="Day:">{section.day || "TBA"}</td>
                    <td data-label="Time:">{`${
                      section.start_time || "TBA"
                    } - ${section.end_time || "TBA"}`}</td>
                    <td data-label="Faculty:">{`${
                      section.faculty_first_name || "TBA"
                    } ${section.faculty_last_name || ""}`}</td>
                    <td>
                      <button
                        onClick={() => handleViewDetails(section.course_id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={12} // Adjust colspan to match the number of columns
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    {!selectedDept || !selectedSemester || !selectedYear
                      ? "Please select department, semester, and year to view courses."
                      : "No courses found for the selected criteria."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Course Details Modal/Section */}
      {showDetailsModal && (
        <div className="course-details-modal-overlay">
          <div className="course-details-modal-content">
            <button className="close-button" onClick={closeDetailsModal}>
              &times;
            </button>

            <h3>Details for Course: {selectedCourseIdForDetails}</h3>

            {detailsLoading && <p>Loading course details...</p>}
            {detailsError && (
              <p className="error-message">
                Error fetching details: {detailsError}
              </p>
            )}

            {courseDetails &&
            Array.isArray(courseDetails) &&
            courseDetails.length > 0 &&
            !detailsLoading &&
            !detailsError ? (
              <div>
                <h4>Common Course Information</h4>
                <p>
                  <strong>Title:</strong> {courseDetails[0].course_title}
                </p>
                <p>
                  <strong>Credit Hours:</strong> {courseDetails[0].credit_hours}
                </p>
                <p>
                  <strong>Prerequisite Credit:</strong>
                  {courseDetails[0].prerequisite_credit || "N/A"}
                </p>
                <p>
                  <strong>Course Fee:</strong>
                  {courseDetails[0].course_fee || "N/A"}
                </p>
                <p>
                  <strong>Prerequisites:</strong>
                  {courseDetails[0].prerequisites &&
                  courseDetails[0].prerequisites.length > 0
                    ? courseDetails[0].prerequisites.join(", ")
                    : "None"}
                </p>

                <h4>Available Sections</h4>

                {courseDetails.map((section, sectionIndex) => (
                  <div
                    key={section.section_no + "-" + sectionIndex}
                    className="section-detail-block"
                  >
                    <h5>~ Section {section.section_no} ~</h5>
                    <p>
                      <strong>Capacity:</strong> {section.capacity}
                    </p>
                    <p>
                      <strong>Enrolled:</strong>{" "}
                      {section.enrolled_students || 0}
                    </p>
                    <p>
                      <strong>Room:</strong> {section.room_no || "TBA"} (
                      {section.building || "TBA"})
                    </p>
                    <p>
                      <strong>Day:</strong> {section.day || "TBA"}
                    </p>
                    <p>
                      <strong>Time:</strong> {section.start_time || "TBA"} -{" "}
                      {section.end_time || "TBA"}
                    </p>
                    <p>
                      <strong>Faculty:</strong>{" "}
                      {section.faculty_first_name || "TBA"}{" "}
                      {section.faculty_last_name || ""}
                    </p>
                    <p>
                      <strong>Faculty Email:</strong>{" "}
                      {section.faculty_email || "N/A"}
                    </p>
                    <p>
                      <strong>Faculty Room:</strong>{" "}
                      {section.faculty_room || "TBA"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              // Message if no details are found after fetch
              !detailsLoading &&
              !detailsError &&
              selectedCourseIdForDetails && (
                <p>
                  No details found for this course in the selected
                  semester/year.
                </p>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
