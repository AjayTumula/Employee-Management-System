import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate()


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
  }, []);

  useEffect(() => {
    handleDelete()
  }, [])

  const handleDelete = async(id) => { 
    try {
        const response = await axios.delete(`http://localhost:3000/auth/delete_employee/${id}`);
        if (response.data.Status) {
          window.location.reload(); 
        } else {
          alert(response.data.Error); 
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee. Please try again later.');
      }
    }
   
  return (
    <div className="px-5 mt-5">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
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
  );
};

export default Employee;
