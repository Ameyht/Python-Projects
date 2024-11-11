import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import DashBoardMain from "./DashBoardMain";

const DashBoardUI = () => {
    const DashBoardStyles = {
        fontFamily: "'Oswald', sans-serif", 
        minHeight: "85vh", 
        display: "flex",
        flexDirection: "column",
      };
  return (
    <>
     <Header />
     <Box
        style={DashBoardStyles}
      >
        <Box className="flex flex-grow w-full bg-gray-300">
          <Sidebar className="flex-grow h-auto" /> 
          <DashBoardMain className="flex-grow h-auto" /> 
        </Box>
      </Box>
    </>
  );
};

export default DashBoardUI;
