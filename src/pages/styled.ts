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

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.link};
  }

  @media (max-width: 1325px) {
    flex-direction: column;
    
    .sidebar {
      width: 100%;
      min-height: 820px;
    }
  }
`;
export default StyledHomePage;
