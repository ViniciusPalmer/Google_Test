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
    width: 100vw;
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

    @media(max-width: 800px){
        width: 99vw;
    }
`;

export const ButtonContentModal = styled.button`
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
`;