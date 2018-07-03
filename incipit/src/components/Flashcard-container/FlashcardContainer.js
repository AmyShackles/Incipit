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
        {props.flashcards.map(flashcard => {
          return (
            <div className="column is-half">
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
        })}
        <div className="column is-half">
          <FlashcardAdder flashCardModalHandler={props.flashCardModalHandler} />
        </div>
        
      </div>
    </div>
  );
};

export default FlashcardContainer;
