import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import ProjectMain from "./ProjectMain";

const ProjectUI = () => {
    const ProjectUIStyles = {
        fontFamily: "'Oswald', sans-serif", 
        minHeight: "85vh", 
        display: "flex",
        flexDirection: "column",
      };
  return (
    <>
     <Header />
     <Box
        style={ProjectUIStyles}
      >
        <Box className="flex flex-grow w-full bg-gray-300">
          <Sidebar className="flex-grow h-auto" /> 
          <ProjectMain />
        </Box>
      </Box>
    </>
  );
};

export default ProjectUI;
