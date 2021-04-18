import "../App.css";
import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Container>
          <Logout />
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                App Modules
              </ListSubheader>
            }
          >
            <Link to="/users">
              <ListItem button>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            </Link>

            <Link to="/exercises">
              <ListItem button>
                <ListItemIcon>
                  <DirectionsRunIcon />
                </ListItemIcon>
                <ListItemText primary="Exercises" />
              </ListItem>
            </Link>
          </List>
        </Container>
      </div>
    );
  }
}

export default Home;
