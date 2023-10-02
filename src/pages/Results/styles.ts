import styled from "styled-components";
import ReactPaginate from "react-paginate";

export const ResultContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const ResultMainContent = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const StyledReactPaginate = styled(ReactPaginate)`
  display: flex;
  flex-wrap: nowrap;
  font-size: larger;
  color: black;
  cursor: pointer;
  margin-top: 15px;

  .selected {
    background: ${(props) => props.theme["gray-100"]};
    border: 1px solid ${(props) => props.theme["gray-100"]};
    font-weight: bold;
  }

  li {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${(props) => props.theme["gray-100"]};
    margin: 0px 10px;

    &:hover {
      background: ${(props) => props.theme["gray-100"]};
      transition: 1s;
    }
  }

  list-style-type: none;
`;

export const ResultData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100vw;
  height: 100%;
  padding: 1.5rem;
  cursor: pointer;
  overflow: scroll;
  overflow-x: hidden;
`;

export const SearchResult = styled.div`
  width: 55vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 1500px) {
    margin-right: 3rem;
  }

  @media (max-width: 800px) {
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
