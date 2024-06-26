import axios from "axios";

const BASE_URL = "http://localhost:8080/api/employee";

export const listEmloyees = () => {
  return axios.get(BASE_URL);
};

export const saveEmployee = (employee) => {
  return axios.post(BASE_URL, employee);
};
