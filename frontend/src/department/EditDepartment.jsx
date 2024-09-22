import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextBox from "../components/Textbox";

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState({
    name: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/department/" + id)
      .then((result) => {
        setDepartment({
          ...department,
          name: result.data.Result[0].name,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/edit_department/" + id, department)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/department");
        } else {
          console.log(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center h-75">
      <div className="mt-5 p-3 rounded w-1/4 border bg-slate-50">
        <h2 className="text-center font-medium">Edit Department</h2>
        <form onSubmit={handleSubmit}>
          <div >
            <TextBox className="font-normal" label={'Department:'} placeholder={'Enter department name'}
              value={department.name}
              onChange={(e) =>
                setDepartment({ ...department, name: e.target.value })
              }/>
          </div>
          <button
            type="submit"
            className="bg-green-600 rounded mt-2 w-25 p-2 text-sm font-medium text-white"
          >
            Update department
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;
