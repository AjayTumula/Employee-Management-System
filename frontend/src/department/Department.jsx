import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Department = () => {
  const [department, setDepartment] = useState([]);
  const [departmentTotal, setDepartmentTotal] = useState();

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

      axios.get("http://localhost:3000/auth/department_count").then((result) => {
        if (result.data.Status) {
          setDepartmentTotal(result.data.Result[0].department);
        }
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_department/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="px-5 mt-5">
     <div className="d-flex flex-column align-items-center">
        <div className="d-flex justify-content-center">
        <h3>Department List</h3>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25 mt-3">
          <div className="text-center pb-1">
            <h4>Department</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{departmentTotal}</h5>
          </div>
        </div>
    </div>
      <Link to="/dashboard/add_department" className="btn btn-success">
        Add Department
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {department.map((data, id) => (
              <tr key={id}>
                <td>{data.name}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_department/` + data.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(data.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Department;
