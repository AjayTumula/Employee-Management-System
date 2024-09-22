import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import TextBox from "./components/Textbox";
import Dropdown from "./components/Dropdown";

const Home = () => {
  const [employeeTotal, setEmployeeTotal] = useState();
  const [departmentTotal, setDepartmentTotal] = useState();
  const [employees, setEmployees] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [searchParam] = useState(["name"]);
  const [filterParam, setFilterParam] = useState(["ALL"]);
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployees(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

      axios.get("http://localhost:3000/auth/department")
      .then((result) => {
        if(result.data.Status) {
            setDepartments(result.data.Result);
        } else {
            alert(result.data.Error)
        }
      })
  }, []);


  useEffect(() => {
    employeeCount();
    departmentCount();
  }, []);

  const employeeCount = () => {
    axios.get("http://localhost:3000/auth/employee_count").then((result) => {
      if (result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee);
      }
    });
  };

  const departmentCount = () => {
    axios.get("http://localhost:3000/auth/department_count").then((result) => {
      if (result.data.Status) {
        setDepartmentTotal(result.data.Result[0].department);
      }
    });
  };

  function search(employees) {
    return employees.filter((employee) => {
      if (employee.department_id == filterParam) {
        return searchParam.some((newEmployee) => {
          return (
            employee[newEmployee]
              .toString()
              .toLowerCase()
              .indexOf(inputSearch.toLowerCase()) > -1
          );
        });
      } else if (employee.jobtitle == filterParam) {
        return searchParam.some((newEmployee) => {
          return (
            employee[newEmployee]
              .toString()
              .toLowerCase()
              .indexOf(inputSearch.toLowerCase()) > -1
          );
        });
      } else if (filterParam == "ALL") {
        return searchParam.some((newEmployee) => {
          return (
            employee[newEmployee]
              .toString()
              .toLowerCase()
              .indexOf(inputSearch.toLowerCase()) > -1
          );
        });
      }
    });
  }

  return (
    <div>
      <div class="p-4 sm:ml-64">
        <div class="p-2 border-2 border-gray-200 bg-slate-50 rounded-lg dark:border-gray-700">
            
        <div className="p-3 flex justify-around mt-3">
              <Card cardTitle={'Employee'} cardText={'Total:'} totalNumber={employeeTotal}/>
              <Card cardTitle={'Employee'} cardText={'Total:'} totalNumber={departmentTotal}/>
        </div>
        
        <div className="flex justify-between mt-5 px-5">
              <div className="flex flex-row items-center">
                <div className="text-lg font-medium">Search Employees: </div>
                <TextBox className="ml-2" type={search} name={'search-form'} value={inputSearch} placeholder={'Search for employee'} onChange={(e) => setInputSearch(e.target.value)}/>
              </div>

              {/* <Dropdown label={'Filter by Department:'}
                onChange={(e) => {
                  setFilterParam(e.target.value);
                }} 
                
              /> */}

              <div className="flex items-center">
                <span className="text-lg font-medium">Filter by Department: </span>
                <select
                  onChange={(e) => {
                    setFilterParam(e.target.value);
                  }}
                  className="ml-2" 
                >
                  <option value="ALL">ALL</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.name}>
                          {dept.name}
                      </option>
                    ))}    
                </select>
                <span className="focus"></span>
              </div>

              <div className="flex items-center">
                <span className="text-lg font-medium">Filter by Jobtitle: </span>
                <select
                  onChange={(e) => {
                    setFilterParam(e.target.value);
                  }} 
                  className="ml-2" 
                >
                  <option value="ALL" >ALL</option>
                  {employees.map((emp) => (
                      <option key={emp.id} value={emp.jobtitle}>
                          {emp.jobtitle}
                      </option>
                  ))}
                  <option value="Frontend developer">Frontend Developer</option>
                  <option value="Dev">Dev</option>
                </select>
                <span className="focus"></span>
              </div>


            </div>
            
            <div className="mt-5 px-5">
                <table className="w-full border-collapse">

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
                    {search(employees).map((employee) => (
                      <tr className="hover:bg-slate-300 cursor-pointer">
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.jobtitle}</td>
                        <td>{employee.department_id}</td>
                        <td>{employee.address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              
            </div> 
        </div>
      </div>    
      </div>
  );
};

export default Home;
