import React from "react";
import { Box } from "@mui/material";
// import LoginHeader from "./LoginHeader";
import Login from "./Login";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
// import DashBoardUI from "./DashBoardUI";
import SignUp from "./SignUp";
// import Forgot from "./Forgot";
// import Reset from "./Reset";
import Registered from "./Registered";
import Header from "./Header";

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
    // else if (currentUrl === "/reset/user") {
    //   return <Reset />;
    // }
     else if (currentUrl === "/registered") {
      return <Registered />;
    }
    //  else {
    //   return <Forgot />;
    // }
  };

  return (
    <Box className="md:min-h-16 min-h-16 h-auto md:h-auto" style={myStyles}>
      <Header />
      {/* {currentUrl === "/login" ? <Login /> : <SignUp />} */}
      {renderContent()}
      <Footer />
    </Box>
  );
};

export default UserAuth;
