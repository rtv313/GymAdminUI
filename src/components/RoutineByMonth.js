import React, { useState } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Logout from "./Logout";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { SERVER_URL } from "./Constants.js";
import { toast } from "react-toastify";
import { DataGrid } from "@material-ui/data-grid";
import AddRoutineByMonth from "./AddRoutineByMonth"


const RoutineByMonth = (props) => {
  const { userId } = useParams();
  const [columnsUsers, setColumnsUser] = useState([
    { field: "name", headerName: "Name", width: 180 },
    { field: "createAt", headerName: "Creation date", width: 180 },
    { field: "coachUser", 
    headerName: "Coach",
     width: 180,
    
    },
    {
      field: "edit",
      headerName: "Edit",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return <Button variant="contained" color="primary" id={params.getValue("id")}>Edit</Button>;
      },
    },
    {
      field: "routinesByDay",
      headerName: "Routines by day",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 210,
      renderCell: (params) => {
        var link = "/routineByDay/";
        return (
          <Link to={link}>
            <Button variant="outlined" color="primary">
              Routines by day
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
  ]);

  const setCoachUser = (value) => {
    value.coachUser = value.coachUser.email;
    return value;
  };

  const [user, setUser] = useState({
    email: "",
    name: "",
    lastname: "",
    password: "",
    roles: [],
  });

  const [responseDataPass, setResponseDataPass] = useState({});

  const [routinesByMonth, setRoutinesByMonth] = useState([]);

  const getUserData = (id) => {
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
        } else {
          toast.success("Get User data succesfully", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
        return response;
      })
      .then((response) => response.json())
      .then((responseData) => {
        setUser(
          {
            email: responseData.email,
            name: responseData.name,
            lastname: responseData.lastname,
            password: responseData.password,
            roles: responseData.roles,
          },
          fetchRoutinesByMonth(responseData)
        );
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // Fetch all RoutinesByMonth
  const fetchRoutinesByMonth = (responseData) => {
    // Read the token from the session storage
    // and include it to Authorization header
    setResponseDataPass(responseData);
    const token = "Bearer " + sessionStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    var userJson = JSON.stringify({
      id: responseData.id,
      email: responseData.email,
      name: responseData.name,
      lastname: responseData.lastname,
      password: responseData.password,
      roles: responseData.roles,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: userJson,
      redirect: "follow",
    };

    fetch(SERVER_URL + "api/routinesByMonthByNormalUser/", requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        responseData.map(setCoachUser);
        setRoutinesByMonth(responseData);
        
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    // Runs after the first render() lifecycle
    getUserData(userId);
  }, []);

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

        <h1>Routines by Month</h1>
        <h2>
          User id is {userId} {user.name}
        </h2>

        <AddRoutineByMonth  userId = {userId} responseData={responseDataPass} fetchRoutinesByMonth={fetchRoutinesByMonth}/>

        <Link to="/routineByDay">
          <h1>Routine By Day</h1>
        </Link>

        <div style={{ height: 1000, width: "100%" }}>
          <DataGrid
            rows={routinesByMonth}
            columns={columnsUsers}
            pageSize={50}
          />
        </div>
      </Container>
    </div>
  );
};

export default RoutineByMonth;
