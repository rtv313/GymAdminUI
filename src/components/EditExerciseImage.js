import React, { useState } from "react";
import { SERVER_URL } from "./Constants.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from 'react-toastify';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';

const EditExerciseImage = (props) => {
    const [open, setOpen] = useState(false);
   

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChange = (event) => {
    
    };

    // Save exercise
    const handleSave = () => {
        handleClose();
    };
  
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 10 }}
          onClick={handleClickOpen}
        >
          Edit Image
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Image</DialogTitle>
          <DialogContent>

            <TextField
              fullWidth
              label="Body Part"
              name="bodyPart"
              onChange={handleChange}
            />
            
            <img src="https://pngimg.com/uploads/Half-Life/Half-Life_PNG76.png" width="150" height="150"></img>
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
  
  export default EditExerciseImage;