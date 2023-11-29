import styled from "styled-components";

const StyledTemperature = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  height: 184px;

  div {
    font-size: 150px;
    font-weight: 300;
    display: flex;

    sup {
      font-size: 120px;
    }
    img {
      width: 150px;
      height: 150px;
    }
  }
  p {
    font-size: 32px;
    text-align: center;

    color: ${({ theme }) => theme.colors.primaryText};
  }
`;
export default StyledTemperature;
