import React, { useState } from "react";
import { SERVER_URL } from "./Constants.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from "react-toastify";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

var ROLE_COACH = "ROLE_COACH";
var ROLE_ADMIN = "ROLE_ADMIN";
var ROLE_USER = "ROLE_USER";

const AddUser = (props) => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(ROLE_USER);
  const [roleId, setRoleId] = useState(1);
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    roles: [],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);

    switch (event.target.value) {
      case ROLE_COACH:
        setRoleId(2);
        setRole(ROLE_COACH);
        break;
      case ROLE_ADMIN:
        setRoleId(3);
        setRole(ROLE_ADMIN);
        break;
      default:
        setRoleId(1);
        setRole(ROLE_USER);
    }
  };

  // Save user
  const handleSave = () => {
    const token = "Bearer " + sessionStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    var nestedRole = new Object();
    nestedRole.id = roleId;
    nestedRole.name = role;
    user.roles = [nestedRole];
    var raw = JSON.stringify(user);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(SERVER_URL + "api/users/", requestOptions)
      .then((response) => {
        if (response.status !== 201) {
          toast.warn("Error creating user", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          toast.success("User Created", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
        return response.text();
      })
      .then((result) => console.log(result))
      .then((res) => props.fetchUsers())
      .catch((error) => {
        console.log("error", error);
      });
    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        style={{ margin: 10 }}
        onClick={handleClickOpen}
      >
        Add User
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Email"
            name="email"
            onChange={handleChange}
          />

          <TextField
            autoFocus
            fullWidth
            label="Name"
            name="name"
            onChange={handleChange}
          />

          <TextField
            autoFocus
            fullWidth
            label="Lastname"
            name="lastname"
            onChange={handleChange}
          />

          <TextField
            type="password"
            autoFocus
            fullWidth
            label="Password"
            name="password"
            onChange={handleChange}
          />

          <TextField
            type="password"
            autoFocus
            fullWidth
            label="Repeat password"
            name="repeatPassword"
          />

          <p>Role:</p>
          <Select
            name="roles"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            onChange={handleRoleChange}
          >
            <MenuItem value={"ROLE_USER"}>ROLE_USER</MenuItem>
            <MenuItem value={"ROLE_COACH"}>ROLE_COACH</MenuItem>
            <MenuItem value={"ROLE_ADMIN"}>ROLE_ADMIN</MenuItem>
          </Select>
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

export default AddUser;
