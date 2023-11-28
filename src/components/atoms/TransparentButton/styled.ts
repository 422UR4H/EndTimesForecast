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
    $isSelected ? theme.colors.primaryText : theme.colors.secondaryText};

  outline: none;
  cursor: pointer;
`;
export default StyledTransparentButton;
