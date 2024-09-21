import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid")
        navigate("/");
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="flex-nowrap">
        <div className="p-3 my-2 text-lg flex justify-center font-medium">
          <h4>Employee Management System</h4>
        </div>

        <div>
          <div>
            <ul
              className="flex flex-row py-2 justify-around text-lg font-bold space-x-4 m-0 bg-gray-800"
              id="menu"
            >
              <li>
                <Link
                  to="/dashboard"
                  
                >
                  <span className="ms-2 d-none d-sm-inline text-white hover:text-sky-200">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/employee"
                >
                  <span className="ms-2 d-none text-white d-sm-inline hover:text-sky-200">
                    Manage Employees
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/department"
                  
                >
                  <span className="ms-2 d-none d-sm-inline text-white hover:text-sky-200">Department</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/profile"
                  
                >
                  <span className="ms-2 d-none d-sm-inline text-white hover:text-sky-200">Profile</span>
                </Link>
              </li>
              <li onClick={handleLogout}>
                <Link>
                  <span className="text-white hover:text-sky-200">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
