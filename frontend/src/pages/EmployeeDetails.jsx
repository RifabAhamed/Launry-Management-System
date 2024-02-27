import {
    Box,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { getRequest } from "../store/app/app_Action";
  import SingleReqModal from "../components/SingleReqModal";
  import { getNotification } from "../store/notification/notAction";
  import {Link, Navigate, useNavigate} from "react-router-dom"
import { deleteEmployee, fetchAllEmployees } from "../services/employee.service";
  
  const EmployeeDetails = () => {
    const { requests } = useSelector((store) => store.appReducer);
    const { userId } = useSelector((store) => store.authReducer);
    const [employeeList, setEmployeeList] = useState([]);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getRequest(userId));
      dispatch(getNotification(userId));
      getAllEmployees();
    }, []);


    const Navigate = useNavigate();

    const getAllEmployees = async()=> {
      const employees = await fetchAllEmployees();
      setEmployeeList(employees);
    }
  
    const removeEmployee = async(id) => {
      await deleteEmployee(id);
      const list = employeeList.filter(employee => employee._id != id);
      setEmployeeList(list);
    }

// function EmployeeDetails(){
//     const[employees, setEmployees] = useState([{
//         Name:"Rifab", NICNo:"990521794V", Address:"Aluthgama", PhoneNo:"0766593591", Age:"24",Sex:"M"

//     }])
return(
    <Box w="80%" p="1rem" bg="#f7f7f7" textAlign={"right"}>
                    <button onClick={()=>Navigate("/add-employee")} 
                     className='btn btn-primary' style={{
                      backgroundColor: "lightblue",       // Background color
                      color: 'darkblue',                 // Text color
                      borderRadius: '8px',             // Rounded corners
                      padding: '10px 20px',           // Padding
                      border: 'none',                // Remove border
                      cursor: 'pointer',             // Change cursor on hover
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' // Add a subtle shadow
                      }}>Add</button>
                <TableContainer bg="whiteAlpha.800" shadow={"base"}>
                  <Table variant="simple">
                  {
                        !employeeList.length && (
                          <TableCaption>Employee Details</TableCaption>
                        )
                      }  
                    <Thead>
                      <Tr>
                        <Th w="20%"> Name</Th>
                        <Th w="20%" border={"2px solid #f7f7f7"}>NIC No</Th>
                        <Th w="30%" border={"2px solid #f7f7f7"}>Address</Th>
                        <Th border={"2px solid #f7f7f7"}>Phone No</Th>
                        <Th border={"2px solid #f7f7f7"}>Age</Th>
                        <Th border={"2px solid #f7f7f7"}>Sex</Th>
                        <Th border={"2px solid #f7f7f7"}>Actions</Th>
                      </Tr>
                      {
                        employeeList.map(employee => 
                          <Tr>
                            <Td w="20%">{ employee.name }</Td>
                            <Td w="20%" border={"2px solid #f7f7f7"}>{ employee.nic }</Td>
                            <Td w="30%" border={"2px solid #f7f7f7"}>{ employee.address }</Td>
                            <Td border={"2px solid #f7f7f7"}>{ employee.phoneNo}</Td>
                            <Td border={"2px solid #f7f7f7"}>{ employee.age }</Td>
                            <Td border={"2px solid #f7f7f7"}>{ employee.sex }</Td>
                            <Td border={"2px solid #f7f7f7"}>
                            <Link
                              style={{
                                margin: '5px 10px',
                                backgroundColor: 'darkblue',       // Background color
                                color: 'white',                 // Text color
                                borderRadius: '8px',             // Rounded corners
                                padding: '10px 20px',           // Padding
                                border: 'none',                // Remove border
                                cursor: 'pointer',             // Change cursor on hover
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' // Add a subtle shadow
                                }} colorScheme="blue"
                              to={`/update-employee/${employee._id}`} className='btn btn-success'>Edit</Link>
                              
                              <button style={{
                                backgroundColor: 'darkblue',       // Background color
                                color: 'white',                 // Text color
                                borderRadius: '8px',             // Rounded corners
                                padding: '10px 20px',           // Padding
                                border: 'none',                // Remove border
                                cursor: 'pointer',             // Change cursor on hover
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' // Add a subtle shadow
                                }} colorScheme="blue" onClick={() => removeEmployee(employee._id)}>Delete </button> 

                              
                            </Td>
                          </Tr>
                          )                      
                      }
                      
                    </Thead>
                                      
                  </Table>
                </TableContainer>
    </Box>
);




};
export default EmployeeDetails;