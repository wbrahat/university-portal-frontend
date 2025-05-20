import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLoggedInUser = createAsyncThunk(
  "auth/getLoggedInUser", // Action type name
  async (_, { rejectWithValue }) => {
    // Use _ for unused first argument, add rejectWithValue
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/auth/std-home",
        {
          withCredentials: true,
        },
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(
          "Frontend (authApiSlice): getLoggedInUser Error Response Data:",
          error.response.data,
        );
      } else {
        console.error(
          "Frontend (authApiSlice): getLoggedInUser Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

//Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const requestBody = {
        id: formData.auth,
        password: formData.password,
      };

      console.log(
        "Frontend (authApiSlice): Request body being sent:",
        requestBody,
      );

      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        requestBody,
        {
          withCredentials: true,
        },
      );

      console.log(
        "Frontend (authApiSlice): Login successful, received data:",
        response.data,
      );
      return response.data;
    } catch (error) {
      console.error("Frontend (authApiSlice): Login API call failed:", error);

      if (error.response) {
        console.error(
          "Frontend (authApiSlice): Login API Error Response Data:",
          error.response.data,
        );

        return rejectWithValue(error.response.data.message || "Login failed");
      } else if (error.request) {
        console.error(
          "Frontend (authApiSlice): Login Network Error: No response received",
          error.request,
        );
      } else {
        console.error(
          "Frontend (authApiSlice): Login Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

//send student OTP
export const sendOTP = createAsyncThunk(
  "auth/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const { id, reason } = data;

      const url = `http://localhost:8000/api/v1/auth/resend-otp/reason=${reason}`;

      const requestBody = { id };

      console.log(
        "Frontend (authApiSlice): Sending OTP request body:",
        requestBody,
      );

      const response = await axios.patch(url, requestBody, {
        withCredentials: true,
      });

      console.log(
        "Frontend (authApiSlice): OTP request successful",
        response.data,
      );
      return response.data;
    } catch (error) {
      console.error("Frontend (authApiSlice): sendOTP failed:", error);
      if (error.response) {
        console.error(
          "Frontend (authApiSlice): sendOTP Error Response Data:",
          error.response.data,
        );

        return rejectWithValue(
          error.response.data.message || "Failed to send OTP",
        );
      } else if (error.request) {
        console.error(
          "Frontend (authApiSlice): sendOTP Network Error: No response received",
          error.request,
        );
      } else {
        console.error(
          "Frontend (authApiSlice): sendOTP Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

//activate account
export const activateAccount = createAsyncThunk(
  "auth/activate",
  async (data, { rejectWithValue }) => {
    try {
      const { id, otp, password } = data;

      const url = `http://localhost:8000/api/v1/auth/activate-account/otp=${otp}`;

      const requestBody = { id, password };

      const response = await axios.post(url, requestBody, {
        withCredentials: true,
      });

      console.log(
        "Frontend (authApiSlice): Account activation successful",
        response.data,
      );

      return response.data;
    } catch (error) {
      console.error("Frontend (authApiSlice): activateAccount failed:", error);
      if (error.response) {
        console.error(
          "Frontend (authApiSlice): activateAccount Error Response Data:",
          error.response.data,
        );

        return rejectWithValue(
          error.response.data.message || "Failed to activate account",
        );
      } else if (error.request) {
        console.error(
          "Frontend (authApiSlice): activateAccount Network Error: No response received",
          error.request,
        );
      } else {
        console.error(
          "Frontend (authApiSlice): activateAccount Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

//forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (data, { rejectWithValue }) => {
    try {
      const { id, password, otp } = data;

      const url = `http://localhost:8000/api/v1/auth/forgot-password/otp=${otp}`;

      const requestBody = { id, password };

      console.log(
        "Frontend (authApiSlice): Sending forgot password request to:",
        url,
      );
      console.log(
        "Frontend (authApiSlice): Sending forgot password request body:",
        requestBody,
      );

      const response = await axios.post(url, requestBody, {
        withCredentials: true,
      });

      console.log(
        "Frontend (authApiSlice): Forgot password successful",
        response.data,
      );

      return response.data;
    } catch (error) {
      console.error("Frontend (authApiSlice): forgotPassword failed:", error);
      if (error.response) {
        console.error(
          "Frontend (authApiSlice): forgotPassword Error Response Data:",
          error.response.data,
        );

        return rejectWithValue(
          error.response.data.message || "Failed to change password",
        );
      } else if (error.request) {
        console.error(
          "Frontend (authApiSlice): forgotPassword Network Error: No response received",
          error.request,
        );
      } else {
        console.error(
          "Frontend (authApiSlice): forgotPassword Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

//logout User
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const url = `http://localhost:8000/api/v1/auth/logout`;

      console.log("Frontend (authApiSlice): Sending logout request to:", url);

      const response = await axios.post(
        url,
        {},
        {
          withCredentials: true,
        },
      );

      console.log("Frontend (authApiSlice): Logout successful", response.data);

      return response.data;
    } catch (error) {
      console.error("Frontend (authApiSlice): logoutUser failed:", error);

      if (error.response) {
        console.error(
          "Frontend (authApiSlice): logoutUser Error Response Data:",
          error.response.data,
        );
        return rejectWithValue(
          error.response.data.message || "Failed to log out",
        );
      } else {
        console.error(
          "Frontend (authApiSlice): logoutUser Request Setup Error:",
          error.message,
        );
      }
    }
  },
);

//change password
export const changePassword = createAsyncThunk(
  "auth/change-password",
  async (data, { rejectWithValue }) => {
    try {
      const { currentPassword, newPassword } = data;

      const url = `http://localhost:8000/api/v1/auth/change-password`;

      const requestBody = { currentPassword, newPassword };

      console.log(
        "Frontend (authApiSlice): Sending change password request to:",
        url,
      );
      console.log(
        "Frontend (authApiSlice): Sending change password request body:",
        requestBody,
      );

      const response = await axios.patch(url, requestBody, {
        withCredentials: true,
      });

      console.log(
        "Frontend (authApiSlice): Change password successful",
        response.data,
      );

      return response.data;
    } catch (error) {
      console.error("Frontend (authApiSlice): changePassword failed:", error);

      if (error.response) {
        console.error(
          "Frontend (authApiSlice): changePassword Error Response Data:",
          error.response.data,
        );
      } else {
        console.error(
          "Frontend (authApiSlice): changePassword Request Setup Error:",
          error.message,
        );
      }
    }
  },
);
