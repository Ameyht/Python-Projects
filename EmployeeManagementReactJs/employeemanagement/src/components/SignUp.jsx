import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";
import SignUpImage from "../images/register2.webp";
import { Link } from "react-router-dom";
import useUserStore from "./employeeStore";
import axios from "axios";
const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN;

const SignUp = () => {
  const [formData, setFormData] = useState({
    EmployeeName: "",
    Department: "",
    DateOfJoining: "",
    Role: "",
    Manager: "",
    ProjectId:0,
    Email:"",
    Password:""
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (userData) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/dept/employee", userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${BEARER_TOKEN}`,
        },
      });

      setFormData({
        EmployeeName: "",
        Department: "",
        DateOfJoining: "",
        Role: "",
        Manager: "",
        ProjectId:0,
        Email:"",
        Password:""
      });

      toast.success("Employee registered successfully!", {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Failed to register user. Please try again.", {
        position: "top-right",
      });
      console.error("Error during registration:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister(formData);
  };

  return (
    <Box className="flex h-auto">
       <ToastContainer />
      <Box className="h-auto hidden md:flex w-[55%] mt-[3rem] justify-end">
        <img src={SignUpImage} alt="Sign Up" className="h-[23rem] size-9/12 my-6" />
      </Box>
      <Box className="flex justify-center items-center mt-[2rem] w-[100%] md:w-[45%]">
        <Paper
          className="h-auto w-[60%] flex items-center border border-gray-300"
          style={{
            boxShadow: "6px 6px 5px gray",
          }}
        >
          <form className="flex flex-col p-4 w-[100%]" onSubmit={handleSubmit}>
            <Typography variant="h6">Sign up as a new Employee</Typography>
            <Typography style={{ color: "gray", fontSize: "1rem" }}>
              or already registered?{" "}
              <Link className="text-blue-800" to="/login">
                Login Now
              </Link>
            </Typography>
            <TextField
              fullWidth
              name="EmployeeName"
              sx={{mt:1}}
              placeholder="Employee Name"
              value={formData.EmployeeName}
              onChange={handleChange}
              size="small"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              name="Department"
              placeholder="Department"
              sx={{mt:1}}
              value={formData.Department}
              onChange={handleChange}
              size="small"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              name="DateOfJoining"
              sx={{mt:1}}
              placeholder="Date of Joining (YYYY-MM-DD)"
              value={formData.DateOfJoining}
              onChange={handleChange}
              size="small"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              name="Role"
              sx={{mt:1}}
              placeholder="Role"
              value={formData.Role}
              onChange={handleChange}
              size="small"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              name="Manager"
              sx={{mt:1}}
              placeholder="Manager"
              value={formData.Manager}
              onChange={handleChange}
              size="small"
              variant="outlined"
              required
            />
             <TextField
              fullWidth
              name="Email"
              sx={{mt:1}}
              placeholder="Email"
              value={formData.Email}
              onChange={handleChange}
              size="small"
              variant="outlined"
              required
            />
             <TextField
              fullWidth
              name="Password"
              sx={{mt:1}}
              placeholder="Password"
              value={formData.Password}
              onChange={handleChange}
              size="small"
              variant="outlined"
              required
            />
            <Button
              type="submit"
              sx={{ mt: 1 }}
              style={{ backgroundColor: "#006BFF" }}
              variant="contained"
            >
              Register Now
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default SignUp;
