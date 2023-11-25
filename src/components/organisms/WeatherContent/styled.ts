import styled from "styled-components";

const StyledWeatherContent = styled.div`
  width: 100%;
  max-width: 1100px;
  
  & > div {
    width: 100%;
    height: 410px;

    display: grid;
    grid-template-columns: auto auto;
    /* display: flex; */
    /* flex-wrap: wrap; */
    /* gap: 100px; */
    column-gap: calc(10% - 10px);
    row-gap: 12.2%;
  }

  & > p {
    padding-top: 61px;
    font-style: italic;
    color: ${({ theme }) => theme.colors.ternaryText};
  }
`;
export default StyledWeatherContent;
