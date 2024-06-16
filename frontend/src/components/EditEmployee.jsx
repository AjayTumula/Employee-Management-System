import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {

    const {id} = useParams()
   
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        jobtitle: "",
        department_id: "",
        address: "",
      });
    const[department, setDepartment] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/department')
        .then(result => {
            if(result.data.Status){
                console.log(result.data.Result)
                setDepartment(result.data.Result)
            } else {
                console(result.data.Error)
            }
        }).catch(err => console.log(err))


        axios.get('http://localhost:3000/auth/employee/'+id)
        .then(result => {
            setEmployee({
                ...employee,
                name: result.data.Result[0].name,
                email: result.data.Result[0].email,
                jobtitle: result.data.Result[0].jobtitle,
                address: result.data.Result[0].address,
                department_id: result.data.Result[0].department_id,
            })
        }).catch(err => console.log(err))


    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/auth/edit_employee/'+id, employee)
        .then(result => {
            if(result.data.Status) {
                console.log(result.data.Result)
                navigate('/dashboard/employee')
            } else {
                console.log(result.data.Error)
            }
        }).catch(err => console.log(err))
    }

  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="mt-5 p-3 rounded w-25 border">
        <h2 className="text-center">Edit Employee</h2>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              value={employee.email}
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputJobTitle" className="form-label">
              Job Title
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputJobTitle"
              placeholder="Enter Job Title"
              value={employee.jobtitle}
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, jobtitle: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <select
              name="department"
              id="department"
              className="form-select"
              value={employee.department_id}
              onChange={(e) =>
                setEmployee({ ...employee, department_id: e.target.value })
              }
            >
              {department.map((data) => {
                return <option key={data.id} value={data.name}>{data.name}</option>
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="H.No. 1234, City"
              value={employee.address}
              autoComplete="off"
              onChange={(e) => setEmployee({...employee, address: e.target.value})}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEmployee