import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Select, MenuItem, FormControl} from '@mui/material';
import axios from 'axios';
import useUserStore from "./employeeStore";
const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [rows, setRows] = React.useState([]);
  const [employee, setEmployee] = React.useState(null);

  const getUser = useUserStore((state) => state.getUser);

  React.useEffect(() => {
    const fetchedEmployee = getUser();
    setEmployee(fetchedEmployee);
    console.log("DashBoardMain:", fetchedEmployee);
  }, [getUser]);


  React.useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/dept/leave', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${BEARER_TOKEN}`,
            EmployeeId: employee.EmployeeId, 
          },
        });
        console.log("fetched leaves =>",JSON.stringify(response.data));
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, [employee]);

  const handleStatusChange = async (leaveId, newStatus) => {
    try {
      const updatedLeaveRequest = {
        LeaveId: leaveId,
        EmployeeName: rows.find(row => row.LeaveId === leaveId)?.EmployeeName,
        LeaveDate: rows.find(row => row.LeaveId === leaveId)?.LeaveDate,
        Reason: rows.find(row => row.LeaveId === leaveId)?.Reason,
        Status: newStatus,
        ReportingManager: employee.EmployeeName,  
      };

      const response = await axios.put('http://127.0.0.1:8000/dept/leave', updatedLeaveRequest, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${BEARER_TOKEN}`,
          EmployeeId: employee.EmployeeId,
        },
      });
      console.log("Leave request updated =>", response.data);

      setRows((prevRows) => 
        prevRows.map((row) =>
          row.LeaveId === leaveId ? { ...row, Status: newStatus } : row
        )
      );
    } catch (error) {
      console.error("Error updating leave request:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>Leave Id</StyledTableCell>
            <StyledTableCell>Employee Name</StyledTableCell>
            <StyledTableCell >LeaveDate&nbsp;</StyledTableCell>
            <StyledTableCell >Leave Reason&nbsp;</StyledTableCell>
            <StyledTableCell >Days&nbsp;</StyledTableCell>
            <StyledTableCell >Status&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.leaveId}>
              <StyledTableCell component="th" scope="row">
                {row.LeaveId}
              </StyledTableCell>
              <StyledTableCell >{row.EmployeeName}</StyledTableCell>
              <StyledTableCell >{row.LeaveDate}</StyledTableCell>
              <StyledTableCell >{row.Reason}</StyledTableCell>
              <StyledTableCell >1</StyledTableCell>
              <StyledTableCell>
                <FormControl variant="standard" sx={{minWidth: 100 }}>
                  <Select
                    labelId="status-select-label"
                    id="status-select"
                    value={row.Status}
                    onChange={(e) => handleStatusChange(row.LeaveId, e.target.value)}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Reject">Reject</MenuItem>
                  </Select>
                </FormControl>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
