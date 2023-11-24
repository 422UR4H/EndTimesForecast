import styled from "styled-components";

const StyledHeader = styled.header`
  h1 {
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;
export default StyledHeader;
