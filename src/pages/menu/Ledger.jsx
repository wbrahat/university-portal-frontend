import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTutionFees,
  getTutionHistory,
} from "../../features/user/userApiSlice";

import {
  selectTuitionFees,
  selectTuitionFeesLoading,
  selectTuitionFeesError,
  selectTuitionHistory, // Assuming selectTuitionHistory exists/will be created
  selectTuitionHistoryLoading, // Assuming selectTuitionHistoryLoading exists/will be created
  selectTuitionHistoryError, // Assuming selectTuitionHistoryError exists/will be created
} from "../../features/user/userSlice";

import "../../styles/ledger.css";

const Ledger = () => {
  const dispatch = useDispatch();

  const [activeView, setActiveView] = useState("fees");

  const tuitionFees = useSelector(selectTuitionFees);
  const tuitionFeesLoading = useSelector(selectTuitionFeesLoading);
  const tuitionFeesError = useSelector(selectTuitionFeesError);

  // Select tuition history state from Redux (assuming selectors exist)
  const tuitionHistory = useSelector(selectTuitionHistory);
  const tuitionHistoryLoading = useSelector(selectTuitionHistoryLoading);
  const tuitionHistoryError = useSelector(selectTuitionHistoryError);

  // Effect to fetch data when the component mounts
  useEffect(() => {
    console.log("Ledger.jsx: Dispatching data thunks on mount.");

    dispatch(getTutionFees());
    dispatch(getTutionHistory());
  }, [dispatch]);

  useEffect(() => {
    console.log("Ledger.jsx useEffect: Tuition Fees state:", tuitionFees);
  }, [tuitionFees]);

  useEffect(() => {
    console.log("Ledger.jsx useEffect: Tuition History state:", tuitionHistory);
  }, [tuitionHistory]);

  const handleShowFees = () => {
    setActiveView("fees");
    console.log("Ledger.jsx: Switched to Fees view.");
  };

  const handleShowHistory = () => {
    setActiveView("history");
    console.log("Ledger.jsx: Switched to History view.");
  };

  return (
    <div className="ledger-container">
      <h2>Accounts Ledger</h2>

      <div className="view-switcher">
        <button
          className={`switcher-button ${activeView === "fees" ? "active" : ""}`}
          onClick={handleShowFees}
          disabled={tuitionFeesLoading || tuitionHistoryLoading}
        >
          Tuition Fees
        </button>
        <button
          className={`switcher-button ${activeView === "history" ? "active" : ""}`}
          onClick={handleShowHistory}
          disabled={tuitionFeesLoading || tuitionHistoryLoading}
        >
          Tuition History
        </button>
      </div>

      {(tuitionFeesLoading || tuitionHistoryLoading) && <p>Loading data...</p>}
      {(tuitionFeesError || tuitionHistoryError) && (
        <p className="error-message">
          Error: {tuitionFeesError || tuitionHistoryError}
        </p>
      )}

      {activeView === "fees" && (
        <div className="fees-section">
          <h3>Current Tuition Fees</h3>

          {tuitionFees && !tuitionFeesLoading ? (
            <div className="data-display">
              <p>Currency: ${tuitionFees.currency}</p>
              <p>Total Fees: ${tuitionFees.totalFees}</p>
              <p>Due Amount: ${tuitionFees.dueAmount}</p>
              <p>Total Paid: ${tuitionFees.totalFees}</p>
            </div>
          ) : (
            !tuitionFeesLoading &&
            !tuitionFeesError && <p>No tuition fees data available.</p>
          )}
        </div>
      )}

      {activeView === "history" && (
        <div className="history-section">
          <h3>Tuition History</h3>

          {tuitionHistory &&
          Array.isArray(tuitionHistory) &&
          tuitionHistory.length > 0 &&
          !tuitionHistoryLoading &&
          !tuitionHistoryError ? (
            <div className="data-display">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Payment Time</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {tuitionHistory.map((transaction) => (
                    <tr key={transaction.id}>
                      <td data-label="Payment Time:">
                        {new Date(transaction.paytime).toLocaleString()}
                      </td>
                      <td data-label="Amount:">{transaction.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Display message if not loading/error and history list is empty
            !tuitionHistoryLoading &&
            !tuitionHistoryError && <p>No tuition history found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Ledger;
