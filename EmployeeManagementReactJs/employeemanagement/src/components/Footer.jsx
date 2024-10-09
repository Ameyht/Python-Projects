import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <Box className="fixed bottom-0 left-0 w-full flex justify-center bg-gray-300 border-t border-black p-2">
        <Typography className="text-gray-700 text-sm">
          CopyRight C 2024 MultiKart All Rights Reserved
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
