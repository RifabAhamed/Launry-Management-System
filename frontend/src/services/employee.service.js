import axios from "axios";

const baseurl = "http://localhost:8080/employee";

export const fetchAllEmployees = async() => {
    const res = await axios.get(`${baseurl}`)
      return res.data;
  };

export const fetchEmployee = async(id) => {
  const res = await axios.get(`${baseurl}/${id}`)
    return res.data;
};

export const createEmployee = async(employee) => {
  const res = await axios.post(`${baseurl}/create`,employee)
    return res.data;
};

export const updateEmployee = async(employee) => {
  const res = await axios.put(`${baseurl}/update`,employee)
    return res.data;
};

export const deleteEmployee = async(id) => {
  const res = await axios.delete(`${baseurl}/delete/${id}`)
    return res.data;
};