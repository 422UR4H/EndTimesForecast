import styled from "styled-components";

const StyledMainContent = styled.div`
  padding: 60px 96px 20px 50px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1325px) {
    width: 100%;
    /* min-height: 96svh; */
    padding-inline: 50px;

    .container {
      margin-bottom: 70px;
    }

    p {
      font-size: 16px;
      line-height: 18px;
    }
  }
`;
export default StyledMainContent;
