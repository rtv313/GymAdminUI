import React from "react";
import {SERVER_URL} from './Constants.js';
import { Link } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import Logout from "./Logout";
import CssBaseline from "@material-ui/core/CssBaseline";

class Exercises extends React.Component {

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

    const columns = [{
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Image',
      accessor: 'imageUrl',
    }, {
      Header: 'Description',
      accessor: 'description',
    }, {
      Header: 'Video',
      accessor: 'videoUrl',
    }, {
      Header: 'Body Part',
      accessor: 'bodyPart',
    }, {
      Header: 'Edit',
      sortable: false,
      filterable: false,
      width: 100, 
      Cell: ({value, row}) => (<p>Edit</p>),
    }, {
      Header: 'Delete',
      sortable: false,
      filterable: false,
      width: 100,
      accessor: 'id',
      Cell: ({value}) => (<Button size="small" color="secondary" 
          onClick={()=>{this.onDelClick(value)}}>Delete {value}</Button>)
    }]

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
          <ReactTable data={this.state.exercises} columns={columns} filterable={true}/>
          <ToastContainer autoClose={1500} /> 
        </Container>
      </div>
      
    );
  }
}

export default Exercises;
