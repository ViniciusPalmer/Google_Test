import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";

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
    color: ${(props) => props.theme["gray-300"]};
    margin-bottom: 0.5rem;
`;

export const LinkButton = styled.button`
  font-size: 1.5rem;
  color: ${(props) => props.theme["blue-300"]};
  margin-bottom: 0.7rem;
  background: transparent;
  border: none;

  cursor: pointer;

  &:hover {
    filter: brightness(0.6);
    transition-duration: 0.3s;
  }
`;

export const DescriptionText = styled.a`
  font-size: 1rem;
  color: ${(props) => props.theme["gray-300"]};
  margin-bottom: 0.7rem;

  &:hover {
    filter: brightness(0.6);
    transition-duration: 0.3s;
  }
`;

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: ${(props) => props.theme["translucid-black"]};
`;

export const Content = styled(Dialog.Content)`
  min-width: 32px;
  border-radius: 6px;
  background: ${(props) => props.theme["gray-100"]};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
