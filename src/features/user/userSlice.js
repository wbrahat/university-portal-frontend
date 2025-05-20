import { createSlice } from "@reduxjs/toolkit";

import {
  getStudent,
  getFaculty,
  getFacultyInfo,
  getFacultyTeaches,
  getTutionHistory,
  getTutionFees,
  gradeReport,
  getCourses,
  getCourseInfo,
  getClassSchedule,
  getIsFacEval,
  getIsAdvising,
  getCurrentSemester,
} from "./userApiSlice";

const userSlice = createSlice({
  name: "user",
  initialState: {
    studentProfile: null,
    facultyList: [],
    tuitionFees: null,
    tuitionHistory: [],
    classSchedule: null,
    gradeReportData: null,
    courseList: [],
    courseInfo: null,
    loading: false,
    error: null,

    isFacEval: false,
    isFacEvalLoading: false,
    isFacEvalError: null,

    currentSemester: null,
    currentSemesterLoading: false,
    currentSemesterError: null,

    isAdvising: false,
    isAdvisingLoading: false,
    isAdvisingError: null,

    facultyLoading: false,
    facultyError: null,

    facultyInfo: null,
    facultyInfoLoading: false,
    facultyInfoError: null,

    facultyTeaches: [],
    facultyTeachesLoading: false,
    facultyTeachesError: null,

    tuitionFeesLoading: false,
    tuitionFeesError: null,

    tuitionHistoryLoading: false,
    tuitionHistoryError: null,

    gradeReportLoading: false,
    gradeReportError: null,

    courseListLoading: false,
    courseListError: null,

    courseInfoLoading: false,
    courseInfoError: null,

    classScheduleLoading: false,
    classScheduleError: null,
  },
  reducers: {
    clearStudentProfile: (state) => {
      state.studentProfile = null;
      state.error = null;
    },

    clearIsFacEval: (state) => {
      state.isFacEval = false;
      state.isFacEvalError = null;
    },

    clearFacultyList: (state) => {
      state.facultyList = [];
      state.facultyError = null;
    },

    clearFacultyInfo: (state) => {
      state.facultyInfo = null;
      state.facultyInfoError = null;
    },

    clearFacultyTeaches: (state) => {
      state.facultyTeaches = [];
      state.facultyTeachesError = null;
    },

    clearTuitionFees: (state) => {
      state.tuitionFees = null;
      state.tuitionFeesError = null;
    },

    clearTuitionHistory: (state) => {
      state.tuitionHistory = [];
      state.tuitionHistoryError = null;
    },

    clearGradeReport: (state) => {
      state.gradeReportData = null;
      state.gradeReportError = null;
    },
    clearCourseList: (state) => {
      state.courseList = [];
      state.courseListError = null;
    },

    clearCourseInfo: (state) => {
      state.courseInfo = null;
      state.courseInfoError = null;
    },

    clearClassSchedule: (state) => {
      console.log("userSlice: Clearing class schedule state.");
      state.classSchedule = null;
      state.classScheduleError = null;
    },
    clearIsAdvising: (state) => {
      state.isAdvising = false;
      state.isAdvisingError = null;
    },
    clearCurrentSemester: (state) => {
      state.currentSemester = null;
      state.currentSemesterError = null;
    },

    setUserLoading: (state, action) => {
      console.log("userSlice: Setting general loader state to", action.payload);
      state.loading = action.payload;
    },

    setIsFacEvalLoading: (state, action) => {
      state.isFacEvalLoading = action.payload;
    },

    setFacultyLoading: (state, action) => {
      console.log("userSlice: Setting faculty loader state to", action.payload);
      state.facultyLoading = action.payload;
    },

    setFacultyInfoLoading: (state, action) => {
      console.log(
        "userSlice: Setting faculty info loader state to",
        action.payload,
      );
      state.facultyInfoLoading = action.payload;
    },

    setFacultyTeachesLoading: (state, action) => {
      console.log(
        "userSlice: Setting faculty teaches loader state to",
        action.payload,
      );
      state.facultyTeachesLoading = action.payload;
    },

    setTuitionFeesLoading: (state, action) => {
      console.log(
        "userSlice: Setting tuition fees loader state to",
        action.payload,
      );
      state.tuitionFeesLoading = action.payload;
    },

    setTuitionHistoryLoading: (state, action) => {
      console.log(
        "userSlice: Setting tuition history loader state to",
        action.payload,
      );
      state.tuitionHistoryLoading = action.payload;
    },

    setGradeReportLoading: (state, action) => {
      console.log(
        "userSlice: Setting grade report loader state to",
        action.payload,
      );
      state.gradeReportLoading = action.payload;
    },
    setCourseListLoading: (state, action) => {
      console.log(
        "userSlice: Setting course list loader state to",
        action.payload,
      );
      state.courseListLoading = action.payload;
    },

    setCourseInfoLoading: (state, action) => {
      state.courseInfoLoading = action.payload;
    },
    setClassScheduleLoading: (state, action) => {
      console.log(
        "userSlice: Setting class schedule loader state to",
        action.payload,
      );
      state.classScheduleLoading = action.payload;
    },
    setIsAdvisingLoading: (state, action) => {
      state.isAdvisingLoading = action.payload;
    },
    setCurrentSemesterLoading: (state, action) => {
      state.currentSemesterLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getStudent.pending, (state) => {
        console.log("userSlice: getStudent.pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        console.log("userSlice: getStudent.fulfilled", action.payload);
        state.loading = false;
        state.error = null;
        state.studentProfile = action.payload;
      })
      .addCase(getStudent.rejected, (state, action) => {
        console.log(
          "userSlice: getStudent.rejected",
          action.payload || action.error.message,
        );
        state.loading = false;
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to fetch student profile";
        state.studentProfile = null;
      })

      .addCase(getIsFacEval.pending, (state) => {
        console.log("userSlice: getIsFacEval.pending");
        state.isFacEvalLoading = true;
        state.isFacEvalError = null;
      })
      .addCase(getIsFacEval.fulfilled, (state, action) => {
        console.log("userSlice: getIsFacEval.fulfilled", action.payload);
        state.isFacEvalLoading = false;
        state.isFacEvalError = null;
        state.isFacEval = action.payload;
      })
      .addCase(getIsFacEval.rejected, (state, action) => {
        console.log(
          "userSlice: getIsFacEval.rejected",
          action.payload || action.error.message,
        );
        state.isFacEvalLoading = false;
        state.isFacEvalError =
          action.payload ||
          action.error.message ||
          "Failed to fetch faculty evaluation status";
        state.isFacEval = false;
      })

      .addCase(getFaculty.pending, (state) => {
        console.log("userSlice: getFaculty.pending");
        state.facultyLoading = true;
        state.facultyError = null;
      })
      .addCase(getFaculty.fulfilled, (state, action) => {
        console.log("userSlice: getFaculty.fulfilled", action.payload);
        state.facultyLoading = false;
        state.facultyError = null;
        state.facultyList = action.payload;
      })
      .addCase(getFaculty.rejected, (state, action) => {
        console.log(
          "userSlice: getFaculty.rejected",
          action.payload || action.error.message,
        );
        state.facultyLoading = false;
        state.facultyError =
          action.payload || action.error.message || "Failed to fetch faculties";
        state.facultyList = [];
      })
      .addCase(getFacultyInfo.pending, (state) => {
        console.log("userSlice: getFacultyInfo.pending");
        state.facultyInfoLoading = true;
        state.facultyInfoError = null;
        state.facultyInfo = null;
      })
      .addCase(getFacultyInfo.fulfilled, (state, action) => {
        console.log("userSlice: getFacultyInfo.fulfilled", action.payload);
        state.facultyInfoLoading = false;
        state.facultyInfoError = null;
        state.facultyInfo = action.payload;
      })
      .addCase(getFacultyInfo.rejected, (state, action) => {
        console.log(
          "userSlice: getFacultyInfo.rejected",
          action.payload || action.error.message,
        );
        state.facultyInfoLoading = false;
        state.facultyInfoError =
          action.payload ||
          action.error.message ||
          "Failed to fetch faculty info";
        state.facultyInfo = null;
      })

      .addCase(getFacultyTeaches.pending, (state) => {
        console.log("userSlice: getFacultyTeaches.pending");
        state.facultyTeachesLoading = true;
        state.facultyTeachesError = null;
        state.facultyTeaches = [];
      })
      .addCase(getFacultyTeaches.fulfilled, (state, action) => {
        console.log("userSlice: getFacultyTeaches.fulfilled", action.payload);
        state.facultyTeachesLoading = false;
        state.facultyTeachesError = null;
        state.facultyTeaches = action.payload;
      })
      .addCase(getFacultyTeaches.rejected, (state, action) => {
        console.log(
          "userSlice: getFacultyTeaches.rejected",
          action.payload || action.error.message,
        );
        state.facultyTeachesLoading = false;
        state.facultyTeachesError =
          action.payload ||
          action.error.message ||
          "Failed to fetch faculty teaches data";
        state.facultyTeaches = [];
      })

      .addCase(getTutionFees.pending, (state) => {
        console.log("userSlice: getTuitionFees.pending");
        state.tuitionFeesLoading = true;
        state.tuitionFeesError = null;
      })
      .addCase(getTutionFees.fulfilled, (state, action) => {
        console.log("userSlice: getTuitionFees.fulfilled", action.payload);
        state.tuitionFeesLoading = false;
        state.tuitionFeesError = null;
        state.tuitionFees = action.payload;
      })
      .addCase(getTutionFees.rejected, (state, action) => {
        console.log(
          "userSlice: getTuitionFees.rejected",
          action.payload || action.error.message,
        );
        state.tuitionFeesLoading = false;
        state.tuitionFeesError =
          action.payload ||
          action.error.message ||
          "Failed to fetch tuition fees";
        state.tuitionFees = null;
      })

      .addCase(getTutionHistory.pending, (state) => {
        console.log("userSlice: getTuitionHistory.pending");
        state.tuitionHistoryLoading = true;
        state.tuitionHistoryError = null;
      })
      .addCase(getTutionHistory.fulfilled, (state, action) => {
        console.log("userSlice: getTuitionHistory.fulfilled", action.payload);
        state.tuitionHistoryLoading = false;
        state.tuitionHistoryError = null;
        state.tuitionHistory = action.payload;
      })
      .addCase(getTutionHistory.rejected, (state, action) => {
        console.log(
          "userSlice: getTuitionHistory.rejected",
          action.payload || action.error.message,
        );
        state.tuitionHistoryLoading = false;
        state.tuitionHistoryError =
          action.payload ||
          action.error.message ||
          "Failed to fetch tuition history";
        state.tuitionHistory = [];
      })

      .addCase(gradeReport.pending, (state) => {
        console.log("userSlice: gradeReport.pending");
        state.gradeReportLoading = true;
        state.gradeReportError = null;
      })
      .addCase(gradeReport.fulfilled, (state, action) => {
        console.log("userSlice: gradeReport.fulfilled", action.payload);
        state.gradeReportLoading = false;
        state.gradeReportError = null;
        state.gradeReportData = action.payload;
      })
      .addCase(gradeReport.rejected, (state, action) => {
        console.log(
          "userSlice: gradeReport.rejected",
          action.payload || action.error.message,
        );
        state.gradeReportLoading = false;
        state.gradeReportError =
          action.payload ||
          action.error.message ||
          "Failed to fetch grade report";
        state.gradeReportData = null;
      })

      .addCase(getCourses.pending, (state) => {
        console.log("userSlice: getCourses.pending");
        state.courseListLoading = true;
        state.courseListError = null;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        console.log("userSlice: getCourses.fulfilled", action.payload);
        state.courseListLoading = false;
        state.courseListError = null;
        state.courseList = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        console.log(
          "userSlice: getCourses.rejected",
          action.payload || action.error.message,
        );
        state.courseListLoading = false;
        state.courseListError =
          action.payload || action.error.message || "Failed to fetch courses";
        state.courseList = [];
      })

      .addCase(getCourseInfo.pending, (state) => {
        console.log("userSlice: getCourseInfo.pending");
        state.courseInfoLoading = true;
        state.courseInfoError = null;
      })
      .addCase(getCourseInfo.fulfilled, (state, action) => {
        console.log("userSlice: getCourseInfo.fulfilled", action.payload);
        state.courseInfoLoading = false;
        state.courseInfoError = null;
        state.courseInfo = action.payload;
      })
      .addCase(getCourseInfo.rejected, (state, action) => {
        console.log(
          "userSlice: getCourseInfo.rejected",
          action.payload || action.error.message,
        );
        state.courseInfoLoading = false;
        state.courseInfoError =
          action.payload ||
          action.error.message ||
          "Failed to fetch course info";
        state.courseInfo = null;
      })
      .addCase(getClassSchedule.pending, (state) => {
        console.log("userSlice: getClassSchedule.pending");
        state.classScheduleLoading = true;
        state.classScheduleError = null;
        state.classSchedule = null;
      })
      .addCase(getClassSchedule.fulfilled, (state, action) => {
        console.log("userSlice: getClassSchedule.fulfilled", action.payload);
        state.classScheduleLoading = false;
        state.classScheduleError = null;
        state.classSchedule = action.payload;
      })
      .addCase(getClassSchedule.rejected, (state, action) => {
        console.log(
          "userSlice: getClassSchedule.rejected",
          action.payload || action.error.message,
        );
        state.classScheduleLoading = false;
        state.classScheduleError =
          action.payload ||
          action.error.message ||
          "Failed to fetch class schedule";
        state.classSchedule = null;
      })
      .addCase(getIsAdvising.pending, (state) => {
        state.isAdvisingLoading = true;
        state.isAdvisingError = null;
      })
      .addCase(getIsAdvising.fulfilled, (state, action) => {
        state.isAdvisingLoading = false;
        state.isAdvisingError = null;
        state.isAdvising = action.payload;
      })
      .addCase(getIsAdvising.rejected, (state, action) => {
        state.isAdvisingLoading = false;
        state.isAdvisingError =
          action.payload ||
          action.error.message ||
          "Failed to fetch advising status";
        state.isAdvising = false;
      })
      .addCase(getCurrentSemester.pending, (state) => {
        state.currentSemesterLoading = true;
        state.currentSemesterError = null;
        state.currentSemester = null;
      })
      .addCase(getCurrentSemester.fulfilled, (state, action) => {
        state.currentSemesterLoading = false;
        state.currentSemesterError = null;
        state.currentSemester = action.payload;
      })
      .addCase(getCurrentSemester.rejected, (state, action) => {
        state.currentSemesterLoading = false;
        state.currentSemesterError =
          action.payload ||
          action.error.message ||
          "Failed to fetch current semester";
        state.currentSemester = null;
      });
  },
});

export const selectStudentProfile = (state) => state.user.studentProfile;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

export const selectIsFacEval = (state) => state.user.isFacEval;
export const selectIsFacEvalLoading = (state) => state.user.isFacEvalLoading;
export const selectIsFacEvalError = (state) => state.user.isFacEvalError;

export const selectFacultyList = (state) => state.user.facultyList;
export const selectFacultyLoading = (state) => state.user.facultyLoading;
export const selectFacultyError = (state) => state.user.facultyError;

export const selectTuitionFees = (state) => state.user.tuitionFees;
export const selectTuitionFeesLoading = (state) =>
  state.user.tuitionFeesLoading;
export const selectTuitionFeesError = (state) => state.user.tuitionFeesError;

export const selectTuitionHistory = (state) => state.user.tuitionHistory;
export const selectTuitionHistoryLoading = (state) =>
  state.user.tuitionHistoryLoading;
export const selectTuitionHistoryError = (state) =>
  state.user.tuitionHistoryError;

export const selectGradeReportData = (state) => state.user.gradeReportData;
export const selectGradeReportLoading = (state) =>
  state.user.gradeReportLoading;
export const selectGradeReportError = (state) => state.user.gradeReportError;

export const selectCourseList = (state) => state.user.courseList;
export const selectCourseListLoading = (state) => state.user.courseListLoading;
export const selectCourseListError = (state) => state.user.courseListError;

export const selectCourseInfo = (state) => state.user.courseInfo;
export const selectCourseInfoLoading = (state) => state.user.courseInfoLoading;
export const selectCourseInfoError = (state) => state.user.courseInfoError;

export const selectClassSchedule = (state) => state.user.classSchedule;
export const selectClassScheduleLoading = (state) =>
  state.user.classScheduleLoading;
export const selectClassScheduleError = (state) =>
  state.user.classScheduleError;

export const selectFacultyInfo = (state) => state.user.facultyInfo;
export const selectFacultyInfoLoading = (state) =>
  state.user.facultyInfoLoading;
export const selectFacultyInfoError = (state) => state.user.facultyInfoError;

export const selectFacultyTeaches = (state) => state.user.facultyTeaches;
export const selectFacultyTeachesLoading = (state) =>
  state.user.facultyTeachesLoading;
export const selectFacultyTeachesError = (state) =>
  state.user.facultyTeachesError;

export const selectIsAdvising = (state) => state.user.isAdvising;
export const selectIsAdvisingLoading = (state) => state.user.isAdvisingLoading;
export const selectIsAdvisingError = (state) => state.user.isAdvisingError;

export const selectCurrentSemester = (state) => state.user.currentSemester;
export const selectCurrentSemesterLoading = (state) =>
  state.user.currentSemesterLoading;
export const selectCurrentSemesterError = (state) =>
  state.user.currentSemesterError;

export const {
  clearStudentProfile,
  clearIsFacEval,
  clearCurrentSemester,
  clearFacultyList,
  clearFacultyInfo,
  clearFacultyTeaches,
  clearTuitionFees,
  clearTuitionHistory,
  clearGradeReport,
  clearCourseInfo,
  clearCourseList,
  clearClassSchedule,
  clearIsAdvising,
  setTuitionFeesLoading,
  setTuitionHistoryLoading,
  setGradeReportLoading,
  setUserLoading,
  setIsFacEvalLoading,
  setFacultyLoading,
  setFacultyInfoLoading,
  setFacultyTeachesLoading,
  setCourseListLoading,
  setCourseInfoLoading,
  setClassScheduleLoading,
  setIsAdvisingLoading,
  setCurrentSemesterLoading,
} = userSlice.actions;

export default userSlice.reducer;
