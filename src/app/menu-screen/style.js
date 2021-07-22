import styled from "styled-components";

export const MenuScreenContainer = styled.div`
  width: 599.99px;
  height: 599.99px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 51.2%;
  left: 50%;
  background-color: rgba(15, 15, 15, 0.7);
  .title {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    color: white;
    z-index: 100;
    font-size: 30px;
  }
  .result {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 10%;
    left: 50%;
    color: red;
    z-index: 100;
    font-size: 30px;
  }
`;
