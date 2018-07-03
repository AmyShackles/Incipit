import React from 'react';
import '../bulma.css';
import '../global-variables.css';
import styled from 'styled-components';
import Flashcard from './Flashcard';
import FlashcardAdder from './FlashcardAdder';

const FlashcardContainer = (props) => {
    return (
        {props.flashcards.map(flashcard => {
          return (
            <div className="column is-half">
              <Flashcard
                key = {flashcard.id}
                frontInfo = {flashcard.frontInfo}
                backInfo = {flashcard.backInfo}
              />
            </div>
          );
        })}
        </div>
    );
}
 
export default FlashcardContainer;