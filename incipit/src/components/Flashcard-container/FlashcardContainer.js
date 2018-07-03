import React from 'react';
import '../bulma.css';
import '../global-variables.css';
import styled from 'styled-components';
import Flashcard from './Flashcard';
import FlashcardAdder from './FlashcardAdder';

const FlashcardContainer = (props) => {
    return (
        <div className = 'flashcard-container'>
        <Flashcard />
        <FlashcardAdder />
        </div>
    );
}
 
export default FlashcardContainer;