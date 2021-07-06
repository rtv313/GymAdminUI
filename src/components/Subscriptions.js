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
import AddExercise from "./AddExercise";


class Subscriptions extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = { exercises: [] };
  }

  componentDidMount() {
  
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
          <div style={{ height: 400, width: "100%" }}>
            
           
          </div>
        </Container>
        <br />
        <ToastContainer autoClose={1500} /> 
      </div>
    );
  }
}

export default Subscriptions;
