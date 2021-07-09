import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from "@material-ui/data-grid";
import { SERVER_URL } from "./Constants.js";
import { toast } from "react-toastify";


const AddSubscription = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSeletectUser] = useState({});
  const [selectedCoach, setSeletectCoach] = useState({});
  const [users,setUsers] = useState([]);

  const columnsUsers = [
    { field: "email", headerName: "Email", width: 190 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "lastname", headerName: "Lastname", width: 180 },
    { field: "roles", headerName: "Role", width: 180 }
  ];
  

  const setUser = (user) => {
    
  };

  const setCoach = (coach) => {
    
  };

  const handleClickOpen = () => {
    setOpen(true);
    fetchUsers();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    
  };

  const validateData = () => {
    var valid = true;
    return valid;
  };

  // Save RoutineByMonth
  const handleSave = () => {
   
  };

  

  // Fetch all users and filter by coach users
  const fetchUsers = () => {
      // Read the token from the session storage
    // and include it to Authorization header
    const token = "Bearer " + sessionStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const setRole = (value) => {
      value.roles = value.roles[0].name;
      return value;
    };

    fetch(SERVER_URL + "api/users/", requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        responseData.map(setRole);
        setUsers(responseData)
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        style={{ margin: 10 }}
        onClick={handleClickOpen}
      >
        New Subscription
      </Button>

      <Dialog open={open} onClose={handleClose} fullScreen disableEnforceFocus>
        <DialogTitle>  New Subscription </DialogTitle>
        <DialogContent>
          <h4>
            Selected User:
          </h4>
          <h4>
            Selected Coach:
          </h4>
          <div style={{ height: 1000, width: "100%" }}>
            <DataGrid
              rows={users}
              columns={columnsUsers}
              pageSize={50}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddSubscription;
