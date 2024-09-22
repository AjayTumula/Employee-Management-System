import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Icon from "../components/Icon";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [employeeTotal, setEmployeeTotal] = useState();
  const [showOptions, setShowOptions] = useState(false);

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

  const handleOptionClick = (id) => {
    setShowOptions(showOptions === id ? null : id)
  }

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
          <h3 className="flex justify-center text-lg font-medium">Employee List</h3>
      <div className="p-3 flex justify-around mt-3">
            <Card cardTitle={'Employee'} cardText={'Total:'} totalNumber={employeeTotal}/>
      </div>
      <div className="bg-green-600 rounded-lg w-32 p-2 font-medium text-white">
        <Link to="/dashboard/add_employee">
          Add Employee
        </Link>
      </div>
      
      
      <div className="mt-3">
        <table className="w-full border-collapse mr-7">
          <thead className="text-left">
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
              <tr key={id} className="hover:bg-slate-300 cursor-pointer">
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.jobtitle}</td>
                <td>{data.department_id}</td>
                <td>{data.address}</td>
                <td>
                  <div onClick={() => handleOptionClick(id)}>
                    <Icon iconName={'ellipsis'}/>
                  </div>
                  {showOptions === id && (
                    <div className="flex flex-col border border-gray-300 rounded bg-white shadow-lg absolute  z-10 max-h-[250px] p-1">
                    <Link
                    to={`/dashboard/edit_employee/` + data.id}
                    className="text-sm p-1 font-medium hover:text-blue-400"
                    >
                      Edit
                    </Link>
                    <button
                      className="text-sm p-1 font-medium hover:text-blue-400"
                      onClick={() => handleDelete(data.id)}
                    >
                      Delete
                    </button>
                    </div>
                  )} 
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
