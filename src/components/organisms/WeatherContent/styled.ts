import styled from "styled-components";

const StyledWeatherContent = styled.div`
  width: 100%;
  max-width: 1100px;

  & > div {
    width: 100%;
    height: 410px;

    display: grid;
    grid-template-columns: auto auto;
    grid-auto-columns: auto auto;
    column-gap: calc(10% - 10px);
    row-gap: 12.2%;
  }

  @media (max-width: 1325px) {
    & > div {
      height: fit-content;
      grid-template-columns: auto;
      grid-auto-columns: auto;
      row-gap: 40px;
    }
  }
`;
export default StyledWeatherContent;
