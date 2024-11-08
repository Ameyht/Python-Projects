import React, { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { Box } from "@mui/material";
import empmanage from "../images/empmanagelogo.png";
import workleave from "../images/workleave.png" ;
import project from "../images/project.png";
import DashBoard from "../images/DashBoard.png";

const Sidebar = () => {
  const [side, setSide] = useState(false);

  const handleSide = () => {
    setSide(!side);
  };

  return (
    <Box className="hidden md:flex flex-col items-center bg-white md:min-h-[30rem] min-h-16 h-auto md:h-[100%] w-full md:w-[16%]">
    
      <Box className="hidden md:flex flex-col mt-1 text-[18px] md:w-full truncate ">
        <h1 className="py-2 my-1 px-3 text-[14px] text-black-600 uppercase">
        Employee Management
        </h1>
        <Box>
          <Box className="group flex items-center h-10 my-2 rounded-br-full hover:bg-orange-400 transition-all duration-300">
            <span className="w-2 h-[100%] mr-2 group-hover:bg-orange-700"></span>
            <img src={DashBoard} alt="" className="h-[1.5rem] w-[1.5rem]"/>
            <a
              href="/dashboard"
              className="text-[16px] px-1 overflow-hidden whitespace-nowrap "
            >
              Dashboard
            </a>
          </Box>
          <Box className="mt-2 group flex items-center h-10 rounded-br-full hover:bg-orange-400 transition-all duration-300">
            <span className="w-2 h-[100%] mr-2 group-hover:bg-orange-700"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              className=""
              viewBox="0 0 16 16"
            >
              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              <path
                fillRule="evenodd"
                d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
              />
            </svg>
            <a
              href="/"
              className="text-[16px] px-2 overflow-hidden whitespace-nowrap"
            >
              Team
            </a>
          </Box>
          <Box className="mt-2 group flex items-center h-10 rounded-br-full hover:bg-orange-400 transition-all duration-300">
            <span className="w-2 h-[100%] mr-2 group-hover:bg-orange-700"></span>
            <img src={workleave} alt="" style={{height:25}} /> 
            <a
              href="/leave"
              className="text-[16px] px-2 overflow-hidden whitespace-nowrap"
            >
              Leave Management
            </a>
          </Box>
          <Box className="mt-2 group flex items-center h-10 rounded-br-full hover:bg-orange-400 transition-all duration-300">
            <span className="w-2 h-[100%] mr-2 group-hover:bg-orange-700"></span>
            <img src={project} alt="" style={{height:25}} /> 
            <a
              href="/project"
              className="text-[16px] px-2 overflow-hidden whitespace-nowrap"
            >
              Projects
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
