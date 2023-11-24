import styled from "styled-components";

const StyledHomePage = styled.div`
  height: 100dvh;
  display: flex;

  .sidebar {
    width: 670px;
    padding: 50px 59px 23px 59px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    background-color: ${({ theme }) => theme.colors.secondaryBackground};
  }

  .main {
    padding: 60px 96px 20px 50px;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  a {
    color: ${({ theme }) => theme.colors.link};
  }
`;
export default StyledHomePage;
