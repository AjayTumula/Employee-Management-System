import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeProfile = () => {
    const [employee, setEmployee] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/auth/employee_profile/'+id)
        .then(result => 
            setEmployee(result.data[0])
        )
        .catch(err => console.log(err))
    }, [])

    const handleLogout = () => {
        axios.get("http://localhost:3000/auth/employee_logout").then((result) => {
          if (result.data.Status) {
            localStorage.removeItem("valid")
            navigate("/employee_login");
          }
        });
      };

  return (
    <div>
        <div className="p-2 d-flex justify-content-center shadow">
            <h4>Emoployee Management System</h4>
            <button className='btn btn-warning' onClick={handleLogout}>Logout</button>
        </div>
        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            <div className='d-flex align-items-center flex-column mt-5'>
           
                <h3>Name: {employee.name}</h3>
                <h3>Email: {employee.email}</h3>
                <h3>Jobtitle: {employee.jobtitle}</h3>
            </div>
        </div>
    </div>
  )
}

export default EmployeeProfile