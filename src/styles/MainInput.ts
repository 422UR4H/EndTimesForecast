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
  border: none;
  outline: none;

  color: ${({ theme }) => theme.colors.primaryText};
  background-color: ${({ theme }) => theme.colors.inputBackground};
  box-shadow: 0px 24px 48px 0px ${({ theme }) => theme.colors.shadow};

  &::placeholder {
    font-family: "Montserrat", sans-serif;
    font-size: 22px;
    font-weight: 500;
    line-height: 24px;

    padding-top: 8px;
    color: ${({ theme }) => theme.colors.placeholder};
  }

  @media (max-width: 1325px) {
    font-size: 20px;
    line-height: 22px;
    &::placeholder {
      font-size: 20px;
    line-height: 22px;
    }
  }

  @media (max-width: 685px) {
    width: 80dvw;
  }
`;
export default StyledMainInput;
