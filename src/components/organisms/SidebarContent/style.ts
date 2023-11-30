import styled from "styled-components";

const StyledSidebarContent = styled.div`
  width: 670px;
  padding: 50px 59px 23px 59px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.secondaryBackground};

  @media (max-width: 1325px) {
    width: 100%;
    min-height: 820px;
  }
`;
export default StyledSidebarContent;
