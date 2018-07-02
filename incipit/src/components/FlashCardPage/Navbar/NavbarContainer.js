import React from 'react';
import '../../global-variables.css';
import styled from 'styled-components';
import '../../bulma.css';

const NavbarWrapper = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
padding: 24px;
background: #24292c6b;
border-bottom-left-radius: 6px;
border-bottom-right-radius: 6px;
`;
const Title = styled.h1`
    text-transform: uppercase;
    font-size: 5rem;
    letter-spacing: .7rem;
`;
const Hamburger = styled.i`
    font-size: 4.4rem;
    cursor: pointer;

`;
const NavbarContainer = (props) => {
    return (
        <NavbarWrapper>
            <Title>Deck title</Title>
        <Hamburger className = {`fa ${props.isHamburgerActive ? 'fa-times' : 'fa-bars'}`}
        onClick = {props.hamburgerHandler}></Hamburger>

        </NavbarWrapper>        
    )
}
 
export default NavbarContainer;