import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom'
import Logout from './Logout'
import Breadcrumbs from "@material-ui/core/Breadcrumbs";


class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    
    return (
      <div className="App">
        <Logout/>
        <Breadcrumbs>
          <Link to="/users"><h1>Users</h1></Link>
          <Link to="/exercises"><h1>Exercises</h1></Link>
        </Breadcrumbs>
      </div>
    );
  }
}

export default Home;