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
import { useNavigate, useParams } from "react-router-dom";
import { createRequest, getRequest, updateRequest } from "../store/app/app_Action";

const LaundryRequest = () => {
  const { isAuth, userId } = useSelector((store) => store.authReducer);
  const { requests } = useSelector((store) => store.appReducer);
  const toast = useToast();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();    
  const [form, setForm] = useState({
    userId,
    id,
    pickupDate: "",
    topwears: "",
    bottomwears: "",
    woolenCloths: "",
    others: "",
    serviceType: "",
    contactNumber: "",
    description: "",
  });

  const handleSubmit = () => {
    // console.log(form)
    if(id){
      dispatch(updateRequest(form, toast, navigate));
    } else {
      dispatch(createRequest(form, toast));
    }

  };

  useEffect(() => {
    if(id){
       const req = requests.find(req => req._id == id);
      setForm({
        ...req,
        userId,
        id: req._id
      })
      }
  }, [requests]);

  useEffect(() => {
    dispatch(getRequest(userId));
  }, []);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return (
    <Box p="1rem" w="80%" boxSizing="border-box" bg="#f7f7f7" overflow={"auto"}>
      {/* Laundry Request Form*/}
      <Box>
        <Flex gap="10px">
          <FormControl>
            <FormLabel>Select Pickup Date</FormLabel>
            <Input
              defaultValue={form?.pickupDate}
              bgColor="whiteAlpha.700"
              onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
              size="sm"
              type="datetime-local"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Topwear</FormLabel>
            <Input
              defaultValue={form?.topwears}
              bgColor="whiteAlpha.700"
              onChange={(e) => setForm({ ...form, topwears: e.target.value })}
              size="sm"
              placeholder="Tshirt, Top, Shirt"
            />
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel>Bottomwear</FormLabel>
          <Input
            defaultValue={form?.bottomwears}
            bgColor="whiteAlpha.700"
            onChange={(e) => setForm({ ...form, bottomwears: e.target.value })}
            size="sm"
            placeholder="Lower, jeans, Leggins"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Woolen Cloth</FormLabel>
          <Input
            defaultValue={form?.woolenCloths}
            bgColor="whiteAlpha.700"
            onChange={(e) => setForm({ ...form, woolenCloths: e.target.value })}
            size="sm"
            placeholder="Woolen Cloth"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Others</FormLabel>
          <Input
            defaultValue={form?.others}
            bgColor="whiteAlpha.700"
            onChange={(e) => setForm({ ...form, others: e.target.value })}
            size="sm"
            placeholder="Others"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Select Service Type</FormLabel>
          <Select
            bgColor="whiteAlpha.700"
            onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
            placeholder={form.serviceType ? form.serviceType : "- - - - - - - -"}>          
            <option value="Fast">Fast Service</option>
            <option value="Regular">Regular Service</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Contact Number</FormLabel>
          <Input
            defaultValue={form?.contactNumber}
            bgColor="whiteAlpha.700"
            onChange={(e) =>
              setForm({ ...form, contactNumber: e.target.value })
            }
            size="sm"
            type="number"
            placeholder="Contact Number"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            defaultValue={form?.description}
            bgColor="whiteAlpha.700"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            size="sm"
            placeholder="Description(if any)"
          />
        </FormControl>
        <Button
            onClick={handleSubmit}
            mt={"10px"}
            w={"100px"}
            style={{
                backgroundColor: '#a8a9ef',       // Background color
                color: 'darkblue',                 // Text color
                borderRadius: '8px',             // Rounded corners
                padding: '10px 20px',           // Padding
                border: 'none',                // Remove border
                cursor: 'pointer',             // Change cursor on hover
                }}>
                Submit
            </Button>
      </Box>
    </Box>
  );
};

export default LaundryRequest;
