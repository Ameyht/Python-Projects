import React, { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { Box } from "@mui/material";
import empmanage from "../images/empmanagelogo.png"

const Sidebar = () => {
  const [side, setSide] = useState(false);

  const handleSide = () => {
    setSide(!side);
  };

  return (
    <Box className="hidden md:flex flex-col items-center bg-white border border-white-300 md:min-h-[30rem] min-h-16 h-auto md:h-[100%] w-full md:w-[16%]">
      {/* <Box className="flex justify-between w-full items-center my-3 ml-8 md:my-0 h-[3rem] md:h-[10%] ">
        <img src={empmanage} className="h-[5rem] md:h-[6rem] py-3" alt="..." />
        <div onClick={handleSide} className="block px-6 md:hidden">
          {side ? "" : <BiMenuAltLeft size={45} />}
        </div>
      </Box> */}
      <Box className="hidden md:flex flex-col mt-1 text-[18px] md:w-full truncate ">
        <h1 className="py-2 my-1 px-3 text-[14px] text-black-600 uppercase">
        Employee Management
        </h1>
        <Box>
          <Box className="group flex items-center h-10 my-2 rounded-br-full hover:bg-orange-400 transition-all duration-300">
            <span className="w-2 h-[100%] mr-2 group-hover:bg-orange-700"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="black"
              className=" mr-2"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z" />
              <path
                fillRule="evenodd"
                d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3"
              />
            </svg>
            <a
              href="/dashboard"
              className="text-[16px] px-1 overflow-hidden whitespace-nowrap "
            >
              Dashboard
            </a>
          </Box>
          <Box className="group flex items-center h-10 rounded-br-full hover:bg-orange-400 transition-all duration-300">
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
              Employees
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
