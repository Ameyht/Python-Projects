import React from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { Box, Button } from "@mui/material";
import multikart from "../images/multikart.png";
import BoxWithButtonAndImage from "./BoxWithButtonAndImage";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <header className=" h-auto flex items-center justify-between">
      <Box className="mx-16 flex items-center">
        <img className="h-[5rem] md:h-[5.5rem]" src={multikart} alt="" />
      </Box>
      <Box>
        <Box className="hidden md:block mr-28">
          <Button variant="outlined" className="border border-black">
            <Link to="/login" className="h-6 text-black lowercase">
              Login{" "}
            </Link>
            <Link to="/signup" className="h-6 text-black lowercase">
              / SignUp
            </Link>
          </Button>
        </Box>
        <div className="block px-6 md:hidden">
          <BiMenuAltLeft size={45} />
        </div>
      </Box>
    </header>
  );
};

export default LoginHeader;
