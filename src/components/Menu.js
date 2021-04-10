import React from 'react';
import '../App.css';
import { Router,BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Exercises from './Exercises';
import Logout from './Logout'
import Users from './Users';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = { links: [] };
  }

  fillData = () => {
    console.info("You clicked a breadcrumb.");
    for (var i = 0; i < 3; i++) {
      this.state.links.push(
        <Link color="inherit" href="/">
          <a href="#">{i + 1}</a>
        </Link>
      );
      this.setState({ links: this.state.links });
    }
  };

  render(){
    
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Logout/>
            <p>###############################################</p>
            <button type="button" onClick={this.fillData}>
              Fill Data
            </button>
            <Link to="/"><h1>Exercises</h1></Link>{' '}
            <Link to="/users"><h1>Users</h1></Link>{' '} 
            <Breadcrumbs aria-label="breadcrumb">{this.state.links}</Breadcrumbs>
            <p>###############################################</p>

            <Switch>
              <Route exact path="/" component={() => <Exercises parentCallback = {this.fillData} />} />
              <Route path="/users" component={Users} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>

          </div>
        </BrowserRouter> 
      </div>
    );
  }
}

export default Menu;