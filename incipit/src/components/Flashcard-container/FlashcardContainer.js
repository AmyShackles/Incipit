import React from "react";
import "../bulma.css";
import "../global-variables.css";
import styled from "styled-components";
import Flashcard from "./Flashcard";
import FlashcardAdder from "./FlashcardAdder";

let subject = ''
const FlashcardContainer = props => {
  return (
    <div className="flashcard-container">
      <div className="columns is-multiline">
        {/* Changed this so that flashcards rendered only cards in selected deck */}
        {props.flashcards ? props.flashcards.cards.map(flashcard => {
          subject = flashcard._id
          return (
            <div className="column is-half" key={flashcard._id}>
              <Flashcard
                key = {flashcard.id}
                frontInfo = {flashcard.frontInfo}
                backInfo = {flashcard.backInfo}
                makeModalActive = {props.makeModalActive}
                editModalHandler = {props.editModalHandler}
                deleteModalHandler = {props.deleteModalHandler}
              />
            </div>
          );
        }) : null}
        <div className="column is-half">
          <FlashcardAdder subject={subject} flashCardModalHandler={props.flashCardModalHandler} />
        </div>
      </div>
    </div>
  );
};

export default FlashcardContainer;
