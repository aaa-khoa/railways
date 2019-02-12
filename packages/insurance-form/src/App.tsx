import React, { Component } from 'react';
import './App.css';
import { NameForm } from './name/NameForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NameForm />
      </div>
    );
  }
}

export default App;
