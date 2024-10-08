import React from 'react'
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Main from './Main';
import Header from './Header';

const Home = () => {
    const myStyles = {
        fontFamily: "'Oswald', sans-serif", 
      };
  return (
    <>
    <Header/>
    <Box className="md:min-h-16 min-h-16 h-auto md:h-auto" style={myStyles}>
      <Box className="flex flex-wrap max-w-[100%] h-[100vh] border border-black-700 bg-gray-300 md:">
        <Sidebar />
        <Main/>
      </Box>
    </Box>
    </>
  )
}

export default Home