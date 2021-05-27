import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from "@material-ui/data-grid";
import { SERVER_URL } from "./Constants.js";

const AddRoutineByMonth = (props) => {
  const [open, setOpen] = useState(false);
  const [routineByMonth, setRoutineByMonth] = useState({
    name: "",
    createAt: "",
    coachUser: {},
  });

  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSeletectCoach] = useState();

  const setCoach = (coach) => {
    setSeletectCoach(coach);
  };

  const [columnsCoaches, setColumnsCoach] = useState([
    { field: "email", headerName: "Email", width: 190 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "lastname", headerName: "Lastname", width: 180 },
    {
      field: "setCoach",
      headerName: "Set Coach",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,

      renderCell: (params) => {
        const onClick = () => {
          setCoach(params.row);
        };

        return (
          <Button variant="contained" color="primary" onClick={onClick}>
             Set coach
          </Button>
        );
      },
    },
  ]);

  

  const handleClickOpen = () => {
    setOpen(true);
    fetchCoaches();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {};

  // Save RoutineByMonth
  const handleSave = () => {
    handleClose();
  };

  const filterCoachUsers = (value) => {
    return value.roles[0].name === "ROLE_COACH";
  };

  const filterCoachById = (value, id) => {
    return value.roles[0].id === id;
  };
  // Fetch all users
  const fetchCoaches = () => {
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

    fetch(SERVER_URL + "api/users/", requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        var filtered = responseData.filter(filterCoachUsers);
        setCoaches(filtered);
        setCoach(filtered[0]);
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
        New Routine by Month
      </Button>

      <Dialog open={open} onClose={handleClose} fullScreen disableEnforceFocus >
        <DialogTitle> New Routine by Month</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth label="Name" />
          <br /> <br />

          <h4>Selected Coach:{selectedCoach.email},{selectedCoach.name} {selectedCoach.lastname}</h4>

          <DataGrid rows={coaches} columns={columnsCoaches} pageSize={15} />

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

export default AddRoutineByMonth;
