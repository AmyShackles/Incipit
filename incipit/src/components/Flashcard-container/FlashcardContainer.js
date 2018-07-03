import React from "react";
import "../bulma.css";
import "../global-variables.css";
import styled from "styled-components";
import Flashcard from "./Flashcard";
import FlashcardAdder from "./FlashcardAdder";

const FlashcardContainer = props => {
  return (
    <div className="flashcard-container">
      <div className="columns is-multiline">
        {/* Changed this so that flashcards rendered only cards in selected deck */}
        {props.flashcards ? props.flashcards.cards.map(flashcard => {
          return (
            <div className="column is-half">
              <Flashcard
                key = {flashcard._id}
                frontInfo = {flashcard.front}
                backInfo = {flashcard.back}
              />
            </div>
          );
        }) : null}
        <div className="column is-half">
          <FlashcardAdder flashCardModalHandler={props.flashCardModalHandler} />
        </div>
      </div>
    </div>
  );
};

export default FlashcardContainer;
