import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    useToast,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { useParams } from 'react-router';
  import { createRequest } from "../store/app/app_Action";
import { createEmployee, fetchEmployee, updateEmployee } from "../services/employee.service";
  
const AddEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();    
  const [form, setForm] = useState({
    id: "",
    name: "",
    nic: "",
    address: "",
    phoneNo: "",
    age: "",
    sex: "",
  });

  useEffect(()=>{
    if(id){
      fetchEmployee(id)
      .then(employee => {
        const obj = { ...employee, id: employee._id };
        setForm(obj);
      });
    }
  },[])
  
     const handleSubmit = async () => {
        console.log(form)
        if(id){
          await updateEmployee(form);
        }else{
          delete form.id;
          await createEmployee(form);
        }
        navigate("/employee-details");
     };
 
  
    return (
      <Box p="1rem" w="80%" boxSizing="border-box" bg="#f7f7f7">

        <Box>
          
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              defaultValue={form?.name}
              bgColor="whiteAlpha.700"
               onChange={(e) => setForm({ ...form, name: e.target.value })}
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel>NIC</FormLabel>
            <Input
              defaultValue={form?.nic}
              bgColor="whiteAlpha.700"
              onChange={(e) => setForm({ ...form, nic: e.target.value })}
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              defaultValue={form?.address}
              bgColor="whiteAlpha.700"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone No</FormLabel>
            <Input
              defaultValue={form?.phoneNo}
              bgColor="whiteAlpha.700"
              onChange={(e) => setForm({ ...form, phoneNo: e.target.value })}
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Age</FormLabel>
            <Input
              defaultValue={form?.age}
              bgColor="whiteAlpha.700"
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              size="sm"
            />
          </FormControl>
  
          <FormControl>
            <FormLabel>Sex</FormLabel>
            <Select
              bgColor="whiteAlpha.700"
              onChange={(e) => setForm({ ...form, sex: e.target.value })}
              placeholder={form.sex ? form.sex : "Select Gender"}>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="Other">Other</option>

            </Select>
          </FormControl>
          
          <Button
            mt="10px"
            colorScheme="blue"
            onClick={handleSubmit}
            style={{
                backgroundColor: '#a8a9ef',       // Background color
                color: 'darkblue',                 // Text color
                borderRadius: '8px',             // Rounded corners
                padding: '10px 20px',           // Padding
                border: 'none',                // Remove border
                cursor: 'pointer',             // Change cursor on hover
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' // Add a subtle shadow
                }}>
                Submit
            </Button>
        </Box>
      </Box>
    );
};
  
  export default AddEmployee;
  