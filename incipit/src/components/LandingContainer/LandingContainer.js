import React from 'react';
import '../bulma.css';
import '../global-variables.css';
import styled from 'styled-components';

const BrandName = styled.h1`
    color: var(--brand-white);
    font-size: var(--logo-font-size);
    letter-spacing: .7rem;
    text-transform: uppercase;
`;

const CustomHeroBody = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -25%);
`;
const Subtitle = styled.h2.attrs({
    className: 'subtitle'
})`
    font-weight: 500;
`;
const CtaStartButton = styled.button.attrs({
    className: 'button is-info'
})`
    height: 60px;
    width: calc((225% / 409)*100);
    color: white;
    background: var(--brand-blue);
    border: var(--brand-blue);
    font-size: 1.5rem;

    
`;

const ConvinceText = styled.p`
    font-size: 1rem;
    margin-top: 1rem;
`;
const LandingContainer = () => {
    return (
        <div className="hero is-fullheight is-dark">
            <CustomHeroBody>
            <BrandName>Insipit</BrandName>
            <Subtitle>The only flashcard program you will ever need</Subtitle>
            <CtaStartButton>Start Your Journey</CtaStartButton>
            <ConvinceText className="small">Still not convinced... Try it out,<br/> no registration is required.</ConvinceText>
            </CustomHeroBody>
        </div>
    );
}
 
export default LandingContainer;