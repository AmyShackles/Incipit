import React from 'react';
import '../bulma.css';
import '../global-variables.css';
import styled from 'styled-components';

const BrandName = styled.h1`
    color: var(--brand-white);
    font-size: var(--logo-font-size);
    letter-spacing: .7rem;
    text-transform: uppercase;
    @media (max-width:  650px) {
        font-size: 6rem;
   }     
    
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
    width: 100%;
    font-size: var(--general-font-size);
    
`;
const Subtitle = styled.h2.attrs({
    className: 'subtitle'
})`
    font-weight: 500;
    font-size: var(--general-font-size);
    @media (max-width:  650px) {
        padding: 0 calc((24% / 650px)*100);
        text-align: center;
   }     

`;
const CtaStartButton = styled.button.attrs({
    className: 'button is-info'
})`
    height: 60px;
    width: 225px;
    color: white;
    background: var(--brand-blue);
    border: var(--brand-blue);
    font-size: var(--general-font-size);
    margin-top: 1.6rem;

`;

const ConvinceText = styled.p`
    margin-top: 1.6rem;
    font-size: 1.6rem;
    line-height: 150%;
`;
const LandingContainer = () => {
    return (
        <div className="hero is-fullheight is-dark">
            <CustomHeroBody>
            <BrandName>Insipit</BrandName>
            <Subtitle>The only flashcard program you will ever need.</Subtitle>
            <CtaStartButton>Start Your Journey</CtaStartButton>
            <ConvinceText className="small">Still not convinced... Try it out,<br/> no registration is required.</ConvinceText>
            </CustomHeroBody>
        </div>
    );
}
 
export default LandingContainer;