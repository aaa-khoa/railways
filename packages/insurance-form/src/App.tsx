import React, { Component } from 'react';
import './App.css';
import { NameForm } from './name/NameForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Railways</h1>
        <NameForm />
        <p>------Other Components-------</p>
        Last name <input type="text" value="some last name" />
        <p>some tooltip</p>
        <button>Submit All</button>
      </div>
    );
  }
}

export default App;
