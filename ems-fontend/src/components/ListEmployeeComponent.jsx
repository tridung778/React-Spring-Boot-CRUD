import { deleteEmployee, listEmloyees } from "../services/EmployeeService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  const navgator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = () => {
    listEmloyees()
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewEmployee = () => {
    navgator("/add-employee");
  };

  const editEmployee = (id) => {
    navgator(`/edit-employee/${id}`);
  };

  const handleDeleteEmployee = (id) => {
    deleteEmployee(id)
      .then((response) => {
        console.log("Employee deleted:", response.data);
        getAllEmployees();
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  return (
    <div className="container d-flex align-items-center justify-content-center flex-column">
      <h2>Table Employee</h2>
      <button className="btn btn-success" onClick={addNewEmployee}>
        Add new employee
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    editEmployee(employee.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleDeleteEmployee(employee.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
