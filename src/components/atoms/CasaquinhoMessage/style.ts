import styled from "styled-components";

const StyledCasaquinhoMessage = styled.p`
  padding-top: 61px;
  font-style: italic;
  color: ${({ theme }) => theme.colors.ternaryText};

  @media (max-width: 1325px) {
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 10px;
  }
`;
export default StyledCasaquinhoMessage;
