import React,{useState} from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { CiMenuBurger } from "react-icons/ci";
import { Box } from "@mui/material";
import LoginUser from "./Loginuser";
import empmanage from "../images/empmanagelogo.png"


const Header = () => {
  return (
    <Box className="md:flex justify-between border border-black-700 md:h-[5.5rem] h-[5.5rem] mx-1 px-2 bg-white py-1 rounded-[10px] ">
      <Box className="flex justify-between w-full items-center my-3 ml-8 md:my-3 h-[3rem] md:h-[3rem]">
        <img src={empmanage} className="h-[5rem]" alt="..." />
        <Box className="right border-0 mr-2 rounded-10">
        <LoginUser/>
      </Box>
      </Box>
      
    </Box>
  );
};

export default Header;
