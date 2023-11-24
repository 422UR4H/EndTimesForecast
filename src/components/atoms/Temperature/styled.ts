import styled from "styled-components";

const StyledTemperature = styled.div`
  font-weight: 300;
  color: ${({ theme }) => theme.colors.secondary};

  h1 {
    font-size: 150px;
  }
  h2 {
    font-size: 120px;
  }
  p {
    font-size: 32px;
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;
export default StyledTemperature;
