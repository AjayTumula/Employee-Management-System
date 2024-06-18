import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
      event.preventDefault();
      axios
        .post('http://localhost:3000/auth/login', {email, password})
        .then((result) => {
          if (result) {
            // localStorage.setItem("token", response.data.token)
            navigate("/dashboard");
          }  else {
            console.log("Failed")
          }
        })
        .catch((error) => console.log(error));
    };

  


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-page">
      <div className="p-3 rounded w-25 border login-form">
    
        <h2 className="text-center">
          Login
        </h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              className="form-control rounded-0"
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
                <span onClick={() => navigate('/register')}>Register</span>
              </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
