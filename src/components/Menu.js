import React from 'react';
import '../App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Exercises from './Exercises';
import Logout from './Logout'
import Users from './Users';

function Menu() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Logout/>
          <Link to="/"><h1>Exercises</h1></Link>{' '}
          <Link to="/users"><h1>Users</h1></Link>{' '} 
          <Switch>
            <Route exact path="/" component={Exercises} />
            <Route path="/users" component={Users} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default Menu;