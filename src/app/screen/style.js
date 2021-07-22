import styled from "styled-components";

export const ScreenContainer = styled.div`
  position: relative;
  width: 100&;
  height: 100vh;
  .screen {
    width: 599.99px;
    height: 599.99px;
    border: 2px solid black;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    line-height: 0px;
  }
`;
