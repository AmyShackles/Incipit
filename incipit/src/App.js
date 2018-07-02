import React, { Component } from 'react';
import './components/global-variables.css';
import './components/bulma.css';
import { Route } from 'react-router-dom';
import LandingContainer from './components/LandingContainer/LandingContainer';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={LandingContainer} />
      </div>
    );
  }
}

export default App;
