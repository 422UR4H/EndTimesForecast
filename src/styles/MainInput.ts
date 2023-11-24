import styled from "styled-components";

const StyledMainInput = styled.input`
  width: 500px;
  height: 80px;
  border-radius: 24px;

  color: ${({ theme }) => theme.colors.primaryText};
  background-color: ${({ theme }) => theme.colors.primaryBackground};
  box-shadow: 0px 24px 48px 0px #314F7C14;

  &::placeholder {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px;
    font-weight: 500;
    line-height: 24px;
  }
`;
export default StyledMainInput;
