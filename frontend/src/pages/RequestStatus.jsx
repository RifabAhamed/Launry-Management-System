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
import { deleteRequest, getRequest,updateRequestStatus, } from "../store/app/app_Action";
import SingleReqModal from "../components/SingleReqModal";
import { getNotification } from "../store/notification/notAction";
import { Link } from "react-router-dom";
// import { EditButton, DeleteButton } from './ButtonComponents';

const RequestStatus = () => {
  const [status,setStatus] = useState("")
  const { requests } = useSelector((store) => store.appReducer);
  const { userId } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();


  const handleSelectStatus = (e,requestId)=>{

    const selectedStatus = e.target.value;
    
    setStatus(selectedStatus);
    dispatch(updateRequestStatus(requestId, selectedStatus));
    console.log(selectedStatus);
  }



  useEffect(() => {
    dispatch(getRequest(userId));
    dispatch(getNotification(userId));
  }, []);

  const removeRequest = (requestId) => {
    dispatch(deleteRequest(requestId));
  };
  
  return (
    <Box w="80%" p="1rem" bg="#f7f7f7" height={"500px"} overflow={"auto"}>
      <TableContainer bg="whiteAlpha.800" shadow={"base"}>
        <Table variant="simple">
          {
            !requests?.length && (
              <TableCaption>Laundry Request Status</TableCaption>
            )
          }

          <Thead>
            <Tr>
              {/* <Th>S.No.</Th> */}
              <Th  border={"1px solid #f7f7f7"}>request id</Th>
              <Th border={"2px solid #f7f7f7"}>Pick Up date</Th>
              <Th border={"2px solid #f7f7f7"}>status</Th>
              <Th textAlign={"center"}>Details</Th>
              <Th textAlign={"center"} border={"2px solid #f7f7f7"}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {requests &&
              requests.map((ele, i) => (
                <Tr key={i}>
                  {/* <Td>{i + 1}</Td> */}
                  <Td w="30%" border={"2px solid #f7f7f7"}>{ele._id}</Td>
                  <Td border={"2px solid #f7f7f7"}>{ele.pickupDate}</Td>
                  <Td>

                    <select
                      onChange={(e) => handleSelectStatus(e, ele._id)}
                      value={ele.status}
                    >
                      <option>Select the Process</option>
                      <option>
                      In Process
                      </option>
                      <option>
                      Completed
                      </option>
                    </select>
                  </Td>
                  <Td color={"blue"} cursor={"pointer"} textAlign={"center"}>
                    <SingleReqModal data={ele} />
                  </Td>

                  <Td border={"2px solid #f7f7f7"}>
                      <button style={{
                        backgroundColor: 'darkblue',       // Background color
                        color: 'white',                 // Text color
                        borderRadius: '8px',             // Rounded corners
                        padding: '10px 20px',           // Padding
                        border: 'none',                // Remove border
                        cursor: 'pointer',             // Change cursor on hover
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' // Add a subtle shadow
                        }} colorScheme="blue" onClick={() => removeRequest(ele._id)}>Delete </button> 

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
                        to={`/laundry-update/${ele._id}`} className='btn btn-success'>Edit
                      </Link>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RequestStatus;
