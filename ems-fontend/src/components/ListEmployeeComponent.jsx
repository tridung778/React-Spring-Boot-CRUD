import { deleteEmployee, listEmloyees } from "../services/EmployeeService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <Button onClick={addNewEmployee} variant="default" className="mt-3 bg-lime-400">Add new employee</Button>
      <Table>
        <TableCaption>Table Employee.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.firstName}</TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>
                <Button
                  className="mx-3 bg-blue-600"
                  onClick={() => {
                    editEmployee(employee.id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-600"
                  onClick={() => {
                    handleDeleteEmployee(employee.id);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListEmployeeComponent;
