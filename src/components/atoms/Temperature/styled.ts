import styled from "styled-components";

const StyledTemperature = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  height: 184px;
  
  div {
    display: flex;

    .value {
      margin-top: 24px;
      height: 142px;
      font-weight: 300;
      font-size: 150px;
    }
    .unit {
      font-weight: 300;
      font-size: 120px;
    }
  }
  p {
    font-size: 32px;
    text-align: center;
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;
export default StyledTemperature;
