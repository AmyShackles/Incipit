import React from 'react';
import '../bulma.css';
import '../global-variables.css';
import styled from 'styled-components';

const FlashcardContainer = styled.div`

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 350px;
background: var(--grey);
cursor: pointer;
color: var(--brand-white);

`;

const Plus = styled.h2`
    font-size: 9.6rem;

`;
const FlashCardAdder = (props) => {
    return (
        <FlashcardContainer className='box' onClick = {() => {
            props.flashCardModalHandler();
            }}>
            <Plus>+</Plus>
            <p>Add a new card</p>
        </FlashcardContainer>
    )
}
 
export default FlashCardAdder;