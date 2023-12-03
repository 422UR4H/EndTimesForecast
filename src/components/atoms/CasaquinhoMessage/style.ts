import styled from "styled-components";

const StyledCasaquinhoMessage = styled.p`
  padding-top: 61px;
  font-style: italic;
  color: ${({ theme }) => theme.colors.ternaryText};

  @media (max-width: 1325px) {
    font-size: 18px;
    line-height: 20px;
  }
`;
export default StyledCasaquinhoMessage;
