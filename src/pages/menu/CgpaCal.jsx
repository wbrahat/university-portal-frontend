import React, { useState } from "react";
// Assuming your CgpaCalculator utility is available in a shared or frontend utility folder
import CgpaCalculator from "../../utility/cgpaCalculator.js"; // VERIFY THIS IMPORT PATH

import "../../styles/cgpaCal.css"; // Assuming your cgpaCal.css is here

const CgpaCal = () => {
  // Each course object will store the user's input for grade (gpa) and credit.
  const [courses, setCourses] = useState([]);

  // State for the input fields where the user enters details for a new course.
  const [newCourseInput, setNewCourseInput] = useState({ gpa: "", credit: "" });

  // State to hold the final calculated CGPA, will be null initially.
  const [calculatedCgpa, setCalculatedCgpa] = useState(null);

  // State to hold any error messages for user feedback.
  const [error, setError] = useState(null);

  // Handles changes in the input fields (GPA and Credit).
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourseInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleAddCourse = () => {
    const gpa = parseFloat(newCourseInput.gpa);
    const credit = parseFloat(newCourseInput.credit);

    // GPA should be non-negative, credit should be positive.
    if (isNaN(gpa) || isNaN(credit) || gpa < 0 || credit <= 0) {
      setError("Please enter valid positive numbers for GPA and Credit.");
      return;
    }

    setCourses((prevCourses) => [...prevCourses, { gpa, credit }]);

    setNewCourseInput({ gpa: "", credit: "" });
    setError(null);
    setCalculatedCgpa(null);
  };

  const handleCalculateCgpa = () => {
    if (courses.length === 0) {
      setError("Please add some courses to calculate CGPA.");
      setCalculatedCgpa(null);
      return;
    }

    const dataForCalculation = courses.map((course) => ({
      grade: course.gpa,
      course_credit: course.credit,
    }));

    const cgpa = CgpaCalculator.calculateFromSQL(dataForCalculation);

    setCalculatedCgpa(cgpa);
    setError(null);
  };

  const handleRemoveCourse = (indexToRemove) => {
    setCourses((prevCourses) =>
      prevCourses.filter((_, index) => index !== indexToRemove),
    );
    setCalculatedCgpa(null);
    setError(null);
  };

  return (
    <div className="cgpa-cal-container">
      <h2>CGPA Calculator</h2>

      <div className="input-form">
        <input
          type="number"
          name="gpa"
          placeholder="Enter GPA (e.g., 3.75)"
          value={newCourseInput.gpa}
          onChange={handleInputChange}
          step="0.01" // Allow decimal input with two decimal places
          min="0" // Minimum possible GPA
          max="4" // Maximum possible GPA
        />
        <input
          type="number"
          name="credit"
          placeholder="Enter Credit Hours (e.g., 3)"
          value={newCourseInput.credit}
          onChange={handleInputChange}
          step="0.5" // Allow half credits
          min="0.5" // Minimum possible credit hours
        />

        <button onClick={handleAddCourse}>Add Course</button>
      </div>

      {courses.length > 0 && (
        <div className="added-courses">
          <h3>Added Courses:</h3>
          <ul>
            {courses.map((course, index) => (
              <li key={index}>
                Course {index + 1}: GPA - {course.gpa}, Credit - {course.credit}
                <button
                  className="remove-button"
                  onClick={() => handleRemoveCourse(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        className="calculate-button"
        onClick={handleCalculateCgpa}
        disabled={courses.length === 0}
      >
        Calculate CGPA
      </button>

      {calculatedCgpa !== null && (
        <div className="result">
          <h3>Calculated CGPA: {calculatedCgpa}</h3>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CgpaCal;
