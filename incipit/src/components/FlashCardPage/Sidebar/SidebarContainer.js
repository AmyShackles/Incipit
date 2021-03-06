import React from "react";
import "../../global-variables.css";
import styled from "styled-components";
import "../../bulma.css";

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 112px 64px;
  width: 80%;
  max-width: 400px;
  background: var(--light-grey);
  z-index: 1;
`;

const SearchBar = styled.input.attrs({
  type: "text",
  className: "input is-large",
  placeholder: "Search"
})`
  background: var(--search-bar-bg);
  color: var(--sidebar-font-color);
  border: none;
  &::-webkit-input-placeholder {
    color: var(--sidebar-font-color);
  }
`;

const AddButton = styled.button.attrs({
  className: "button is-info is-large"
})`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  color: white;
  border: var(--brand-blue);
  font-size: var(--general-font-size);
  margin-top: 1.6rem;
`;
const DeckContainer = styled.div`
  margin-top: 1.6rem;
  width: 100%;
`;
const DeckPanel = styled.button.attrs({
  className: "button is-large"
})`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 1.6rem;
  color: var(--sidebar-font-color);
  background: var(--brand-white);
`;

const SidebarContainer = props => {
  return (
    <SidebarWrapper className={`${props.isHamburgerActive ? "" : "is-hidden"}`}>
      <div className="control has-icons-left has-icons-right">
        <SearchBar />
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>
      </div>
      <AddButton onClick = {props.addModalHandler}>Add New Deck</AddButton>
      <DeckContainer>
      {props.deckPanels.map(panel => {
        return <DeckPanel key = {panel._id} onClick={() => props.getDeck(panel._id)}>{panel.name}</DeckPanel>
      }
      )}
      </DeckContainer>
    </SidebarWrapper>
  );
};

export default SidebarContainer;
