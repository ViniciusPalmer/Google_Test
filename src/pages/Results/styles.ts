import styled from "styled-components";

export const ResultContainer = styled.div`
    width:100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export const ResultData = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    cursor: pointer;
    `;

export const SearchResult = styled.div`
    width: 55vw;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media(min-width: 1500px){
        margin-right: 3rem;
    }
`;