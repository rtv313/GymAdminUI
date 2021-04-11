import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class Users extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Breadcrumbs>
          <Link to=""><h1>Home</h1></Link>
          <Link to="/users"><h1>Users</h1></Link>
        </Breadcrumbs>

        <h1>Users list.js</h1>

        <TableContainer component={Paper}>
          <Table  aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><h1>User</h1></TableCell>
                <TableCell><h1>Actions</h1></TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
                <TableRow>
                  <TableCell>Usuario</TableCell>
                  <TableCell>
                    <Link to="/user/1">Edit User</Link>{' '}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Usuario</TableCell>
                  <TableCell><Link to="/user/2">Edit User</Link>{' '}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Usuario</TableCell>
                  <TableCell><Link to="/user/3">Edit User</Link>{' '}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default Users;
