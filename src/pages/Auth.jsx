import { useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { serverEndpoint } from "../config/appConfig";
import { useDispatch } from "react-redux";
import { SET_USER } from "../redux/user/action";
import "./login.css";

import Lottie from "lottie-react";
import loginAnimation from "/public/login-animation.json";

function Auth() {
  const dispatch = useDispatch();

  // "login" | "register"
  const [mode, setMode] = useState("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setErrors({});
  };

  const validate = () => {
    let newErrors = {};
    let valid = true;

    if (mode === "register" && !formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (mode === "login") {
        const response = await axios.post(
          `${serverEndpoint}/auth/login`,
          {
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true },
        );

        dispatch({
          type: SET_USER,
          payload: response.data.user,
        });
      } else {
        await axios.post(
          `${serverEndpoint}/auth/register`,
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true },
        );

        setMessage("Account created successfully. You can now log in.");
        setMode("login");
        setFormData({ name: "", email: "", password: "" });
      }
    } catch (error) {
      setErrors({
        message: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  const handleGoogleSuccess = async (authResponse) => {
    try {
      const response = await axios.post(
        `${serverEndpoint}/auth/google-auth`,
        { idToken: authResponse.credential },
        { withCredentials: true },
      );

      dispatch({
        type: SET_USER,
        payload: response.data.user,
      });
    } catch {
      setErrors({ message: "Google authentication failed" });
    }
  };

  const handleGoogleFailure = () => {
    setErrors({ message: "Something went wrong with Google authentication" });
  };

  return (
    <div className="auth-page">
      <div className="container-fluid h-100">
        <div className="row h-100">
          {/* LEFT SIDE – LOTTIE */}
          <div className="col-lg-7 d-none d-lg-flex align-items-center justify-content-center auth-left">
            <Lottie
              animationData={loginAnimation}
              loop
              className="auth-lottie"
            />
          </div>

          {/* RIGHT SIDE – AUTH CARD */}
          <div className="col-12 col-lg-5 auth-right d-flex align-items-center justify-content-center">
            <div className="auth-card">
              {/* TOGGLE WITH ANIMATION */}
              <div className="auth-toggle mb-4">
                <div
                  className={`auth-toggle-slider ${
                    mode === "register" ? "right" : ""
                  }`}
                />

                <button
                  type="button"
                  className={mode === "login" ? "active" : ""}
                  onClick={() => {
                    setMode("login");
                    setErrors({});
                    setMessage("");
                  }}
                >
                  Login
                </button>

                <button
                  type="button"
                  className={mode === "register" ? "active" : ""}
                  onClick={() => {
                    setMode("register");
                    setErrors({});
                    setMessage("");
                  }}
                >
                  Register
                </button>
              </div>

              <h2 className="fw-bold mb-1">
                {mode === "login" ? "Hello!" : "Welcome!"}
              </h2>

              <p className="text-muted mb-3">
                {mode === "login" ? "Login to continue" : "Create your account"}
              </p>

              {/* GLOBAL ERROR */}
              {errors.message && (
                <div className="auth-error mb-3">{errors.message}</div>
              )}

              {/* SUCCESS MESSAGE */}
              {message && (
                <div className="text-success text-center mb-3 small">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {mode === "register" && (
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      className={`form-control auth-input ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback d-block">
                        {errors.name}
                      </div>
                    )}
                  </div>
                )}

                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className={`form-control auth-input ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className={`form-control auth-input ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback d-block">
                      {errors.password}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn auth-btn w-100">
                  {mode === "login" ? "Login" : "Create Account"}
                </button>
              </form>

              {/* GOOGLE AUTH */}
              <div className="d-flex justify-content-center mt-4 google-icon-btn">
                <GoogleOAuthProvider
                  clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                >
                  <GoogleLogin
                    shape="circle"
                    theme="outline"
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                  />
                </GoogleOAuthProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;