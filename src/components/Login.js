import React,{useState} from 'react';
import {SERVER_URL} from './Constants.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import Menu from './Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  input: {
    backgroundColor: theme.palette.common.white,
  }
}));

const Login = () => {
    const classes = useStyles();
    const [user, setUser] = useState({username: '', password: ''})
    const [isAuthenticated, setAuth] = useState(false);

    const handleChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value})
    }
    
    const login = () => {
      
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic cmVhY3RhcHA6MTIzNDU=");
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("username", user.username);
      urlencoded.append("password", user.password);
      urlencoded.append("grant_type", "password");

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

        fetch(SERVER_URL + "oauth/token", requestOptions)
        .then(res => res.json())
        .then(res => {

          const accessToken = res.access_token;
          const refreshToken = res.refresh_token;

          if (accessToken !== null) {
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("refreshToken",refreshToken);
            setAuth(true);
          }
          else {
            toast.warn("Check your username and password", {position: toast.POSITION.BOTTOM_LEFT}) 
          }
        })
        .catch(err => console.error(err)) 
      }  

    if (isAuthenticated === true) {
      return (<Menu/>);
    }
    else {
      return (
        <form className={classes.root}>
          <TextField name="username" label="Username" onChange={handleChange} variant="outlined" InputProps={{className: classes.input }}  /> 
          <br/> 
          <TextField type="password" name="password" label="Password" onChange={handleChange} variant="outlined" color="primary" InputProps={{className: classes.input }} />
          <br/>
          <br/> 
          <Button variant="contained" color="primary"  onClick={login}  >
            Login
          </Button>
          <ToastContainer autoClose={1500} /> 
        </form>
      );
    }
}

export default Login;