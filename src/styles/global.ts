import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:focus {
    outline: 0;
    box-shadow: 0 0 0 1px ${(props) => props.theme["gray-100"]}
}

input:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
}

body{
    background-color: ${(props) => props.theme["white"]};
    color: ${(props) => props.theme["black"]};
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
}

body, input, textarea, button {
    font: 400 1rem arial, sans-serif;
}
`;
