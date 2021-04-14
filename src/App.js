import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu';
import Login from './components/Login';
class App extends Component {
  render() {
    return (
      <div className="App">
          <Login/>
      </div>
    );
  }
}
export default App;
