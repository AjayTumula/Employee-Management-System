import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [employeeTotal, setEmployeeTotal] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios.get("http://localhost:3000/auth/employee_count").then((result) => {
      if (result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee);
      }
    });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_employee/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (

    <div class="p-4 sm:ml-64">
      <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <div className="d-flex justify-content-center">
            <h3>Employee List</h3>
            </div>
      <div className="p-3 flex justify-around mt-3">
            <Card cardTitle={'Employee'} cardText={'Total:'} totalNumber={employeeTotal}/>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Employee id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Job Title</th>
              <th>Department</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((data, id) => (
              <tr key={id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.jobtitle}</td>
                <td>{data.department_id}</td>
                <td>{data.address}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/` + data.id}
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
</div>
  );
};

export default Employee;
