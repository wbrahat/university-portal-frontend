import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthMessage,
  selectAuthStatus,
  setMessageEmpty,
} from "../../features/auth/authSlice";

import { forgotPassword, sendOTP } from "../../features/auth/authApiSlice";

const ForgotPassword = () => {
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const authLoading = useSelector(selectAuthLoading);
  const authMessage = useSelector(selectAuthMessage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    auth: "",
    password: "",
    otp: "",
  });

  const [formValidationError, setFormValidationError] = useState("");

  useEffect(() => {
    dispatch(setMessageEmpty());
  }, [dispatch]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setFormValidationError("");
    dispatch(setMessageEmpty());
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormValidationError("");
    dispatch(setMessageEmpty());

    if (!formData.auth || !formData.password || !formData.otp) {
      setFormValidationError("Please fill in all fields.");
      return;
    }

    console.log(
      "ForgotPassword.jsx handleSubmit: Dispatching forgotPassword thunk with data:",
      formData,
    );

    try {
      const resultAction = await dispatch(
        forgotPassword({
          id: formData.auth,
          password: formData.password,
          otp: formData.otp,
        }),
      ).unwrap();

      console.log("Password reset successfully:", resultAction.message);

      setFormData({
        auth: "",
        password: "",
        otp: "",
      });
      console.log("ForgotPassword.jsx handleSubmit: Form data reset.");

      navigate("/login");
    } catch (error) {
      console.error("Forgot password error:", error);

      setFormValidationError(error);
    }
  };

  //Handle resending OTP
  const handleResendOtp = async () => {
    setFormValidationError("");
    dispatch(setMessageEmpty());

    if (!formData.auth) {
      setFormValidationError("Please enter your Student ID to resend OTP.");
      return;
    }

    try {
      console.log(
        "ForgotPassword.jsx handleResendOtp: Dispatching sendOTP thunk for reset password.",
      );
      const resultAction = await dispatch(
        sendOTP({
          id: formData.auth,
          reason: "to_reset_password",
        }),
      ).unwrap();

      console.log("Resend OTP successful:", resultAction.message);
    } catch (error) {
      console.error("Resend OTP failed:", error);
      setFormValidationError(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-top">
          <h2>Reset Your Password</h2>
          <p>
            Enter your Student ID, the OTP sent to you, and your new password.
          </p>

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

              <input
                type="password"
                placeholder="New Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={authLoading}
              />

              <input
                type="text"
                placeholder="Enter OTP"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                required
                disabled={authLoading}
              />

              {authLoading && <p>Resetting password...</p>}

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
                {authLoading ? "Resetting password..." : "Reset Password"}
              </button>
            </form>

            <button
              className="forgot-password"
              onClick={handleResendOtp}
              disabled={authLoading}
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>

      <div className="img-wrapper"></div>
    </div>
  );
};

export default ForgotPassword;
