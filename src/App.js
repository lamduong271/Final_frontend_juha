import React, { Component } from 'react';
import CustomerList from './components/CustomerList';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Customer List</h1>
          <div class="login">
          <a href="#">Login</a>
          <a href="#">Sign up</a>
          </div>
        </header>
        <CustomerList />
      </div>
    );
  }
}

export default App;
