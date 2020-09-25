import React, { Component } from "react";
import "./components/global-variables.css";
import "./components/bulma.css";
import "./App.css";
import { Route } from "react-router-dom";
import AddDeckModal from "./components/Modals/AddDeckModal";
import AddFlashcardModal from "./components/Modals/AddFlashcardModal";
import DeleteModal from './components/Modals/DeleteModal';
import EditModal from "./components/Modals/EditModal";
import LandingContainer from "./components/LandingContainer/LandingContainer";
import FlashCardPage from "./components/FlashCardPage/FlashCardPage";
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isHamburgerActive: false,
      isAddModalActive: false,
      isFlashcardModalActive: false,
      isEditModalActive: false,
      isDeleteModalActive: false,
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
/* THIS IS WHERE AMY STARTED ADDING THINGS */
componentDidMount() {
    axios.get('http://localhost:5000/api/deck')
      .then(response => {
        this.setState({
          deckPanels: response.data.decks
        })
      })
  }
  getDeck = (id) => {
    axios.get(`http://localhost:5000/api/deck/${id}`)
      .then(response => {
        this.setState({
        cardsInDeck: response.data.deck
      })
    })
  }
  makeEditModalActive = () => {
    this.setState({isEditModalActive: !this.state.isEditModalActive});
  }
  makeDeleteModalActive = () => {
    this.setState({isDeleteModalActive: !this.state.isDeleteModalActive});
  }


/*this.state.decks' structure is:
[
  {
    _id: ObjectId(""),
    cards: [
      _id: ObjectId(""),
      back: String,
      front: String,
      rating: String,
      subject: [
        ObjectId of deck
      ]
    ],
    name: String // name of deck (I think you're using 'category')
  }
] */

  /* GetDeck's being used to populate cards of a specific deck */

/* Don't know if we'll want to use this one/if we'll have time

  getAllCardsOfARating = (id, rating) => {
    axios.get(`http://localhost:5000/api/deck/${id}?rating=${rating}`)
      .then(response => {
        this.setState({
          cardsWithRating: response.data.cardsWithRating
        })
      })
  } */

  /* updateDeck is for changing the name of a deck */
  updateDeck = (id, updates) => {
    axios.put(`http://localhost:5000/api/deck/${id}`, updates)
      .then(response => {
        let deck = this.state.decks
        let editedDeck = deck.filter(card => card._id !== response.data.updatedDeck._id)
        editedDeck.unshift(response.data.updatedDeck);
        this.setState({
          decks: editedDeck
        })
      })
  }
  /* deleteDeck also deletes all cards in the deck */
  deleteDeck = (id) => {
    axios.delete(`http://localhost:5000/api/deck/${id}`)
      .then(response => {
        let sparedDecks = this.state.decks.filter(card => card._id !== response.data.deletedDeck._id)
        this.setState({
          decks: sparedDecks
        })
      })
  }
  getIndividualCard = (id, cardId) => {
    axios.get(`http://localhost:5000/api/deck/${id}/${cardId}`)
      .then(response => {
        this.setState({
          selectedCard: response.data.selectedCard
        })
      })
  }
  /* editIndividualCard can be used for editing anything -
(And by anything, I mean: front & back, front, back, rating, or subject) */
  editIndividualCard = (id, cardId, updates) => {
    axios.put(`http://localhost:5000/api/deck/${id}/${cardId}`, updates)
      .then(response => {
        let currentCards = this.state.cardsInDeck
        let editedCards = currentCards.filter(card => card._id !== response.data.updatedCard._id)
        editedCards.unshift(response.data.updatedCard)
        this.setState({
          selectedCard: response.data.updatedCard,
          cardsInDeck: editedCards
        })
      })
  }
  deleteIndividualCard = (id, cardId) => {
    axios.delete(`http://localhost:5000/api/deck/${id}/${cardId}`)
      .then(response => {
        let sparedCards = this.state.cardsInDeck.filter(card => card._id !== response.data.cardRemoved._id)
        this.setState({
          cardsInDeck: sparedCards,
          selectedCard: null
        })
      })
  }
/* addDeck is now working with back-end */
  addDeck = () => {
    const deckPanels = this.state.deckPanels;
    const deckPanel = {
      name: this.state.deckName,
      category: this.state.category
    };
    axios.post(`http://localhost:5000/api/deck/`, deckPanel)
      .then(response => {
        let newDeck = response.data.newDeck;
        deckPanels.push(newDeck);
        this.setState({ deckPanels, deckName: "", category: "" });
      })
  }
  /* Now adding flashcards goes to and from database/server */
  addFlashCard = () => {
    let id = this.state.cardsInDeck._id
    const flashcard = {
      front: this.state.frontInfo,
      back: this.state.backInfo,
      likes: 0,
      dislikes: 0,
    };
    axios.post(`http://localhost:5000/api/deck/${id}`, flashcard)
    .then(response => {
      const flashcards = this.state.cardsInDeck;
      let newCard = response.data.newCard
      flashcards.cards.unshift(newCard)
      this.setState({
        cardsInDeck: flashcards,
        backInfo: '',
        frontInfo: ''
      })
    })
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
              editModalHandler = {this.makeEditModalActive}
              deleteModalHandler = {this.makeDeleteModalActive}
              deckPanels={this.state.deckPanels}
              getDeck={this.getDeck}
              getIndividualCard = {this.getIndividualCard}
              flashcards={this.state.cardsInDeck}
            />
          )}
        />
        <AddDeckModal
          addModalActive={this.state.isAddModalActive}
          addModalHandler={this.makeAddModalActive}
          addDeckHandler={this.addDeck}
          changeHandler={this.detectChange}
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

        <EditModal 
        editState = {this.state.isEditModalActive}
        editModalHandler = {this.makeEditModalActive}
        deckName={this.state.deckName}
        getIndividualCard = {this.getIndividualCard}
        getDeck={this.getDeck}
        />
        <DeleteModal 
        deleteState = {this.state.isDeleteModalActive}
        deleteModalHandler = {this.makeDeleteModalActive}
        deckName={this.state.deckName}
        getIndividualCard = {this.getIndividualCard}
        getDeck={this.getDeck}
        id={this.state.cardsInDeck}
        />
      </div>
    );
  }
}

export default App;
