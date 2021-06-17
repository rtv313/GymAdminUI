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

const dateformat = require("dateformat");

const AddRoutineDayExercise = (props) => {
  const [open, setOpen] = useState(false);
  const [exerciseByDay, setExeciseByDay] = useState({
    series: "0",
    repetitions: "0",
    durationInMinutes: "0",
    note: "",
    exercise: {},
  });

  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState({});

  const [validSeries, setValidSeries] = useState(false);
  const [errorSeriesMessage, setErrorSeriesMessage] = useState("");

  const [validRepetitions, setValidRepetitions] = useState(false);
  const [errorRepetitionsMessage, setErrorRepetitionsMessage] = useState("");

  const [validDurationInMinutes, setValidDurationInMinutes] = useState(false);
  const [errorDurationInMinutessMessage, setErrorDurationInMinutesMessage] =
    useState("");

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
    },
  ]);

  const resetForm = (comeHandleChange) => {
    setValidSeries(false);
    setErrorSeriesMessage("");

    setValidRepetitions(false);
    setErrorRepetitionsMessage("");

    setValidDurationInMinutes(false);
    setErrorDurationInMinutesMessage("");

    if (comeHandleChange !== true) {
      setExeciseByDay({
        series: "0",
        repetitions: "0",
        durationInMinutes: "0",
        note: "",
        exercise: {},
      });
    }
  };

  const validateData = () => {
    var valid = true;

    if (exerciseByDay.series === "") {
      setValidSeries(true);
      setErrorSeriesMessage("This field cannot be empty");
      valid = false;
    } else {
      setValidSeries(false);
      setErrorSeriesMessage("");
    }

    if (exerciseByDay.repetitions === "") {
      setValidRepetitions(true);
      setErrorRepetitionsMessage("This field cannot be empty");
      valid = false;
    } else {
      setValidRepetitions(false);
      setErrorRepetitionsMessage("");
    }

    if (exerciseByDay.durationInMinutes === "") {
      setValidDurationInMinutes(true);
      setErrorDurationInMinutesMessage("This field cannot be empty");
      valid = false;
    } else {
      setValidDurationInMinutes(false);
      setErrorDurationInMinutesMessage("");
    }

    return valid;
  };

  const handleClickOpen = () => {
    setOpen(true);
    fetchExercises();
  };

  const handleClose = () => {
    setOpen(false);
    resetForm(false);
  };

  const handleChange = (event) => {
    setExeciseByDay({
      ...exerciseByDay,
      [event.target.name]:
        event.target.value < 0 ? (event.target.value = 0) : event.target.value,
    });
    resetForm(true);
  };

  // Save RoutineByMonth
  const handleSave = () => {
    
    if (validateData() === true){
      const token = "Bearer " + sessionStorage.getItem("accessToken");
      var myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify(exerciseByDay);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      var errorFlag = false;
      fetch(SERVER_URL + "api/exercisesByDay/" + props.routineByDayId + "/" + selectedExercise.id,requestOptions)
        .then((response) => {
          if (response.status !== 201) {
            errorFlag = true;
          }
          return response;
        })
        .then((response) => response.json())
        .then((responseData) => {
          if (errorFlag === true) {
            toast.warn(responseData.message, {
              position: toast.POSITION.BOTTOM_LEFT,
            });
          } else {
            toast.success("Routine day exercise Created", {
              position: toast.POSITION.BOTTOM_LEFT,
            });
            props.fetchExercisesByDay();
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
      handleClose();
    }
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
        variant="outlined"
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
            type={"number"}
            autoFocus
            fullWidth
            label="Series"
            name="series"
            value={exerciseByDay.series}
            onChange={handleChange}
            error={validSeries}
            helperText={errorSeriesMessage}
          />
          <TextField
            type={"number"}
            autoFocus
            fullWidth
            label="Repetitions"
            name="repetitions"
            value={exerciseByDay.repetitions}
            onChange={handleChange}
            error={validRepetitions}
            helperText={errorRepetitionsMessage}
          />
          <TextField
            type={"number"}
            autoFocus
            fullWidth
            label="Duration in Minutes"
            name="durationInMinutes"
            value={exerciseByDay.durationInMinutes}
            onChange={handleChange}
            error={validDurationInMinutes}
            helperText={errorDurationInMinutessMessage}
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
