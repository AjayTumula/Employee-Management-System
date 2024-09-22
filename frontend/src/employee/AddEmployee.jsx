import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextBox from "../components/Textbox";

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
    <div className="flex justify-center items-center h-75">
      <div className="mt-5 p-3 rounded w-25 border bg-slate-50 w-96">
        <h2 className="text-center">Add Employee</h2>
        <form className="" onSubmit={handleSubmit}>
          <div className="">
            <TextBox label={'Name'} placeholder={'Enter employee name'}
              onChange={(e) =>
              setEmployee({ ...employee, name: e.target.value })}/>
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>

          <div className="">
            <TextBox label={'Email'} placeholder={'Enter employee email'}
              type={'email'}
             onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value })}/>
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="">
            <TextBox label={'Job Title'} placeholder={'Enter employee job title'}
            onChange={(e) =>
              setEmployee({ ...employee, jobtitle: e.target.value })}
            />
             {errors.jobtitle && <div className="text-danger">{errors.jobtitle}</div>}
          </div>

          <div className="mt-2">
            <label htmlFor="department" className="form-label">
              Department:
            </label>
            <select
              name="department"
              id="department"
              className="border text-sm  w-60 border-slate-700 rounded ml-2"
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

          <div className="">
            <TextBox label={'Address'} placeholder={'H.No. 1234, City'}
            onChange={(e) =>
              setEmployee({ ...employee, address: e.target.value })}
            />
            {errors.address && <div className="text-danger">{errors.address}</div>}
          </div>

          <div className="col-12">
            <button type="submit" className="bg-green-600 rounded mt-2 w-25 p-1 text-sm font-medium text-white">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
