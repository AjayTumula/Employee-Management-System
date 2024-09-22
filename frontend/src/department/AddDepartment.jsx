import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextBox from "../components/Textbox";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    name: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation: Check if department name is empty
    if (!department.name.trim()) {
      setError("Department name cannot be empty");
      return;
    }
    // Validation: Check if department already exists
    axios
      .get(`http://localhost:3000/auth/check_department/${department.name}`)
      .then((response) => {
        if (response.data.exists) {
          setError("Department already exists");
        } else {
          // Department does not exist, proceed with adding
          axios
            .post("http://localhost:3000/auth/add_department", department)
            .then((result) => {
              if (result.data.Status) {
                navigate("/dashboard/department");
              } else {
                alert(result.data.Error);
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center h-75">
      <div className="mt-5 p-3 rounded w-25 border bg-slate-50 w-96">
        <h2 className="text-center font-medium">Add Department</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <TextBox label={'Department:'} placeholder={'Enter department name'}
              onChange={(e) => {
                setDepartment({ ...department, name: e.target.value });
                setError("");
              }}
            />
              {error && <div className="text-danger mt-1">{error}</div>}
          </div>
          <button
            type="submit"
            className="bg-green-600 rounded mt-2 w-25 p-1 text-sm font-medium text-white"
          >
            Add department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
