
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/auth/Login.jsx'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx'
import Home from './components/Home.jsx'
import Employee from './components/employee/Employee.jsx'
import Department from './components/department/Department.jsx'
import Profile from './components/Profile.jsx'
import AddDepartment from './components/department/AddDepartment.jsx'
import AddEmployee from './components/employee/AddEmployee.jsx'
import EditEmployee from './components/employee/EditEmployee.jsx'
import Register from './components/auth/Register.jsx'
import EditDepartment from './components/department/EditDepartment.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import EmployeeLogin from './components/auth/EmployeeLogin.jsx'
import EmployeeProfile from './components/auth/EmployeeProfile.jsx'
import { useEffect } from 'react'
import axios from 'axios'
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/verify')
    .then(result =>   {
      if(result.data.Status){
        if(result.data.role === "admin") {
          navigate('/dashboard')
        } else {
          navigate('/employee_profile/'+result.data.id)
        }
      }
    }).catch(err => console.log(err))
  }, [])
 
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/employee_login'  element={<EmployeeLogin />}></Route>
        <Route path='/employee_profile/:id' element={<EmployeeProfile/>}></Route>
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
          }>
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/employee' element={<Employee />}></Route>
          <Route path='/dashboard/department' element={<Department />}></Route>
          <Route path='/dashboard/profile' element={<Profile />}></Route>
          <Route path='/dashboard/add_department' element={<AddDepartment />}></Route>
          <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
          <Route path='/dashboard/edit_department/:id' element={<EditDepartment />}></Route>
        </Route>  
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
