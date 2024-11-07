import React from 'react'
// import Header from './Header'
import { Box } from '@mui/material'
import DataTable from './DataTable'

const Main = () => {
  return (
    <Box className="p-1 md:min-h-3 min-h-3 h-auto md:h-auto w-[100%] bg-gray-100 md:w-[84%]">
      <DataTable />
    </Box>
  )
}

export default Main