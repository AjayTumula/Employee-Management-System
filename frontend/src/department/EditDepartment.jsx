import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState({
    name: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/department/" + id)
      .then((result) => {
        setDepartment({
          ...department,
          name: result.data.Result[0].name,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/edit_department/" + id, department)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/department");
        } else {
          console.log(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="mt-5 p-3 rounded w-25 border">
        <h2>Edit Department</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="department">
              <strong>Department:</strong>
            </label>
            <input
              className="form-control rounded-0 mt-1"
              type="text"
              name="department"
              placeholder="Enter department"
              value={department.name}
              onChange={(e) =>
                setDepartment({ ...department, name: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 rounded-0 mb-3"
          >
            Update department
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;
