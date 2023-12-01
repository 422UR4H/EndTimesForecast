import styled from "styled-components";

type StyledTransparentButtonProps = {
  $isSelected: boolean;
};

const StyledTransparentButton = styled.button<StyledTransparentButtonProps>`
  font-size: 48px;
  line-height: 48px;

  border: none;
  background-color: transparent;

  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.selectedButton : theme.colors.secondaryText};

  outline: none;
  cursor: pointer;

  @media (max-width: 573px) {
    font-size: 8dvw;
    line-height: 8dvw;
  }
`;
export default StyledTransparentButton;
