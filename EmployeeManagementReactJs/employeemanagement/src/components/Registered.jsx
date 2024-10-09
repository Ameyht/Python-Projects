import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import RegisterImage from "../images/Registered.png";

const Registered = () => {
  return (
    <Box className="flex h-auto">
      <Box className="flex justify-center items-center h-auto w-[100%] md:w-[100%] ">
        <Paper className="h-auto my-5 lg:w-[30%] md:w-[30%] flex items-center w-full px-4 ">
          <form className="p-4 flex flex-col w-[100%] ">
            {" "}
            <Box className=" flex justify-center " fullWidth>
              <img src={RegisterImage} className="h-24" alt=""></img>
            </Box>
            <Box>
              <Typography
                variant="h6"
                className="text-black flex justify-center h-auto w-auto "
              >
                Successfull Password Reset !{" "}
              </Typography>
            </Box>
            <Box className="text-sm">
              You can now use new Password to login to your account
            </Box>
            <Button
              className="my-4 "
              style={{ backgroundColor: "#461b93" }}
              variant="contained"
              href="/login"
            >
              Back To Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Registered;
