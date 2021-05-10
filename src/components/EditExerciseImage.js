import React, { useState } from "react";
import { SERVER_URL } from "./Constants.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from "react-toastify";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const EditExerciseImage = (props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {};

  // Save exercise
  const handleSave = () => {
    var myHeaders = new Headers();
    const token = "Bearer " + sessionStorage.getItem("accessToken");
    myHeaders.append("Authorization", token);
    //myHeaders.append("Content-Type", "application/json");

    var formdata = new FormData();
    formdata.append("file", selectedFile);
    formdata.append("id", props.id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(SERVER_URL + "api/exercises/upload", requestOptions)
      .then((response) => {
        if (response.status != 201) {
          toast.warn("Cannot upload Image", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          toast.success("Image uploaded", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
        return response.text();
      })
      .then((result) => console.log(result))
      .then((res) => props.fetchExercises())
      .catch((error) => console.log("error", error));

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
          <Grid
            container
            spacing={3}
            align="center"
            justify="center"
            alignItems="center"
          >
            <Input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />

            <Grid item xs={12}>
              <Paper>Current exercise Image</Paper>
            </Grid>
            <Grid item xs={12}>
              <img
                src={SERVER_URL + "api/uploads/img/" + props.url}
                width="300"
                height="300"
              />
            </Grid>
          </Grid>
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
