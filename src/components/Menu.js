import React from 'react';
import '../App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Exercises from './Exercises';
import Users from './Users';
import Subscriptions from './Subscriptions';
import RoutineByMonth from './RoutineByMonth'
import RoutineByDay from './RoutineByDay'
import Home from './Home';
import ExercisesByDay from './ExercisesByDay'


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
              <Route path="/subscriptions" component={() => <Subscriptions/>} />
              <Route path="/routineByMonth/:userId" component={RoutineByMonth} />
              <Route path="/routineByDay/:routineByMonthId/:userId" component={RoutineByDay} />
              <Route path="/exercisesByDay/:routineByDayId/:routineByMonthId/:userId" component={ExercisesByDay} />
              <Route path="" component={Home} />
            </Switch>
          </div>
        </BrowserRouter> 
      </div>
    );
  }
}

export default Menu;