import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    jobtitle: "",
    department_id: "",
    address: "",
  });
  const [department, setDepartment] = useState([]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/department")
      .then((result) => {
        if (result.data.Status) {
          setDepartment(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
  
    if (!employee.name.trim()) {
      errors.name = "Name is required";
      formIsValid = false;
    }
  
    if (typeof employee.email !== 'undefined') {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(employee.email)) {
        formIsValid = false;
        errors.email = 'Please enter valid email address.';
      }
    }
  
    if (!employee.jobtitle.trim()) {
      errors.jobtitle = "Job title is required";
      formIsValid = false;
    }
  
    if (!employee.department_id.trim()) {
      errors.department_id = "Department is required";
      formIsValid = false;
    }
  
    if (!employee.address.trim()) {
      errors.address = "Address is required";
      formIsValid = false;
    }
  
    setErrors(errors);
    return formIsValid;
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
      .post("http://localhost:3000/auth/add_employee", employee)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
    } 
  };

  return (
    <div className="flex justify-content-center align-items-center h-75">
      <div className="mt-5 p-3 rounded w-25 border">
        <h2 className="text-center">Add Employee</h2>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="col-12">
            <label htmlFor="inputJobTitle" className="form-label">
              Job Title
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputJobTitle"
              placeholder="Enter Job Title"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, jobtitle: e.target.value })
              }
            />
             {errors.jobtitle && <div className="text-danger">{errors.jobtitle}</div>}
          </div>
          <div className="col-12">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <select
              name="department"
              id="department"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, department_id: e.target.value })
              }
            >
              {department.map((data, id) => {
                return (
                  <option key={id} value={data.name}>
                    {data.name}
                  </option>
                );
              })}
            </select>
            {errors.department_id && <div className="text-danger">{errors.department_id}</div>}
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="H.No. 1234, City"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
            {errors.address && <div className="text-danger">{errors.address}</div>}
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
