import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid ${props => props.theme['gray-150']};
`;

export const HeaderText = styled.h1`
    font-size: 1.5rem;
    font-weight: 100;

    @media(max-width: 400px){
        font-size: 1.0rem;
    }
`;

export const IconsContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0.5rem;
    width: 110px;
    height: 60px;

    img:nth-child(2n) {
        margin-left: 1rem;
    }
`;