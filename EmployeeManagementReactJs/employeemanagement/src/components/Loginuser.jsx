import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Tooltip from '@mui/joy/Tooltip';
import { Link } from "react-router-dom";

const LoginUser = () => {
  const [id, setId] = useState();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get("id");
    setId(Number(id));
    console.log("id:", id);
  }, [location.search]);

  const user=0
//   const user = useUserStore((state) => state.getUserById(id));
  console.log("user after login =>", user);

const name="ASB";
const rl="Manager";

const myStyles = {
    fontFamily: "'Oswald', sans-serif", 
  };

  return (
    <Box className="flex justify-around w-40 h-11 items-center mr-2 py-0 ">
    <Tooltip title={`${name}, ${rl}`} variant="plain">
    <Avatar
        sx={{ bgcolor: deepOrange[500] ,maxWidth: '50px',fontSize: '1.00rem',height:"35px",width:"35px"
         }}
        alt="Remy Sharp"
        src="/broken-image.jpg"
        >
      AB
      </Avatar>
      </Tooltip>
      <Box className="btngrp flex flex-row">
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
