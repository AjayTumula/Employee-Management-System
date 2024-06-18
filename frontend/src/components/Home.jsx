import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [employeeTotal, setEmployeeTotal] = useState();
  const [departmentTotal, setDepartmentTotal] = useState();
  const [employees, setEmployees] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [searchParam] = useState(["name"]);
  const [filterParam, setFilterParam] = useState(["ALL"]);

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
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
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

      <div className="d-flex justify-content-around mt-5">
        <div>
        <span className="fs-5 fw-medium">Search Employees: </span>
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              value={inputSearch}
              placeholder="Search for employee"
              onChange={(e) => setInputSearch(e.target.value)}
            />
          </label>
        </div>
        <div className="select">
         <span className="fs-5 fw-medium">Filter by Department: </span>
          <select
            onChange={(e) => {
              setFilterParam(e.target.value);
            }}
            className="custom-select"
            aria-label="Filter Employees By Department"
          >
            <option value="ALL">ALL</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Developer">Developer</option>
            <option value="Testing team">Testing team</option>
          </select>
          <span className="focus"></span>
        </div>
        <div className="select">
        <span className="fs-5 fw-medium">Filter by Jobtitle: </span>
          <select
            onChange={(e) => {
              setFilterParam(e.target.value);
            }}
            className="custom-select"
            aria-label="Filter Employees By Jobtitle"
          >
            <option value="ALL">ALL</option>
            <option value="Frontend developer">Frontend Developer</option>
            <option value="Dev">Dev</option>
          </select>
          <span className="focus"></span>
        </div>
      </div>
      <div className="mx-5 mt-5">
        <ul>
          {search(employees).map((employee) => (
            <li className="fs-4">
              {employee.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
