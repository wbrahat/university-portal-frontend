import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsFacEval,
  getCurrentSemester,
} from "../../features/user/userApiSlice";

import {
  selectIsFacEval,
  selectIsFacEvalLoading,
  selectIsFacEvalError,
  selectCurrentSemester,
  selectCurrentSemesterLoading,
  selectCurrentSemesterError,
} from "../../features/user/userSlice";

import "../../styles/facEval.css";

const FacEval = () => {
  const dispatch = useDispatch();

  const isFacEval = useSelector(selectIsFacEval);
  const isFacEvalLoading = useSelector(selectIsFacEvalLoading);
  const isFacEvalError = useSelector(selectIsFacEvalError);

  const currentSemester = useSelector(selectCurrentSemester);
  const currentSemesterLoading = useSelector(selectCurrentSemesterLoading);
  const currentSemesterError = useSelector(selectCurrentSemesterError);

  useEffect(() => {
    dispatch(getIsFacEval());

    dispatch(getCurrentSemester());
  }, [dispatch]);

  return (
    <div className="fac-eval-container">
      <h2>Faculty Evaluation Status</h2>

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
    </div>
  );
};

export default FacEval;
