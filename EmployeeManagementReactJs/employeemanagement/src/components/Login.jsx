import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import LoginImage from "../images/login.avif";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "./employeeStore";

const Login = () => {
  const users = useUserStore((state) => state.users);
  console.log("users on login component", users);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      const editUrl = "/home/user?id=" + Number(user.id);
      alert("Logged in Successfully");
      navigate(editUrl);
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <Box className="flex">
      <Box
        className="h-auto hidden md:flex w-[55%] justify-end"
        // style={{
        //   display: "flex",
        //   justifyContent: "end",
        // }}
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
              Email Id / UserName
            </label>
            <TextField
              fullWidth
              id="email"
              className="w-[90%] mx-0  md:w-[60%]"
              onChange={(e) => setEmail(e.target.value)}
              // sx={{ width: "60%" }}
              placeholder="Email/UserName"
              name="email"
              // value={formData.firstName}
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
              // sx={{ width: "60%" }}
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              // value={formData.firstName}
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
              style={{ backgroundColor: "#BF2EF0" }}
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
  );
};

export default Login;
