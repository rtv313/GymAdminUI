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
import { DataGrid } from "@material-ui/data-grid";





class Exercises extends React.Component {

  handleClick = () => {
    return alert("Hola mundo");
  }

   columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "age",headerName: "Age",type: "number",width: 90},
    { field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>`${params.getValue("firstName") || ""} ${params.getValue("lastName") || ""}`,
      renderCell: (params) => {
        return <Button variant="contained" color="primary" onClick={this.handleClick}>Click {params.getValue("firstName")}</Button>;
      }
    }
  ];
  
   rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 }
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
      accessor: 'id', 
      Cell: ({value, row}) => (<p>Edit {value}</p>),
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

          <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={this.rows} columns={this.columns} pageSize={5} 
            filterModel={{
              items: [
                { columnField: 'lastName', operatorValue: 'contains', value: 'Snow' },
              ],
            }}/>
          </div>
        </Container>
        <br/>

      
      </div>
      
    );
  }
}

export default Exercises;
