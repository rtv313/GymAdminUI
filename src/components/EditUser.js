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

const EditUser = (props) => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(ROLE_USER);
  const [roleId, setRoleId] = useState(1);
  const [user, setUser] = useState({
    email: "",
    name: "",
    lastname: "",
    password: "",
    roles: [],
  });

  const [validEmail, setValidEmail] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState("");

  const [validName, setValidName] = useState(false);
  const [errorNameMessage, setErrorNameMessage] = useState("");

  const [validLastname, setValidLastname] = useState(false);
  const [errorLastnameMessage, setErrorLastnameMessage] = useState("");

  const getUserData = (id) => {

    const token = "Bearer " + sessionStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(SERVER_URL + "api/users/" + id, requestOptions)
    .then((response) => {
        if(response.status !== 200){
        toast.warn("Cannot get User", {position: toast.POSITION.BOTTOM_LEFT}); 
        }else{
        toast.success("Get User data succesfully", {position: toast.POSITION.BOTTOM_LEFT}); 
        }
        return response;
    })
    .then((response) => response.json())
    .then((responseData) => {
        setUser({
            email: responseData.email,
            name: responseData.name,
            lastname: responseData.lastname,
            password: responseData.password,
            roles: responseData.roles});

      setRoleId(responseData.roles[0].id);
      setRole(responseData.roles[0].name);
    })
    .catch((error) => {console.log("error", error);});   
}

  const handleClickOpen = () => {
    setOpen(true);
    getUserData(props.id);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm(false);
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    resetForm(true);
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

  function ValidateEmail(mail) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
  }

  const resetForm = (comeHandleChange) => {
    setValidEmail(false);
    setErrorEmailMessage("");

    setValidName(false);
    setErrorNameMessage("");

    setValidLastname(false);
    setErrorLastnameMessage("");


    if (comeHandleChange !== true) {
      setRoleId(1);

      setUser({
        email: "",
        name: "",
        lastname: "",
        password: "",
        roles:[],
      });
    }
  };

  const validateData = () => {
    var valid = true;

    if (user.email === "") {
      setValidEmail(true);
      setErrorEmailMessage("This field cannot be empty");
      valid = false;
    } else if (ValidateEmail(user.email) === false) {
      setValidEmail(true);
      setErrorEmailMessage("This is not a valid email format");
      valid = false;
    } else {
      setValidName(false);
      setErrorNameMessage("");
    }

    if (user.name === "") {
      setValidName(true);
      setErrorNameMessage("This field cannot be empty");
      valid = false;
    } else {
      setValidName(false);
      setErrorNameMessage("");
    }

    if (user.lastname === "") {
      setValidLastname(true);
      setErrorLastnameMessage("This field cannot be empty");
      valid = false;
    } else {
      setValidLastname(false);
      setErrorLastnameMessage("");
    }

    return valid;
  };

  // Save user
  const handleSave = () => {
    if (validateData()) {
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
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      var errorFlag = false;
      fetch(SERVER_URL + "api/users/" +  props.id, requestOptions)
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
            toast.success("User Updated", {
              position: toast.POSITION.BOTTOM_LEFT,
            });
            props.fetchUsers();
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
        Edit User
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            error={validEmail}
            helperText={errorEmailMessage}
          />

          <TextField
            autoFocus
            fullWidth
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            error={validName}
            helperText={errorNameMessage}
          />

          <TextField
            autoFocus
            fullWidth
            label="Lastname"
            name="lastname"
            value={user.lastname}
            onChange={handleChange}
            error={validLastname}
            helperText={errorLastnameMessage}
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

export default EditUser;
