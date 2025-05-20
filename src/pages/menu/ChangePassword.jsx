import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthStatus,
  selectAuthMessage,
  setMessageEmpty,
} from "../../features/auth/authSlice";
import "../../styles/changePassword.css";
import { changePassword } from "../../features/auth/authApiSlice";

const ChangePassword = () => {
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const authLoading = useSelector(selectAuthLoading);
  const authMessage = useSelector(selectAuthMessage);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [formValidationError, setFormValidationError] = useState("");

  useEffect(() => {
    dispatch(setMessageEmpty());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setFormValidationError("");
    dispatch(setMessageEmpty());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormValidationError("");
    dispatch(setMessageEmpty());

    if (!formData.currentPassword || !formData.newPassword) {
      setFormValidationError("Please enter both current and new passwords.");
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      setFormValidationError(
        "New password must be different from the current password.",
      );
      return;
    }

    console.log(
      "ChangePassword.jsx handleSubmit: Dispatching changePassword thunk with data:",
      formData,
    );

    try {
      const resultAction = await dispatch(changePassword(formData)).unwrap();

      console.log("Password changed successfully:", resultAction.message);

      setFormData({
        currentPassword: "",
        newPassword: "",
      });
    } catch (error) {
      console.error("Change password failed:", error);
      let errorMessageToDisplay = "An unexpected error occurred."; // Default error message

      if (error && typeof error === "object") {
        if (typeof error.message === "string") {
          errorMessageToDisplay = error.message;
        } else if (
          error.response &&
          error.response.data &&
          typeof error.response.data.message === "string"
        ) {
          // Check for backend error message structure if available
          errorMessageToDisplay = error.response.data.message;
        } else {
          // If error object exists but message is not a string, stringify it for debugging
          errorMessageToDisplay = `Error object: ${JSON.stringify(error)}`;
        }
      } else if (typeof error === "string") {
        // If the caught error is already a string
        errorMessageToDisplay = error;
      }

      setFormValidationError(errorMessageToDisplay);
    }
  };

  return (
    <div className="box">
      <div className="auth-top">
        <h2>Change Your Password</h2>
        <p>Enter your current and new passwords.</p>
        <div className="auth-form">
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Current Password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              disabled={authLoading}
            />

            <input
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              disabled={authLoading}
            />

            {authLoading && <p>Changing password...</p>}

            {formValidationError && (
              <p className="error-message">{formValidationError}</p>
            )}

            {authStatus === "failed" && authError && !formValidationError && (
              <p className="error-message">{authError}</p>
            )}

            {authStatus === "success" && authMessage && !authLoading && (
              <p className="success-message">{authMessage}</p>
            )}

            <button type="submit" disabled={authLoading}>
              {authLoading ? "Changing Password..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
