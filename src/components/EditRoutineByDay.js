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
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const dateformat = require("dateformat");
var DAY_OF_WEEK = "LUNES";

const EditRoutineByDay = (props) => {
  const [open, setOpen] = useState(false);
  const [routineByDay, setRoutineByDay] = useState({
    name: "",
    dayOfWeek: "",
    exercisesByDay:[]
  });

  const [dayOfWeek, setDayOfWeek] = useState(DAY_OF_WEEK);
  const [validName, setValidName] = useState(false);
  const [errorNameMessage, setErrorNameMessage] = useState("");

  const resetForm = (comeHandleChange) => {
    setValidName(false);
    setErrorNameMessage("");
    if (comeHandleChange !== true) {
      setRoutineByDay({
        name: "",
        dayOfWeek: "",
      });
      setDayOfWeek(DAY_OF_WEEK);
    }
  };

  const getRoutineByDay = () => {
    const token = "Bearer " + sessionStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(SERVER_URL + "api/routinesByDay/" + props.id, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          toast.warn("Cannot get Routine by Day", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          toast.success("Get Routine by Day data succesfully", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
        return response;
      })
      .then((response) => response.json())
      .then((responseData) => {
        setRoutineByDay(responseData);
        setDayOfWeek(responseData.dayOfWeek);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleDayOfWeekChange = (event) => {
    setDayOfWeek(event.target.value);
    setRoutineByDay({
        id:routineByDay.id,
        name: routineByDay.name,
        dayOfWeek: event.target.value,
        routineByMonth:routineByDay.routineByMonth,
        exercisesByDay:routineByDay.exercisesByDay
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
    getRoutineByDay();
  };

  const handleClose = () => {
    setOpen(false);
    resetForm(false);
  };

  const handleChange = (event) => {
    setRoutineByDay({
      id:routineByDay.id,
      name: event.target.value,
      dayOfWeek: dayOfWeek,
      routineByMonth:routineByDay.routineByMonth,
      exercisesByDay:routineByDay.exercisesByDay
    });
    resetForm(true);
  };

  const validateData = () => {
    var valid = true;
    if (routineByDay.name === "") {
      setValidName(true);
      setErrorNameMessage("This field cannot be empty");
      valid = false;
    } else {
      setValidName(false);
      setErrorNameMessage("");
    }
    return valid;
  };

  // Save RoutineByMonth
  const handleSave = () => {

    if (validateData() === true) {
        const token = "Bearer " + sessionStorage.getItem("accessToken");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(routineByDay);
  
        var requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
  
        var errorFlag = false;
        fetch(SERVER_URL + "api/routinesByDay/" + props.id + "/" + props.routineByMonthId, requestOptions)
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
              toast.success("Routine by day Updated", {
                position: toast.POSITION.BOTTOM_LEFT,
              });
              props.fetchRoutinesByDay();
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
        handleClose();
      }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 10 }}
        onClick={handleClickOpen}
      >
        Edit
      </Button>

      <Dialog open={open} onClose={handleClose}  disableEnforceFocus>
        <DialogTitle> New Routine by Day</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Name"
            onChange={handleChange}
            value={routineByDay.name}
            error={validName}
            helperText={errorNameMessage}
          />
        <br/><br/>
        <p>Select day of the week</p>
          <FormControl>
            <Select
              value={dayOfWeek}
              onChange={handleDayOfWeekChange}
            >
              <MenuItem value={"LUNES"}>LUNES</MenuItem>
              <MenuItem value={"MARTES"}>MARTES</MenuItem>
              <MenuItem value={"MIERCOLES"}>MIERCOLES</MenuItem>
              <MenuItem value={"JUEVES"}>JUEVES</MenuItem>
              <MenuItem value={"VIERNES"}>VIERNES</MenuItem>
              <MenuItem value={"SABADO"}>SABADO</MenuItem>
              <MenuItem value={"DOMINGO"}>DOMINGO</MenuItem>
            </Select>
          </FormControl>
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

export default EditRoutineByDay;
