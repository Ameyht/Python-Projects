import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import LoginImage from "../images/login.avif";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "./employeeStore";
import { ToastContainer, toast } from "react-toastify";
const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN;

const Login = () => {
  const users = useUserStore((state) => state.users);
  console.log("users on login component", users);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const addUser = useUserStore((state) => state.addUser);

  const resetinputs=()=>{
    setEmail("");
    setPassword("");
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      Email: email,
      Password: password,
    };
    console.log("loginData => ",JSON.stringify(loginData));
    try {
      const response = await fetch("http://127.0.0.1:8000/dept/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${BEARER_TOKEN}`,
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("inside response.ok",JSON.stringify(data.employee));
        addUser(data.employee);
        toast.success("Employee Login successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        resetinputs()
        const editUrl = "/home/user?id=" + data?.employee?.EmployeeId; 
        navigate(editUrl);   
      } else {
        toast.error("Invalid email and password.", {
          position: "top-right",
          autoClose:3000,
        });
        resetinputs()
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
    
  };

  return (<>
         <ToastContainer />
    <Box className="flex">
      <Box
        className="h-auto hidden md:flex w-[55%] mt-5 justify-end"
      >
        <img src={LoginImage} className="h-[28rem] size-10/12" alt="" />
      </Box>
      <Box className="flex justify-center items-center  w-[100%] md:w-[45%] ">
        <Paper
          style={{
            boxShadow: "6px 6px 5px gray",
          }}
          className=" h-auto w-[60%] flex items-center border border-gray-500"
        >
          <form className="flex flex-col p-4 w-[100%]" onSubmit={handleLogin}>
            {" "}
            <Typography variant="h6">Login</Typography>
            <label
              htmlFor="email"
              style={{
                width: "100%",
              }}
              className="text-sm py-2"
            >
              Email Id
            </label>
            <TextField
              fullWidth
              id="email"
                className="w-[90%] mx-0  md:w-[60%]"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email/UserName"
                name="email"
                size="small"
                variant="outlined"
                required
            />
            <label
              htmlFor="email"
              style={{
                width: "100%",
              }}
              className="text-sm py-2"
            >
              Password
            </label>
            <TextField
              fullWidth
              id="password"
                className="w-[90%] mx-0 my-2 md:w-[60%]"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                name="password"
                size="small"
                variant="outlined"
                required
            />
            <Link to="/forgotpassword" className="text-sm py-2">
              Forgot Password ?
            </Link>
            <Button
              type="submit"
              className="my-2 "
              style={{ backgroundColor: "#227B94" }}
              variant="contained"
              // href="/"
            >
              Login
            </Button>
            <Box className="self-center text-sm py-2">
              {" "}
              New user <a href="/signup">Sign Up</a>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
    </>
  );
};

export default Login;
