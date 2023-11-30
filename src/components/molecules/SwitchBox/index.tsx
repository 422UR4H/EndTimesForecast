import SwitchWrapper from "../SwitchWrapper";
import StyledSwitchBox from "./styled";

type SwitchBoxProps = {
  theme: string;
  toggleTheme(): void;
  unit: string;
  toggleUnit(): void;
};

export default function SwitchBox({
  theme,
  toggleTheme,
  unit,
  toggleUnit,
}: SwitchBoxProps) {
  return (
    <StyledSwitchBox>
      <SwitchWrapper checked={unit === "fahrenheit"} toggle={toggleUnit}>
        °F
      </SwitchWrapper>
      <SwitchWrapper checked={theme === "dark"} toggle={toggleTheme}>
        Dark Mode
      </SwitchWrapper>
    </StyledSwitchBox>
  );
}
