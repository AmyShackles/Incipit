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
      flashcards: [],
      frontInfo: "",
      backInfo: "",
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
    const deckPanel = { name: this.state.deckName, id: Date.now(), category: 'public'}
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
        <AddFlashcardModal 
        flashCardModalActive = {this.state.isFlashcardModalActive}
        changeHandler = {this.detectChange}
        frontInfo = {this.state.frontInfo}
        backInfo = {this.state.backInfo} />
      </div>
    );
  }
}

export default App;
