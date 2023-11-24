import { DefaultTheme } from "styled-components/dist/types";
import MainSwitch from "../../atoms/MainSwitch";
import StyledSwitchBox from "./styled";

// TODO: refactor repeated type
type SwitchBoxProps = {
  theme: DefaultTheme;
  toggleTheme(): void;
  children: string;
};

export default function SwitchWrapper({
  theme,
  toggleTheme,
  children,
}: SwitchBoxProps) {
  return (
    <StyledSwitchBox>
      <MainSwitch theme={theme} toggleTheme={toggleTheme} />
      <p>{children}</p>
    </StyledSwitchBox>
  );
}
