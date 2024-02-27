import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
// import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
// import Notification from "./Notification";
import Menus from "./Menus";

const Navbar = () => {
  // const { isAuth } = useSelector((state) => state.authReducer);
  return (
    <Flex
      boxShadow="md"
      bgColor={"#6C6F7D"}
      justifyContent={"space-between"}
      p={"0.6rem"}
      color={"#d0d6db"}
    >
      <Box display={"flex"} >
        <Text fontSize={"26px"} fontWeight={"bold"}>Laundry Management System </Text>
      </Box>
      
      <Flex>
        {/* <Notification /> */}
        <Box>
          <Menus />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
