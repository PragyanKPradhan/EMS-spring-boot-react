import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeesComponent = () => {
  // const dummyData = [
  //   {
  //     id: 1,
  //     name: "Pragyan",
  //     phone: 9090094394,
  //     email: "pragyan@gmail.com",
  //   },
  //   {
  //     id: 2,
  //     name: "Tony",
  //     phone: 9439444394,
  //     email: "tony@gmail.com",
  //   },
  //   {
  //     id: 3,
  //     name: "Chiku",
  //     phone: 9876543210,
  //     email: "chiku@gmail.com",
  //   },
  // ];

  const [employee, setEmployee] = useState([]);

  const navigator=useNavigate()

  useEffect(() => {
    getAllEmployees()
  }, []);

  function getAllEmployees(){
    listEmployees()
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewEmployee(){
    navigator('/add-employee')
  }

  function updateEmployee(id){
    navigator(`/edit-employee/${id}`)
  }

  function removeEmployee(id){
    console.log(id);
    deleteEmployee(id).then((response)=>{
      getAllEmployees()
    }).catch(error=>{
      console.error(error);
    })
  }
  return (
    <div className="container col-md-8">
      <br /><br />
      <h2 className="text-center">List of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>
                <button className="btn btn-info" onClick={()=>updateEmployee(employee.id)}>Update</button>
                <button className="btn btn-danger" onClick={()=>removeEmployee(employee.id)}
                style={{marginLeft:'20px'}}
                >Delete</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeesComponent;
