import '../App.css';
import React from 'react';
import {Link} from 'react-router-dom'
import Logout from './Logout'
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    
    return (
      <div className="App">
        <CssBaseline />
        <Container maxWidth="md">
          <Logout/>
          <Breadcrumbs>
            <Link to="/users"><h1>Users</h1></Link>
            <Link to="/exercises"><h1>Exercises</h1></Link>
          </Breadcrumbs>
        </Container>
      </div>
    );
  }
}

export default Home;