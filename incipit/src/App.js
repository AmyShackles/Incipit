import React, { Component } from "react";
import "./components/global-variables.css";
import "./components/bulma.css";
import "./App.css";
import { Route } from "react-router-dom";
import AddDeckModal from "./components/Modals/AddDeckModal";
import AddFlashcardModal from "./components/Modals/AddFlashcardModal";
import LandingContainer from "./components/LandingContainer/LandingContainer";
import FlashCardPage from "./components/FlashCardPage/FlashCardPage";
class App extends Component {
  constructor() {
    super();
    this.state = {
      isHamburgerActive: false,
      isAddModalActive: false,
      isFlashcardModalActive: false,

      deckName: "",
      deckPanels: [],
      flashcards: [{
        frontInfo: 'front',
        backInfo: 'back',
        likes: 0,
        dislikes: 0,
        id: Date.now()
      }],
      frontInfo: "",
      backInfo: ""
    };
  }
  makeHamburgerActive = () => {
    this.setState({ isHamburgerActive: !this.state.isHamburgerActive });
  };
  makeAddModalActive = () => {
    this.setState({ isAddModalActive: !this.state.isAddModalActive });
  };
  makeFlashcardModalActive = () => {
    this.setState({
      isFlashcardModalActive: !this.state.isFlashcardModalActive
    });
  };

  addDeck = () => {
    const deckPanels = this.state.deckPanels;
    const deckPanel = {
      name: this.state.deckName,
      id: Date.now(),
      category: "public"
    };
    deckPanels.push(deckPanel);

    this.setState({ deckPanels, deckName: "" });
  };
  addFlashCard = () => {
    console.log("add");
    const flashcards = this.state.flashcards;
    const flashcard = {
      frontInfo: this.state.frontInfo,
      backInfo: this.state.backInfo,
      likes: 0,
      dislikes: 0,
      id: Date.now()
    };
    flashcards.push(flashcard);

    this.setState({ flashcards });
  };
  detectChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingContainer} />

        <Route
          exact
          path="/flashcard-app"
          render={props => (
            <FlashCardPage
              {...props}
              isHamburgerActive={this.state.isHamburgerActive}
              hamburgerHandler={this.makeHamburgerActive}
              addModalHandler={this.makeAddModalActive}
              flashCardModalHandler={this.makeFlashcardModalActive}
              flashcards={this.state.flashcards}
              deckPanels={this.state.deckPanels}
            />
          )}
        />
        <AddDeckModal
          addModalActive={this.state.isAddModalActive}
          addModalHandler={this.makeAddModalActive}
          addDeckHandler={this.addDeck}
          changeHandler={this.detectChange}
          addDeckHandler={this.addDeck}
          deckName={this.state.deckName}
        />
        <AddFlashcardModal
          flashCardModalActive={this.state.isFlashcardModalActive}
          flashCardModalHandler={this.makeFlashcardModalActive}
          addFlashCardHandler={this.addFlashCard}
          changeHandler={this.detectChange}
          frontInfo={this.state.frontInfo}
          backInfo={this.state.backInfo}
        />

      </div>
    );
  }
}

export default App;
