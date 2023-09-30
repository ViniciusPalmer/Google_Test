import styled from "styled-components";

export const SearchContainer = styled.form`
    width: 100%;
    display:flex;
    align-items: center;   
    min-height: 44px;
    background: ${props => props.theme['white']};
    border: 1px solid transparent;
    box-shadow: 0 2px 5px 1px ${props => props.theme['searchBar-shadow']};
    border-radius: 24px;
    margin: 0 1.5rem;
    padding: 0 1rem;

    button{
        background: ${props => props.theme['white']};
        border: none;
        padding: 0;
        margin: 0;
    }

    input{
        width: 100%;
        margin: 0px;
        height: 100%;
        padding: 0px;
        border: none;

        font-size: 2rem;
    }

    img{
        width: 1.2rem;

        &:first-child{
            margin-right: 0.2rem;
        };

        &:hover{
            cursor: pointer;
            transform: scale(1.2);
            transition-duration: 0.4s;
        }
    }
`;