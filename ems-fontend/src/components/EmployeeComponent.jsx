import { useState } from "react";
import { saveEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setfirstName] = useState("");

  const [lastName, setlastName] = useState("");

  const [email, setEmail] = useState("");

  const navgator = useNavigate();

  const addEmployee = (e) => {
    e.preventDefault();

    const employee = { firstName, lastName, email };

    saveEmployee(employee).then((response) => {
      console.log(response.data);
      navgator("/employees");
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h3 className="text-center">Add Employee</h3>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label htmlFor="">First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  className="form-control"
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </div>

              <div className="form-group mb-2">
                <label htmlFor="">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  className="form-control"
                  onChange={(e) => setlastName(e.target.value)}
                />
              </div>

              <div className="form-group mb-2">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
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
