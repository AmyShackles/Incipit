import React, { Component } from "react";
import "../bulma.css";
import "../global-variables.css";
import styled from "styled-components";
import './FlashcardDropdown';
import FlashcardDropdown from "./FlashcardDropdown";
const FlashcardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 350px;
  cursor: pointer;
  color: var(--brand-white);
  perspective: 600px;
`;
const Card = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: -1;

  transition: transform 1s;
  transform-style: preserve-3d;
  &.is-flipped {
    transform: rotateX(180deg);
  }
`;
const CardFront = styled.div`
  padding: 24px;
  position: absolute;
  height: 100%;
  width: 100%;
  background: var(--grey);
  backface-visibility: hidden;
`;
const CardBack = styled.div`
  padding: 24px;
  height: 100%;
  width: 100%;

  background: var(--grey);
  backface-visibility: hidden;
  transform: rotateX(180deg);
`;
class Flashcard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
      dropdownActive1: false,
      dropdownActive2: false,
    };
  }
  makeDropdownActive1 = () => {
    this.setState({ dropdownActive1: !this.state.dropdownActive1});
  }
  makeDropdownActive2 = () => {
    this.setState({ dropdownActive2: !this.state.dropdownActive2});
  }
  render() {
    return (
      <FlashcardContainer onClick={(e) => {
          this.setState({ isFlipped: !this.state.isFlipped });

        }}>
        <Card className={`${this.state.isFlipped ? "is-flipped" : ""}`}>
          <CardFront>
            {this.props.frontInfo}
            <FlashcardDropdown 
            dropdownActive = {this.state.dropdownActive1}
            dropdownHandler = {this.makeDropdownActive1}
            editModalHandler = {this.props.editModalHandler}
            deleteModalHandler = {this.props.deleteModalHandler}
            />
          </CardFront>
          <CardBack>{this.props.backInfo}
          <FlashcardDropdown 
            dropdownActive = {this.state.dropdownActive2}
            dropdownHandler = {this.makeDropdownActive2}
            editModalHandler = {this.props.editModalHandler}
            deleteModalHandler = {this.props.deleteModalHandler}
            />

          </CardBack>
          
        </Card>

      </FlashcardContainer>

    );
  }
}

export default Flashcard;
