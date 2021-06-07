import React from 'react';
import '../App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Exercises from './Exercises';
import Users from './Users';
import RoutineByMonth from './RoutineByMonth'
import RoutineByDay from './RoutineByDay'
import Home from './Home';

class Menu extends React.Component {

  constructor(props) {
    super(props);
  
  }


  render(){
    return (
      <div className="App">
       <BrowserRouter>
          <div>
            <Switch>
              <Route path="/exercises" component={() => <Exercises/>} />
              <Route path="/users" component={() => <Users/>} />
              <Route path="/routineByMonth/:userId" component={RoutineByMonth} />
              <Route path="/routineByDay" component={RoutineByDay} />
              <Route path="" component={Home} />
            </Switch>
          </div>
        </BrowserRouter> 
      </div>
    );
  }
}

export default Menu;