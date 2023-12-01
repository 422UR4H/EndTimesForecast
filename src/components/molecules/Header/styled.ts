import styled from "styled-components";

const StyledHeader = styled.header`
  width: 550px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 62px;
    font-weight: 600;
  }

  @media (max-width: 685px) {
    justify-content: space-around;
    width: 80dvw;

    img {
      width: 22%;
    }
    h1 {
      font-size: 8dvw;
      line-height: 8dvw;
    }
  }
`;
export default StyledHeader;
