import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  space,
} from "@chakra-ui/react";
import Card from "../components/Card";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPrice, getRequest } from "../store/app/app_Action";
import { getNotification } from "../store/notification/notAction";

const Dashboard = () => {
  const { isAuth, userId } = useSelector((store) => store.authReducer);
  const {
    price,
    pendingRequest,
    // confirmRequest,
    inprocessRequest,
    finishRequest,
  } = useSelector((store) => store.appReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  let data = [
    { count: pendingRequest, title: "New Request", colour: "#a8a9ef"  },
    // { count: confirmRequest, title: "Accept!", colour: "#a8a9ef" },
    { count: inprocessRequest, title: "Inprocess!", colour: "#a8a9ef" },
    { count: finishRequest, title: "Finish!", colour: "#a8a9ef" },
  ];
 
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    } else {
      dispatch(getRequest(userId));
      dispatch(getNotification(userId));
      dispatch(getPrice());
    }
  }, [isAuth]);

  return (
    <Box p="3rem" w="80%" bg="#f7f7f7">
      {/* Request Status */}
      <Flex justifyContent={"space-evenly"} >
        {data.map((ele, i) => (
          <Card 
            key={i}
            count={ele.count}
            title={ele.title}
            colour={ele.colour}
          />
        ))}
      </Flex>
      
    </Box>
  );
};

export default Dashboard;
