import React from "react";
import { Box } from "@mui/material";
import UnderConstruction from "../images/underconstruction.avif"

const ProjectMain = () => {
  return (
    <>
    <Box className="flex items-center justify-center border border-black h-auto w-full bg-white">
     <img src={UnderConstruction} alt=""/>
    </Box>
    </>
  );
};

export default ProjectMain;
