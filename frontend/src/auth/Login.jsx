import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Heading from "../components/Heading";
import TextBox from "../components/Textbox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

const Login = () => {
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value
        }))
  };

  axios.defaults.withCredentials = true;

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
                  setErrors(response.data.error);
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

  
  return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <div className="bg-slate-50 rounded-lg w-[80%] sm:w-[50%] lg:w-[23%] text-center p-3">
        <form action="" className="flex flex-col" onSubmit={handleSubmit}>
            <Heading label={'Login'}/>
            <TextBox label={'Email'} name={'email'} placeholder={'johndoe@example.com'} value={formData.email} onChange={handleChange}/>
              {errors.email && <div className="text-danger">{errors.email}</div>}
            <TextBox label={'Password'} name={'password'} type={'password'} value={formData.password} onChange={handleChange}/>
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            <Button label={'Log In'}></Button>
            <BottomWarning signupLabel={"Don't have an account?"} signupButtonText={'Sign Up'} signupRoute={'/register'} label={'If your are an employee, please login here'} to={'/employee_login'} buttonText={'Click here'}/>
        </form>
      </div>  
    </div>
  );
};

export default Login;
