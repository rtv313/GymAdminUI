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

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const handleChange = (event) => {
  setExercise({ ...exercise, [event.target.name]: event.target.value });
};

// Save exercise
const handleSave = () => {
  props.addExercise(exercise);
  handleClose();
};

return (
    <div>
    <Button variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
      New Exercise
    </Button>
    <Dialog open={open} onClose={handleClose}>
       <DialogTitle>New Exercise</DialogTitle>
       <DialogContent>
         <TextField autoFocus fullWidth label="Name" name="name" value={exercise.name} onChange={handleChange}/> 
         <TextField fullWidth label="Image Url" name="imageUrl" value={exercise.imageUrl} onChange={handleChange}/>
         <TextField fullWidth label="Description" name="description" value={exercise.description} onChange={handleChange}/>
         <TextField fullWidth label="Video Url" name="videoUrl" value={exercise.videoUrl} onChange={handleChange}/>
         <TextField fullWidth label="Body Part" name="bodyPart" value={exercise.bodyPart} onChange={handleChange}/>
       </DialogContent>
       <DialogActions>
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
          <Button color="primary" onClick={handleSave}>Save</Button>
       </DialogActions>
     </Dialog> 
  </div>
);
}

export default AddExercise;
