import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, getLoggedInUser } from "../../features/auth/authApiSlice";

import {
  selectAuthStatus,
  selectAuthError,
  selectAuthLoading,
  setMessageEmpty,
} from "../../features/auth/authSlice";

const Login = () => {
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const authLoading = useSelector(selectAuthLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for form data
  const [formData, setFormData] = useState({
    auth: "",
    password: "",
  });

  // State for client-side form validation errors
  const [formValidationError, setFormValidationError] = useState("");

  useEffect(() => {
    if (authStatus === "succeeded") {
      navigate("/std-home");
    }

    dispatch(setMessageEmpty());
  }, [authStatus, navigate, dispatch]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear client-side validation error and Redux errors/messages
    setFormValidationError("");
    dispatch(setMessageEmpty());
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous validation error and Redux errors/messages
    setFormValidationError("");
    dispatch(setMessageEmpty());

    if (!formData.auth || !formData.password) {
      setFormValidationError("Please enter both Student ID and password.");
      return;
    }

    try {
      const resultAction = await dispatch(loginUser(formData)).unwrap();

      setFormData({
        auth: "",
        password: "",
      });

      navigate("/std-home");
    } catch (error) {
      console.error("Login failed:", error);

      setFormValidationError(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-top">
          <h2>Login to Get Started</h2>
          <p>Enter your details to access your account.</p>
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

              {authLoading && <p>Logging in...</p>}

              {formValidationError && (
                <p className="error-message">{formValidationError}</p>
              )}

              {authStatus === "failed" && authError && !formValidationError && (
                <p className="error-message">{authError}</p>
              )}

              <button type="submit" disabled={authLoading}>
                {authLoading ? "Logging In..." : "Log In"}
              </button>
            </form>

            <Link to="/forgot-password" className="forgot-password">
              Forgot Password
            </Link>
          </div>
        </div>

        <div className="bottom">
          <Link to="/activate" className="active-account">
            Activate account
          </Link>
        </div>
      </div>
      <div className="img-wrapper"></div>
    </div>
  );
};

export default Login;
