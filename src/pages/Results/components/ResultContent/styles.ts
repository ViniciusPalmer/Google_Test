import styled from "styled-components";

export const ResultCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    max-width: 30vw;
    padding: 2rem;
    border: 1px solid ${props => props.theme['gray-150']};

    img{
        width: 100%;
        margin-bottom: 1rem;
    }

    @media(max-width: 800px){
        max-width: 100%;
        width:80vw;
        padding: 1rem;
    }
`;

export const SpanContent = styled.span`
    pointer-events: none
    font-size: 0.6rem;
    color: ${props => props.theme['gray-300']};
    margin-bottom: 0.5rem;
    max-width: 90%
`;

export const TittleText = styled.a`
    font-size: 1.5rem;
    color: ${props => props.theme['blue-300']};
    margin-bottom: 1rem;

    &:hover{
        filter: brightness(0.6);
        transition-duration: 0.3s;
    };
`;

