import styled from "styled-components";

export const CellContainer = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: ${props =>
    !props.active ? "rgba(15, 15, 15, 0.4)" : "black"};
  border: solid 0.2px black;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;
