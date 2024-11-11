import React from "react";
import { Box, Typography } from "@mui/material";
import LeaveTable from "./LeaveTable"

const LeaveMain = () => {
  return (
    <>
     <Box className="bg-slate-100 w-full p-5">
        <Box className=" h-10 mb-5">
            <Typography variant="h6">All Leave Requests </Typography>
        </Box>
        <LeaveTable />
     </Box>
    </>
  );
};

export default LeaveMain;
