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

const AddRoutineByDay = (props) => {
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
    }
  };

  const handleDayOfWeekChange = (event) => {
    setDayOfWeek(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
    //fetchRoutinesByDay();
  };

  const handleClose = () => {
    setOpen(false);
    resetForm(false);
  };

  const handleChange = (event) => {
    setRoutineByDay({
      name: event.target.value,
      dayOfWeek: dayOfWeek,
      exercisesByDay:[]
    });
    resetForm(true);
  };

  const validateData = () => {
    return true;
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
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
  
        var errorFlag = false;
        fetch(SERVER_URL + "api/routinesByDay/" + props.routineByMonthId, requestOptions)
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
              toast.success("Routine by day Created", {
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
        variant="outlined"
        color="primary"
        style={{ margin: 10 }}
        onClick={handleClickOpen}
      >
        New Routine by Day
      </Button>

      <Dialog open={open} onClose={handleClose}  disableEnforceFocus>
        <DialogTitle> New Routine by Day</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Name"
            onChange={handleChange}
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

export default AddRoutineByDay;
