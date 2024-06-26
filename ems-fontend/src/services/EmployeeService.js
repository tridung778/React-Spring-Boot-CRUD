import axios from "axios";

const BASE_URL = "http://localhost:8080/api/employee";

export const listEmloyees = () => {
  return axios.get(BASE_URL);
};

export const saveEmployee = (employee) => {
  return axios.post(BASE_URL, employee);
};

export const getEmployeeById = (id) => {
  return axios.get(BASE_URL + "/" + id);
};

export const updateEmployee = (id, employee) => {
  return axios.put(BASE_URL + "/" + id, employee);
};

export const deleteEmployee = (id) => {
  return axios.delete(BASE_URL + "/" + id);
};
