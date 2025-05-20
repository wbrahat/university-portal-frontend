import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getIsAdvising } from "../../features/user/userApiSlice";

import {
  selectIsAdvising,
  selectIsAdvisingLoading,
  selectIsAdvisingError,
} from "../../features/user/userSlice";

import "../../styles/advising.css";

const Advising = () => {
  const dispatch = useDispatch();

  const isAdvising = useSelector(selectIsAdvising);
  const loading = useSelector(selectIsAdvisingLoading);
  const error = useSelector(selectIsAdvisingError);

  useEffect(() => {
    dispatch(getIsAdvising());
  }, [dispatch]);

  return (
    <div className="advising-container">
      <h2>Advising Status</h2>

      {loading && <p>Loading status...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {!loading && !error && (
        <div className="status-display">
          {isAdvising ? (
            <p className="status-active">Advising is currently **ACTIVE**.</p>
          ) : (
            <p className="status-inactive">
              Advising is currently **INACTIVE**.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Advising;
