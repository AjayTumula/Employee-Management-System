import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form data
    if (validate()) {
      axios
        .post("http://localhost:3000/auth/register", formData)
        .then((result) => {
          navigate("/");
          console.log(result);
        })
        .catch((err) => console.log(err));
    }
  };


  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      isValid = false;
      errors.username = 'Please enter your username.';
    }

    if (typeof formData.username !== 'undefined') {
      const re = /^\S*$/;
      if (formData.username.length < 3 || !re.test(formData.username)) {
        isValid = false;
        errors.username = 'Please enter valid username.';
      }
    }

    if (!formData.email.trim()) {
      isValid = false;
      errors.email = 'Please enter your email Address.';
    }

    if (typeof formData.email !== 'undefined') {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(formData.email)) {
        isValid = false;
        errors.email = 'Please enter valid email address.';
      }
    }

    if (!formData.password) {
      isValid = false;
      errors.password = 'Please enter your password.';
    }

    if (typeof formData.password !== 'undefined') {
      if (formData.password.length < 6) {
        isValid = false;
        errors.password = 'Please add at least 6 characters.';
      }
    }

    setErrors(errors);

    return isValid;
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-page">
      <div className="p-3 rounded w-25 border login-form">
        <h2 className="text-center">Register</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username">
              <strong>Username</strong>
            </label>
            <input
              className="form-control rounded-0"
              type="text"
              name="username"
              autoComplete="off"
              placeholder="Enter Name"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <div className="text-danger">{errors.username}</div>
            )}
          </div>
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
            Register
          </button>
          <div className="mb-3 text-center auth-change">
            <p>
              Already a user? <span onClick={() => navigate("/")}>Log in</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
