import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getIsFacEval,
  getCurrentSemester,
  getEvaluatableFaculties,
  evaluateFaculty,
} from "../../features/user/userApiSlice";

import {
  selectIsFacEval,
  selectIsFacEvalLoading,
  selectIsFacEvalError,
  selectCurrentSemester,
  selectCurrentSemesterLoading,
  selectCurrentSemesterError,
  selectEvaluatableFaculties,
  selectEvaluatableFacultiesLoading,
  selectEvaluatableFacultiesError,
  selectEvaluateFacultyStatus,
  selectEvaluateFacultyLoading,
  selectEvaluateFacultyError,
  clearEvaluateFacultyStatus,
} from "../../features/user/userSlice";

import "../../styles/facEval.css";

const FacEval = () => {
  const dispatch = useDispatch();

  const [selectedFacultyToEvaluateId, setSelectedFacultyToEvaluateId] =
    useState("");
  const [rating, setRating] = useState(5); // Default rating

  // Select state from Redux
  const isFacEval = useSelector(selectIsFacEval);
  const isFacEvalLoading = useSelector(selectIsFacEvalLoading);
  const isFacEvalError = useSelector(selectIsFacEvalError);

  const currentSemester = useSelector(selectCurrentSemester); // This will be the object { season, year }
  const currentSemesterLoading = useSelector(selectCurrentSemesterLoading);
  const currentSemesterError = useSelector(selectCurrentSemesterError);

  const evaluatableFaculties = useSelector(selectEvaluatableFaculties); // List of faculties to evaluate
  const evaluatableFacultiesLoading = useSelector(
    selectEvaluatableFacultiesLoading,
  );
  const evaluatableFacultiesError = useSelector(
    selectEvaluatableFacultiesError,
  );

  const evaluateFacultyStatus = useSelector(selectEvaluateFacultyStatus);
  const evaluateFacultyLoading = useSelector(selectEvaluateFacultyLoading);
  const evaluateFacultyError = useSelector(selectEvaluateFacultyError);

  // Effect to fetch initial data (evaluation status and current semester)
  useEffect(() => {
    console.log(
      "FacEval.jsx: Dispatching getIsFacEval and getCurrentSemester thunks on mount.",
    );
    dispatch(getIsFacEval());
    dispatch(getCurrentSemester());
  }, [dispatch]);

  // Effect to fetch evaluatable faculties once current semester is available
  useEffect(() => {
    if (currentSemester && currentSemester.year && currentSemester.season) {
      console.log(
        `FacEval.jsx: Current semester loaded (${currentSemester.season} ${currentSemester.year}). Dispatching getEvaluatableFaculties.`,
      );
      dispatch(
        getEvaluatableFaculties({
          semester: currentSemester.season,
          year: currentSemester.year,
        }),
      );
    } else {
      // Log if currentSemester is not yet available when this effect runs
      console.log(
        "FacEval.jsx useEffect [currentSemester]: currentSemester is not yet available.",
        currentSemester,
      );
    }
  }, [dispatch, currentSemester]);

  // Effect to log state of evaluatableFaculties (for debugging)
  useEffect(() => {
    console.log(
      "FacEval.jsx useEffect [evaluatableFaculties]: evaluatableFaculties state changed:",
      evaluatableFaculties,
    );
    // Add a check here to see the type and content when it changes
    if (evaluatableFaculties) {
      console.log(
        "FacEval.jsx useEffect [evaluatableFaculties]: Type of evaluatableFaculties:",
        typeof evaluatableFaculties,
      );
      console.log(
        "FacEval.jsx useEffect [evaluatableFaculties]: Is it an array?",
        Array.isArray(evaluatableFaculties),
      );
      if (Array.isArray(evaluatableFaculties)) {
        console.log(
          "FacEval.jsx useEffect [evaluatableFaculties]: Number of faculties in array:",
          evaluatableFaculties.length,
        );
        if (evaluatableFaculties.length > 0) {
          console.log(
            "FacEval.jsx useEffect [evaluatableFaculties]: First faculty object:",
            evaluatableFaculties[0],
          );
        }
      }
    }
  }, [evaluatableFaculties]);

  // Effect to log state of evaluatableFacultiesLoading (for debugging)
  useEffect(() => {
    console.log(
      "FacEval.jsx useEffect [evaluatableFacultiesLoading]: evaluatableFacultiesLoading state changed:",
      evaluatableFacultiesLoading,
    );
  }, [evaluatableFacultiesLoading]);

  // Effect to log state of evaluatableFacultiesError (for debugging)
  useEffect(() => {
    console.log(
      "FacEval.jsx useEffect [evaluatableFacultiesError]: evaluatableFacultiesError state changed:",
      evaluatableFacultiesError,
    );
  }, [evaluatableFacultiesError]);

  const handleSubmitEvaluation = (e) => {
    e.preventDefault();

    if (
      !selectedFacultyToEvaluateId ||
      rating === null ||
      rating === undefined
    ) {
      alert("Please select a faculty and provide a rating."); // Basic validation
      return;
    }

    console.log(
      `FacEval.jsx: Submitting evaluation for faculty ID: ${selectedFacultyToEvaluateId} with rating: ${rating}`,
    );
    dispatch(
      evaluateFaculty({
        faculty_short_id: selectedFacultyToEvaluateId,
        rating: Number(rating),
      }),
    );
  };

  return (
    <div className="fac-eval-container">
      {" "}
      {/* Container for styling */}
      <h2>Faculty Evaluation</h2> {/* Updated heading */}
      {/* Display Current Academic Semester Information */}
      <div className="current-semester-info">
        <h3>Current Academic Semester</h3>
        {currentSemesterLoading && <p>Loading current semester...</p>}
        {currentSemesterError && (
          <p className="error-message">
            Error fetching current semester: {currentSemesterError}
          </p>
        )}
        {currentSemester && !currentSemesterLoading && !currentSemesterError ? (
          <p className="semester-display">
            ~ {currentSemester.season} {currentSemester.year} ~
          </p>
        ) : (
          !currentSemesterLoading &&
          !currentSemesterError && (
            <p>Current semester information not available.</p>
          )
        )}
      </div>
      {/* Display Evaluation Period Status */}
      <div className="evaluation-status-section">
        <h3>Evaluation Period Status</h3>
        {isFacEvalLoading && <p>Loading evaluation status...</p>}
        {isFacEvalError && (
          <p className="error-message">
            Error fetching evaluation status: {isFacEvalError}
          </p>
        )}
        {!isFacEvalLoading && !isFacEvalError && (
          <div className="status-display">
            {isFacEval ? (
              <p className="status-active">
                Faculty evaluation is currently **ACTIVE**.
              </p>
            ) : (
              <p className="status-inactive">
                Faculty evaluation is currently **INACTIVE**.
              </p>
            )}
          </div>
        )}
      </div>
      {isFacEval && !isFacEvalLoading && !isFacEvalError && currentSemester && (
        <div className="evaluation-form-section">
          <h3>Submit Evaluation</h3>

          {evaluatableFacultiesLoading && (
            <p>Loading evaluatable faculties...</p>
          )}
          {evaluatableFacultiesError && (
            <p className="error-message">
              Error fetching faculties for evaluation:{" "}
              {evaluatableFacultiesError}
            </p>
          )}

          {!evaluatableFacultiesLoading &&
          !evaluatableFacultiesError &&
          evaluatableFaculties &&
          Array.isArray(evaluatableFaculties) &&
          evaluatableFaculties.length > 0 ? (
            <form onSubmit={handleSubmitEvaluation} className="evaluation-form">
              <div className="form-group">
                <label htmlFor="facultySelect">Select Faculty:</label>
                <select
                  id="facultySelect"
                  value={selectedFacultyToEvaluateId || ""}
                  onChange={(e) =>
                    setSelectedFacultyToEvaluateId(e.target.value)
                  }
                  required
                >
                  <option value="" disabled>
                    -- Select a Faculty --
                  </option>

                  {evaluatableFaculties.map((faculty) => (
                    <option
                      key={faculty.faculty_short_id}
                      value={faculty.faculty_short_id}
                    >
                      {faculty.full_name || faculty.faculty_short_id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ratingInput">Rating (0-10):</label>
                <input
                  type="number"
                  id="ratingInput"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  min="0"
                  max="10"
                  step="1"
                  required
                />
              </div>
              {evaluateFacultyLoading && <p>Submitting evaluation...</p>}
              {evaluateFacultyError && (
                <p className="error-message">
                  Submission failed: {evaluateFacultyError}
                </p>
              )}
              {evaluateFacultyStatus && (
                <p className="success-message">
                  {" "}
                  {/* Add CSS for success message */}
                  {evaluateFacultyStatus}
                </p>
              )}
              <button
                type="submit"
                disabled={
                  evaluateFacultyLoading || !selectedFacultyToEvaluateId
                }
              >
                Submit Evaluation
              </button>
            </form>
          ) : (
            // Message if no faculties available for evaluation (or loading/error occurred)
            !evaluatableFacultiesLoading &&
            !evaluatableFacultiesError &&
            isFacEval &&
            currentSemester && (
              <p>No faculties available for evaluation this semester.</p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default FacEval;
