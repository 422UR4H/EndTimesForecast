import styled from "styled-components";

const StyledWeatherBox = styled.div`
  width: 500px;
  height: 180px;
  border-radius: 32px;

  color: ${({ theme }) => theme.colors.primaryBackground};
  background-color: ${({ theme }) => theme.colors.primary};
`;
export default StyledWeatherBox;
