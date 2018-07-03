import React from "react";
import NavbarContainer from "./Navbar/NavbarContainer";
import SidebarContainer from "./Sidebar/SidebarContainer";
import FlashcardContainer from "./../Flashcard-container/FlashcardContainer";
import "../bulma.css";
import styled from "styled-components";

const PageWrapper = styled.div`
  max-width: 1440px;
  width: 95%;
  margin: 0 auto;
`;

const FlashCardPage = (props) => {
  return (
    <div className="hero is-dark is-fullheight">
      <PageWrapper>
        <NavbarContainer
        isHamburgerActive = {props.isHamburgerActive}
        hamburgerHandler = {props.hamburgerHandler} />
        
        <SidebarContainer 
        isHamburgerActive = {props.isHamburgerActive} 
        addModalHandler = {props.addModalHandler}
        deckPanels = {props.deckPanels}
        getDeck= {props.getDeck}
        />
      <FlashcardContainer
      addFlashCardHandler = {props.addFlashCardHandler}
      flashCardModalHandler = {props.flashCardModalHandler}
      deckPanels = {props.deckPanels}
      flashcards = {props.flashcards} 
      />
      </PageWrapper>
    </div>
  );
};

export default FlashCardPage;
