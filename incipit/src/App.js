import React, { Component } from 'react';
import './components/global-variables.css';
import './components/bulma.css';
import './App.css';
import { Route } from 'react-router-dom';
import AddDeckModal from './components/Modals/AddDeckModal';
import LandingContainer from './components/LandingContainer/LandingContainer';
import FlashCardPage from './components/FlashCardPage/FlashCardPage';
class App extends Component {
  constructor() {
    super();
    this.state ={
      isHamburgerActive: false,
      isAddModalActive: false,
      deckName: '',
      deckPanels: []
    };
  }
  makeHamburgerActive = () => {
    this.setState({isHamburgerActive: !this.state.isHamburgerActive});
  }
  makeAddModalActive = () => {
    this.setState({isAddModalActive: !this.state.isAddModalActive });
  }

  addDeck = () => {
    const deckPanels = this.state.deckPanels;
    const deckPanel = { name: this.state.deckName, id: Date.now()}
    deckPanels.push(deckPanel);

    this.setState({ deckPanels, deckName: '' });
  }
  detectChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={LandingContainer} />


        <Route exact path='/flashcard-app' render={props => <FlashCardPage {...props} 
        isHamburgerActive = {this.state.isHamburgerActive}
        hamburgerHandler = {this.makeHamburgerActive}
        addModalHandler = {this.makeAddModalActive}
        deckPanels = {this.state.deckPanels}
        />}
        />



        <AddDeckModal addModalActive = {this.state.isAddModalActive}
        addModalHandler={this.makeAddModalActive}
        addDeckHandler = {this.addDeck}
        changeHandler = {this.detectChange}
        addDeckHandler = {this.addDeck}
        deckName = {this.state.deckName}/>
        

      </div>
    );
  }
}

export default App;
