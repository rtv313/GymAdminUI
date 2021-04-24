import React from "react";
import {SERVER_URL} from './Constants.js';
import { Link } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import "react-table-6/react-table.css" 
import 'react-toastify/dist/ReactToastify.css';
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import Logout from "./Logout";
import CssBaseline from "@material-ui/core/CssBaseline";
import { DataGrid } from "@material-ui/data-grid";

class Exercises extends React.Component {

   columnsExercises = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "imageUrl", headerName: "Image", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    { field: "videoUrl",headerName: "Video",width: 90},
    { field: "bodyPart",headerName: "Body Part",width: 190},
    { field: "edit",
      headerName: "Edit",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return <Button variant="contained" color="primary">Edit </Button>;
      }
    },
    { field: "delete",
      headerName: "Delete",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return <Button variant="contained" color="secondary">Delete </Button>;
      }
    }
  ];
  
  constructor(props) {
    super(props);
    this.state = { exercises: [] };
  }

  componentDidMount(){
    this.fetchExercises();
  }

  // Fetch all exercises
  fetchExercises = () => {
    // Read the token from the session storage
    // and include it to Authorization header
    const token = "Bearer " + sessionStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization",token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(SERVER_URL + 'api/exercises/',requestOptions)
    .then((response) => response.json()) 
    .then((responseData) => { 
      this.setState({ 
        exercises: responseData,
      }); 
    }).catch(err => console.error(err)); 
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
          <Link to="/exercises">
            <h1>Exercises</h1>
          </Link>
        </Breadcrumbs>
        <h1>Exercises</h1>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={this.state.exercises} columns={this.columnsExercises} pageSize={15} />
          </div>
        </Container>
        <br/>
      </div>
    );
  }
}

export default Exercises;