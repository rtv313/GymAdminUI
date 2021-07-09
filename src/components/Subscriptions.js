import React from "react";
import { SERVER_URL } from "./Constants.js";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import "react-table-6/react-table.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Logout from "./Logout";
import CssBaseline from "@material-ui/core/CssBaseline";
import { DataGrid } from "@material-ui/data-grid";
import AddSubscription from "./AddSubscription";


class Subscriptions extends React.Component {
  
  columnsSubscriptions = [
    { field: "normalUser", headerName: "User", width: 230 },
    { field: "coachUser", headerName: "coach", width: 230 },
    {
      field: "delete",
      disableClickEventBubbling: true,
      headerName: "Delete",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => {

        const onClick = () => {
          this.deleteExercise(params.getValue("id"));
         };
   
        return (
          <Button variant="contained" color="secondary" onClick={onClick}>
            Delete
          </Button>
        );
      },
    },
  ];

  setNormalUser = (value) => {
    value.normalUser = value.normalUser.email;
    return value;
  };

   setCoachUser = (value) => {
    value.coachUser = value.coachUser.email;
    return value;
  };

  constructor(props) {
    super(props);
    this.state = { subscriptions: [] };
  }

  componentDidMount() {
    this.fetchSubscriptions();
  }

 
  fetchSubscriptions = () => {
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

    fetch(SERVER_URL + "api/subscriptions/", requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        responseData.map(this.setNormalUser);
        responseData.map(this.setCoachUser);
        this.setState({
          subscriptions: responseData,
        });
      })
      .catch((err) => console.error(err));
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
            <Link to="/subscriptions">
              <h1>Subscriptions</h1>
            </Link>
          </Breadcrumbs>
          <h1>Subscriptions</h1>
          <AddSubscription />
          
          <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={this.state.subscriptions}
            columns={this.columnsSubscriptions}
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

export default Subscriptions;
