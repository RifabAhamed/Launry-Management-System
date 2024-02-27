import { Box, Flex} from "@chakra-ui/react";
import{useState} from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar"
import Dashboard from "./pages/Dashboard"
import LaundryRequest from "./pages/LaundryRequest"
import Profile from "./pages/Profile"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import RequestStatus from "./pages/RequestStatus";
import SendOTP from "./pages/SendOTP";
import VerifyCode from "./pages/VerifyCode";
import EmployeeDetails from "./pages/EmployeeDetails";
import AddEmployee from "./pages/AddEmployee";

// import PrivateRoute from "./HOF/PrivateRoute";




function App() {
  const [count,setCount] = useState(0)

  return (
    <Box className="App">
      <Routes>
        <Route path="/" element={<><Navbar /><Flex><SideBar /><Dashboard /></Flex></>}/>
        <Route path="/laundry-request" element={<><Navbar /><Flex><SideBar /><LaundryRequest /></Flex></>}/>
        <Route path="/laundry-update/:id" element={<><Navbar/><Flex><SideBar/><LaundryRequest/></Flex></>} />
        <Route path="/profile" element={<><Navbar/> <Flex><SideBar/><Profile /></Flex></>} />
        <Route path="/request-status" element={<><Navbar/><Flex><SideBar/><RequestStatus/></Flex></>} />
        <Route path="/employee-details" element={<><Navbar/><Flex><SideBar/><EmployeeDetails/></Flex></>} />
        <Route path="/add-employee" element={<><Navbar/><Flex><SideBar/><AddEmployee/></Flex></>} />
        <Route path="/update-employee/:id" element={<><Navbar/><Flex><SideBar/><AddEmployee/></Flex></>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<SignupPage />} />
        <Route path="/request-otp" element={<SendOTP/>} />
        <Route path="/verify-otp" element={<VerifyCode/>} />
      </Routes>
    </Box>
  );
}

export default App;
