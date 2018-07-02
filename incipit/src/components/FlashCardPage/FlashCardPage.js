import React from "react";
import NavbarContainer from "./Navbar/NavbarContainer";
import "../bulma.css";
import styled from "styled-components";

const PageWrapper = styled.div`
  max-width: 1440px;
  width: 95%;
  margin: 0 auto;
`;
const FlashCardPage = () => {
  return (
    <div className="hero is-dark is-fullheight">
      <PageWrapper>
        <NavbarContainer />
      </PageWrapper>
    </div>
  );
};

export default FlashCardPage;
