import React, { Component } from 'react';
import './components/global-variables.css';
import './components/bulma.css';
import './App.css';
import { Route } from 'react-router-dom';
import LandingContainer from './components/LandingContainer/LandingContainer';
import FlashCardPage from './components/FlashCardPage/FlashCardPage';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={LandingContainer} />
        <Route exact path='/flashcard-app' component={FlashCardPage} />
      </div>
    );
  }
}

export default App;
