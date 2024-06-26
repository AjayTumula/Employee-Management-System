import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate the form data
    if (validate()) {
      // Check if the email exists
      axios
        .get(`http://localhost:3000/auth/check_email/${formData.email}`)
        .then((response) => {
          if (response.data.exists) {
            // Email exists, proceed with login
            axios
              .post("http://localhost:3000/auth/login", formData)
              .then((response) => {
                if (response.data.auth) {
                  localStorage.setItem("valid", true);
                  navigate("/dashboard");
                  console.log("Login successful:", response.data);
                } else {
                  setErrors({
                    login:
                      "Invalid email or password. Please check your credentials.",
                  });
                }
              })
              .catch((error) => {
                console.error("Login error:", error);
                setErrors({
                  login:
                    "An error occurred while logging in. Please try again later.",
                });
              });
          } else {
            // Email doesn't exist, prompt user to register first
            setErrors({
              email: "Email not registered. Please register first.",
            });
          }
        })
        .catch((error) => {
          console.error("Email check error:", error);
          setErrors({
            login:
              "An error occurred while checking email. Please try again later.",
          });
        });
    }
  };

  // toast.error("Error Notification !", {
  //   position: toast.POSITION.TOP_CENTER,
  // });

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!formData.email.trim()) {
      isValid = false;
      errors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      isValid = false;
      errors.password = "Password is required";
    }

    setErrors(errors);

    return isValid;
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-page">
      <div className="p-3 rounded w-25 border login-form">
        <h2 className="text-center">Login</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email address</strong>
            </label>
            <input
              className="form-control rounded-0"
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              className="form-control rounded-0"
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 rounded-0 mb-3"
          >
            Log in
          </button>
          <div className="mb-3 text-center auth-change">
            <p>
              Click here to,{" "}
              <span onClick={() => navigate("/register")}>Register</span>
            </p>
          </div>
        </form>
        <div className="auth-change">
          <p>
            If your are an employee, please login here{" "}
            <span onClick={() => navigate("/employee_login")}>Click here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
