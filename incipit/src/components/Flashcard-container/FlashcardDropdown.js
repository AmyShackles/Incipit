import React from "react";
import "../bulma.css";
import "../global-variables.css";
import styled from "styled-components";

const Dropdown = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
const DropdownItem = styled.div.attrs({
    className: 'dropdown-item'
})`
&:hover {
    background: var(--light-grey);
}
`;
const FlashcardDropdown = props => {
  return (
    <Dropdown>
      <div
        className={`dropdown is-right ${
          props.dropdownActive ? "is-active" : ""
        }`}
        onClick={e => {
          props.dropdownHandler();
          e.stopPropagation();
        }}
      >
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu6"
          >
            <span>Options</span>
            <span className="icon is-large">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu6" role="menu">
          <div className="dropdown-content">
            <DropdownItem className="dropdown-item">Edit</DropdownItem>
            <hr className="dropdown-divider" />
            <DropdownItem className="dropdown-item">Delete</DropdownItem>
          </div>
        </div>
      </div>
    </Dropdown>
  );
};

export default FlashcardDropdown;
