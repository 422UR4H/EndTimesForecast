import styled from "styled-components";

const StyledHomePage = styled.div`
  height: 100dvh;
  display: flex;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.link};
  }

  @media (max-width: 1325px) {
    flex-direction: column;
  }
`;
export default StyledHomePage;
