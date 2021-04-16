import React from "react";
import {SERVER_URL} from './Constants.js';
import { Link } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
        exercises: responseData._embedded.exercises,
      }); 
    }).catch(err => console.error(err)); 
  }

  render() {

    const columns = [{
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Image',
      accessor: 'image',
    }, {
      Header: 'Description',
      accessor: 'description',
    }, {
      Header: 'Video',
      accessor: 'video',
    }, {
      Header: 'Body Part',
      accessor: 'bodyPart',
    }, {
      Header: 'Edit',
      sortable: false,
      filterable: false,
      width: 100, 
      accessor: 'edit',
      Cell: ({value, row}) => (<p>Edit</p>),
    }, {
      Header: 'Delete',
      sortable: false,
      filterable: false,
      width: 100,
      accessor: 'delete',
      Cell: ({value}) => (<Button size="small" color="secondary" 
          onClick={()=>{this.onDelClick(value)}}>Delete</Button>)
    }]

    return (
      <div>
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
      </div>
    );
  }
}

export default Exercises;
