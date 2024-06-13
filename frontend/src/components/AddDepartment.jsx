import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {

    const[department, setDepartment] = useState();
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/add_department', {department})
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/department')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='mt-5 p-3 rounded w-25 border'>
            <h2>Add Department</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='department'><strong>Department:</strong></label>
                    <input className='form-control rounded-0 mt-1' type="text" name="department" 
                        placeholder='Enter department'
                        onChange={(e) => setDepartment(e.target.value)}
                    /> 
                </div> 
                <button type='submit' className='btn btn-success w-100 rounded-0 mb-3'>Add department</button>   
            </form>
        </div>
    </div>
  )
}

export default AddDepartment