import React from 'react';
import {Link} from 'react-router-dom'
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

class Exercises extends React.Component{

  callParent = () => {
    this.props.parentCallback("/users","Users");
  };

  render(){
    return (
      <div>
         <Breadcrumbs>
          <Link to=""><h1>Home</h1></Link>
          <Link to="/exercises"><h1>Exercises</h1></Link>
         </Breadcrumbs>

        <h1>Exercises.js</h1>
      </div>
    );
  }
}

export default Exercises;