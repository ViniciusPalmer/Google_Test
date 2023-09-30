import styled from "styled-components";

export const ResultCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 200px;
    align-items: flex-start;
    margin-bottom: 1.8rem;
`;

export const URLText = styled.span`
    pointer-events: none
    font-size: 0.6rem;
    color: ${props => props.theme['gray-300']};
    margin-bottom: 0.5rem;
`;

export const LinkText = styled.a`
    font-size: 1.5rem;
    color: ${props => props.theme['blue-300']};
    margin-bottom: 0.7rem;

    &:hover{
        filter: brightness(0.6);
        transition-duration: 0.3s;
    };
`;

export const DescriptionText = styled.a`
    font-size: 1.0rem;
    color: ${props => props.theme['gray-300']};
    margin-bottom: 0.7rem;

    &:hover{
        filter: brightness(0.6);
        transition-duration: 0.3s;
    };
`;