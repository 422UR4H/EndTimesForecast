import styled from "styled-components";

const StyledMainContent = styled.div`
  padding: 60px 96px 20px 50px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1325px) {
    width: 100%;
    min-height: 96dvh;
    padding-inline: 50px;
  }
`;
export default StyledMainContent;
