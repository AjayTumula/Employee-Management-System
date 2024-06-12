import React from "react";
import { Link, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="flex-nowrap">
      <div>
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Emoployee Management System</h4>
          </div>
          <Outlet />
        </div>
        <div className="mt-30 bg-dark">
          <div className="d-flex flex-row justify-content-space-between text-white">
            <Link
              to="/dashboard"
              className="d-flex  pb-3  mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">EMS</span>
            </Link>
            <ul
              className="d-flex flex-row nav nav-pills m-0"
              id="menu"
            >
              <li>
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-0 align-middle text-white"
                >
                  <span className="ms-2 d-none d-sm-inline">
                    Manage Employees
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/department"
                  className="nav-link px-0 align-middle text-white"
                >
                  <span className="ms-2 d-none d-sm-inline">
                    Department
                  </span>
                </Link>
              </li>
              
              <li>
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li>
                <Link className="nav-link px-0 align-middle text-white">
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
