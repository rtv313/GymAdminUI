import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
  }));


const Logout = () => {

    const classes = useStyles();

    const logout = () => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        window.location.href = window.location.href;
      }  

  return (
    <AppBar position="static" color="default">
        <Toolbar>
            <Button variant="contained" color="primary"  onClick={logout}>
                Logout
            </Button>
            <h2 className={classes.title}> Gym App Admin UI</h2>
        </Toolbar>
      </AppBar>
  );
}

export default Logout;