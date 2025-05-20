import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { gradeReport } from "../../features/user/userApiSlice";

import {
  selectGradeReportData,
  selectGradeReportLoading,
  selectGradeReportError,
} from "../../features/user/userSlice";

import "../../styles/gradeReport.css";

const GradeReport = () => {
  const dispatch = useDispatch();

  const gradeReportData = useSelector(selectGradeReportData);
  const loading = useSelector(selectGradeReportLoading);
  const error = useSelector(selectGradeReportError);

  useEffect(() => {
    console.log("GradeReport.jsx: Dispatching gradeReport thunk on mount.");
    dispatch(gradeReport());
  }, [dispatch]);

  useEffect(() => {
    console.log(
      "GradeReport.jsx useEffect: Grade report data state:",
      gradeReportData,
    );
  }, [gradeReportData]);

  return (
    <div className="grade-report-container">
      <h2>Grade Report</h2>

      {loading && <p>Loading grade report...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {gradeReportData && !loading && !error ? (
        <div className="report-details">
          <div className="cgpa-section">
            <h3>
              Cumulative CGPA:
              {gradeReportData.cumulativeCGPA !== undefined &&
              gradeReportData.cumulativeCGPA !== null
                ? parseFloat(gradeReportData.cumulativeCGPA).toFixed(2)
                : "N/A"}
            </h3>
          </div>

          {/* Display Semester-wise Results */}
          {gradeReportData.semesterWiseResults &&
            Array.isArray(gradeReportData.semesterWiseResults) &&
            gradeReportData.semesterWiseResults.length > 0 && (
              <div className="semester-results-section">
                <h3>Semester-wise CGPA</h3>
                <ul className="semester-list">
                  {gradeReportData.semesterWiseResults.map(
                    (semesterResult, index) => (
                      <li
                        key={`${semesterResult.year}-${semesterResult.semester}-${index}`}
                        className="semester-item"
                      >
                        {/* Display semester and year, and CGPA */}
                        <strong>
                          {semesterResult.year} {semesterResult.semester}:
                        </strong>
                        {/* Use optional chaining and toFixed for formatting */}
                        {semesterResult.cgpa !== undefined &&
                        semesterResult.cgpa !== null
                          ? parseFloat(semesterResult.cgpa).toFixed(2)
                          : "N/A"}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

          {/* Display Course List */}
          {gradeReportData.courses &&
            Array.isArray(gradeReportData.courses) &&
            gradeReportData.courses.length > 0 && (
              <div className="courses-section">
                <h3>Courses</h3>

                <div className="course-table-wrapper">
                  <table className="course-table">
                    <thead>
                      <tr>
                        <th>Course ID</th>
                        <th>Credit</th>
                        <th>Grade</th>
                        <th>Year</th>
                        <th>Semester</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gradeReportData.courses.map((course, index) => (
                        <tr key={course.course_id + "-" + index}>
                          <td data-label="Course ID:">{course.course_id}</td>
                          <td data-label="Credit:">{course.course_credit}</td>
                          <td data-label="Grade:">{course.grade}</td>
                          <td data-label="Year:">{course.year}</td>
                          <td data-label="Semester:">{course.semester}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          {/* Message if no course data is available but report data exists */}
          {gradeReportData.courses &&
            Array.isArray(gradeReportData.courses) &&
            gradeReportData.courses.length === 0 && (
              <p>No course details found in the report.</p>
            )}
          {/* Also handle case where courses might be null/undefined but other data exists */}
          {!gradeReportData.courses &&
            (gradeReportData.semesterWiseResults ||
              gradeReportData.cumulativeCGPA !== undefined) && (
              <p>No course details found in the report.</p>
            )}
        </div>
      ) : (
        !loading && !error && <p>No grade report found.</p>
      )}
    </div>
  );
};

export default GradeReport;
