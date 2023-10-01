import styled from "styled-components";

export const HomeContainer = styled.div`
    width:100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const HomeContent = styled.div`
    width: 40vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media(max-width: 1000px){
        width: 80vw;
    }
`;

export const GoogleImg = styled.img `
    width: 75%;
    margin-bottom: 1.5rem;
`;