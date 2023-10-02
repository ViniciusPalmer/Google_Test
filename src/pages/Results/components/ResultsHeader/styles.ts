import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme["gray-150"]};
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 3rem;
  }

  @media (max-width: 500px) {
    img {
      height: 1rem;
    }
  }
`;

export const GoogleImg = styled.img`
  cursor: pointer;
  @media (max-width: 500px) {
    transform: scale(1.5);
    width: auto;
    height: auto;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  width: 150px;
  height: 60px;

  img {
    max-width: 44px;
  }

  img:nth-child(2n) {
    margin-left: 1rem;
  }

  @media (max-width: 500px) {
    display: none;
  }
`;
