import React from 'react';
import '../bulma.css';
import '../global-variables.css';
import styled from 'styled-components';

const FlashcardRectangle = styled.div.attrs({
    className: 'box'
})`
    height: 200px;
`;

const Flashcard = (props) => {
    return (
        <div className = 'box'>
            
        </div>
    );
}
 
export default Flashcard;