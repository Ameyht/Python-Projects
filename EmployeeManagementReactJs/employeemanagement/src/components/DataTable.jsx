import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import useUserStore from "./employeeStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: 24,
  p: 4,
};

export default function DataTable({ user }) {
  
  console.log("user getting from search =>" + JSON.stringify(user));
  const { removeUser } = useUserStore();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [rows,setRows]= useState([]);
  const LoginEmployee = useUserStore((state) => state.getUser());
  const EmployeeName=LoginEmployee?.EmployeeName;
  console.log("LoginEmployee Name => ",JSON.stringify(EmployeeName))
  useEffect(() => { 
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/dept/employee/${LoginEmployee?.EmployeeName}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${BEARER_TOKEN}`,
          }
        });
        //Note: below i have mapped the EmployeeId to id as DataGrid needs a unique id for every Object to render the data
        const employeesWithId = response.data.map(employee => ({
          ...employee,
          id: employee.EmployeeId 
        }));
        console.log("employeesWithId : ",JSON.stringify(employeesWithId))
        setRows(employeesWithId);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        toast.error("Failed to load employee data.");
      }
    };
  
    fetchEmployees();
  }, []);
  
// columns to be rendered in the MUIDataTable
  const columns = [
    { field: "id", headerName: "Id", width: 60 },
    {
      field: "Name",
      headerName: "Name",
      width: 130,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.row.EmployeeName }
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.row.Email }
        </div>
      ),
    },
    { field: "Department", headerName: "Department", width: 100 ,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.row.Department }
        </div>
      ),
    },
    { field: "role", headerName: "Role", width: 150 ,renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {params.row.Role }
      </div>
    ),},
    { field: "Manager", headerName: "Manager", width: 120 ,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.row.Manager }
        </div>
      ),
    },
    { field: "DateOfJoining", headerName: "DateOfJoining", width: 120, 
      renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {params.row.DateOfJoining }
      </div>
    ), },
    {
      field: "Action",
      headerName: "Action",
      width: 90,
      renderCell: (params) => (
        <div>
          <Select
            id="status"
            name="status"
            className="w-[90%] mx-0 mt-2 md:w-20 md:h-8"
            // sx={{ width: "60%" }}
            size="small"
            placeholder="role"
            defaultValue=""
            // value="action"
            // onChange={(event) => handleAction(event, params.row.id)}
            // value={formData.status}
            onChange={(event) => handleAction(event, params.row.EmployeeId)}
            required
          >
            <MenuItem value="">Action</MenuItem>
            <MenuItem value="edit">Edit</MenuItem>
            <MenuItem value="delete">Delete</MenuItem>
          </Select>
        </div>
      ),
    },
  ];

  const users = useUserStore((state) => state.users);
  let userData;
  if (user === undefined) {
    userData = users;
  } else {
    userData = user;
  }
  const handleDelete = () => {
    console.log("inside handle delete" + "id => " + id);
    setConfirmDelete(true);
    removeUser(id);
    setOpen(false);
    toast.error("user deleted successfully", {
      position: "top-right",
      theme: "colored",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleAction = (event, id) => {
    const action = event.target.value;

    if (action === "edit") {
      const editUrl = "/EditUser/Edit%20User?id=" + id;
      console.log("editUrl" + editUrl);
      navigate(editUrl);
    } else if (action === "delete") {
      setId(Number(id));
      console.log("action" + action);
      setOpen(true);
      console.log(
        "open" + open + "after setOpen true ,confirmDelete" + confirmDelete
      );
      // if (confirmDelete === true) {
      //   console.log("inside confirmDelete");
      //   removeUser(id);
      //   setOpen(false);
      // }
    } 
  };

  return (
    <div className="border border-black">
      <div style={{ height: 475, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 7 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="border border-black md:w-[400px] w-72">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="h10"
            component="h2"
            marginBottom={3}
          >
            Are You Really Want to Delete the user ?
          </Typography>
          <Box
            width="100%"
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Button variant="contained" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "gray" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
