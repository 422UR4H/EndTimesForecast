import styled from "styled-components";

const StyledWeatherContent = styled.div`
  p {
    font-style: italic;
    color: ${({ theme }) => theme.colors.ternaryText};
  }
`;
export default StyledWeatherContent;
