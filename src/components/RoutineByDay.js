import React from 'react';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";

class RoutineByDay extends React.Component {

    constructor(props) {
      super(props);
      this.routineByMonthId = props.match.params.routineByMonthId;
      this.userId = props.match.params.userId;
    }
  
    render(){

      var routineByMonthLink = "/routineByMonth/" + this.routineByMonthId;
      var routineByDayLink = "/routineByDay/" + this.routineByMonthId + "/" + this.userId;
      return (
        <div>
          <Breadcrumbs>
            <Link to=""><h1>Home</h1></Link>
            <Link to="/users"><h1>Users</h1></Link>
            <Link to={routineByMonthLink}><h1>RoutineByMonth</h1></Link>
            <Link to={routineByDayLink}><h1>RoutineByDay</h1></Link>
          </Breadcrumbs>
          
          <h1>Routine by Day</h1>
        </div>
      );
    }
  }

export default RoutineByDay;