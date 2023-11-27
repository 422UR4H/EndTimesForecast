import styled from "styled-components";

const StyledMainButton = styled.button`
  h2 {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  p {
    font-size: 22px;
    font-weight: 600;
  }

  padding-block: 15px;
  padding-inline: 25px;
  border-radius: 15px;
  cursor: pointer;

  /* color: ${({ theme }) => theme.colors.secondaryBackground}; */
  background-color: ${({ theme }) => theme.colors.primary};
`;
export default StyledMainButton;
