import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Icon from "../components/Icon";

const Department = () => {
  const [department, setDepartment] = useState([]);
  const [departmentTotal, setDepartmentTotal] = useState();
  const [showOptions, setShowOptions] = useState(false);

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

  const handleOptionClick = (id) => {
    setShowOptions(showOptions === id ? null : id)
  }

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
    <div className="p-4 sm:ml-64">
   
   <div className="p-4 border-2 w-4/5 border-gray-200 bg-slate-50 rounded-lg dark:border-gray-700">

        
          <h3 className="flex justify-center text-lg font-medium">Department List</h3>
        

        <div className="p-3 flex justify-around mt-3">
              <Card cardTitle={'Department'} cardText={'Total:'} totalNumber={departmentTotal}/>
        </div>
       
 

      <div className="bg-green-600 rounded-lg text-sm w-32 p-2 font-medium text-white">
        <Link to="/dashboard/add_department">
          Add Department
        </Link>
      </div>

      <div className="mt-3">
        <table className="w-1/2 border-collapse">
          <thead className="text-left">
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {department.map((data, id) => (
              <tr key={id} className="hover:bg-slate-300 cursor-pointer">
                <td>{data.name}</td>
                <td>
                  <div onClick={() => handleOptionClick(id)}>
                    <Icon iconName={'ellipsis'}/>
                  </div>
                  {showOptions === id && (
                  <div className="flex flex-col border border-gray-300 rounded bg-white shadow-lg absolute  z-10 max-h-[250px] p-1">
                  <Link
                    to={`/dashboard/edit_department/` + data.id}
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

export default Department;
