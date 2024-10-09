import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import React, { useState } from "react";
import SignUpImage from "../images/register2.webp";
import { Link } from "react-router-dom";
import useUserStore from "./employeeStore";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    EmployeeName: "",
    Department: "",
    DateOfJoining: "",
    PhotoFileName: "",
    Role: "",
    Manager: "",
    ProjectId:""
  });

  const addUser = useUserStore((state) => state.addUser);

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
          "Authorization": "Bearer YOUR_TOKEN_HERE",
        },
      });

      addUser(response.data);

      setFormData({
        EmployeeName: "",
        Department: "",
        DateOfJoining: "",
        PhotoFileName: "",
        Role: "",
        Manager: "",
      });

      toast.success("User registered successfully!", {
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
    // <Box className="flex h-auto">
    //   <Box
    //     className="h-auto hidden md:flex w-[55%] mt-[3rem] justify-end"
    //   >
    //     <img src={SignUpImage} alt="" className="h-[23rem] size-9/12 my-6" />
    //   </Box>
    //   <Box className="flex justify-center items-center mt-[3rem] w-[100%] md:w-[45%]" >
    //     <Paper className=" h-auto w-[60%] flex items-center border border-gray-300" style={{
    //         boxShadow: "6px 6px 5px gray",
    //       }}>
    //       <form className="flex flex-col p-4 w-[100%] " onSubmit={handleSubmit}>
    //         {" "}
    //         <Typography variant="h6">Sign up as a new Employee </Typography>
    //         <Typography style={{ color: "gray", fontSize: "1rem" }}>
    //           or already registered ?{" "}
    //           <Link className="text-white-800" to="/login">
    //             {" "}
    //             Login Now
    //           </Link>
    //         </Typography>
    //         <TextField
    //           fullWidth
    //           id="first_name"
    //           className="w-[90%] mx-0 my-8 md:w-[60%]"
    //           sx={{ my:0.5 }}
    //           placeholder="First Name"
    //           name="firstName"
    //           onChange={handleChange}
    //           size="small"
    //           variant="outlined"
    //           required
    //         />
    //         <TextField
    //           fullWidth
    //           id="last_name"
    //           className="w-[90%] mx-0 md:w-[60%]"
    //           sx={{ my:0.5 }}
    //           placeholder="Last Name"
    //           name="lastName"
    //           onChange={handleChange}
    //           // value={formData.firstName}
    //           size="small"
    //           variant="outlined"
    //           required
    //         />
    //         <TextField
    //           fullWidth
    //           id="email"
    //           className="w-[90%] mx-0 my-1 md:w-[60%]"
    //           sx={{ my:0.5 }}
    //           placeholder="Email"
    //           name="email"
    //           onChange={handleChange}
    //           size="small"
    //           variant="outlined"
    //           required
    //         />
    //         <TextField
    //           fullWidth
    //           id="password"
    //           className="w-[90%] mx-0 my-1 md:w-[60%]"
    //           sx={{ my:0.5 }}
    //           placeholder="Password"
    //           name="password"
    //           onChange={handleChange}
    //           // value={formData.firstName}
    //           size="small"
    //           variant="outlined"
    //           required
    //         />
    //         <TextField
    //           fullWidth
    //           id="confirm_password"
    //           className="w-[90%] mx-0 my-1 md:w-[60%]"
    //           sx={{ my:0.5 }}
    //           placeholder="Confirm Password"
    //           name="confirmPassword"
    //           onChange={handleChange}
    //           size="small"
    //           variant="outlined"
    //           required
    //         />
    //         <Button
    //           type="submit"
    //           sx={{mt:1}}
    //           style={{ backgroundColor: "#006BFF" }}
    //           variant="contained"
    //         >
    //           Register Now
    //         </Button>
    //       </form>
    //     </Paper>
    //   </Box>
    // </Box>
    <Box className="flex h-auto">
      <Box className="h-auto hidden md:flex w-[55%] mt-[3rem] justify-end">
        <img src={SignUpImage} alt="Sign Up" className="h-[23rem] size-9/12 my-6" />
      </Box>
      <Box className="flex justify-center items-center mt-[3rem] w-[100%] md:w-[45%]">
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
              <Link className="text-white-800" to="/login">
                Login Now
              </Link>
            </Typography>
            <TextField
              fullWidth
              name="EmployeeName"
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
              value={formData.Department}
              onChange={handleChange}
              size="small"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              name="DateOfJoining"
              placeholder="Date of Joining (YYYY-MM-DD)"
              value={formData.DateOfJoining}
              onChange={handleChange}
              size="small"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              name="PhotoFileName"
              placeholder="Photo File Name"
              value={formData.PhotoFileName}
              onChange={handleChange}
              size="small"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              name="Role"
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
              placeholder="Manager"
              value={formData.Manager}
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
