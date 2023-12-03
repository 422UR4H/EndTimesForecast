import styled from "styled-components";

const StyledLocality = styled.div`
  h1 {
    font-weight: 400;
    font-size: 7dvw;
    line-height: 8dvw;
    white-space: nowrap;
  }
  p {
    white-space: pre-wrap;
  }

  @media (max-width: 1690px) {
    h1 {
      font-size: 6dvw;
      line-height: 7dvw;
    }
  }

  @media (max-width: 1325px) {
    h1 {
      margin-block: 10px;
    }
    margin-bottom: 30px;
  }
`;
export default StyledLocality;
