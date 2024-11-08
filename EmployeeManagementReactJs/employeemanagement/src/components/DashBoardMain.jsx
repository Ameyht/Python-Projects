import React from 'react'
import { Box, Typography } from '@mui/material'
import DataTable from './DataTable'
import { useEffect, useState } from "react";
import useUserStore from "./employeeStore";
import Paper from '@mui/material/Paper';
import Employee from "../images/Employee.png";
import workleave from "../images/workleave.png";
import newJoinee from "../images/NewJoinee.svg";
import smile from "../images/Smile.png";
import UnderConstruction from "../images/UnderConstruction.png"

const DashBoardMain = () => {
    const [employee, setEmployee] = useState(null);

    const getUser = useUserStore((state) => state.getUser);
    useEffect(() => {
        const fetchedEmployee = getUser();
        setEmployee(fetchedEmployee);
        console.log("DashBoardMain :", fetchedEmployee);
    }, [getUser]);

  return (
    <Box className="p-2 md:min-h-3 min-h-3 h-auto md:h-auto w-[100%] bg-gray-100 md:w-[84%] border border-gray-400">
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
            <Box className="flex flex-col items-start h-full pl-2">
                <Box className="h-[5rem] flex items-center">
                <img src={Employee} className="h-[4rem] w-[4rem]"/>
                </Box>
                <Typography>Total Employees</Typography>
                <Typography variant='h6'><span className='font-bold'>200</span>/200</Typography>
            </Box>
            
          </Paper>
          <Paper elevation={3} sx={{borderRadius:4}}>
          <Box className="flex flex-col items-start pl-3 h-full">
              <Box className="h-[5rem] flex items-center">
                <img src={workleave} className="h-[2.5rem] w-[2.5rem]"/>
                </Box>
                <Typography>On Leaves</Typography>
                <Typography variant="h6"><span className='font-bold'>12</span>/200</Typography>
            </Box></Paper>
          <Paper elevation={3} sx={{borderRadius:4}}>
          <Box className="flex flex-col h-full items-start pl-2">
                <Box className="h-[5rem] flex items-center">
                <img src={newJoinee} className="h-[3rem] w-[3rem]"/>
                </Box>
                <Typography>New Joinee</Typography>
                <Typography variant="h6"><span className='font-bold'>15</span>/200</Typography>
            </Box></Paper>
          <Paper elevation={3} sx={{borderRadius:4}}>
          <Box className="flex flex-col h-full items-start pl-2">
                <Box className="h-[5rem] flex items-center">
                <img src={smile} className="h-[4rem] w-[4rem]"/>
                </Box>
                <Typography>Hapiness Rate</Typography>
                <Typography variant="h6"><span className='font-bold'>80%</span></Typography>
            </Box></Paper>
    </Box>
    <Box className="flex justify-center h-auto m-3"> 
      <img src={UnderConstruction} alt="" className='h-56' />
    </Box>
    </Box>
  )
}

export default DashBoardMain