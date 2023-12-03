import styled from "styled-components";

const StyledSwitchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 42px;

  @media (max-width: 1325px) {
    width: fit-content;
    gap: 30px;
  }
`;
export default StyledSwitchBox;
