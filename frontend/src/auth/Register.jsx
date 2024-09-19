import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextBox from "../components/Textbox";
import Heading from "../components/Heading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [emailExistsError, setEmailExistsError] = useState("");

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
      // Check if email already exists
      axios
        .get(`http://localhost:3000/auth/check_email/${formData.email}`)
        .then((response) => {
          if (response.data.exists) {
            setEmailExistsError("Email already exists. Please use a different email.");
          } else {
            // Proceed with registration
            axios
              .post("http://localhost:3000/auth/register", formData)
              .then((result) => {
                navigate("/");
                console.log(result);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => {
          console.error("Error checking email:", err);
        });
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
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <div className="bg-sky-100 rounded-lg w-[80%] sm:w-[50%] lg:w-[23%] text-center p-3">
        <form action="" onSubmit={handleSubmit}>
          
          <Heading label={'SignUp'}/>
          <TextBox name={'username'} placeholder={'Name'} label={'Username'} value={formData.username} onChange={handleChange}/>
            {errors.username && (
              <div className="text-danger">{errors.username}</div>
            )}
          <TextBox name={'email'} label={'Email'} placeholder={'johndoe@example.com'} value={formData.email} onChange={handleChange}/>
            {errors.email && <div className="text-danger">{errors.email}</div>}
            {emailExistsError && (
              <div className="text-danger">{emailExistsError}</div>
            )}

            <TextBox name={'password'} label={'Password'} type={'password'} placeholder={'Password'} value={formData.password} onChange={handleChange}/>
             {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
            <Button label={'Sign Up'}></Button>
            <BottomWarning label={'Already a user?'} to={'/'} buttonText={'Log in'}/>
        </form>
      </div>
    </div>
  );
};

export default Register;
