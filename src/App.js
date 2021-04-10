import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Menu from './components/Menu';
class App extends Component {
  render() {
    return (
      <div className="App">
          <Menu/>
      </div>
    );
  }
}
export default App;
