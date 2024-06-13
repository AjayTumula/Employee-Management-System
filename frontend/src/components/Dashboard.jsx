import React from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="flex-nowrap">
        <div className="p-3 d-flex  justify-content-center">
          <h4>Emoployee Management System</h4>
        </div>

        <div>
          <div>
            <ul
              className="d-flex flex-row justify-content-around fs-5 fw-bold nav nav-pills m-0 bg-dark"
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
                    Employees
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/department"
                  className="nav-link px-0 align-middle text-white"
                >
                  <span className="ms-2 d-none d-sm-inline">Department</span>
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
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
