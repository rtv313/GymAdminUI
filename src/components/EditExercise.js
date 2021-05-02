import React, { useState } from "react";
import { SERVER_URL } from "./Constants.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from 'react-toastify';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const EditExercise = (props) => {
    const [open, setOpen] = useState(false);
    const [exercise, setExercise] = useState({
      name: "",
      imageUrl: "",
      description: "",
      videoUrl: "",
      bodyPart: "",
    });
  
    const [validName, setValidName] = useState(false);
    const [errorNameMessage, setErrorNameMessage] = useState("");
  
    const [validImageUrl, setValidImageUrl] = useState(false);
    const [errorImageUrlMessage, setErrorImageUrlMessage] = useState("");
  
    const [validDescription, setValidDescription] = useState(false);
    const [errorDescriptionMessage, setErrorDescriptionMessage] = useState("");
  
    const [validVideoUrl, setValidVideoUrl] = useState(false);
    const [errorVideoUrlMessage, setErrorVideoUrlMessage] = useState("");
  
    const [validBodyPart, setValidBodyPart] = useState(false);
    const [errorBodyPartMessage, setErrorBodyPartMessage] = useState("");

    const getExerciseData = (id) => {

        const token = "Bearer " + sessionStorage.getItem("accessToken");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(SERVER_URL + "api/exercises/" + id, requestOptions)
        .then((response) => {
            if(response.status != 200){
            toast.warn("Cannot get exercise", {position: toast.POSITION.BOTTOM_LEFT}); 
            }else{
            toast.success("Get exercise data succesfully", {position: toast.POSITION.BOTTOM_LEFT}); 
            }
            return response;
        })
        .then((response) => response.json())
        .then((responseData) => {setExercise(responseData);})
        .catch((error) => {console.log("error", error);});
    }
  
    const handleClickOpen = () => {
      setOpen(true);
      getExerciseData(props.id);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChange = (event) => {
      setExercise({ ...exercise, [event.target.name]: event.target.value });
      removeFormErrors(event.target.name);
    };

    const removeFormErrors = (targetName) =>{
        
        if (targetName === "name") {
            setValidName(false);
            setErrorNameMessage("");
        }

        if (targetName === "imageUrl") {
            setValidImageUrl(false);
            setErrorImageUrlMessage("");
        }

        if (targetName === "description") {
            setValidDescription(false);
            setErrorDescriptionMessage("");
        }

        if (targetName === "videoUrl") {
            setValidVideoUrl(false);
            setErrorVideoUrlMessage("");
        }

        if (targetName === "bodyPart") {
            setValidBodyPart(false);
            setErrorBodyPartMessage("");
        }
    }
  
    const validateData = () => {
      var valid = true;
      if (exercise.name == "") {
        setValidName(true);
        setErrorNameMessage("This field cannot be empty");
        valid = false;
      } else {
        setValidName(false);
        setErrorNameMessage("");
      }
  
      if (exercise.imageUrl === "") {
        setValidImageUrl(true);
        setErrorImageUrlMessage("This field cannot be empty");
        valid = false;
      } else {
        setValidImageUrl(false);
        setErrorImageUrlMessage("");
      }
  
      if (exercise.description === "") {
        setValidDescription(true);
        setErrorDescriptionMessage("This field cannot be empty");
        valid = false;
      } else {
        setValidDescription(false);
        setErrorDescriptionMessage("");
      }
  
      if (exercise.videoUrl === "") {
        setValidVideoUrl(true);
        setErrorVideoUrlMessage("This field cannot be empty");
        valid = false;
      } else {
        setValidVideoUrl(false);
        setErrorVideoUrlMessage("");
      }
  
      if (exercise.bodyPart === "") {
        setValidBodyPart(true);
        setErrorBodyPartMessage("This field cannot be empty");
        valid = false;
      } else {
        setValidBodyPart(false);
        setErrorBodyPartMessage("");
      }
  
      return valid;
    };
  
    // Save exercise
    const handleSave = () => {
      if(validateData()){
        const token = "Bearer " + sessionStorage.getItem("accessToken");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(exercise);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

        fetch(SERVER_URL + "api/exercises/" + props.id, requestOptions)
        .then((response) => {
            if(response.status != 201){
            toast.warn("Cannot edit exercise", {position: toast.POSITION.BOTTOM_LEFT}); 
            }else{
            toast.success("Exercise edited", {position: toast.POSITION.BOTTOM_LEFT}); 
            }
            return response.text();
        })
        .then((result) => console.log(result))
        .then(res => props.fetchExercises())
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

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Exercise</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              label="Name"
              name="name"
              value={exercise.name}
              onChange={handleChange}
              error={validName}
              helperText={errorNameMessage}
            />
            <TextField
              fullWidth
              label="Image Url"
              name="imageUrl"
              value={exercise.imageUrl}
              onChange={handleChange}
              error={validImageUrl}
              helperText={errorImageUrlMessage}
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={exercise.description}
              onChange={handleChange}
              error={validDescription}
              helperText={errorDescriptionMessage}
            />
            <TextField
              fullWidth
              label="Video Url"
              name="videoUrl"
              value={exercise.videoUrl}
              onChange={handleChange}
              error={validVideoUrl}
              helperText={errorVideoUrlMessage}
            />
            <TextField
              fullWidth
              label="Body Part"
              name="bodyPart"
              value={exercise.bodyPart}
              onChange={handleChange}
              error={validBodyPart}
              helperText={errorBodyPartMessage}
            />
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
  
  export default EditExercise;