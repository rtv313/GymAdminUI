import React from 'react';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import { FormControl } from '@material-ui/core';
import { InputLabel ,FormHelperText, Input} from '@material-ui/core';

class User extends React.Component {

    constructor(props) {
      super(props);
    }
  
  
    render(){
      return (
        <div>
            <Breadcrumbs>
                <Link to=""><h1>Home</h1></Link>
                <Link to="/users"><h1>Users</h1></Link>
                <Link to="/user-specifiq"><h1>Specific User</h1></Link>
            </Breadcrumbs>
        
            <h1>Specific-User.js</h1>

            <Link to="/routineByMonth"><h1>RoutineByMonth</h1></Link>

            <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
        </div>
      );
    }
  }
  
export default User;