import React, { Component } from 'react';
import './components/global-variables.css';
import './components/bulma.css';
import './App.css';
import { Route } from 'react-router-dom';
import LandingContainer from './components/LandingContainer/LandingContainer';
import FlashCardPage from './components/FlashCardPage/FlashCardPage';
class App extends Component {
  constructor() {
    super();
    this.state ={
      isHamburgerActive: false,
    };
  }
  makeHamburgerActive = () => {
    this.setState({isHamburgerActive: !this.state.isHamburgerActive});
  }
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={LandingContainer} />
        <Route exact path='/flashcard-app' render={props => <FlashCardPage {...props} 
        isHamburgerActive = {this.state.isHamburgerActive}
        hamburgerHandler = {this.makeHamburgerActive} />}/>

      </div>
    );
  }
}

export default App;
