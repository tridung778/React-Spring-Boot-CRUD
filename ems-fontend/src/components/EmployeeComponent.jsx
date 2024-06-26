import { useEffect, useState } from "react";
import { getEmployeeById, saveEmployee, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setfirstName] = useState("");

  const [lastName, setlastName] = useState("");

  const { id } = useParams();

  const [error, setError] = useState([
    {
      firstName: "",
      lastName: "",
      email: "",
    },
  ]);

  const [email, setEmail] = useState("");

  const navgator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployeeById(id).then((res)=>{
        setfirstName(res.data.firstName);
        setlastName(res.data.lastName);
        setEmail(res.data.email);
      })
    } 
  },[id])

  const addEmployee = (e) => {
    e.preventDefault();
    const employee = { firstName, lastName, email };

    if(id){
      updateEmployee(id, employee).then((response) => {
        console.log(response.data);
        navgator("/employees");
      });
      return;
    }

    if (validate()) {
      saveEmployee(employee).then((response) => {
        console.log(response.data);
        navgator("/employees");
      });
    }
  };

  const validate = () => {
    let valid = true;

    const errorCopy = { ...error };

    if (firstName.trim()) {
      errorCopy.firstName = "";
    } else {
      errorCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorCopy.lastName = "";
    } else {
      errorCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errorCopy.email = "";
    } else {
      errorCopy.email = "Email is required";
      valid = false;
    }

    setError(errorCopy);

    return valid;
  };

  const pageTitle = () => {
    if (id) {
      return <h3 className="text-center">Edit Employee</h3>;
    } else {
      return <h3 className="text-center">Add Employee</h3>;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
        {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label htmlFor="">First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    error.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setfirstName(e.target.value)}
                />
                {<div className="invalid-feedback">{error.firstName}</div> &&
                  error.firstName}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    error.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setlastName(e.target.value)}
                />
                {<div className="invalid-feedback">{error.lastName}</div> &&
                  error.lastName}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  className={`form-control ${error.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {<div className="invalid-feedback">{error.email}</div> &&
                  error.email}
              </div>

              <button className="btn btn-success" onClick={addEmployee}>
                Add employee
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
