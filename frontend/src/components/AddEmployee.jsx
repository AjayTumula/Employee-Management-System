import axios from "axios";
import React, { useEffect, useState } from "react";

const AddEmployee = () => {


    const[department, setDepartment] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/auth/department')
        .then(result => {
            if(result.data.Status){
                setDepartment(result.data.Result)
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }, [])

  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="mt-5 p-3 rounded w-25 border">
        <h2 className="text-center">Add Employee</h2>
        <form className="row g-1" >
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              
            />
          </div>
          <div className="col-12">
            <label for="inputJobTitle" className="form-label">
              Job Title
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputJobTitle"
              placeholder="Enter Job Title"
              autoComplete="off"
            />
          </div>
          <div className="col-12">
            <label for="department" className="form-label">
              Department
            </label>
            <select name="department" id="department" className="form-select">
                {department.map(data => {
                    return <option vlaue={data.name}>{data.name}</option>
                })}
            </select>
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="H.No. 1234, City"
              autoComplete="off"
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
