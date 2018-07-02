import React from 'react';
import '../../global-variables.css';
import styled from 'styled-components';
import '../../bulma.css';

const SidebarWrapper = styled.div`

    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 80%;
    max-width: 400px;
    background: var(--light-grey);
    z-index: 0;
`;
const SidebarContainer = (props) => {
    return (
        <SidebarWrapper className = {`${props.isHamburgerActive ? '' : 'is-hidden'}`}>
        </SidebarWrapper>
    );
}
 
export default SidebarContainer;