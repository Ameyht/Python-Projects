import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";
import SignUpImage from "../images/register.png";
import { Link } from "react-router-dom";
import useUserStore from "./employeeStore";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    status: "",
    password: "",
    confirmPassword: "",
  });

  const addUser = useUserStore((state) => state.addUser);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = (userData) => {
    addUser(userData);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      status: "",
      password: "",
      confirmPassword: "",
    });

    toast.success("User registered successfully!", {
      position: "top-right",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const user = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      status: formData.status,
      password: formData.password,
    };

    handleRegister(user);
  };

  return (
    <Box className="flex h-auto">
      <Box
        className="h-auto hidden md:flex w-[55%] justify-end"
        // style={{
        //   display: "flex",
        //   justifyContent: "end",
        // }}
      >
        <img src={SignUpImage} alt="" className=" my-6" />
      </Box>
      <Box className="flex justify-center items-center  w-[100%] md:w-[45%] ">
        <Paper className=" h-auto w-[60%] flex items-center ">
          <form className="flex flex-col p-4 w-[100%] " onSubmit={handleSubmit}>
            {" "}
            <Typography variant="h6">Sign up as a new User </Typography>
            <Typography style={{ color: "gray", fontSize: "1rem" }}>
              or already registered ?{" "}
              <Link className="text-violet-800" to="/login">
                {" "}
                Login Now
              </Link>
            </Typography>
            <TextField
              fullWidth
              id="first_name"
              className="w-[90%] mx-0 my-1 md:w-[60%]"
              // sx={{ width: "60%" }}
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              size="small"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              id="last_name"
              className="w-[90%] mx-0 my-1 md:w-[60%]"
              // sx={{ width: "60%" }}
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              // value={formData.firstName}
              size="small"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              id="email"
              className="w-[90%] mx-0 my-1 md:w-[60%]"
              // sx={{ width: "60%" }}
              placeholder="Email"
              name="email"
              onChange={handleChange}
              size="small"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              id="password"
              className="w-[90%] mx-0 my-1 md:w-[60%]"
              // sx={{ width: "60%" }}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              // value={formData.firstName}
              size="small"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              id="confirm_password"
              className="w-[90%] mx-0 my-1 md:w-[60%]"
              // sx={{ width: "60%" }}
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              size="small"
              variant="outlined"
              required
            />
            <Button
              type="submit"
              className="my-2 "
              style={{ backgroundColor: "#461b93" }}
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
