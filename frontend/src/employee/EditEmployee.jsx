import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextBox from "../components/Textbox";

const EditEmployee = () => {
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    jobtitle: "",
    department_id: "",
    address: "",
  });
  const [department, setDepartment] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/department")
      .then((result) => {
        if (result.data.Status) {
          console.log(result.data.Result);
          setDepartment(result.data.Result);
        } else {
          console(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/auth/employee/" + id)
      .then((result) => {
        console.log(result);
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          jobtitle: result.data.Result[0].jobtitle,
          address: result.data.Result[0].address,
          department_id: result.data.Result[0].department_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/edit_employee/" + id, employee)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          console.log(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center">
      <div className="mt-5 p-3 rounded border bg-slate-50 w-96">
        <h2 className="text-center">Edit Employee</h2>
        <form className="" onSubmit={handleSubmit}>
          
            <TextBox className="font-normal" label={'Name'} placeholder={'Enter employee name'}
            value={employee.name} onChange={(e) =>
              setEmployee({ ...employee, name: e.target.value })
            }/>
          
          <TextBox className="font-normal" label={'Email'} placeholder={'Enter employee email'}
            value={employee.email} onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value })
            }/>
          
          <TextBox className="font-normal" label={'Job Title'} placeholder={'Enter job title'}
          value={employee.jobtitle} onChange={(e) =>
            setEmployee({ ...employee, jobtitle: e.target.value })
          }/>
          
          
          <div className="">
            <label htmlFor="department" className="font-medium">
              Department:
            </label>
            <select
              name="department"
              id="department"
              className="font-normal ml-2"
              value={employee.department_id}
              onChange={(e) =>
                setEmployee({ ...employee, department_id: e.target.value })
              }
            >
              {department.map((data) => {
                return (
                  <option key={data.id} value={data.name}>
                    {data.name}
                  </option>
                );
              })}
            </select>
          </div>

          <TextBox className="font-normal" label={'Address'} placeholder={'H.No. 1234, City'}
          value={employee.address} onChange={(e) =>
            setEmployee({ ...employee, address: e.target.value })
          }/>
          

          <div className="col-12">
            <button type="submit" className="bg-green-600 rounded mt-2 w-25 p-2 text-sm font-medium text-white">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
