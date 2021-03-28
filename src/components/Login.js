import React,{useState} from 'react';
import {SERVER_URL} from './Constants.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
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
        .then(res => {
          const jwtToken = res.headers.get('Authorization');
          if (jwtToken !== null) {
            sessionStorage.setItem("jwt", jwtToken);
            setAuth(true);
          }
          else {
            toast.warn("Check your username and password", {
              position: toast.POSITION.BOTTOM_LEFT
            }) 
          }
        })
        .catch(err => console.error(err)) 
      }  

      if (isAuthenticated === true) {
        return (<h1>YOU LOGGED</h1>)
      }
      else {
        return (
          <div>
            <TextField name="username" label="Username" onChange={handleChange} /> <br/> 
            <TextField type="password" name="password" label="Password" onChange={handleChange} /><br/><br/> 
            <Button variant="outlined" color="primary"  onClick={login}>
              Login
            </Button>
            <ToastContainer autoClose={1500} /> 
          </div>
        );
      }
}

export default Login;