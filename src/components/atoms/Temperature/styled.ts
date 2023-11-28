import styled from "styled-components";

const StyledTemperature = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  height: 184px;

  div {
    display: flex;

    .value {
      font-weight: 300;
      font-size: 150px;

      height: 142px;
      margin-top: 24px;
    }
    .unit {
      font-weight: 300;
      font-size: 120px;
    }
    img {
      width: 150px;
      height: 150px;
      margin-top: -24px;
    }
  }
  p {
    font-size: 32px;
    text-align: center;

    color: ${({ theme }) => theme.colors.primaryText};
  }
`;
export default StyledTemperature;
