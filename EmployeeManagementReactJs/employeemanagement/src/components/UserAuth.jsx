import React from "react";
import { Box } from "@mui/material";
import Login from "./Login";
import { useLocation } from "react-router-dom";
import SignUp from "./SignUp";

import Registered from "./Registered";
import Header from "./Header";
import ApplyLeave from "./ApplyLeave";

const UserAuth = () => {
  const myStyles = {
    fontFamily: "'Oswald', sans-serif",
  };

  const location = useLocation();
  const currentUrl = location.pathname;
  console.log("CurrentURL:", currentUrl);

  const renderContent = () => {
    if (currentUrl === "/login") {
      return <Login />;
    } else if (currentUrl === "/signup") {
      return <SignUp />;
    } 
    else if (currentUrl === "/registered") {
      return <Registered />;
    }
    else if (currentUrl === "/applyleave") {
      return <ApplyLeave />;
    }
  };

  return (
    <Box className="md:min-h-16 min-h-16 h-auto md:h-auto" style={myStyles}>
      <Header />
      {renderContent()}
    </Box>
  );
};

export default UserAuth;
