import styled from "styled-components";

export const FooterContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    background-color: ${props => props.theme['gray-050']};
    position: fixed;
    bottom: 0px;
`;

export const FooterText = styled.label`
    font-size: 1rem;
    color: ${props => props.theme['gray-300']};;
`;
