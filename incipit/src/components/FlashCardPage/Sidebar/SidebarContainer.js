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
  z-index: 0;
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
    className: 'button is-info is-large'
})`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    color: white;
    border: var(--brand-blue);
    font-size: var(--general-font-size);
    margin-top: 1.6rem;
`;

const SidebarContainer = props => {
  return (
    <SidebarWrapper className={`${props.isHamburgerActive ? "" : "is-hidden"}`}>
        <div class="control has-icons-left has-icons-right">
        <SearchBar />
          <span class="icon is-left">
            <i class="fas fa-search" />
          </span>
        </div>
        <AddButton>Add New Deck</AddButton>
    </SidebarWrapper>
  );
};

export default SidebarContainer;
