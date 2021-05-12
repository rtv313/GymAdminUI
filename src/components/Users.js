import React from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "./Constants.js";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Logout from "./Logout";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ToastContainer, toast } from "react-toastify";
import { DataGrid } from "@material-ui/data-grid";
import AddUser from "./AddUser";

class Users extends React.Component {
  columnsUsers = [
    { field: "email", headerName: "Email", width: 190 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "lastname", headerName: "Lastname", width: 180 },
    { field: "roles", headerName: "Role", width: 180 },
  ];

  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  // Cleans the nested data because filter cant work with nested data
  setRole = (value) => {
    value.roles = value.roles[0].name;
    return value;
  };

  // Fetch all users
  fetchUsers = () => {
    // Read the token from the session storage
    // and include it to Authorization header
    const token = "Bearer " + sessionStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(SERVER_URL + "api/users/", requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ users: responseData });
        this.state.users.map(this.setRole);
      })
      .catch((err) => console.error(err));
  };

  render() {
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
          </Breadcrumbs>
          <h1>Users</h1>
          <AddUser fetchExercises={this.fetchExercises} />
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={this.state.users}
              columns={this.columnsUsers}
              pageSize={15}
            />
          </div>
        </Container>
        <br />
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

export default Users;
