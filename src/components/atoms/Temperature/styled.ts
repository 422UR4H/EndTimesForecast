import styled from "styled-components";

type StyledTemperatureProps = {
  $color: string;
};

const StyledTemperature = styled.div<StyledTemperatureProps>`
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
      filter: drop-shadow(0 0 1rem ${({ $color }) => $color});
    }
  }
  p {
    font-size: 32px;
    text-align: center;

    color: ${({ theme }) => theme.colors.primaryText};
  }

  @media (max-width: 685px) {
    width: 70dvw;
    height: 30dvw;

    div {
      width: 70dvw;
      font-size: 22dvw;

      sup {
        font-size: 18dvw;
      }
      img {
        width: 50%;
        height: 50%;
      }
    }
  }
`;
export default StyledTemperature;
