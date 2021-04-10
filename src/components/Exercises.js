import React from 'react';
import Users from './Users';
import { Router,BrowserRouter, Switch, Route, Link } from 'react-router-dom'

class Exercises extends React.Component{

  callParent = () => {
    this.props.parentCallback();
  };

  render(){
    return (
      <div>
        <button type="button" onClick={this.callParent}>
          Call Parent
        </button>
        <h1>Exercises.js</h1>
        <Link to="/users"><h1>click users</h1></Link>{' '}
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default Exercises;