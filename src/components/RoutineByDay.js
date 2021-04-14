import React from 'react';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";

class RoutineByDay extends React.Component {

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
            <Link to="/routineByMonth"><h1>RoutineByMonth</h1></Link>
            <Link to="/routineByDay"><h1>RoutineByDay</h1></Link>
          </Breadcrumbs>
          
          <h1>Routine by Day</h1>
        </div>
      );
    }
  }

export default RoutineByDay;