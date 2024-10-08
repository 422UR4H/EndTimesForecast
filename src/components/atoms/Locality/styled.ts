import styled from "styled-components";

const StyledLocality = styled.div`
  max-width: 1100px;

  h1 {
    font-weight: 400;
    font-size: 6dvw;
    line-height: 8dvw;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
      font-size: 10dvw;
    }
    margin-bottom: 30px;
  }
`;
export default StyledLocality;
