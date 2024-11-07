import React from 'react'
import { Box, Typography } from '@mui/material'
import DataTable from './DataTable'
import { useEffect, useState } from "react";
import useUserStore from "./employeeStore";
import Paper from '@mui/material/Paper';
import Employee from "../images/Employee.png"

const DashBoardMain = () => {
    const [employee, setEmployee] = useState(null);

    const getUser = useUserStore((state) => state.getUser);
    useEffect(() => {
        const fetchedEmployee = getUser();
        setEmployee(fetchedEmployee);
        console.log("DashBoardMain :", fetchedEmployee);
    }, [getUser]);

  return (
    <Box className="p-2 md:min-h-3 min-h-3 h-auto md:h-auto w-[100%] bg-gray-100 md:w-[84%] border border-black">
     <Box sx={{marginLeft:3}}>
       <Typography variant="h6" >
        Hello {employee?.EmployeeName },
      </Typography>
      <Typography variant="h5" gutterBottom>
        Good Morning
      </Typography>     
      </Box>
        <Box 
        sx={{
        display: 'flex',
        justifyContent:"space-around",
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 200,
          height: 150,
        },
      }}>
          <Paper elevation={3} sx={{borderRadius:4}} >
            <Box className="flex flex-col items-start pl-2 border border-black">
                <img src={Employee} className="h-[4rem] w-[4rem]"/>
                <Typography>Total Employees</Typography>
                <Typography></Typography>
            </Box>
            
          </Paper>
          <Paper elevation={3} sx={{borderRadius:4}}>
          <Box className="flex flex-col items-start pl-2 border border-black">
                <img src="" className="h-[4rem] w-[4rem]"/>
                <Typography>On Leaves</Typography>
            </Box></Paper>
          <Paper elevation={3} sx={{borderRadius:4}}>
          <Box className="flex flex-col items-start pl-2 border border-black">
                <img src="" className="h-[4rem] w-[4rem]"/>
                <Typography>New Joinee</Typography>
            </Box></Paper>
          <Paper elevation={3} sx={{borderRadius:4}}>
          <Box className="flex flex-col items-start pl-2 border border-black">
                <img src="" className="h-[4rem] w-[4rem]"/>
                <Typography>Hapiness Rate</Typography>
            </Box></Paper>

        </Box>
      
    </Box>
  )
}

export default DashBoardMain