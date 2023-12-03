import styled from "styled-components";

const StyledSwitchBox = styled.div`
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 1325px) {
    margin-bottom: 50px;
    flex-direction: row;
    gap: 25px;
  }
`;
export default StyledSwitchBox;
