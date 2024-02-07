import React, { useEffect, useState } from "react";
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDepartments } from "../services/DepartmentService";

const EmployeeComponent = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState("");

  const [departmentId, setDeparmentId] = useState("")
  const [departments, setDepartments]=useState([])

  useEffect(()=>{
    getAllDepartments().then((response)=>{
      setDepartments(response.data)
    }).catch(error=>{
      console.error(error);
    })
  },[])


  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    department:'',
  });

  const {id} = useParams()

  const navigator = useNavigate();

  useEffect(()=>{
    if(id){
        getEmployee(id).then((response)=>{
            setName(response.data.name)
            setPhone(response.data.phone)
            setEmail(response.data.email)
            setDeparmentId(response.data.departmentId)
        }).catch(error=>{
            console.error(error);
        })
    }
  },[id])

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
        const employee = { name, phone, email, departmentId};
        console.log(employee);

        if(id){
            updateEmployee(id, employee).then((response)=>{
                console.log(response.data);
                navigator('/employees')
            }).catch(error=>{
                console.error(error);
            })
        }else{
            createEmployee(employee).then((response) => {
                console.log(response.data);
                navigator("/employees");
            }).catch(error=>{
                console.error(error);
            })
        } 
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (name.trim()) {
      errorsCopy.name = "";
    } else {
      errorsCopy.name = "Name is required";
      valid = false;
    }

    if (phone) {
      errorsCopy.phone = "";
    } else {
      errorsCopy.phone = "Phone number is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    if(departmentId){
      errorsCopy.department=''
    }else{
      errorsCopy.department ="Select Department"
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  function pageTitle(){
    if(id){
        return <h2 className="text-center">Update Employee</h2>
    }else{
        return <h2 className="text-center">Add Employee</h2>
    }
  }

  return (
    <div className="conatiner">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
            {
                pageTitle()
            }
          <div className="card-body">
            <form action="">
              <div className="form-group mb-2">
                <label className="form-label">Employee Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee Name"
                  name="name"
                  value={name}
                  className={`form-control ${ errors.name ? 'is-invalid': '' }`}
                  onChange={(e) => setName(e.target.value)}
                />
                { errors.name && <div className='invalid-feedback'> { errors.name} </div> }
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Phone Number</label>
                <input
                  type="number"
                  placeholder="Enter Phone Number"
                  name="phone"
                  value={phone}
                  className={`form-control ${ errors.phone ? 'is-invalid': '' }`}
                  onChange={(e) => setPhone(e.target.value)}
                />
                { errors.phone && <div className='invalid-feedback'> { errors.phone} </div> }
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  value={email}
                  className={`form-control ${ errors.email ? 'is-invalid': '' }`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                { errors.email && <div className='invalid-feedback'> { errors.email} </div> }
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Select Department</label>
                <select 
                className={`form-control ${ errors.department ? 'is-invalid': '' }`} 
                value={departmentId}
                onChange={(e)=>setDeparmentId(e.target.value)}
                >
                  <option value="Select Department">Select Department</option>
                  {
                    departments.map( department => 
                      <option key={department.id} value={department.id} > {department.departmentName}</option>
                      )
                  }
                </select>
                { errors.department && <div className='invalid-feedback'> { errors.department} </div> }
              </div>
              <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;