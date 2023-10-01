import styled from "styled-components";

export const SearchContainer = styled.form`
    width: 100%;
    display:flex;
    align-items: center;   
    justify-content: center;
    min-height: 44px;
    background: ${props => props.theme['white']};
    border: 1px solid transparent;
    box-shadow: 0 2px 5px 1px ${props => props.theme['searchBar-shadow']};
    border-radius: 24px;
    margin: 0 1.5rem;
    padding: 0 1rem;

    @media(min-width: 700px){
        min-width: 25rem;
    }

    button{
        background: ${props => props.theme['white']};
        border: none;
        padding: 0;
        margin: 0;
    }

    input{
        width: 100%;
        margin: 0 0.8rem 0 0;
        height: 100%;
        padding: 0px;
        border: none;

        font-size: 1rem;
    }

    img{
        width: 1rem;

        &:first-child{
            margin-right: 0.8rem;
        };

        &:hover{
            cursor: pointer;
            transform: scale(1.2);
            transition-duration: 0.4s;
        }
    }
`;