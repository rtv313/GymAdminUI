import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Logout from "./Logout";
import CssBaseline from "@material-ui/core/CssBaseline";

const RoutineByMonth = (props) => {
  const { userId } = useParams();

  return (
    <div>
      <Container>
        <CssBaseline />
        <Logout />
        <Breadcrumbs>
          <Link to="">
            <h1>Home</h1>
          </Link>
          <Link to="/users">
            <h1>Users</h1>
          </Link>
          <Link to="/routineByMonth">
            <h1>RoutineByMonth</h1>
          </Link>
        </Breadcrumbs>

        <h1>Routine by Month</h1>
        <h2>User id is {userId}</h2>
        <Link to="/routineByDay">
          <h1>Routine By Day</h1>
        </Link>
      </Container>
    </div>
  );
};

export default RoutineByMonth;
