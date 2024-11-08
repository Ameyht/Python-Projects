import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import LeaveMain from "./LeaveMain";

const LeaveUI = () => {
    const LeaveStyles = {
        fontFamily: "'Oswald', sans-serif", 
        minHeight: "85vh", 
        display: "flex",
        flexDirection: "column",
      };
  return (
    <>
     <Header />
     <Box
        style={LeaveStyles}
      >
        <Box className="flex flex-grow w-full bg-gray-300">
          <Sidebar className="flex-grow h-auto" /> 
          <LeaveMain />
        </Box>
      </Box>
    </>
  );
};

export default LeaveUI;
