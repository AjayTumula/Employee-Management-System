
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login/Login.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx'
import Home from './components/Home.jsx'
import Employee from './components/Employee.jsx'
import Department from './components/Department.jsx'
import Profile from './components/Profile.jsx'
import AddDepartment from './components/AddDepartment.jsx'
import AddEmployee from './components/AddEmployee.jsx'

function App() {
  
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/auth/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/employee' element={<Employee />}></Route>
          <Route path='/dashboard/department' element={<Department />}></Route>
          <Route path='/dashboard/profile' element={<Profile />}></Route>
          <Route path='/dashboard/add_department' element={<AddDepartment />}></Route>
          <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        </Route>  
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
