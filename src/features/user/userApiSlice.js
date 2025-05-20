import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getStudent = createAsyncThunk(
  "user/getStudent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/std-profile",
        {
          withCredentials: true,
        },
      );

      console.log(
        "Frontend (authApiSlice): getStudent fulfilled",
        response.data,
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(
          "Frontend (authApiSlice): getStudent Error Response Data:",
          error.response.data,
        );
      } else {
        console.error(
          "Frontend (authApiSlice): getStudent Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

export const getFaculty = createAsyncThunk(
  "user/getFaculty",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/list-faculty",
        {
          withCredentials: true,
        },
      );

      console.log(
        "Frontend (userApiSlice): getFaculty fulfilled",
        response.data,
      );

      return response.data;
    } catch (error) {
      console.error("Frontend (userApiSlice): getFaculty failed:", error);

      if (error.response) {
        console.error(
          "Frontend (userApiSlice): getFaculty Error Response Data:",
          error.response.data,
        );

        return rejectWithValue(
          error.response.data.message || "Failed to fetch faculties",
        );
      } else {
        console.error(
          "Frontend (userApiSlice): getFaculty Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

export const getFacultyInfo = createAsyncThunk(
  "user/getFacultyInfo",
  async ({ faculty_short_id }, { rejectWithValue }) => {
    try {
      const url = `http://localhost:8000/api/v1/info-faculty/${faculty_short_id}`;

      const response = await axios.get(url, {
        withCredentials: true,
      });

      console.log(
        "Frontend (userApiSlice): getFacultyInfo fulfilled",
        response.data,
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(
          "Frontend (userApiSlice): getFacultyInfo Error Response Data:",
          error.response.data,
        );
      } else {
        console.error(
          "Frontend (userApiSlice): getFacultyInfo Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

export const getFacultyTeaches = createAsyncThunk(
  "user/getFacultyTeaches",
  async ({ faculty_short_id, semester, year }, { rejectWithValue }) => {
    try {
      const url = `http://localhost:8000/api/v1/teaches/${faculty_short_id}/${semester}/${year}`; // **VERIFY THIS URL**

      const response = await axios.get(url, {
        withCredentials: true,
      });

      console.log(
        "Frontend (userApiSlice): getFacultyTeaches fulfilled",
        response.data,
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(
          "Frontend (userApiSlice): getFacultyTeaches Error Response Data:",
          error.response.data,
        );
      } else {
        console.error(
          "Frontend (userApiSlice): getFacultyTeaches Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

export const getTutionFees = createAsyncThunk(
  "user/getTutionFess",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/tution-fees",
        {
          withCredentials: true,
        },
      );

      return response.data;
    } catch (error) {
      console.error("Frontend (userApiSlice): getTuitionFees failed:", error);

      if (error.response) {
        console.error(
          "Frontend (userApiSlice): getTuitionFees Error Response Data:",
          error.response.data,
        );
        console.error(
          "Frontend (userApiSlice): getTuitionFees Error Status:",
          error.response.status,
        );
      } else {
        console.error(
          "Frontend (userApiSlice): getTuitionFees Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

export const getTutionHistory = createAsyncThunk(
  "user/getTutionHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/tution-history",
        {
          withCredentials: true,
        },
      );

      console.log(
        "Frontend (userApiSlice): getTuitionHistory fulfilled",
        response.data,
      );

      return response.data;
    } catch (error) {
      console.error(
        "Frontend (userApiSlice): getTuitionHistory failed:",
        error,
      );

      if (error.response) {
        console.error(
          "Frontend (userApiSlice): getTuitionHistory Error Response Data:",
          error.response.data,
        );
      } else {
        console.error(
          "Frontend (userApiSlice): getTuitionHistory Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

export const gradeReport = createAsyncThunk(
  "user/gradeReport",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/grade-report",
        {
          withCredentials: true,
        },
      );

      console.log(
        "Frontend (userApiSlice): getGradeReport fulfilled",
        response.data,
      );

      return response.data.data;
    } catch (error) {
      console.error("Frontend (userApiSlice): getGradeReport failed:", error);

      if (error.response) {
        console.error(
          "Frontend (userApiSlice): getGradeReport Error Response Data:",
          error.response.data,
        );
      } else {
        console.error(
          "Frontend (userApiSlice): getGradeReport Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

export const getCourses = createAsyncThunk(
  "user/getCourses",
  async ({ dept_short_name, semester, year }, { rejectWithValue }) => {
    try {
      const url = `http://localhost:8000/api/v1/list-courses/${dept_short_name}/${semester}/${year}`;

      const response = await axios.get(url, {
        withCredentials: true,
      });

      console.log(
        "Frontend (userApiSlice): getCourses fulfilled",
        response.data,
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(
          "Frontend (userApiSlice): getCourses Error Response Data:",
          error.response.data,
        );
      } else {
        console.error(
          "Frontend (userApiSlice): getCourses Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

export const getCourseInfo = createAsyncThunk(
  "user/getCourseInfo",
  async ({ course_id, semester, year }, { rejectWithValue }) => {
    try {
      const url = `http://localhost:8000/api/v1/info-courses/${course_id}/${semester}/${year}`; // **VERIFY THIS URL**

      const response = await axios.get(url, {
        withCredentials: true,
      });

      console.log(
        "Frontend (userApiSlice): getCourseInfo fulfilled",
        response.data,
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(
          "Frontend (userApiSlice): getCourseInfo Error Response Data:",
          error.response.data,
        );
      } else {
        console.error(
          "Frontend (userApiSlice): getCourseInfo Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

export const evaluateFaculty = createAsyncThunk(
  "user/evaluateFaculty",
  async ({ faculty_short_id, rating }, { rejectWithValue }) => {
    try {
      const url = `http://localhost:8000/api/v1/eval-faculty/${faculty_short_id}`;
      console.log(
        "Frontend (userApiSlice): Sending evaluateFaculty POST request to:",
        url,
        "with body:",
        { rating },
      );

      const response = await axios.post(
        url,
        { rating },
        {
          withCredentials: true,
        },
      );

      console.log(
        "Frontend (userApiSlice): evaluateFaculty fulfilled",
        response.data,
      );

      return response.data;
    } catch (error) {
      console.error("Frontend (userApiSlice): evaluateFaculty failed:", error);

      if (error.response) {
        console.error(
          "Frontend (userApiSlice): evaluateFaculty Error Response Data:",
          error.response.data,
        );
      }
    }
  },
);

export const getEvaluatableFaculties = createAsyncThunk(
  "user/getEvaluatableFaculties",
  async ({ semester, year }, { rejectWithValue }) => {
    try {
      const url = "http://localhost:8000/api/v1/eval-faculty-list";

      const response = await axios.get(url, {
        params: {
          semester,
          year,
        },
        withCredentials: true,
      });

      console.log(
        "Frontend (userApiSlice): getEvaluatableFaculties fulfilled",
        response.data,
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(
          "Frontend (userApiSlice): getEvaluatableFaculties Error Response Data:",
          error.response.data,
        );
      } else {
        console.error(
          "Frontend (userApiSlice): getEvaluatableFaculties Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

export const getClassSchedule = createAsyncThunk(
  "user/getClassSchedule",
  async ({ semester_year, semester_season }, { rejectWithValue }) => {
    try {
      const url = "http://localhost:8000/api/v1/class-schedule";

      console.log(
        "Frontend (userApiSlice): Sending getClassSchedule GET request to:",
        url,
        "with params:",
        { semester_year, semester_season },
      );

      const response = await axios.get(url, {
        params: {
          semester_year,
          semester_season,
        },
        withCredentials: true,
      });

      console.log(
        "Frontend (userApiSlice): getClassSchedule fulfilled",
        response.data,
      );

      return response.data.data;
    } catch (error) {
      if (error.response) {
        console.error(
          "Frontend (userApiSlice): getClassSchedule Error Response Data:",
          error.response.data,
        );
      } else {
        console.error(
          "Frontend (userApiSlice): getClassSchedule Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

export const getIsFacEval = createAsyncThunk(
  "user/getIsFacEval",
  async (_, { rejectWithValue }) => {
    try {
      const url = "http://localhost:8000/api/v1/is-fac-eval";

      const response = await axios.get(url, {
        withCredentials: true,
      });

      console.log(
        "Frontend (userApiSlice): getIsFacEval fulfilled",
        response.data,
      );

      return response.data.is_fac_eval;
    } catch (error) {
      if (error.response) {
        console.error(
          "Frontend (userApiSlice): getIsFacEval Error Response Data:",
          error.response.data,
        );
      } else {
        console.error(
          "Frontend (userApiSlice): getIsFacEval Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

export const getCurrentSemester = createAsyncThunk(
  "user/getCurrentSemester",
  async (_, { rejectWithValue }) => {
    try {
      const url = "http://localhost:8000/api/v1/current-semester";

      const response = await axios.get(url, {
        withCredentials: true,
      });

      console.log(
        "Frontend (userApiSlice): getCurrentSemester fulfilled",
        response.data,
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(
          "Frontend (userApiSlice): getCurrentSemester Error Response Data:",
          error.response.data,
        );
      } else {
        console.error(
          "Frontend (userApiSlice): getCurrentSemester Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

export const getIsAdvising = createAsyncThunk(
  "user/getIsAdvising", // Action type name
  async (_, { rejectWithValue }) => {
    try {
      const url = "http://localhost:8000/api/v1/is-advising";

      const response = await axios.get(url, {
        withCredentials: true,
      });

      console.log(
        "Frontend (userApiSlice): getIsAdvising fulfilled",
        response.data,
      );

      return response.data.is_advising;
    } catch (error) {
      if (error.response) {
        console.error(
          "Frontend (userApiSlice): getIsAdvising Error Response Data:",
          error.response.data,
        );
      } else {
        console.error(
          "Frontend (userApiSlice): getIsAdvising Request Setup Error:",
          error.message,
        );
      }
    }
  },
);
