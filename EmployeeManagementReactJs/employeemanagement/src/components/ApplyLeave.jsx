import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";
import LeaveRequest from "../images/employee-leave-requests.png";
import useUserStore from "./employeeStore";
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN;

const ApplyLeave = () => {
  const [formData, setFormData] = useState({
    LeaveDate: "",
    Reason: "",
    Status: "Pending",
  });
  const navigate = useNavigate();

  const [leaveDate, setLeaveDate] = useState(new Date() | "");
  const [showCalendar, setShowCalendar] = useState(false);
// Fetching loggedIn Employee from Store
  const LoginEmployee = useUserStore((state) => state.getUser());

  const handleDateClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    console.log("formattedDate => ",formattedDate);
    setFormData((prevData) => ({
      ...prevData,
      LeaveDate: formattedDate,
    }));
    setShowCalendar(false); 
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLeave = async (userData,event) => {
    debugger
    event.preventDefault();
    try {
        console.log("userData =>",JSON.stringify(userData),"EmployeeId => ",LoginEmployee.EmployeeId)
      const response = await axios.post("http://127.0.0.1:8000/dept/leave", userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${BEARER_TOKEN}`,
          EmployeeId:LoginEmployee.EmployeeId
        },
      });

      setFormData({
        LeaveDate: "",
        Reason: "",
        Status: "Pending",
      });
      setLeaveDate(new Date());
      debugger
      if (response.statusText='ok') {
        toast.success("Leave Request Applied Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      }
      navigate("/leave");
    } catch (error) {
      toast.error("Failed to Apply Leave Request. Please try again.", {
        position: "top-right",
      });
      console.error("Error during leaveRequest:", error);
    }
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    await handleLeave(formData,event);
  };

  return (
    <Box className="flex h-auto">
       <ToastContainer />
      <Box className="h-auto hidden md:flex w-[55%] mt-[3rem] justify-end">
        <img src={LeaveRequest} alt="Sign Up" className="h-[23rem] size-11/12 my-6" />
      </Box>
      <Box className="flex justify-center items-center mt-[2rem] w-[100%] md:w-[45%]">
        <Paper
          className="h-auto w-[65%] flex items-center border border-gray-300"
          style={{
            boxShadow: "6px 6px 5px gray",
          }}
        >
          <form className="flex flex-col p-4 w-[100%]" onSubmit={handleSubmit}>
            <Typography variant="h6">Apply a Leave Request</Typography>
            <TextField
                fullWidth
                placeholder="Select Date"
                value={formData.LeaveDate}
                onClick={handleDateClick}
                readOnly
                sx={{ mt: 1 }}
                size="small"
                variant="outlined"
            />    
            {showCalendar && (
                <Calendar 
                onChange={handleDateChange}
                value={leaveDate}
                />
            )}
            <TextField
              fullWidth
              name="Reason"
              placeholder="Reason"
              sx={{mt:1}}
              value={formData.Reason}
              onChange={handleChange}
              size="small"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              name="Status"
              placeholder="Status"
              sx={{mt:1}}
              value={formData.Status}
              onChange={handleChange}
              size="small"
              variant="outlined"
              disabled
            />
            <Button
              type="submit"
              sx={{ mt: 1 }}
              style={{ backgroundColor: "#006BFF" }}
              variant="contained"
            >
              Apply Leave
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default ApplyLeave;
