import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const AddRoutineByMonth = (props) => {
  const [open, setOpen] = useState(false);
  const [routineByMonth, setRoutineByMonth] = useState({
    name: "",
    createAt: "",
    coachUser: {},
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
   
  };

  // Save RoutineByMonth
  const handleSave = () => {
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
        New Routine by Month
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Routine by Month</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Name"
          />
          <TextField
            fullWidth
            label="Image Url"
            name="imageUrl"
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

export default AddRoutineByMonth;