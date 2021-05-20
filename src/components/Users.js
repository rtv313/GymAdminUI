import React from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "./Constants.js";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Logout from "./Logout";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ToastContainer, toast } from "react-toastify";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

class Users extends React.Component {
  columnsUsers = [
    { field: "email", headerName: "Email", width: 190 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "lastname", headerName: "Lastname", width: 180 },
    { field: "roles", headerName: "Role", width: 180 },
    {
      field: "edit",
      headerName: "Edit",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <EditUser id={params.getValue("id")} fetchUsers={this.fetchUsers}/>
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
          this.deleteUser(params.getValue("id"));
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

  deleteUser(userId){

    const token = "Bearer " + sessionStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(SERVER_URL + "api/users/" + userId, requestOptions)
      .then((response) => {
        if(response.status !== 200){
          toast.warn("Cannot delete user", {position: toast.POSITION.BOTTOM_LEFT}); 
        }else{
          toast.success("User deleted", {position: toast.POSITION.BOTTOM_LEFT}); 
        }
        return response.text();
      })
      .then(result => console.log(result))
      .then(res => this.fetchUsers())
      .catch(error => console.log('error', error));
  }

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
          <AddUser fetchUsers={this.fetchUsers} />
          <div style={{ height: 1000, width: "100%" }}>
            <DataGrid
              rows={this.state.users}
              columns={this.columnsUsers}
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

export default Users;
