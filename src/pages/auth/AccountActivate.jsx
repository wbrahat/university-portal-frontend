import React, { useState, useEffect } from "react"; // Import useEffect
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../styles/auth.css";
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthStatus,
  selectAuthMessage,
  setMessageEmpty,
} from "../../features/auth/authSlice";
import { activateAccount } from "../../features/auth/authApiSlice";

const AccountActivate = () => {
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const authLoading = useSelector(selectAuthLoading);
  const authMessage = useSelector(selectAuthMessage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    auth: "",
    password: "",
    otp: "",
  });

  // State for client-side form validation errors
  const [formValidationError, setFormValidationError] = useState("");

  // Effect to clear messages/errors from Redux state
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

    try {
      const resultAction = await dispatch(
        activateAccount({
          id: formData.auth,
          password: formData.password,
          otp: formData.otp,
        }),
      ).unwrap(); // unwrap() will throw the error from rejectWithValue

      console.log("Account activated successfully:", resultAction.message);

      navigate("/login");
    } catch (error) {
      console.error("Account activation failed:", error);

      setFormValidationError(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-top">
          <h2>Activate your Account</h2>
          <p>Enter your details to activate your account.</p>

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
                placeholder="Password"
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

              {authLoading && <p>Activating account...</p>}

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
                {authLoading ? "Activating account..." : "Activate account"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="img-wrapper"></div>
    </div>
  );
};

export default AccountActivate;
