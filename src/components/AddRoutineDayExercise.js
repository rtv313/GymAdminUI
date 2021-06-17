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
import EditExerciseImage from "./EditExerciseImage"

const dateformat = require("dateformat");

const AddRoutineDayExercise = (props) => {
  const [open, setOpen] = useState(false);
  const [exerciseByDay, setExeciseByDay] = useState({
    series: "",
    repetitions: "",
    durationInMinutes: "",
    note: "",
    exercise: {},
  });

  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState({});

  const [columnsExercises, setColumnsExercises] = useState([
    { field: "name", headerName: "Name", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    { field: "videoUrl", headerName: "Video", width: 90 },
    { field: "bodyPart", headerName: "Body Part", width: 190 },
    {
      field: "setExercise",
      headerName: "Set Exercise",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,

      renderCell: (params) => {
        const onClick = () => {
          setSelectedExercise(params.row);
        };

        return (
          <Button variant="contained" color="primary" onClick={onClick}>
            Set Exercise
          </Button>
        );
      },
    }
  ]);

  const resetForm = (comeHandleChange) => {};

  const handleClickOpen = () => {
    setOpen(true);
    fetchExercises();
  };

  const handleClose = () => {
    setOpen(false);
    resetForm(false);
  };

  const handleChange = (event) => {
    setExeciseByDay({ ...exerciseByDay, [event.target.name]: event.target.value });
    resetForm(true);
  };

  const validateData = () => {
    var valid = true;

    return valid;
  };

  // Save RoutineByMonth
  const handleSave = () => {
    var newvas = selectedExercise;
  };

  // Fetch all users and filter by coach users
  const fetchExercises = () => {
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

    fetch(SERVER_URL + "api/exercises/", requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        setExercises(responseData);
        setSelectedExercise(responseData[0]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 10 }}
        onClick={handleClickOpen}
      >
        Add Exercise by Day
      </Button>

      <Dialog open={open} onClose={handleClose} fullScreen disableEnforceFocus>
        <DialogTitle> New Exercise by Day</DialogTitle>
        <DialogContent>

           <TextField
            autoFocus
            fullWidth
            label="Series"
            name="series"
            onChange={handleChange}
            />

           <TextField
            autoFocus
            fullWidth
            label="Repetitions"
            name="repetitions"
            onChange={handleChange}
            />

           <TextField
            autoFocus
            fullWidth
            label="Duration in Minutes"
            name="durationInMinutes"
            onChange={handleChange}
            />

           <TextField
            autoFocus
            fullWidth
            label="Note"
            name="note"
            onChange={handleChange}
            />

          <br /> <br />

          <h4>
            Selected Exercise:
            {selectedExercise.name}
          </h4>

          <DataGrid rows={exercises} columns={columnsExercises} pageSize={15} />
      
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

export default AddRoutineDayExercise;
