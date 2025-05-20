import { createSlice } from "@reduxjs/toolkit";
import { getLoggedInUser, loginUser, logoutUser } from "./authApiSlice";

// Function to safely get and parse user from localStorage
const safelyGetUserFromLocalStorage = () => {
  try {
    const userJson = localStorage.getItem("user");

    // **FIXED:** Add an explicit check for the literal string "undefined"
    // Also check if the item exists and is a string before parsing
    if (!userJson || typeof userJson !== "string" || userJson === "undefined") {
      // If item doesn't exist, is not a string, or is the literal string "undefined", return null
      return null;
    }

    // Attempt to parse the JSON string
    const user = JSON.parse(userJson);

    // Optional: Add a check here if the parsed 'user' object has expected properties
    // to ensure it's not just an empty object or primitive if that's not expected.
    // For example: if (user && typeof user === 'object' && user !== null && user.id) { ... }

    return user;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    // Clear the invalid item from localStorage to prevent future errors
    localStorage.removeItem("user");
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: safelyGetUserFromLocalStorage(),
    message: null,
    error: null,
    loader: false,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
    setLogout: (state) => {
      state.message = null;
      state.error = null;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("authSlice: loginUser.fulfilled", action.payload);
        state.loader = false;
        state.error = null;

        state.user = action.payload;
        state.message = "Login successful";

        // Store user data in localStorage upon successful login
        // Ensure action.payload is not undefined or null before stringifying
        if (action.payload) {
          localStorage.setItem("user", JSON.stringify(action.payload));
          console.log("authSlice: User data stored in localStorage.");
        } else {
          localStorage.removeItem("user");
          console.log(
            "authSlice: No user data in payload, localStorage cleared.",
          );
        }
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(getLoggedInUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      // **FIXED:** Set state.user to action.payload.data for getLoggedInUser fulfilled
      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        console.log("authSlice: getLoggedInUser.fulfilled", action.payload);
        state.loader = false;
        state.error = null;

        // Set the user state to the nested 'data' object
        state.user = action.payload.data;
        state.message =
          action.payload.message || "User data fetched successfully";

        // Store the nested user data in localStorage
        if (action.payload.data) {
          localStorage.setItem("user", JSON.stringify(action.payload.data));
          console.log(
            "authSlice: User data from getLoggedInUser stored in localStorage.",
          );
        } else {
          localStorage.removeItem("user");
          console.log(
            "authSlice: No user data in getLoggedInUser payload.data, localStorage cleared.",
          );
        }
      });
  },
});

// selectors
export const getAuthData = (state) => state.auth;

export const selectUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthMessage = (state) => state.auth.message;
export const selectAuthLoading = (state) => state.auth.loader;

export const selectAuthStatus = (state) => {
  if (state.auth.loader) return "loading";
  if (state.auth.user) return "succeeded";
  if (state.auth.error) return "failed";
  return "idle";
};

// actions
export const { setMessageEmpty, setLogout } = authSlice.actions;

// export
export default authSlice.reducer;
