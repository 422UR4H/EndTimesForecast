import { DefaultTheme } from "styled-components/dist/types";
import SwitchWrapper from "../../molecules/SwitchWrapper";
import StyledSwitchBox from "./styled";

type SwitchBoxProps = {
  theme: DefaultTheme;
  toggleTheme(): void;
};

export default function SwitchBox({ theme, toggleTheme }: SwitchBoxProps) {
  return (
    <StyledSwitchBox>
      <SwitchWrapper theme={theme} toggleTheme={toggleTheme}>
        °F
      </SwitchWrapper>
      <SwitchWrapper theme={theme} toggleTheme={toggleTheme}>
        Dark Mode
      </SwitchWrapper>
    </StyledSwitchBox>
  );
}
