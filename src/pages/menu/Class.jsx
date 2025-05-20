import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClassSchedule } from "../../features/user/userApiSlice";

import {
  selectClassSchedule,
  selectClassScheduleLoading,
  selectClassScheduleError,
} from "../../features/user/userSlice";

import "../../styles/class.css";

const Class = () => {
  const dispatch = useDispatch();

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");

  const classSchedule = useSelector(selectClassSchedule);
  const loading = useSelector(selectClassScheduleLoading);
  const error = useSelector(selectClassScheduleError);

  // Effect to fetch data when semester or year parameters change
  useEffect(() => {
    console.log("ClassSchedule.jsx: Effect triggered. Params:", {
      selectedYear,
      selectedSeason,
    });

    if (selectedYear && selectedSeason) {
      console.log(
        "ClassSchedule.jsx: Dispatching getClassSchedule thunk with params:",
        { selectedYear, selectedSeason },
      );
      dispatch(
        getClassSchedule({
          semester_year: selectedYear,
          semester_season: selectedSeason,
        }),
      );
    } else {
      console.log(
        "ClassSchedule.jsx: Missing parameters, not dispatching getClassSchedule.",
      );
    }
  }, [dispatch, selectedYear, selectedSeason]);

  useEffect(() => {
    console.log(
      "ClassSchedule.jsx useEffect: Class schedule data state:",
      classSchedule,
    );
  }, [classSchedule]);

  return (
    <div className="class-schedule-container">
      <h2>Class Schedule</h2>

      <div className="parameter-selection">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select Year</option>

          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>

        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
        >
          <option value="">Select Season</option>

          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
        </select>
      </div>

      {loading && <p>Loading schedule...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {classSchedule &&
      Array.isArray(classSchedule) &&
      classSchedule.length > 0 &&
      !loading &&
      !error ? (
        <div className="schedule-table-wrapper">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Section No</th>
                <th>Day</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Faculty ID</th>
              </tr>
            </thead>
            <tbody>
              {classSchedule.map((scheduleItem, index) => (
                <tr
                  key={`${scheduleItem.course_id}-${scheduleItem.section_no}-${scheduleItem.day}-${index}`}
                >
                  <td data-label="Course ID:">{scheduleItem.course_id}</td>
                  <td data-label="Section No:">{scheduleItem.section_no}</td>
                  <td data-label="Day:">{scheduleItem.day}</td>
                  <td data-label="Start Time:">{scheduleItem.start_time}</td>
                  <td data-label="End Time:">{scheduleItem.end_time}</td>
                  <td data-label="Faculty ID:">
                    {scheduleItem.faculty_short_id || "TBA"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Display message if not loading/error and no schedule data is available
        !loading &&
        !error && (
          <p>No class schedule found for the selected semester and year.</p>
        )
      )}
    </div>
  );
};

export default Class;
