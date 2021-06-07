import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import { SERVER_URL } from "./Constants.js";
import Logout from "./Logout";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ToastContainer, toast } from "react-toastify";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import AddRoutineByDay from "./AddRoutineByDay";
class RoutineByDay extends React.Component {
  columnsExercises = [
    { field: "name", headerName: "Name", width: 180 },
    { field: "dayOfWeek", headerName: "Day of week", width: 180 },
    {
      field: "edit",
      headerName: "Edit",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <Button variant="contained" color="primary">
            Edit
          </Button>
        );
      },
    },
    {
      field: "exercises",
      headerName: "Exercises",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 210,
      renderCell: (params) => {
        return (
          <Link to="">
            <Button variant="outlined" color="primary">
              Exercises
            </Button>
          </Link>
        );
      },
    },
    {
      field: "delete",
      disableClickEventBubbling: true,
      headerName: "Delete",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        const onClick = () => {
          //this.deleteUser(params.getValue("id"));
        };

        return (
          <Button variant="contained" color="secondary" onClick={onClick}>
            Delete
          </Button>
        );
      },
    },
  ];

  constructor(props) {
    super(props);
    this.routineByMonthId = props.match.params.routineByMonthId;
    this.userId = props.match.params.userId;
    this.state = { routinesByDay: [], user: {}};
  }

  componentDidMount() {
    this.fetchRoutinesByDay();
    this.getUserData(this.userId);
  }

  getUserData = (id) => {
    const token = "Bearer " + sessionStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(SERVER_URL + "api/users/" + id, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          toast.warn("Cannot get User", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          return false;
        }
        return response;
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ user: responseData });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // Fetch all routinesByDay
  fetchRoutinesByDay = () => {
    // Read the token from the session storage
    // and include it to Authorization header
    const token = "Bearer " + sessionStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      SERVER_URL +
        "api/routinesByDayByRoutineByMonth" +
        "/" +
        this.routineByMonthId,
      requestOptions
    )
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ routinesByDay: responseData });
      })
      .catch((err) => console.error(err));
  };

  render() {
    var routineByMonthLink = "/routineByMonth/" + this.routineByMonthId;
    var routineByDayLink =
      "/routineByDay/" + this.routineByMonthId + "/" + this.userId;
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
            <Link to={routineByMonthLink}>
              <h1>RoutineByMonth</h1>
            </Link>
            <Link to={routineByDayLink}>
              <h1>RoutineByDay</h1>
            </Link>
          </Breadcrumbs>

          <h1>Routines by Day for:</h1>

          <h2>User email: {this.state.user.email}</h2>
          <h2>
            User Name: {this.state.user.name},{this.state.user.lastname}
          </h2>
      
          <AddRoutineByDay routineByMonthId = {this.routineByMonthId} fetchRoutinesByDay={this.fetchRoutinesByDay}/>

          <div style={{ height: 1000, width: "100%" }}>
            <DataGrid
              rows={this.state.routinesByDay}
              columns={this.columnsExercises}
              pageSize={50}
            />
          </div>
        </Container>
        <br />
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

export default RoutineByDay;
