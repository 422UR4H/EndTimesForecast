import styled from "styled-components";

const StyledLine = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryBackground};
  max-width: 395px;
  width: 100%;
  height: 5px;

  @media (max-width: 1325px) {
    margin-bottom: 50px;
  }
`;
export default StyledLine;
