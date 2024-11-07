import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/joy/Tooltip';
import { Link } from "react-router-dom";
import useUserStore from "./employeeStore"; 

const LoginUser = () => {
  const [id, setId] = useState();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get("id");
    setId(Number(id));
    console.log("id:", id);
  }, [location.search]);

  const employee = useUserStore((state) => state.getUserById(id));
  console.log("user after login =>", employee);

const EmployeeName=employee?.EmployeeName;
const EmployeeLabel = EmployeeName?.slice(0, 2);  
const role=employee?.Role

const myStyles = {
    fontFamily: "'Oswald', sans-serif", 
  };

  return (
    <Box className="flex justify-around w-40 h-11 items-center mr-2 py-0 ">
    <Tooltip title={`${EmployeeName}, ${role}`} variant="plain">
    <Avatar
        sx={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(51,0,125,1) 0%, rgba(0,116,148,1) 100%);" 
          ,maxWidth: '50px',fontSize: '1.00rem',height:"40px",width:"40px" ,
         }}
        alt="Remy Sharp"
        src="/broken-image.jpg"
        >
      {EmployeeLabel}
      </Avatar>
      </Tooltip>
      <Box className="btngrp flex flex-row ml-1.5">
        <Button
          class="btn-sm dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ></Button>
        <Button variant="outlined" className="border border-black" sx={{ padding: '4px 8px' }}  >
            <Link to="/login" className="h-5 text-black text-xs" style={myStyles}>
              Login
            </Link>
            <Link to="/signup" className="h-5 text-black text-xs" style={myStyles}>
              / SignUp
            </Link>
          </Button>
      </Box>
    </Box>
  );
};

export default LoginUser;
