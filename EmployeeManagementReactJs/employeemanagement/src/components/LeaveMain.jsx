import React from "react";
import { Box, Button, Typography } from "@mui/material";
import LeaveTable from "./LeaveTable"

const LeaveMain = () => {
  return (
    <>
     <Box className="bg-slate-100 w-full p-5">
        <Box className="sm:flex sm:flex-row sm:justify-between flex flex-col h-auto mb-5">
            <Typography variant="h6" className="px-4 self-center">All Leave Requests </Typography>
            <Button variant="outlined" href="/applyleave">Apply Leave</Button>
        </Box>
        <LeaveTable />
     </Box>
    </>
  );
};

export default LeaveMain;
