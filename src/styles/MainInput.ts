import styled from "styled-components";

const StyledMainInput = styled.input`
  font-size: 22px;
  font-weight: 500;
  line-height: 24px;

  width: 500px;
  height: 80px;
  padding-left: 67px;
  margin-bottom: 7px;
  border-radius: 24px;
  box-shadow: 0px 24px 48px 0px ${({ theme }) => theme.colors.secondaryText};
  /* box-shadow: 0px 24px 48px 0px #314f7c14; */
  border: none;
  outline: none;

  color: ${({ theme }) => theme.colors.primaryText};
  background-color: ${({ theme }) => theme.colors.primaryBackground};

  &::placeholder {
    font-family: "Montserrat", sans-serif;
    font-size: 22px;
    font-weight: 500;
    line-height: 24px;

    padding-top: 8px;
  }
`;
export default StyledMainInput;
