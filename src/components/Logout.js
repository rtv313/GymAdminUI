import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'

const Logout = () => {

    const logout = () => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        window.location.href = window.location.href;
      }  

  return (
    <AppBar position="static" color="default">
        <Toolbar>
            <Button variant="contained" color="primary"  onClick={logout}  >
                Logout
            </Button>
        </Toolbar>
      </AppBar>
  );
}

export default Logout;