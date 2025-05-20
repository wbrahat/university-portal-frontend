import React, { useState } from "react";
import "../../styles/auth.css";

import {
  selectAuthStatus,
  selectAuthError,
  selectAuthLoading,
} from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { sendOTP } from "../../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";

const Activation = () => {
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const authLoading = useSelector(selectAuthLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    auth: "",
  });

  // State for client-side form validation errors
  const [formValidationError, setFormValidationError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear client-side validation error when user types
    setFormValidationError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous validation error
    setFormValidationError("");

    if (!formData.auth) {
      setFormValidationError("Please enter your Student ID.");
      return;
    }

    try {
      const resultAction = await dispatch(
        sendOTP({
          id: formData.auth,
          reason: "to_active",
        }),
      ).unwrap(); // unwrap() will throw the error from rejectWithValue

      console.log("OTP sent successfully:", resultAction.message);

      setFormData({
        auth: "",
      });

      navigate("/activate-account");
    } catch (error) {
      console.error("Failed to send OTP:", error);

      setFormValidationError(error); //Display the thunk error below the input
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-top">
          <h2>Activate your Account</h2>
          <p>Enter your Student ID to receive an OTP for activation.</p>

          <div className="auth-form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Student ID"
                name="auth"
                value={formData.auth}
                onChange={handleChange}
                required
                disabled={authLoading}
              />

              {authLoading && <p>Sending OTP...</p>}

              {formValidationError && (
                <p className="error-message">{formValidationError}</p>
              )}

              {authStatus === "failed" && authError && (
                <p className="error-message">{authError}</p>
              )}

              <button type="submit" disabled={authLoading}>
                {authLoading ? "Sending OTP..." : "Receive OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="img-wrapper"></div>
    </div>
  );
};

export default Activation;
