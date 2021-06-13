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
import EditRoutineByDay from "./EditRoutineByDay";

class ExercisesByDay extends React.Component {

  columnsExercises = [
    {
        field: "Exercise",
        disableClickEventBubbling: true,
        headerName: "Exercise",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160,
        renderCell: (params) => {
          var exerciseName =  params.getValue("exercise");
          return (
              <h3>{exerciseName.name}</h3>
          );
        },
      },
    { field: "series", headerName: "Series", width: 180 },
    { field: "repetitions", headerName: "Repetitions", width: 180 },
    { field: "durationInMinutes", headerName: "Duration In Minutes", width: 180 },
    { field: "note", headerName: "Note", width: 180 },
  ];

  constructor(props) {
    super(props);
    this.routineByDayId = props.match.params.routineByDayId;
    this.routineByMonthId = props.match.params.routineByMonthId;
    this.userId = props.match.params.userId;
    this.state = { exercisesByDay: [], user: {}};
  }

  componentDidMount() {
    this.fetchExercisesByDay();
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
  fetchExercisesByDay = () => {
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
        "api/exercisesByDayByRoutineByDay" +
        "/" +
        this.routineByDayId,
      requestOptions
    )
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ exercisesByDay: responseData });
      })
      .catch((err) => console.error(err));
  };

  render() {
    var routineByMonthLink = "/routineByMonth/" + this.routineByMonthId;
    var routineByDayLink = "/routineByDay/" + this.routineByDayId + "/" + this.userId;
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
            <Link to="">
              <h1>Exercises by Day</h1>
            </Link>
          </Breadcrumbs>

          <h1>Exercises for:</h1>

          <h2>User email: {this.state.user.email}</h2>
          <h2>
            User Name: {this.state.user.name},{this.state.user.lastname}
          </h2>
      
          <AddRoutineByDay routineByMonthId = {this.routineByMonthId} fetchRoutinesByDay={this.fetchRoutinesByDay}/>

          <div style={{ height: 1000, width: "100%" }}>
            <DataGrid
              rows={this.state.exercisesByDay}
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

export default ExercisesByDay;
