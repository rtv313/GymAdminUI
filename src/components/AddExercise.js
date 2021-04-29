import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const AddExercise = (props) => {
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm(false);
  };

  const handleChange = (event) => {
    setExercise({ ...exercise, [event.target.name]: event.target.value });
    resetForm(true);
  };

  const resetForm = (comeHandleChange) =>{
    setValidName(false);
    setErrorNameMessage("");

    setValidImageUrl(false);
    setErrorImageUrlMessage("");

    setValidDescription(false);
    setErrorDescriptionMessage("");

    setValidVideoUrl(false);
    setErrorVideoUrlMessage("");

    setValidBodyPart(false);
    setErrorBodyPartMessage("");

    if(comeHandleChange != true){
      setExercise({"name":"","imageUrl":"","description":"","videoUrl":"","bodyPart":""});
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
      props.addExercise(exercise);
      handleClose();
    }else{
      
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
        New Exercise
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Exercise</DialogTitle>
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

export default AddExercise;
