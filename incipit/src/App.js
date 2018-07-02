import React, { Component } from 'react';
import './components/global-variables.css';
import './components/bulma.css';
import LandingContainer from './components/LandingContainer/LandingContainer';
class App extends Component {
  render() {
    return (
      <div className="App">
        <LandingContainer />
      </div>
    );
  }
}

export default App;
